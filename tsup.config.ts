import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "safeawait": "src/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  minify: true,
  sourcemap: false,
  target: "esnext",
  treeshake: true,
  clean: true,
  outDir: "dist",
  splitting: false,
});