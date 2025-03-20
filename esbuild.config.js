const esbuild = require("esbuild");

esbuild
  .build({
    logLevel: "info",
    entryPoints: ["src/index.ts"],
    bundle: true,
    outfile: "dist/index.js",
    sourcemap: true,
    minify: true,
    packages: "external",
    platform: "browser",
    target: "es6",
    tsconfig: "tsconfig.json",
  })
  .catch(() => process.exit(1));
