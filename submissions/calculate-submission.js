const util = require('util');
const vm = require('vm');

const calculateSubmission = (input, desiredOutput, code) => {
  const sandbox = { executionTime: 0, input, desiredOutput };
  vm.createContext(sandbox);
  const script = new vm.Script(`
    now = new Date().getTime();
    input = \`${input}\`;
    ${code}
    output = main(input);
    then = new Date().getTime();
    executionTime = (then - now) + 'ms';
    `, sandbox);
  const context = {}
  script.runInNewContext(context);

  return context;
}

module.exports = { calculateSubmission }