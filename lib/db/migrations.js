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
  },
  {
    name: 'insert_users_2',
    actions: [
      `INSERT INTO users (alias, password, accesstoken) VALUES
('kukapu', '$2a$08$RBLU0G9oCyBLGmOfBc5bF.3B29gUgBBuR0SkPiGZ.CrIL3040VJgu', '$2a$08$RBLU0G9oCyBLGmOfBc5bF.3B29gUgBBuR0SkPiGZ.CrIL3040VJgu'),
('flowerpower', '$2a$08$TeOHDKfNVkWdnXBXiPL5QOa0sHHQ31bAlxyrRmSYNBRdfxQgP4hV.', '$2a$08$TeOHDKfNVkWdnXBXiPL5QOa0sHHQ31bAlxyrRmSYNBRdfxQgP4hV.'),
('bidon7a0', '$2a$08$EhDPgHDiftx7h9VJPZ7Vi.i1/VQLdCALYXW0CRLe7H0UtsRbbR2UC', '$2a$08$EhDPgHDiftx7h9VJPZ7Vi.i1/VQLdCALYXW0CRLe7H0UtsRbbR2UC'),
('pepe', '$2a$08$p9pCfCXoJBHbFkEcrxYtFe3n2yg6L.iZgyFXQFZZZcvnTpHmkCYYG', '$2a$08$p9pCfCXoJBHbFkEcrxYtFe3n2yg6L.iZgyFXQFZZZcvnTpHmkCYYG'),
('raulstation', '$2a$08$XKhUAZlkuehXZjHYTOCbV.l2GmsfFoDuLR.5iKRuSzpmPazkreUG2', '$2a$08$XKhUAZlkuehXZjHYTOCbV.l2GmsfFoDuLR.5iKRuSzpmPazkreUG2'),
('adri', '$2a$08$Q1Qk6vjtMsw57VQpkd225OcrxcHAeSDQqkE33Cz.7fEQmTj3.Q30W', '$2a$08$Q1Qk6vjtMsw57VQpkd225OcrxcHAeSDQqkE33Cz.7fEQmTj3.Q30W'),
('cristian', '$2a$08$JhrVXhCaqBe9Xnogr/.OWu/MMJf3xtSv68HC95/d.5YM9tNmPfiia', '$2a$08$JhrVXhCaqBe9Xnogr/.OWu/MMJf3xtSv68HC95/d.5YM9tNmPfiia'),
('migue', '$2a$08$t5d618rnk7epXRwWNgVQgO6wbcKr5qeoUxXXuNFDT8pc1f4JfPv8W', '$2a$08$t5d618rnk7epXRwWNgVQgO6wbcKr5qeoUxXXuNFDT8pc1f4JfPv8W'),
('vicente', '$2a$08$mDpvPlbNjaAUJnltUa/WNOSMLlyTn0ODgZ13P.TGn4IcAERFCgjCq', '$2a$08$mDpvPlbNjaAUJnltUa/WNOSMLlyTn0ODgZ13P.TGn4IcAERFCgjCq'),
('ximo', '$2a$08$PiV23s7KAM8iaSZfPl4vuOk2ZhA5rHQC.7yUNkRconnLpRRt7z.q.', '$2a$08$PiV23s7KAM8iaSZfPl4vuOk2ZhA5rHQC.7yUNkRconnLpRRt7z.q.'),
('raul.garcia', '2a$08$.UIOFm4jScRwDTDbmJw9e.7xcmnCkrGxFjVTQ0K8eUYUbz9BcTkda', '$2a$08$.UIOFm4jScRwDTDbmJw9e.7xcmnCkrGxFjVTQ0K8eUYUbz9BcTkda'),
('montse', '$2a$08$ZfVoC5jhV0EFa23wyjf7GO9wHDn0jnSVXBHmUI0X.eMLXToBapaIK', '$2a$08$ZfVoC5jhV0EFa23wyjf7GO9wHDn0jnSVXBHmUI0X.eMLXToBapaIK'),
('pascual', '$2a$08$3P77CXjn/2RGBK9gbu8Xluymm5BuHiAd2EL.gp5RQbIleabX.9W5q', '$2a$08$3P77CXjn/2RGBK9gbu8Xluymm5BuHiAd2EL.gp5RQbIleabX.9W5q'),
('toni', '$2a$12$2ZedNX4YWpPelCw/6vK6kuZn2rm7nSIvO7i7HKnSsfKzLHQOotQBG', '$2a$12$2ZedNX4YWpPelCw/6vK6kuZn2rm7nSIvO7i7HKnSsfKzLHQOotQBG'),
('joan', '$2a$08$CA4G90JNih0mW3htpjiqN.XHRCemuWX4nWQr520E.Gqhe8x9oRhvm', '$2a$08$CA4G90JNih0mW3htpjiqN.XHRCemuWX4nWQr520E.Gqhe8x9oRhvm'),
('artes', '$2a$08$1nn4RdMAeVjBwx/2ZF0WW.2dPqAhs8FeoI.MIDH0ck.9TQlYR2UP6', '$2a$08$1nn4RdMAeVjBwx/2ZF0WW.2dPqAhs8FeoI.MIDH0ck.9TQlYR2UP6'),
('villalba', '$2a$08$aNCuAvfyijZ61VEVWcoiieLsWHaB.Wmt.y0Q6oOPGzRS4aU7NI6CG', '$2a$08$aNCuAvfyijZ61VEVWcoiieLsWHaB.Wmt.y0Q6oOPGzRS4aU7NI6CG'),
('emilio', '$2a$08$rM4NGbHsysbKeO2q8BdSeOciGhIG0uC0QpmtHS3QUfaV13OpjzMeu', '$2a$08$rM4NGbHsysbKeO2q8BdSeOciGhIG0uC0QpmtHS3QUfaV13OpjzMeu')`
      ('mariam', '$2a$12$TWjztDwY1rCuJBVTsRyFAuEzYXrImoKKapXmHrOnwR2s0.5nYBjq.', '$2a$12$TWjztDwY1rCuJBVTsRyFAuEzYXrImoKKapXmHrOnwR2s0.5nYBjq.')`
    ]
  }
]

module.exports = migrations;
