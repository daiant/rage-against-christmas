const util = require('util');
const vm = require('vm');
const { Database } = require('./db/db');

const db = new Database();
const sandbox = { executionTime: 0 };
vm.createContext(sandbox);

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());



app.get('/', (req, res) => {
  res.sendFile('public/index.html');
})

app.post('/execute-remote-code', (req, res) => {
  const script = new vm.Script(`
    now = new Date().getTime();
    result = eval(\`${req.body.code}\`);
    then = new Date().getTime();
    executionTime = (then - now) + 'ms';
    `, sandbox);
  const context = {}
  script.runInNewContext(context);

  console.log(util.inspect(context));
  res.send({ result: context.result });
})

app.get('/problems', (req, res) => {
  res.send({ problems: db.getActiveProblems() })
})

app.listen(port, () => {
  db.serialize()
  console.log(`Example app listening on port ${port}`)
})