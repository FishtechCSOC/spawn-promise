'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = spawnPromise;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('child_process'),
    spawn = _require.spawn;

var _require2 = require('lodash'),
    has = _require2.has;

function spawnPromise(command, args, opts) {
    return new _promise2.default(function (resolve, reject) {
        var result = {};
        var spawnedProcess = spawn(command, args, opts);

        if (spawnedProcess.stdout) {
            spawnedProcess.stdout.on('data', function (data) {
                if (has(result, 'stdout')) {
                    result.stdout += data;
                } else {
                    result.stdout = data;
                }
            });

            spawnedProcess.stderr.on('data', function (data) {
                if (has(result, 'stderr')) {
                    result.stderr += data;
                } else {
                    result.stderr = data;
                }
            });
        }

        spawnedProcess.on('error', function (err) {
            reject(err);
        });

        spawnedProcess.on('close', function (code) {
            result.status = code;
            resolve(result);
        });
    });
}