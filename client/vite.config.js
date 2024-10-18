import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { visualizer } from "rollup-plugin-visualizer";
// import analyzer from "rollup-plugin-analyzer"; // Import the analyzer

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // visualizer({ open: true, template: "raw-data" }), // This will open the analysis in your browser automatically
    // analyzer({ summaryOnly: true }),
  ],
  define: {
    "process.env.NODE_ENV": '"production"', // Set environment variable for production
  },
  build: {
    mode: "production",
    // sourcemap: false, // Disable source maps in production (set to true only if needed)
    // minify: 'terser', // Specify minifier (Terser is used by default)
  },
});
