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
      view: 'ScriptFotosCE',
    })
    .eachPage(async (records, fetchNextPage) => {
      for (const record of records) {
        const imageUrlFrontalPrevia = record.get('Frontal PREVIA')[0].url;
        const slugFrontalPrevia = record.get('slugFrontalPrevioFx');
        const imageUrlFrontalReparado = record.get('Frontal REPARADO')[0].url;
        const slugFrontalReparado = record.get('slugFrontalReparadoFx');
        const imageUrlTraseraPrevia = record.get('Trasera PREVIA')[0].url;
        const slugTraseraPrevia = record.get('slugTraseraPrevioFx');
        const imageUrlTraseraReparado = record.get('Trasera REPARADO')[0].url;
        const slugTraseraReparado = record.get('slugTraseraReparadoFx');
        const difFrontalPrevia = record.get('difFrontalPrevia');
        const difFrontalReparado = record.get('difFrontalReparado');

        if (imageUrlFrontalPrevia && slugFrontalPrevia) {
          try {
            const response = await axios({
              url: imageUrlFrontalPrevia,
              responseType: 'arraybuffer',
            });
            const imageBuffer = response.data;
            const imageExtension = response.headers['content-type']
              .split('/')
              .pop();
            const imageName = `${slugFrontalPrevia}.${imageExtension}`;
            const imagePath = path.join(tempDir, imageName);

            fs.writeFileSync(imagePath, imageBuffer);

            // Llamar a la función composeImage con el nombre del archivo
            const newImageUrl = await composeImage(
              imageName,
              ruta2,
              difFrontalPrevia
            );
            // console.log('New Image URL:', newImageUrl);

            // Actualizar el registro en Airtable con la URL de la nueva imagen
            updateAirtableRecord(
              record.getId(),
              'slugFrontalPrevio',
              newImageUrl,
              baseAirtable
            );
          } catch (error) {
            console.error(
              `Error processing image for slug ${slugFrontalPrevia}:`,
              error
            );
          }
        }
        if (imageUrlFrontalReparado && slugFrontalReparado) {
          try {
            const response = await axios({
              url: imageUrlFrontalReparado,
              responseType: 'arraybuffer',
            });
            const imageBuffer = response.data;
            const imageExtension = response.headers['content-type']
              .split('/')
              .pop();
            const imageName = `${slugFrontalReparado}.${imageExtension}`;
            const imagePath = path.join(tempDir, imageName);

            fs.writeFileSync(imagePath, imageBuffer);

            // Llamar a la función composeImage con el nombre del archivo
            const newImageUrl = await composeImage(
              imageName,
              ruta2,
              difFrontalReparado
            );
            // console.log('New Image URL:', newImageUrl);

            // Actualizar el registro en Airtable con la URL de la nueva imagen
            updateAirtableRecord(
              record.getId(),
              'slugFrontalReparado',
              newImageUrl,
              baseAirtable
            );
          } catch (error) {
            console.error(
              `Error processing image for slug ${slugFrontalReparado}:`,
              error
            );
          }
        }
        if (imageUrlTraseraPrevia && slugTraseraPrevia) {
          try {
            const response = await axios({
              url: imageUrlTraseraPrevia,
              responseType: 'arraybuffer',
            });
            const imageBuffer = response.data;
            const imageExtension = response.headers['content-type']
              .split('/')
              .pop();
            const imageName = `${slugTraseraPrevia}.${imageExtension}`;
            const imagePath = path.join(tempDir, imageName);

            fs.writeFileSync(imagePath, imageBuffer);

            // Llamar a la función composeImage con el nombre del archivo
            const newImageUrl = await composeImage(imageName, ruta2, false);
            // console.log('New Image URL:', newImageUrl);

            // Actualizar el registro en Airtable con la URL de la nueva imagen
            updateAirtableRecord(
              record.getId(),
              'slugTraseraPrevio',
              newImageUrl,
              baseAirtable
            );
          } catch (error) {
            console.error(
              `Error processing image for slug ${slugTraseraPrevia}:`,
              error
            );
          }
        }
        if (imageUrlTraseraReparado && slugTraseraReparado) {
          try {
            const response = await axios({
              url: imageUrlTraseraReparado,
              responseType: 'arraybuffer',
            });
            const imageBuffer = response.data;
            const imageExtension = response.headers['content-type']
              .split('/')
              .pop();
            const imageName = `${slugTraseraReparado}.${imageExtension}`;
            const imagePath = path.join(tempDir, imageName);

            fs.writeFileSync(imagePath, imageBuffer);

            // Llamar a la función composeImage con el nombre del archivo
            const newImageUrl = await composeImage(imageName, ruta2, false);
            // console.log('New Image URL:', newImageUrl);

            // Actualizar el registro en Airtable con la URL de la nueva imagen
            updateAirtableRecord(
              record.getId(),
              'slugTraseraReparado',
              newImageUrl,
              baseAirtable
            );
          } catch (error) {
            console.error(
              `Error processing image for slug ${slugTraseraReparado}:`,
              error
            );
          }
        }
      }
      fetchNextPage();
    });
}

async function updateAirtableRecord(
  recordId,
  fieldName,
  fieldValue,
  baseAirtable
) {
  try {
    const fieldsToUpdate = {};
    fieldsToUpdate[fieldName] = fieldValue;

    const updatedRecord = await base(baseAirtable).update([
      {
        id: recordId,
        fields: fieldsToUpdate,
      },
    ]);

    // // console.log(updatedRecord);
  } catch (error) {
    console.error(error);
  }
}
async function composeImage(imageName, ruta, difuminar = false) {
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

    let image = sharp(imagePath);
    const metadata = await image.metadata();

    // Redimensionar la imagen a una cuarta parte de la resolución original
    image = image.resize({
      width: Math.floor(metadata.width / 4),
      height: Math.floor(metadata.height / 4),
    });

    // Si difuminar es true, aplicar desenfoque a la imagen
    if (difuminar) {
      image = image.blur(8); // Ajusta el valor para cambiar la cantidad de desenfoque
    }

    // Crear una superposición blanca semitransparente
    const whiteOverlay = {
      create: {
        width: Math.floor(metadata.width / 4),
        height: Math.floor(metadata.height / 4),
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      },
    };

    // Componer la imagen redimensionada con la superposición blanca y guardarla en formato webp comprimido
    await image
      .composite([{ input: whiteOverlay, blend: 'over' }])
      .toFormat('webp', { quality: 85 })
      .toFile(outputImagePath);

    // console.log('Output image path:', outputImagePath);
    // console.log('Image metadata:', metadata);

    return `/bg/${ruta}/${path.parse(imageName).name}.webp`;
  } catch (error) {
    console.error('Error in composeImage:', error);
    return null;
  }
}
processImagesFromAirtable('Casos de éxito', 'ce');
