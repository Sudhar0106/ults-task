import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { coverageConfigDefaults } from "vitest/config";


export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setupTest.js",
    coverage: {
      reporter: ["text", "lcov", "html", "json", "json-summary"],
      include: ["src/**/*.{js,ts,jsx,tsx}"],
      exclude: [
        "**/icons/**",
        "src/main.jsx",
        'src/components/ui',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
