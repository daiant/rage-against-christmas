const util = require('util');
const vm = require('vm');

const calculateSubmission = (input, desiredOutput, code) => {
  const sandbox = { executionTime: 0, input, desiredOutput };
  vm.createContext(sandbox);
  const script = new vm.Script(`
    input = \`${input}\`;
    then = Date.now()
    ${code}
    output = main(input);
    now = Date.now()
    executionTime = now - then;
    `, sandbox);
  const context = {}
  script.runInNewContext(context);

  return context;
}

module.exports = { calculateSubmission }