import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
	preset: '@vue/cli-plugin-unit-jest',
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  testMatch: ["**/src/**/*.tests.ts"],
};
export default config;