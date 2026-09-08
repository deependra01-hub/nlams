import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const postcss = require("postcss");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const tailwindConfig = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f5f7fb",
          100: "#e6ebf3",
          200: "#c9d3e4",
          300: "#9aaac7",
          400: "#6e84a6",
          500: "#4b6588",
          600: "#2f4b6f",
          700: "#21375a",
          800: "#16283f",
          900: "#0f1d2f",
          950: "#0a1320",
        },
        gov: {
          50: "#eef5ff",
          100: "#d8e8ff",
          200: "#b3d1ff",
          300: "#80b2ff",
          400: "#4f8fff",
          500: "#226be8",
          600: "#1b52b5",
          700: "#163f8e",
          800: "#12326f",
          900: "#0e2757",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 29, 47, 0.06), 0 8px 24px rgba(15, 29, 47, 0.08)",
        panel: "0 1px 1px rgba(15, 29, 47, 0.04), 0 12px 40px rgba(15, 29, 47, 0.10)",
      },
      borderRadius: {
        xl2: "1rem",
        control: "0.75rem",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },
  plugins: [],
};

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const srcDir = path.join(rootDir, "src");

await fs.rm(distDir, { recursive: true, force: true });
await fs.mkdir(distDir, { recursive: true });

await copyHtml(path.join(rootDir, "index.html"), path.join(distDir, "index.html"));
await compileCss(
  path.join(srcDir, "index.css"),
  path.join(distDir, "src", "index.css")
);
await transpileDirectory(srcDir, path.join(distDir, "src"));
await bundleMain(path.join(srcDir, "main.tsx"), path.join(distDir, "src", "main.js"));

async function transpileDirectory(sourceDir, outputDir) {
  await fs.mkdir(outputDir, { recursive: true });
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const outputPath = path.join(outputDir, entry.name);

    if (entry.isDirectory()) {
      await transpileDirectory(sourcePath, outputPath);
      continue;
    }

    if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name) && !entry.name.endsWith(".d.ts")) {
      const sourceText = await fs.readFile(sourcePath, "utf8");
      const result = ts.transpileModule(sourceText, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.ESNext,
          jsx: ts.JsxEmit.ReactJSX,
          importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Remove,
        },
        fileName: sourcePath,
      });
      const jsPath = outputPath.replace(/\.(tsx|ts)$/, ".js");
      const rewritten = rewriteRelativeImports(result.outputText);
      await fs.writeFile(jsPath, rewritten, "utf8");
    }
  }
}

async function copyHtml(sourcePath, outputPath) {
  const html = await fs.readFile(sourcePath, "utf8");
  const compiledHtml = html
    .replaceAll("/src/main.tsx", "/src/main.js")
    .replaceAll("src/main.tsx", "src/main.js");
  await fs.writeFile(outputPath, compiledHtml, "utf8");
}

async function compileCss(sourcePath, outputPath) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  const input = await fs.readFile(sourcePath, "utf8");
  const result = await postcss([tailwindcss(tailwindConfig), autoprefixer()]).process(input, {
    from: sourcePath,
    to: outputPath,
  });
  await fs.writeFile(outputPath, result.css, "utf8");
}

async function bundleMain(entryPoint, outputFile) {
  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await esbuild.build({
    entryPoints: [entryPoint],
    bundle: true,
    format: "esm",
    target: "es2022",
    platform: "browser",
    outfile: outputFile,
    jsx: "automatic",
    loader: {
      ".png": "file",
    },
    assetNames: "assets/[name]-[hash]",
    logLevel: "silent",
  });
}

function rewriteRelativeImports(code) {
  return code.replace(
    /from\s+["'](\.{1,2}\/[^"']+?)["']/g,
    (match, specifier) =>
      hasExtension(specifier) ? match : match.replace(specifier, `${specifier}.js`)
  );
}

function hasExtension(specifier) {
  return /\.[a-zA-Z0-9]+$/.test(specifier);
}
