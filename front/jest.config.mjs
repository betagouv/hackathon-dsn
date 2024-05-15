import nextJest from "next/jest.js";

const createJestConfig = nextJest();

const config = {
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
};

export default createJestConfig(config);
