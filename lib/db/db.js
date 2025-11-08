const { Pool } = require('pg');


class Database {

  constructor() {
    this.db = new Pool({
      database: process.env.PGDATABASE,
      port: process.env.PGPORT,
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
    });
    // open({
    //   filename: dbPath,
    //   driver: sqlite3.Database,
    // }).then(db => {
    //   this.db = db;
    //   console.log('Database opened.');
    //   void this.migrate();
    // });
    this.migrate();
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
      await Promise.all(migration.actions.map(async action => {
        await this.db.query(action);
      }
      ));

      await this.db.query(`
                  INSERT INTO migrations (migration_name)
                  VALUES ($1::text)`, [migration.name]);
      console.log(`${migration.name} - Migrated.`);
    }

    console.log('Migration complete.');
  }

  async createMigrationTable() {
    await this.db.query(`
            CREATE TABLE IF NOT EXISTS migrations
            (
                migration_name
                TEXT
                NOT
                NULL
            )
        `);
  }

  async isMigrated(migration_name) {
    const result = await this.db.query('SELECT migration_name FROM migrations where migration_name = $1', [migration_name]);
    return result?.rows.at(0)?.migration_name === migration_name;
  }

  async getActiveProblems() {
    const response = await this.db.query(`
            SELECT rowid as id, title, description, created_at, active_time_window_start
            from problems
            where date (active_time_window_start) < date ('now')
            ORDER BY active_time_window_start ASC
        `);
    return response.rows;
  }

  async getProblemById(id) {
    const result = await this.db.query(`
            SELECT rowid as id,
                   title,
                   description,
                   content,
                   initial_code,
                   created_at,
                   active_time_window_start,
                   execution_time_threshold
            from problems
            where rowid = $1
              and date (active_time_window_start)
                < date ('now')
        `, [id]);

    return result.rows.at(0)
  }

  async getProblemTestCases(problem_id) {
    const result = await this.db.query(`
            SELECT input, expected_output
            from problem_test_cases
            where problem_id = $1 and used_for_scoring = false
        `, [problem_id]);

    return result.rows;
  }

  async getAllProblemTestCases(problem_id) {
    const result = await this.db.query(`
            SELECT input, expected_output as answer, used_for_scoring
            from problem_test_cases
            where problem_id = $1
        `, [problem_id]);

    return result.rows;
  }

  async getAllSubmissions() {
    const result = await this.db.query(`
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
    return result.rows;
  }

  async getSubmissionsByProblemId(problem_id) {
    const result = await this.db.query(`
            SELECT rowid as id, submission, output, status, execution_time, user_id, created_at
            from submissions
            where problem_id = $1
            ORDER BY created_at DESC
        `, [problem_id]);
    return result.rows;
  }

  async getSubmissionsByUser(problem_id, userId) {
    const result = await this.db.query(`
            SELECT rowid as id, submission, output, status, execution_time, user_id, created_at
            from submissions
            where problem_id = $1 and user_id = $2
            ORDER BY created_at DESC
        `, [problem_id, userId]);
    return result.rows;
  }

  async hasCorrectSubmission(problemId, userId) {
    const result = await this.db.query(`
            select count(*) as count
            from submissions
            where problem_id = $1 and user_id = $2 and status = 'correct'
        `, [problemId, userId]);
    return result.rows[0].count > 0;
  }

  async hasFastestSubmission(problemId, userId) {
    const result = await this.db.query(`
            select s.execution_time, execution_time_threshold
            from submissions s
                     left join problems p
                               on p.rowid = s.problem_id
          where s.problem_id = $1
              and s.status = 'correct'
              and s.user_id = $2
        `, [problemId, userId]);

    return result.rows.some(s => s.execution_time < s.execution_time_threshold);
  }

  async submitAnswer(problem_id, submission, output, executionTime, status, userId) {
    if (!userId) throw new Error("No user found for submission");

    await this.db.query(`
            INSERT INTO submissions
            (problem_id, submission, output, execution_time, status, user_id, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [problem_id, submission, output, executionTime, status, userId, new Date().toISOString()]);
  }

  async getUser(alias) {
    const result = await this.db.query(`
            SELECT rowid as id, alias, password, accesstoken
            from users
            where alias = $1
        `, [alias]);

    return result.rows.at(0);
  }

  async getUserByToken(token) {
    const result = await this.db.query(`
            SELECT rowid as id, alias, accesstoken
            from users
            where accesstoken = $1
        `, [token]);

    return result.rows.at(0);
  }

  async getActiveArticles() {
    const result = await this.db.query(`
            SELECT rowid as id, content, to_char(active_time_window_start, 'DD-MM-YYYY') as date
            from articles
            where date (active_time_window_start) < date ('now')
            ORDER BY active_time_window_start ASC
        `);

    return result.rows;
  }

  async getAllUsers() {
    const result = await this.db.query(`
            SELECT rowid as id, alias
            FROM users`);

    return result.rows;
  }
}

module.exports = { Database }