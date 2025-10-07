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
      this.serialize();
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
    input TEXT,
    answer TEXT,
    created_at INTEGER,
    active_time_window_start INTEGER,
    active_time_window_end INTEGER
  )
  `);

    await this.db.exec(`
    DROP TABLE submissions
    `);
    await this.db.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
      problem_id INTEGER,
      user_id INTEGER,
      submission TEXT,
      execution_time TEXT,
      status TEXT,
      output TEXT,
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

    await this.db.run(`
    insert into problems (title, description, content, input, answer, created_at, active_time_window_start, active_time_window_end)
    values
    ('Sum of Two Numbers',
    'Write a function that takes two numbers as input and returns their sum.',
    'long description of the problem',
    '3 5\n10 20',
    '8\n30',
    strftime('%s','now'),
    strftime('%s','now'),
    strftime('%s','now','+7 day'))
    `)

    await this.db.run(`
        insert into users (alias, password, accessToken) VALUES ('charli', 'root', 'secrettoken123')
    `)

  }

  async getActiveProblems() {
    return await this.db.all(`
      SELECT rowid as id, title, description, created_at, active_time_window_start, active_time_window_end
      from problems
      ORDER BY created_at DESC
    `);
  }

  async getActiveProblem(id) {
    return await this.db.get(`
      SELECT rowid as id, title, description, content, input, created_at, active_time_window_start, active_time_window_end
      from problems
      where rowid = ? and active_time_window_start <= strftime('%s','now') and active_time_window_end >= strftime('%s','now')
    `, id)
  }

  async getProblemAnswer(id) {
    return await this.db.get(`
      SELECT answer
      from problems
      where rowid = ?
    `, id)
  }


  async getSubmissions(problem_id) {
    return await this.db.all(`
      SELECT rowid as id, submission, status, output, execution_time, user_id, created_at
      from submissions
      where problem_id = ?
      ORDER BY created_at DESC
    `, problem_id);
  }

  async submitAnswer(problem_id, submission, result, status, userId) {
    const now = Math.floor(Date.now() / 1000);
    return await this.db.run(`
      INSERT INTO submissions 
      (problem_id, submission, execution_time, status, output, user_id, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, problem_id, submission, result.executionTime, status, result.output, userId, now);
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