module.exports = {
  roots: ['<rootDir>/src/tests'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./src/tests/jest.setup.ts'],
};
