module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    "jest": {
      "detectOpenHandles": true,
      "verbose": true,
      "testEnvironment": "node",
      // other Jest options
    },
    moduleFileExtensions: ['ts', 'js'],
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    testMatch: ['**/*.spec.ts'],
    moduleNameMapper: {
      '^@weather_wise_backend/src/(.*)$': '<rootDir>/src/$1',
      '^@weather_wise_backend/shared/(.*)$': '<rootDir>/libs/shared/$1',
      '^@weather_wise_backend/service/(.*)$': '<rootDir>/libs/service/$1',
      '^@weather_wise_backend/migration/(.*)$': '<rootDir>/migration/$1',
      '^@weather_wise_backend/configuration/(.*)$': '<rootDir>/configuration/$1',
    },
  };
  