import Airtable from 'airtable';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno desde el archivo .env en el directorio raíz del proyecto
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Imprimir variables de entorno para depuración
// // console.log('AIRTABLE_API_KEY:', process.env.AIRTABLE_API_KEY);
// // console.log('AIRTABLE_BASE_ID:', process.env.AIRTABLE_BASE_ID);

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

if (!apiKey) {
  throw new Error('An API key is required to connect to Airtable');
}

// Configura tu API key y Base ID de Airtable
const base = new Airtable({
  apiKey: apiKey,
}).base(baseId || ''); // Usa una cadena vacía como valor predeterminado si baseId no está definido

// Verificar y crear el directorio temp si no existe
const tempDir = path.join(__dirname, '../temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

async function processImagesFromAirtable(baseAirtable, ruta) {
  const ruta2 = ruta;
  base(baseAirtable)
    .select({
      view: 'ScriptImagenesBackground',
    })
    .eachPage(async (records, fetchNextPage) => {
      for (const record of records) {
        const imageUrl = record.get('imagesUploadedBig')[0].url;
        const slug = record.get('slugBg');

        if (imageUrl && slug) {
          try {
            const response = await axios({
              url: imageUrl,
              responseType: 'arraybuffer',
            });
            const imageBuffer = response.data;
            const imageExtension = response.headers['content-type']
              .split('/')
              .pop();
            const imageName = `${slug}.${imageExtension}`;
            const imagePath = path.join(tempDir, imageName);

            fs.writeFileSync(imagePath, imageBuffer);

            // Llamar a la función composeImage con el nombre del archivo
            const newImageUrl = await composeImage(imageName, ruta2);
            // // console.log('New Image URL:', newImageUrl);

            // Actualizar el registro en Airtable con la URL de la nueva imagen
            updateAirtableRecord(record.getId(), newImageUrl, baseAirtable);
          } catch (error) {
            console.error(`Error processing image for slug ${slug}:`, error);
          }
        }
      }
      fetchNextPage();
    });
}

async function updateAirtableRecord(
  recordId,
  slugImagenBackground,
  baseAirtable
) {
  try {
    const updatedRecord = await base(baseAirtable).update([
      {
        id: recordId,
        fields: {
          slugImagenBackground: slugImagenBackground,
        },
      },
    ]);

    // // console.log(updatedRecord);
  } catch (error) {
    console.error(error);
  }
}

async function composeImage(imageName, ruta) {
  try {
    const imagePath = path.join(tempDir, imageName);
    const outputDir = path.join(__dirname, `../public/bg/${ruta}`);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputImagePath = path.join(
      outputDir,
      `${path.parse(imageName).name}.webp`
    );

    const image = sharp(imagePath);
    const metadata = await image.metadata();

    // Crear una superposición blanca semitransparente
    const whiteOverlay = {
      create: {
        width: metadata.width,
        height: metadata.height,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 0.8 },
      },
    };

    // Componer la imagen con la superposición blanca
    await image
      .composite([{ input: whiteOverlay, blend: 'over' }])
      .toFormat('webp', { quality: 95 })
      .toFile(outputImagePath);

    // console.log('Output image path:', outputImagePath);
    // console.log('Image metadata:', metadata);

    return `/bg/${ruta}/${path.parse(imageName).name}.webp`;
  } catch (error) {
    console.error('Error in composeImage:', error);
    return null;
  }
}

// processImagesFromAirtable('Tipo', 't');
processImagesFromAirtable('Tipo: Marca', 'm');
// processImagesFromAirtable('Tipo: Reparaciones', 'tr');
// processImagesFromAirtable('Marca: Familia', 'f');
// processImagesFromAirtable('Tipo y marca: Reparaciones', 'mr');
// processImagesFromAirtable('Modelos', 'md');
