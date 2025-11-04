const {
  Worker,
} = require('node:worker_threads');

async function calculateSubmission(input, code) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./lib/submissions/worker.js', { workerData: { input, code } });
    worker.on('message', (result) => {
      resolve(JSON.parse(result));
    })
    worker.on("error", (msg) => {
      console.debug('Error on execution');
      console.debug(msg);
      resolve({
        executionTime: Math.MAX_SAFE_INTEGER,
        output: 'Did Not Finish'
      })
    });
  });
}

async function calculateSubmissions(test_cases, code) {
  let targetExecutionTime = 999 * 1000;
  let targetOutput = '';
  let testResults = [];

  for (const test of test_cases) {
    const result = await calculateSubmission(test.input, code);
    const isResponseAccurate = result.output == test.answer;

    if (test.used_for_scoring && isResponseAccurate) {
      targetExecutionTime = result.executionTime;
      targetOutput = result.output;
    }

    testResults.push({
      status: isResponseAccurate,
      executionTime: result.executionTime,
      input: test.input,
      desiredOutput: test.answer,
      output: result.output,
    });
  }

  // Returns execution time and output from used_for_scoring = 1.
  // Status returns correct if all tests passes;
  return {
    status: testResults.length && testResults.every(t => t.status),
    executionTime: targetExecutionTime,
    output: targetOutput,
    tests: testResults,
  }
}

module.exports = { calculateSubmission, calculateSubmissions }