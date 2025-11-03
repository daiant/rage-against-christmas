const migrations = [
    {
        name: 'reset',
        actions: [
            `DROP TABLE IF EXISTS migrations`,
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
                 title
                 TEXT,
                 description
                 TEXT,
                 content
                 TEXT,
                 initial_code
                 TEXT,
                 created_at
                 INTEGER,
                 active_time_window_start
                 INTEGER,
                 execution_time_threshold
                 INTEGER
             )`,
            `CREATE TABLE IF NOT EXISTS problem_test_cases
             (
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
                 INTEGER
             )`,
            `CREATE table if not exists users
             (
                 alias
                 TEXT
                 UNIQUE,
                 password
                 TEXT,
                 accessToken
                 TEXT
             )`,
            `CREATE table if not exists articles
             (
                 content
                 TEXT,
                 active_time_window_start
                 INTEGER
             )`
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
            ...require('./problems').map(problem =>
                `INSERT INTO problems
                 (title,
                  description,
                  content,
                  initial_code,
                  created_at,
                  active_time_window_start,
                  execution_time_threshold)
                 VALUES ('${problem.title}',
                         '${problem.description}',
                         '${problem.content}',
                         "${problem.initial_code}",
                         '${new Date().toISOString()}',
                         '${problem.active_time_window_start}',
                         '${problem.execution_time_threshold}');
                `)
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
                INSERT INTO users (alias, password, accessToken)
                VALUES ('charli', '$2a$12$F3y5ZAyrHSkvLjRDZDlT3exN7H1yLCx7gGB1iIg7giCoufMNVz2rq', 'secrettoken123')
            `
        ]
    }
]

module.exports = migrations;
