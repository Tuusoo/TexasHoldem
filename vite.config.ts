import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: "::",
        port: 8000,
        proxy: {
            "/login": {
                target: "http://localhost:3000",
                changeOrigin: true,
            },
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
            },
        },
    },
});
