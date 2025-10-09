const { Database } = require('./db/db');
const db = new Database();
const { calculateSubmission } = require('./submissions/calculate-submission');

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
  if (req.path.startsWith('/public') || req.path.startsWith('/login')) { next(); return; }
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
})

app.get('/problems', (req, res) => {
  db.getActiveProblems().then(problems =>
    res.send({ problems: problems })
  )
})

app.get('/problem/:id', (req, res) => {
  db.getActiveProblem(req.params.id).then(problem =>
    res.send({ problem: problem })
  )
});

app.get('/problem/:id/submissions', (req, res) => {
  db.getSubmissions(req.params.id).then(submissions =>
    res.send({ submissions: submissions })
  )
});

app.post('/problem/:id/submit', async (req, res) => {
  const problem = await db.getActiveProblem(req.params.id);
  const { answer } = await db.getProblemAnswer(req.params.id);
  if (!problem) res.status(404).send({ error: 'Problem not found or not active' });

  const result = calculateSubmission(problem.input, problem.answer, req.body.code);
  const status = String(result.output) == String(answer) ? 'correct' : 'incorrect';
  await db.submitAnswer(req.params.id, req.body.code, result, status, req.userId);
  res.send({ problem: problem.title, submission: req.body })
});

app.post('/login', (req, res) => {
  const { username: alias, password } = req.body;
  db.getUser(alias, password).then(user => {
    if (!user) {
      res.status(401).send({ error: 'Invalid credentials' });
      return;
    }
    res.send({ accessToken: user.accessToken });
  })
});

app.listen(port, () => {
  console.log(`Rage Against Port ${port}`)
})