const sharedConfig = require("../jest.config"); // Note o ../ para subir um nível

module.exports = {
  ...sharedConfig,
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/../src/$1",
  },
  testRegex: ".*\\.e2e-spec\\.ts$",
  setupFiles: ["<rootDir>/jest-setup.ts"],
};
