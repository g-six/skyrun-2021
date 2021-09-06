/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const conf = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
      '**/*.{ts,tsx}',
      '!**/services/*.{ts,tsx}',
      '!**/*.d.ts',
      '!**/types.ts',
      '!**/jest.config.ts',
      '!**/node_modules/**',
    ],
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    testEnvironment: "jsdom",
    moduleNameMapper: {
      '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
      '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
      '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': `<rootDir>/__mocks__/fileMock.js`,
      '^components/(.*)$': '<rootDir>/components/$1',
      '^context/(.*)$': '<rootDir>/context/$1',
      '^services/(.*)$': '<rootDir>/services/$1',
      '^utils/(.*)$': '<rootDir>/utils/$1',
    },
    testPathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/.next/',
      '<rootDir>/context/',
      '<rootDir>/services/',
    ],
    transform: {
      // Use babel-jest to transpile tests with the next/babel preset
      // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
    transformIgnorePatterns: [
      '/node_modules/',
      '^.+\\.module\\.(css|sass|scss)$',
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default conf