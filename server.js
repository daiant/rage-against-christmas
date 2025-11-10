const { Database } = require('./lib/db/db');
const { calculateLeaderBoard } = require('./lib/submissions/calculate-leaderboard');
const db = new Database();
const { calculateSubmissions } = require('./lib/submissions/calculate-submission');
const { create } = require('express-handlebars');
const { comparePassword } = require("./lib/user/password");

const express = require('express');

const app = express();
const port = 3000;

const hbs = create({
  helpers: {
    concat(a, b) {
      return a + b;
    },
    sum(a, b) {
      return a + b;
    },
  }
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
  if (!req.path.startsWith('/api/') || req.path.startsWith('/api/login')) {
    next();
    return;
  }
  if (req.method === 'OPTIONS') {
    next();
    return;
  }
  const auth = req.headers['authorization'];
  if (!auth || auth === 'null' || auth === 'undefined') {
    res.status(401).end();
    return;
  }

  db.getUserByToken(auth).then(user => {
    if (!user) {
      res.status(401).end();
      return;
    }

    req.userId = user.id;
    next();
  });
})

app.get('/', async (req, res) => {
  res.render('index', {
    problems: await db.getActiveProblems(),
    articles: await db.getActiveArticles(),
  });
});

app.get('/problems', async (req, res) => {
  res.render('index', {
    problems: await db.getActiveProblems(),
    articles: await db.getActiveArticles(),
  });
});

app.get('/leaderboard', (req, res) => {
  Promise.all([
    db.getAllUsers(),
    db.getAllSubmissions(),
  ]).then(([users, submissions]) => {
    res.render('leaderboard', {
      leaderboard: calculateLeaderBoard(users, submissions),
    })
  });
});

app.get('/login', (req, res) => {
  res.render('login', {
    layout: false
  });
});

app.get('/problems/:id', (req, res) => {
  db.getProblemById(req.params.id).then(problem => {
    if (!problem) return res.render('404');
    res.render('problem', { problem: problem })
  }
  );
});

app.get('/problem/:id', (req, res) => {
  db.getProblemById(req.params.id).then(problem => {
    if (!problem) return res.render('404');
    res.render('problem', { problem: problem })
  }
  );
});

const apiRouter = express.Router();


apiRouter.get('/problem/:id/test-cases', (req, res) => {
  db.getProblemTestCases(req.params.id).then(testCases =>
    res.send({ testCases })
  );
});

apiRouter.get('/problem/:id/submissions', (req, res) => {
  db.getSubmissionsByProblemId(req.params.id).then(submissions =>
    res.send({ submissions: submissions })
  );
});

apiRouter.get('/problem/:id/submissions/:userid', (req, res) => {
  db.getSubmissionsByUser(req.params.id, req.params.userid).then(submissions => res.send({ submissions: submissions })
  );
});

apiRouter.get('/problem/:id/submissions/:userId/correct', (req, res) => {
  db.hasCorrectSubmission(req.params.id, req.params.userId).then(response =>
    res.send(response),
  );
});

apiRouter.get('/problem/:id/submissions/:userId/fastest', (req, res) => {
  db.hasFastestSubmission(req.params.id, req.params.userId).then(response =>
    res.send(response),
  );
});

apiRouter.post('/problem/:id/submit', async (req, res) => {
  const problem = await db.getProblemById(req.params.id);
  if (!problem) res.status(404).send({ error: 'Problem not found or not active' });

  const tests = await db.getAllProblemTestCases(req.params.id);

  const result = await calculateSubmissions(tests, req.body.code);
  const status = result.status ? 'correct' : 'incorrect';

  console.log(`user ${req.userId} submitted answer for problem ${req.params.id}. Status is: ${status}. Timestamp: ${Date.now()}.`);

  await db.submitAnswer(
    req.params.id,
    req.body.code,
    result.output,
    result.executionTime,
    status,
    req.userId);

  res.send({ problemId: req.params.id, status, tests: result.tests, executionTime: result.executionTime });
});

apiRouter.post('/login', (req, res) => {
  const { username: alias, password } = req.body;
  db.getUser(alias, password).then(async user => {
    if (!user) {
      res.status(401).send({ error: 'Invalid credentials' });
      return;
    }

    const hasPassword = await comparePassword(password, user.password);

    if (!hasPassword) {
      res.status(401).send({ error: 'Invalid password' });
      return;
    }

    res.send({ accesstoken: user.accesstoken, userId: user.id, userName: user.alias });
  })
});

app.use('/api', apiRouter);


app.all('/{*any}', (req, res) => {
  res.render('404');
});

app.listen(port, () => {
  console.log(`Rage Against Port ${port}`);
});
