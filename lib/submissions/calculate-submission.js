const {
    Worker,
    isMainThread,
    parentPort,
    workerData,
} = require('node:worker_threads');

async function calculateSubmission(input, desiredOutput, code) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./lib/submissions/worker.js', {workerData: {input, desiredOutput, code}});
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

module.exports = {calculateSubmission}