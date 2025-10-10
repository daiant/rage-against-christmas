const { Database } = require('./lib/db/db');
const { calculateLeaderBoard } = require('./lib/submissions/calculate-leaderboard');
const db = new Database();
const { calculateSubmission } = require('./lib/submissions/calculate-submission');

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
  if (!req.path.startsWith('/api/') || req.path.startsWith('/api/login')) { next(); return; }
  if (req.method === 'OPTIONS') { next(); return; }
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

app.get('/', (req, res) => {
  res.sendFile('public/index.html');
});

app.get('/problems', (req, res) => {
  res.sendFile('public/index.html', { root: '.' });
});

app.get('/problem', (req, res) => {
  res.sendFile(`public/problem.html`, { root: '.' });
});

app.get('/leaderboard', (req, res) => {
  res.sendFile(`public/leaderboard.html`, { root: '.' });
});

app.get('/login', (req, res) => {
  res.sendFile(`public/login.html`, { root: '.' });
});

const apiRouter = express.Router();

apiRouter.get('/problems', (req, res) => {
  db.getActiveProblems().then(problems =>
    res.send({ problems: problems })
  );
})

apiRouter.get('/problem/:id', (req, res) => {
  db.getActiveProblem(req.params.id).then(problem =>
    res.send({ problem: problem })
  );
});

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
  db.getSubmissionsByUser(req.params.id, req.params.userid).then(submissions =>
    res.send({ submissions: submissions }),
  );
});

apiRouter.post('/problem/:id/submit', async (req, res) => {
  const problem = await db.getActiveProblem(req.params.id);
  const { input, answer } = await db.getProblemAnswer(req.params.id);
  if (!problem) res.status(404).send({ error: 'Problem not found or not active' });

  const result = calculateSubmission(input, answer, req.body.code);
  const status = String(result.output) == String(answer) ? 'correct' : 'incorrect';
  await db.submitAnswer(req.params.id, req.body.code, result, status, req.userId);
  res.send({ problem: problem.title, submission: req.body });
});

apiRouter.post('/login', (req, res) => {
  const { username: alias, password } = req.body;
  db.getUser(alias, password).then(user => {
    if (!user) {
      res.status(401).send({ error: 'Invalid credentials' });
      return;
    }
    res.send({ accessToken: user.accessToken, userId: user.id, userName: user.alias });
  })
});

apiRouter.get('/leaderboard', (req, res) => {
  db.getAllSubmissions().then(submissions => {
    res.send({
      leaderboard:
        calculateLeaderBoard(submissions)
    })
  }
  );
});

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Rage Against Port ${port}`);
})