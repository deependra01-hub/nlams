import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
const postcss = require("postcss");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const tailwindConfig = require("../tailwind.config.cjs");

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const srcDir = path.join(rootDir, "src");

await fs.rm(distDir, { recursive: true, force: true });
await fs.mkdir(distDir, { recursive: true });

await copyHtml(path.join(rootDir, "index.html"), path.join(distDir, "index.html"));
await compileCss(
  path.join(srcDir, "styles", "globals.css"),
  path.join(distDir, "src", "styles", "globals.css")
);
await transpileDirectory(srcDir, path.join(distDir, "src"));

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
