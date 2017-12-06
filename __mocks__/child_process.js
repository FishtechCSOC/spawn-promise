const EventEmitter = require.requireActual('events');
const child_process = jest.genMockFromModule('child_process');


let baseEmitter = new EventEmitter();
const spawn = () => baseEmitter;

const setup = (opts = {}) => {
    baseEmitter = new EventEmitter();
    baseEmitter.stdout = new EventEmitter();
    baseEmitter.stderr = new EventEmitter();
    spawn.close = () => {
        if (baseEmitter.stdout) {
            baseEmitter.stdout.emit('data', 'hello ');
            baseEmitter.stdout.emit('data', 'world');
        }
        if (baseEmitter.stderr) {
            baseEmitter.stderr.emit('data', 'hello ');
            baseEmitter.stderr.emit('data', 'world');
        }
        baseEmitter.emit('close', 1234);
    };
    spawn.error = () => {
        if (baseEmitter.stdout) {
            baseEmitter.stdout.emit('data', 'hello ');
            baseEmitter.stdout.emit('data', 'world');
        }
        if (baseEmitter.stderr) {
            baseEmitter.stderr.emit('data', 'hello ');
            baseEmitter.stderr.emit('data', 'world');
        }
        baseEmitter.emit('error', 'error');
    };
    if (opts.stdio === 'ignore') {
        baseEmitter.stdout = undefined;
        baseEmitter.stderr = undefined;
    }
    return baseEmitter;
};

setup();

child_process.spawn = spawn;
child_process.setup = setup;

module.exports = child_process;
