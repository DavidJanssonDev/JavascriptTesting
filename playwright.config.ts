import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir:"./tests/e2e",
    use: {
        baseURL: "http://127.0.0.1:4173",
        trace: "on-first-retry",

        launchOptions: {
            slowMo: 500
        }
    },
    webServer: {
        command: "node dist/server.js",
        port: 4173,
        reuseExistingServer: !process.env.CI
    }
})