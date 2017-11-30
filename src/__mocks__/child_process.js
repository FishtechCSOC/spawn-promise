const EventEmitter = require.requireActual('events');
const child_process = jest.genMockFromModule('child_process');

const baseEmitter = new EventEmitter();
const spawn = () => baseEmitter;
baseEmitter.stdout = new EventEmitter();
baseEmitter.stderr = new EventEmitter();
spawn.close = () => {
    baseEmitter.stdout.emit('data', 'hello ');
    baseEmitter.stdout.emit('data', 'world');
    baseEmitter.stderr.emit('data', 'hello ');
    baseEmitter.stderr.emit('data', 'world');
    baseEmitter.emit('close', 1234);
};
spawn.error = () => {
    baseEmitter.stdout.emit('data', 'hello ');
    baseEmitter.stdout.emit('data', 'world');
    baseEmitter.stderr.emit('data', 'hello ');
    baseEmitter.stderr.emit('data', 'world');
    baseEmitter.emit('error', 'error');
};
child_process.spawn = spawn;

module.exports = child_process;
