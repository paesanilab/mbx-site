import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { contentPlugin } from "./tooling/content-plugin";

export default defineConfig({
    base: process.env.BASE_PATH ?? "/",
    plugins: [react(), contentPlugin()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "."),
        },
    },
    server: {
        watch: {
            usePolling: true,
            interval: 1000,
        },
    },
});
