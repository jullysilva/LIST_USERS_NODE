const ejs = require("ejs");
const fs = require("fs-extra");
const path = require("path");

const viewsDir = path.join(__dirname, "views");
const outputDir = path.join(__dirname, "public");

async function renderEJS() {
  try {
    // Limpar a pasta de saída
    await fs.emptyDir(outputDir);

    // Definir dados padrão para renderizar as views
    const data = {
      users: [], // ou fornecer dados mockados
      currentPage: 1,
      totalPages: 1,
      searchQuery: "",
    };

    // Listar todos os arquivos EJS no diretório de views
    const files = await fs.readdir(viewsDir);

    // Renderizar cada arquivo EJS e salvar como HTML
    for (const file of files) {
      if (path.extname(file) === ".ejs") {
        const filePath = path.join(viewsDir, file);
        const html = await ejs.renderFile(filePath, data);
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
