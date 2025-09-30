const sharedConfig = require("../jest.config");

module.exports = {
  ...sharedConfig, // Aplica as configurações herdadas
  rootDir: ".", // O rootDir aqui é a pasta 'test'
  testRegex: ".e2e-spec.ts$",
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/../src/$1",
  },
};
