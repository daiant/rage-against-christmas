const { Database } = require('./lib/db/db');
const { calculateLeaderBoard } = require('./lib/submissions/calculate-leaderboard');
const db = new Database();
const { calculateSubmission } = require('./lib/submissions/calculate-submission');
const {create} = require('express-handlebars');

const express = require('express');
const app = express();
const port = 3000;

const hbs = create()

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

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
    res.render('index');
});

app.get('/problems', (req, res) => {
    res.render('index');
});

app.get('/problem', (req, res) => {
  res.render(`problem`);
});

app.get('/leaderboard', (req, res) => {
  res.render(`leaderboard`);
});

app.get('/login', (req, res) => {
  // res.sendFile(`public/login.html`, { root: '.' });
    res.render('login', {
        layout: false
    });
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

apiRouter.get('/problem/:id/submissions/:userId/correct', (req, res) => {
  db.hasCorrectSubmission(req.params.id, req.params.userId).then(response =>
    res.send(response),
  );
})

apiRouter.get('/problem/:id/submissions/:userId/fastest', (req, res) => {
  db.hasFastestSubmission(req.params.id, req.params.userId).then(response =>
    res.send(response),
  );
})

apiRouter.post('/problem/:id/submit', async (req, res) => {
  const problem = await db.getActiveProblem(req.params.id);
  const { input, answer } = await db.getProblemAnswer(req.params.id);
  if (!problem) res.status(404).send({ error: 'Problem not found or not active' });

  const result = calculateSubmission(input, answer, req.body.code);
  const status = String(result.output) == String(answer) ? 'correct' : 'incorrect';
  await db.submitAnswer(req.params.id, req.body.code, result, status, req.userId);
  res.send({ problemId: req.params.id, status, executionTime: result.executionTime });
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