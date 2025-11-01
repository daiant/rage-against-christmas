const {parentPort, workerData} = require('worker_threads');
const vm = require('vm');

const sandbox = {executionTime: 0, input: workerData.input, desiredOutput: workerData.desiredOutput};
vm.createContext(sandbox);

const script = new vm.Script(`
    input = \`${workerData.input}\`;
    then = Date.now()
    ${workerData.code}
    output = main(input);
    now = Date.now()
    executionTime = now - then;
    `, sandbox);

const context = {}
script.runInNewContext(context, {timeout: 10 * 1000});

parentPort.postMessage(JSON.stringify(context));
