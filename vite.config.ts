import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import babel from "vite-plugin-babel";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        babel({
            babelConfig: {
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            targets: "> 0.25%, not dead",
                        },
                    ],
                ],
                plugins: [],
            },
        }),
    ],
    server: {
        host: "::",
        port: 8000,
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
            },
        },
    },
});
