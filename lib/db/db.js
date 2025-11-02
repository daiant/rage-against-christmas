const sqlite3 = require('sqlite3');
const {open} = require('sqlite');


const dbPath = './database.db';

class Database {
    constructor() {
        open({
            filename: dbPath,
            driver: sqlite3.Database,
        }).then(db => {
            this.db = db;
            console.log('Database opened.');
            void this.migrate();
        });
    }

    async migrate() {
        const migrations = require('./migrations');
        for (const migration of migrations) {
            await this.createMigrationTable();

            if (await this.isMigrated(migration.name)) {
                console.log(`${migration.name} is already in the database.`);
                continue;
            }
            console.log(`${migration.name} - Migrating....`);
            await this.db.exec(`
                INSERT INTO migrations (migration_name)
                VALUES ('${migration.name}')`);

            await Promise.all(migration.actions.map(action =>
                this.db.exec(action),
            ));
            console.log(`${migration.name} - Migrated.`);
        }

        console.log('Migration complete.');
    }

    async createMigrationTable() {
        await this.db.exec(`
            CREATE TABLE IF NOT EXISTS migrations
            (
                migration_name
                TEXT
                NOT
                NULL
            )
        `)
    }

    async isMigrated(migration_name) {
        return (await this.db.get('SELECT migration_name FROM migrations where migration_name = ?', migration_name))?.migration_name;
    }

    async getActiveProblems() {
        return await this.db.all(`
            SELECT rowid as id, title, description, created_at, active_time_window_start
            from problems
            where date (active_time_window_start) > date ('now')
            ORDER BY id ASC
        `);
    }

    async getProblemById(id) {
        return await this.db.get(`
            SELECT rowid as id, title, description, content, initial_code, created_at, active_time_window_start
            from problems
            where rowid = ?
              and date (active_time_window_start)
                > date ('now')
        `, id)
    }

    async getProblemTestCases(problem_id) {
        return await this.db.all(`
            SELECT input, expected_output
            from problem_test_cases
            where problem_id = ? and used_for_scoring = 0
        `, problem_id);
    }

    async getProblemAnswer(problem_id) {
        return await this.db.get(`
            SELECT input, expected_output as answer
            from problem_test_cases
            where problem_id = ? and used_for_scoring = 1
        `, problem_id);
    }

    async getAllSubmissions() {
        return await this.db.all(`
            SELECT s.rowid as id,
                   s.problem_id,
                   s.status,
                   s.execution_time,
                   s.user_id,
                   p.execution_time_threshold,
                   u.alias as username,
                   s.created_at
            from submissions s
                     left join users u on s.user_id = u.rowid
                     left join problems p on p.rowid = s.problem_id
            ORDER BY s.created_at DESC
        `);
    }

    async getSubmissionsByProblemId(problem_id) {
        return await this.db.all(`
            SELECT rowid as id, submission, output, status, execution_time, user_id, created_at
            from submissions
            where problem_id = ?
            ORDER BY created_at DESC
        `, problem_id);
    }

    async getSubmissionsByUser(problem_id, userId) {
        return await this.db.all(`
            SELECT rowid as id, submission, output, status, execution_time, user_id, created_at
            from submissions
            where problem_id = ? and user_id = ?
            ORDER BY created_at DESC
        `, problem_id, userId);
    }

    async hasCorrectSubmission(problemId, userId) {
        const hasCorrectSubmissions = await this.db.get(`
            select count(*) as count
            from submissions
            where problem_id = ? and user_id = ? and status = 'correct'
        `, problemId, userId);
        return hasCorrectSubmissions.count > 0;
    }

    async hasFastestSubmission(problemId, userId) {
        const submissionsForProblem = await this.db.all(`
            select s.execution_time, execution_time_threshold
            from submissions s
                     left join problems p
                               on p.rowid = s.problem_id
            where s.problem_id = ?
              and s.status = 'correct'
              and s.user_id = ?
        `, problemId, userId);

        return submissionsForProblem.some(s => s.execution_time <= s.execution_time_threshold);

    }

    async submitAnswer(problem_id, submission, result, status, userId) {
        if (!userId) throw new Error("No user found for submission");

        const now = Math.floor(Date.now() / 1000);
        return await this.db.run(`
            INSERT INTO submissions
            (problem_id, submission, output, execution_time, status, user_id, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, problem_id, submission, result.output, result.executionTime, status, userId, now);
    }

    async getUser(alias, password) {
        return await this.db.get(`
            SELECT rowid as id, alias, accessToken
            from users
            where alias = ?
              and password = ?
        `, [alias, password]);
    }

    async getUserByToken(token) {
        return await this.db.get(`
            SELECT rowid as id, alias, accessToken
            from users
            where accessToken = ?
        `, token);
    }

    async getActiveArticles() {
        return await this.db.all(`
            SELECT rowid as id, content, strftime('%d-%m-%Y', active_time_window_start) as date
            from articles
            where date (active_time_window_start) > date ('now')
            ORDER BY id ASC
        `);
    }
}

module.exports = {Database}