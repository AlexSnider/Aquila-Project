/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/__tests__/$1",
  },
  testMatch: ["<rootDir>/__tests__/**/*.(test|spec).ts"],
  moduleDirectories: ["node_modules", "<rootDir>"],
  setupFilesAfterEnv: ["./__tests__/config/tests.config.ts"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  collectCoverage: true,
  coverageDirectory: "./coverage",
  coverageReporters: ["json", "lcov", "text", "html"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/monitoring/health-check/**",
    "!src/monitoring/metrics/**",
    "!src/monitoring/health-check/health-check-controller/**",
    "!src/database/production/**",
  ],
  maxWorkers: 2,
};
