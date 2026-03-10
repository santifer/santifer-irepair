const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Mapa de tipos a directorios
const basePaths = {
  t: 'plantillas/t/',
  m: 'plantillas/m/',
  s: 'plantillas/s/',
};
const typeMap = {
  t: 'tablet',
  m: 'movil',
  s: 'smartwatch',
};

async function processImages() {
  // Recorrer cada tipo y su directorio correspondiente
  for (const [type, dir] of Object.entries(basePaths)) {
    const fullDirPath = path.join(__dirname, dir);
    const files = fs.readdirSync(fullDirPath);

    for (const file of files) {
      const filePath = path.join(fullDirPath, file);
      const outputDir = `../public/rt/${type}/`;
      const outputFilename = `reparar-${file.replace('.png', '')}-${
        typeMap[type]
      }.webp`;
      const outputPath = path.join(outputDir, outputFilename);

      // Asegurarse de que exista el directorio de salida
      ensureDirectoryExistence(outputPath);

      // Modificar la imagen con Sharp y guardarla
      await modifyAndSaveImage(filePath, outputPath);
    }
  }
}

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
  }
}

async function modifyAndSaveImage(inputPath, outputPath) {
  try {
    // Cargar la imagen, extraer la mitad derecha y centrarla en un lienzo de 256x256
    await sharp(inputPath)
      .extract({ left: 192, top: 0, width: 192, height: 256 }) // Extraer la mitad derecha
      .resize(256, 256, {
        background: { r: 255, g: 255, b: 255, alpha: 1 }, // Fondo blanco, cambiar si necesario
        fit: 'contain', // Centrar la imagen extraída en el lienzo cuadrado
        position: 'center',
      })
      .toFormat('webp')
      .toFile(outputPath);

    // // console.log(`Imagen procesada y guardada en ${outputPath}`);
  } catch (error) {
    console.error(`Error al procesar la imagen de ${inputPath}: ${error}`);
  }
}

processImages();
