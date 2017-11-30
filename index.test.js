const { isFunction } = require('lodash');

describe('root index.js', () => {
    test('imports successfully', () => {
        expect(() => {
            const result = require('./index');
        }).not.toThrow();
    });
    test('exports a function', () => {
        const result = require('./index');
        expect(isFunction(result)).toBe(true);
    });
});