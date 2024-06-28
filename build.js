const ejs = require("ejs");
const fs = require("fs-extra");
const path = require("path");

const viewsDir = path.join(__dirname, "views");
const outputDir = path.join(__dirname, "public");

async function renderEJS() {
  try {
    await fs.emptyDir(outputDir);

    const files = await fs.readdir(viewsDir);

    for (const file of files) {
      if (path.extname(file) === ".ejs") {
        const filePath = path.join(viewsDir, file);
        const html = await ejs.renderFile(filePath, {});
        const outputFilePath = path.join(
          outputDir,
          path.basename(file, ".ejs") + ".html"
        );
        await fs.outputFile(outputFilePath, html);
      }
    }
    console.log("Build concluído com sucesso.");
  } catch (error) {
    console.error("Erro durante o build:", error);
  }
}

renderEJS();
