const esbuild = require("esbuild");
const JavaScriptObfuscator = require("javascript-obfuscator");
const fs = require("fs");
const path = require("path");

async function buildAndObfuscate() {
  try {
    console.log("🔨 Building with esbuild...");

    // First, build with esbuild
    await esbuild.build({
      logLevel: "info",
      entryPoints: ["src/index.ts"],
      bundle: true,
      outfile: "dist/index-temp.js",
      sourcemap: false, // Disable sourcemap for obfuscated version
      minify: true,
      packages: "external",
      platform: "browser",
      target: "es6",
      tsconfig: "tsconfig.json",
    });

    console.log("🔒 Obfuscating code...");

    // Read the built file
    const code = fs.readFileSync("dist/index-temp.js", "utf8");

    // Obfuscate the code
    const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 1,
      numbersToExpressions: true,
      simplify: true,
      stringArrayShuffle: true,
      splitStrings: true,
      stringArray: true,
      stringArrayThreshold: 1,
      transformObjectKeys: true,
      unicodeEscapeSequence: false,
      identifierNamesGenerator: "hexadecimal",
      renameGlobals: false,
      selfDefending: true,
      debugProtection: false, // Can cause issues in some environments
      debugProtectionInterval: 0,
      disableConsoleOutput: false,
    });

    // Write the obfuscated code
    fs.writeFileSync("dist/index.js", obfuscationResult.getObfuscatedCode());

    // Remove temporary file
    fs.unlinkSync("dist/index-temp.js");

    console.log("✅ Build and obfuscation completed!");
    console.log("📁 Output: dist/index.js");

    // Display file size
    const stats = fs.statSync("dist/index.js");
    console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)}KB`);
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

buildAndObfuscate();
