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
    DROP TABLE if exists submissions
    `);
    await this.db.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
      problem_id INTEGER,
      user_id INTEGER,
      submission TEXT,
      execution_time INTEGER,
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
    "You haven't even left yet and the group of Elvish Senior Historians has already hit a problem: their list of locations to check is currently empty. Eventually, someone decides that the best place to check first would be the Chief Historian's office.

Upon pouring into the office, everyone confirms that the Chief Historian is indeed nowhere to be found. Instead, the Elves discover an assortment of notes and lists of historically significant locations! This seems to be the planning the Chief Historian was doing before he left. Perhaps these notes can be used to determine which locations to search?

Throughout the Chief's office, the historically significant locations are listed not by name but by a unique number called the location ID. To make sure they don't miss anything, The Historians split into two groups, each searching the office and trying to create their own complete list of location IDs.

There's just one problem: by holding the two lists up side by side (your puzzle input), it quickly becomes clear that the lists aren't very similar. Maybe you can help The Historians reconcile their lists?

For example:

3   4
4   3
2   5
1   3
3   9
3   3
Maybe the lists are only off by a small amount! To find out, pair up the numbers and measure how far apart they are. Pair up the smallest number in the left list with the smallest number in the right list, then the second-smallest left number with the second-smallest right number, and so on.

Within each pair, figure out how far apart the two numbers are; you'll need to add up all of those distances. For example, if you pair up a 3 from the left list with a 7 from the right list, the distance apart is 4; if you pair up a 9 with a 3, the distance apart is 6.

In the example list above, the pairs and distances would be as follows:

The smallest number in the left list is 1, and the smallest number in the right list is 3. The distance between them is 2.
The second-smallest number in the left list is 2, and the second-smallest number in the right list is another 3. The distance between them is 1.
The third-smallest number in both lists is 3, so the distance between them is 0.
The next numbers to pair up are 3 and 4, a distance of 1.
The fifth-smallest numbers in each list are 3 and 5, a distance of 2.
Finally, the largest number in the left list is 4, while the largest number in the right list is 9; these are a distance 5 apart.
To find the total distance between the left list and the right list, add up the distances between all of the pairs you found. In the example above, this is 2 + 1 + 0 + 1 + 2 + 5, a total distance of 11!

Your actual left and right lists contain many location IDs. What is the total distance between your lists?

",
    '3 5\n10 20',
    '8\n30',
    strftime('%s','now'),
    strftime('%s','now'),
    strftime('%s','now','+7 day'))
    `)

    await this.db.run(`
    insert into problems (title, description, content, input, answer, created_at, active_time_window_start, active_time_window_end)
    values
    ('Segundo problemo',
    'Write a function that takes two numbers as input and returns their sum.',
    'long description of the problem',
    '3 5\n10 20',
    '8\n30',
    strftime('%s','now'),
    strftime('%s','now'),
    strftime('%s','now','+7 day'))
    `)

    await this.db.run(`
        insert into users (alias, password, accessToken) VALUES 
        ('charli', 'root', 'secrettoken123'),
        ('anita', 'bananita', 'token456')
    `);

    await this.db.run(`
    insert into submissions (problem_id, user_id, submission, execution_time, status, output, created_at)
    VALUES
    (1, 1, 'function sum(a, b) { return a + b; }', '59', 'correct', '8\n30', strftime('%s','now')),
    (1, 2, 'function sum(a, b) { return a - b; }', '103', 'incorrect', '2\n-10', strftime('%s','now')),
    (1, 1, 'function sum(a, b) { return a * b; }', '102', 'incorrect', '15\n200', strftime('%s','now')),
    (1, 2, 'function sum(a, b) { return a + b; }', '102', 'correct', '8\n30', strftime('%s','now')),
    (1, 2, 'function sum(a, b) { return a + b; }', '83', 'correct', '8\n30', strftime('%s','now')),
    (2, 2, 'function sum(a, b) { return a + b; }', '102', 'correct', '8\n30', strftime('%s','now'))
      `);

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
      SELECT rowid as id, submission, status, output, execution_time, user_id, created_at
      from submissions
      where problem_id = ?
      ORDER BY created_at DESC
    `, problem_id);
  }

  async getSubmissionsByUser(problem_id, userId) {
    return await this.db.all(`
      SELECT rowid as id, submission, status, output, execution_time, user_id, created_at
      from submissions
      where problem_id = ? and user_id = ?
      ORDER BY created_at DESC
    `, problem_id, userId);
  }

  async submitAnswer(problem_id, submission, result, status, userId) {
    if (!userId) throw new Error("No user found for submission");

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