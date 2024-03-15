/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testMatch: ["**/**/*.test.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest"],
  },
};
