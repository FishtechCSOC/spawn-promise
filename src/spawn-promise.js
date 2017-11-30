const { spawn } = require('child_process');
const { has } = require('lodash');

export default function spawnPromise(command, args, opts) {
    return new Promise((resolve, reject) => {
        const result = {};
        const spawnedProcess = spawn(command, args, opts);
        if (spawnedProcess.stdout) {
            spawnedProcess.stdout.on('data', (data) => {
                if (has(result, 'stdout')) {
                    result.stdout += data;
                } else {
                    result.stdout = data;
                }
            });

            spawnedProcess.stderr.on('data', (data) => {
                if (has(result, 'stderr')) {
                    result.stderr += data;
                } else {
                    result.stderr = data;
                }
            });
        }

        spawnedProcess.on('error', (err) => {
            result.error = err;
            reject(result);
        });

        spawnedProcess.on('close', (code) => {
            result.status = code;
            resolve(result);
        });
    });
}
