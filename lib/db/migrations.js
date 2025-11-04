const migrations = [
  {
    name: 'reset',
    actions: [
      `DELETE FROM migrations`,
      `DROP TABLE IF EXISTS problems`,
      `DROP TABLE IF EXISTS problem_test_cases`,
      `DROP TABLE IF EXISTS submissions`,
      `DROP TABLE IF EXISTS users`,
      `DROP TABLE IF EXISTS articles`,
    ]
  },
  {
    name: 'database_creation',
    actions: [
      `CREATE TABLE IF NOT EXISTS problems
             (
                 rowid INTEGER PRIMARY KEY,
                 title
                 TEXT,
                 description
                 TEXT,
                 content
                 TEXT,
                 initial_code
                 TEXT,
                 execution_time_threshold
                 INTEGER,
                 created_at
                 timestamp,
                 active_time_window_start
                 timestamp
             )`,
      `CREATE TABLE IF NOT EXISTS problem_test_cases
             (
                 rowid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                 problem_id
                 INTEGER,
                 input
                 TEXT,
                 expected_output
                 TEXT,
                 used_for_scoring
                 BOOLEAN
             )`,
      `CREATE TABLE IF NOT EXISTS submissions
             (
                 rowid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                 problem_id
                 INTEGER,
                 user_id
                 INTEGER,
                 submission
                 TEXT,
                 output
                 TEXT,
                 execution_time
                 INTEGER,
                 status
                 TEXT,
                 created_at
                 timestamp
             )`,
      `CREATE table if not exists users
             ( 
                 rowid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                 alias
                 TEXT
                 UNIQUE,
                 password
                 TEXT,
                 accesstoken
                 TEXT
             )`,
      `CREATE table if not exists articles
             (
              rowid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
              content TEXT, active_time_window_start timestamp)`
    ]
  },
  {
    name: 'insert_articles',
    actions: [
      ...require('./articles').map(article =>
        `INSERT INTO articles (content, active_time_window_start)
                 VALUES ('${article.content}',
                         '${article.active_time_window_start}')`
      )
    ]
  },
  {
    name: 'insert_problems',
    actions: [
      ...require('./problems').map((problem, index) =>
        `INSERT INTO problems
                 (
                  rowid,
                  title,
                  description,
                  content,
                  initial_code,
                  created_at,
                  active_time_window_start,
                  execution_time_threshold)
                 VALUES (
                  ${index},
                  '${problem.title}',
                         '${problem.description}',
                         '${problem.content}',
                         '${problem.initial_code}',
                         '${new Date().toISOString()}',
                         '${problem.active_time_window_start}',
                         '${problem.execution_time_threshold}'
                        );
                `),
    ]
  },
  {
    name: 'insert_problem_test_cases',
    actions: [
      ...require('./problems').map(problem =>
        problem.test_cases.map(testCase =>
          `INSERT INTO problem_test_cases
                     (problem_id,
                      input,
                      expected_output,
                      used_for_scoring)
                     SELECT p.rowid,
                            '${testCase.input}',
                            '${testCase.expected_output}',
                            '${testCase.used_for_scoring}'
                     FROM problems p
                     WHERE p.title = '${problem.title}'
                    `)
      ).flat(),
    ]
  },
  {
    name: 'insert_users',
    actions: [
      `
                INSERT INTO users (alias, password, accesstoken)
                VALUES ('charli', '$2a$12$F3y5ZAyrHSkvLjRDZDlT3exN7H1yLCx7gGB1iIg7giCoufMNVz2rq', 'secrettoken123')
            `
    ]
  }
]

module.exports = migrations;
