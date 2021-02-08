module.exports = {
    testEnvironment: "jest-environment-jsdom",
    transform: {},
    setupFiles: ["<rootDir>/dist/esm/fukurowc-bundle.mjs"],
    setupFilesAfterEnv: ["<rootDir>/__tests__/helpers/setupJest.js"],
    modulePathIgnorePatterns: ["<rootDir>/__tests__/helpers"],
    snapshotResolver: "<rootDir>/__tests__/helpers/snapshotResolver.js"
}