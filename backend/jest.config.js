module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json", "ts"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  testPathIgnorePatterns: ["/node_modules/", "/(coverage|dist|lib|tmp)/"],
  coverageDirectory: "./coverage",
};
