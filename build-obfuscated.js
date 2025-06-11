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
      banner: {
        js:
          "/* Built with esbuild and obfuscated | Generated on " +
          new Date().toISOString() +
          " */",
      },
    });

    console.log("🔒 Obfuscating code...");

    // Read the built file
    const code = fs.readFileSync("dist/index-temp.js", "utf8");

    // Obfuscate the code
    const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
      compact: true,
      controlFlowFlattening: false, // ❌ 꺼주세요
      numbersToExpressions: true,
      simplify: true,
      stringArrayShuffle: true,
      splitStrings: false, // ❌ 꺼주세요
      stringArray: true,
      stringArrayThreshold: 0.75,
      transformObjectKeys: false, // ❌ 꺼주세요
      unicodeEscapeSequence: false,
      identifierNamesGenerator: "hexadecimal",
      renameGlobals: false,
      selfDefending: false, // ❌ 꺼주세요
      debugProtection: false,
      disableConsoleOutput: false,
    });

    // Write the obfuscated code
    const finalCode = `/*
 * 🚀 SDK Build Information
 * Version: ${require("./package.json").version || "unknown"}
 * Environment: ${process.env.NODE_ENV || "production"}
 */
${obfuscationResult.getObfuscatedCode()}`;

    fs.writeFileSync("dist/index.js", finalCode);

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
