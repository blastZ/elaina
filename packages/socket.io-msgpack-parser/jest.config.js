const base = require("../../jest.config.js");
const pack = require("./package");

const name = pack.name.slice(8);

module.exports = {
  ...base,
  displayName: name,
  name,
  rootDir: "../..",
  testMatch: [`<rootDir>/packages/${name}/**/*.spec.ts`],
};
