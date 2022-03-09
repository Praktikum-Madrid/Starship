/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'], // Не нужно запускать тесты
  moduleNameMapper: {
    '^api(.*)$': '<rootDir>/src/api/$1',
    '^components(.*)$': '<rootDir>/src/components/$1',
    '^config(.*)$': '<rootDir>/src/config/$1',
    '^game(.*)$': '<rootDir>/src/game/$1',
    '^store(.*)$': '<rootDir>/src/store/$1',
    '^types(.*)$': '<rootDir>/src/types/$1',
    '^utils(.*)$': '<rootDir>/src/utils/$1',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Расположение настроек
};
