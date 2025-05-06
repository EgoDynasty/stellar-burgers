module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(css|scss)$': 'jest-css-modules-transform'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@slices$': '<rootDir>/src/services/slices',
    '^@slices/(.*)$': '<rootDir>/src/services/slices/$1',
    '^@utils-types$': '<rootDir>/src/utils/types',
    '^@utils-types/(.*)$': '<rootDir>/src/utils/types/$1',
    '^@utils/cookie$': '<rootDir>/src/utils/cookie',
    '^@utils/cookie/(.*)$': '<rootDir>/src/utils/cookie/$1'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)']
};
