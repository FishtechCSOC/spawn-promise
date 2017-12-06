jest.mock('child_process');
import { isFunction } from 'lodash';
import spawnPromise from './spawn-promise';
import { spawn } from 'child_process';

const child_process = require('child_process');

describe('spawn-promise module', () => {
    test('imports successfully as a function', () => {
        expect(isFunction(spawnPromise)).toBe(true);
    });
    test('should return a promise', async () => {
        const result = spawnPromise().catch(err => err);
        expect(result).toBeInstanceOf(Promise);
    });
    test('should pass through stdout', async () => {
        const result = spawnPromise();
        spawn.close();
        const finishedResult = await result;
        expect(finishedResult.stdout).toBe('hello world');
    });
    test('should pass through stderr', async () => {
        const result = spawnPromise();
        spawn.close();
        const finishedResult = await result;
        expect(finishedResult.stderr).toBe('hello world');
    });
    test('should pass through status code', async () => {
        const result = spawnPromise();
        spawn.close();
        const finishedResult = await result;
        expect(finishedResult.status).toBe(1234);
    });
    test('should fail on error', async () => {
        expect.assertions(1);
        try {
            const result = spawnPromise();
            spawn.error();
            const finishedResult = await result;
        } catch (result) {
            expect(result.error).toBe('error');
        }
    });
    test('shouldnt have any stdout when using stdout="ignore"', async () => {
        child_process.setup({ stdio: 'ignore' });
        const result = spawnPromise();
        spawn.close();
        const finishedResult = await result;
        expect(finishedResult.status).toBe(1234);
    });
});
