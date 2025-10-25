const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const dbPath = './database.db';
class Database {
  constructor() {
    open({
      filename: dbPath,
      driver: sqlite3.Database
    }).then((db) => {
      this.db = db;
      void this.serialize();
    });
  }

  async serialize() {
    await this.db.exec(`
    DROP TABLE if exists problems
    `);
    await this.db.exec(`
  CREATE TABLE IF NOT EXISTS problems (
    title TEXT,
    description TEXT,
    content TEXT,
    initial_code TEXT,
    created_at INTEGER,
    active_time_window_start INTEGER,
    active_time_window_end INTEGER
  )
  `);
    await this.db.exec(`
    drop table if exists problem_test_cases`)
    await this.db.exec(`
    create table if not exists problem_test_cases (
      problem_id INTEGER,
      input TEXT,
      expected_output TEXT,
      used_for_scoring BOOLEAN
    )
    `)

    await this.db.exec(`
    DROP TABLE if exists submissions
    `);
    await this.db.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
      problem_id INTEGER,
      user_id INTEGER,
      submission TEXT,
      output TEXT,
      execution_time INTEGER,
      status TEXT,
      created_at INTEGER
    )
    `)

    await this.db.exec(`
    DROP TABLE if exists users
    `);
    await this.db.exec(`
      CREATE table if not exists users (
        alias TEXT UNIQUE,
        password TEXT,
        accessToken TEXT
      )
    `);

    await Promise.all(require('./problems').map(async problem => {
        await this.db.exec(`INSERT INTO problems (
            title,
            description,
            content,
            initial_code,
            created_at,
            active_time_window_start,
            active_time_window_end
        ) VALUES (
                         '${problem.title}',
                         '${problem.description}',
                         '${problem.content}',
                         "${problem.initial_code}",
                         '${new Date().toISOString()}',
                         '${problem.active_time_window_start}',
                         '${problem.active_time_window_end}'
                 );
        ` );
        const {id: problemId} = await this.db.get(`select rowid as id from problems p where p.title = '${problem.title}'`)
        await Promise.all(problem.test_cases.map(testCase =>
            this.db.exec(`INSERT INTO problem_test_cases (
            problem_id,
            input,
            expected_output,
            used_for_scoring
            ) VALUES (
                 ${problemId},
                '${testCase.input}',
                '${testCase.expected_output}',
                 ${testCase.used_for_scoring}
             )`)
        ));
        return 1;
    }))

    await this.db.run(`
        insert into users (alias, password, accessToken) VALUES 
        ('charli', 'root', 'secrettoken123'),
        ('anita', 'bananita', 'token456')
    `);

  }

  async getActiveProblems() {
    return await this.db.all(`
      SELECT rowid as id, title, description, created_at, active_time_window_start, active_time_window_end
      from problems
      ORDER BY id ASC
    `);
  }

  async getActiveProblem(id) {
    return await this.db.get(`
      SELECT rowid as id, title, description, content, initial_code, created_at, active_time_window_start, active_time_window_end
      from problems
      where rowid = ?
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
      SELECT s.rowid as id, s.problem_id, s.status, s.execution_time, s.user_id, u.alias as username, s.created_at
      from submissions s
      left join users u on s.user_id = u.rowid
      ORDER BY created_at DESC
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
    select count(*) as count from submissions where problem_id = ? and user_id = ? and status = 'correct'
    `, problemId, userId);
    return hasCorrectSubmissions.count > 0;
  }

  async hasFastestSubmission(problemId, userId) {
    const submissionsForProblem = await this.db.all(`
    select user_id, execution_time from submissions where problem_id = ? and status = 'correct'
    `, problemId);
    let fastestSubmission = submissionsForProblem.at(0);
    submissionsForProblem.forEach(submission => {
      if (fastestSubmission.execution_time > submission.execution_time) {
        fastestSubmission = submission;
      }
    })
    return fastestSubmission?.user_id == userId;
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
      where alias = ? and password = ?
    `, [alias, password]);
  }

  async getUserByToken(token) {
    return await this.db.get(`
      SELECT rowid as id, alias, accessToken
      from users
      where accessToken = ?
    `, token);
  }
}
module.exports = { Database }