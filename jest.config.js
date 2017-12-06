const config = {
    collectCoverageFrom: ['**/*.{js,jsx}', '!jest.config.js', '!index.js'],
    coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/coverage/'],
    coverageReporters: ['json-summary', 'text', 'lcov'],
    modulePathIgnorePatterns: [
        '<rootDir>/scripts/',
        '<rootDir>/config/',
        '<rootDir>/coverage/',
    ],
};

module.exports = config;