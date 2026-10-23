import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    testMatch: "**/*.spec.ts",
    webServer: {
        command: "npm run dev",
        port: 5173,
        reuseExistingServer: !process.env.CI,
    },
    fullyParallel: true,
    outputDir: "playwright-report",
    timeout: 4 * 60 * 1000, // 4 minutes
    workers: 10,
    reporter: "list",
    use: {
        baseURL: "http://localhost:5173",
        actionTimeout: 10_000,
    },

    // For expect calls
    expect: {
        timeout: 10_000,
    },
};

export default config;
