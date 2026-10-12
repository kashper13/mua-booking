import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [react()],
        test: {
          name: "client",
          environment: "jsdom",
          setupFiles: ["./src/client/test/setup.ts"],
          include: ["src/client/**/*.test.ts", "src/client/**/*.test.tsx"],
        },
      },
      {
        test: {
          name: "worker",
          environment: "node",
          include: ["src/worker/**/*.test.ts"],
        },
      },
    ],
  },
});
