module.exports = {
  roots: ['<rootDir>/src/integration-tests'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./src/integration-tests/jest.setup.ts'],
};
