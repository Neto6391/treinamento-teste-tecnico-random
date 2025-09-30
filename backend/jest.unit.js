const sharedConfig = require("./jest.config");

module.exports = {
  ...sharedConfig,
  testRegex: ".*\\.spec\\.ts$",

  coverageReporters: ["text", "lcov", "cobertura"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!*/node_modules/**",
    "!<rootDir>/src/main.ts",
  ],
  reporters: [
    "default",
    "jest-sonar",
    [
      "jest-junit",
      {
        outputDirectory: "junit",
        outputName: "test-results.xml",
      },
    ],
    [
      "@jest-performance-reporter/core",
      {
        errorAfterMs: 1000,
        warnAfterMs: 500,
      },
    ],
  ],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
};
