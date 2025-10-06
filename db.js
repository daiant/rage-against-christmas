const sqlite = require('sqlite');

const dbPath = './database.db';
class Database {
  constructor() {
    this.db = new sqlite.Database(dbPath);
  }

  serialize() {
    this.db.serialize(() => {
      this.db.run(`
  CREATE TABLE IF NOT EXISTS problems (
    title TEXT,
    content TEXT,
    input TEXT,
    answer TEXT,
    created_at INTEGER,
    active_time_window_start INTEGER,
    active_time_window_end INTEGER
  )
  `);

      //       this.db.run(`
      // INSERT INTO problems (title, content, input, answer, created_at, active_time_window_start, active_time_window_end) VALUES (
      //   "test_title", "test_content", "test_input", "test_answer", 0, 1, 2
      // )
      //       `);
    });
  }

  async getActiveProblems() {
    const res = [];
    this.db.each(`
      SELECT title, content, input, created_at, active_time_window_start, active_time_window_end
      from problems
      ORDER BY created_at DESC
    `, (err, row) => {
      res.push(row);
    });
    console.log(res);
  }
}
module.exports = { Database }