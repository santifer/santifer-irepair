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
console.log('AIRTABLE_API_KEY:', process.env.AIRTABLE_API_KEY);
console.log('AIRTABLE_BASE_ID:', process.env.AIRTABLE_BASE_ID);

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

// Configura tu API key y Base ID de Airtable
const base = new Airtable({
  apiKey: apiKey,
}).base(baseId || ''); // Use an empty string as the default value if baseId is undefined

// Agrega aquí las funciones auxiliares como 'ensureDirectoryExistence' y 'composeImage' de los fragmentos anteriores

// Mapea el tipo de dispositivo a los valores esperados por 'composeImage'
const tipoMap = {
  Teléfono: 'm',
  Tablet: 't',
  SmartWatch: 's',
};

// Función para procesar las entradas de la vista de Airtable
async function processImagesFromAirtable() {
  // // console.log('Llamando a Airtable imágenes...');
  base('Modelos')
    .select({
      view: 'scriptGenerarImagenes',
    })
    .eachPage(
      async (records, fetchNextPage) => {
        for (const record of records) {
          const imageUrl = record.get('ImageUploaded')[0].url;
          const modelSlugPrevio = record.get('slugPrevio');
          const tipo = record.get('Tipo');
          const mappedTipo = tipoMap[tipo];
          // // console.log('Procesando:', imageUrl, modelSlugPrevio, mappedTipo);
          if (imageUrl && modelSlugPrevio && mappedTipo) {
            try {
              // Descargar la imagen
              const response = await axios({
                url: imageUrl,
                responseType: 'arraybuffer',
              });
              const imageBuffer = response.data;
              const imageExtension = response.headers['content-type']
                .split('/')
                .pop();
              const imageName = `${modelSlugPrevio}.${imageExtension}`;
              const imagePath = path.join('../temp/', imageName);

              // Guardar la imagen descargada
              fs.writeFileSync(imagePath, imageBuffer);

              // Llamar a composeImage
              // // console.log(`Procesando ${modelSlugPrevio}...`);
              await composeImage(imageName, mappedTipo);

              // Actualizar el campo 'slugImagenGenerada' en Airtable
              const slugImagenGenerada = modelSlugPrevio; // Asumiendo que composeImage crea una carpeta con este nombre
              // await base('appV57NBAjDCCKjTG').update(record.getId(), {
              //   slugImagenGenerada: slugImagenGenerada,
              // });
              updateAirtableRecord(record.getId(), slugImagenGenerada);
            } catch (error) {
              console.error(`Error processing ${modelSlugPrevio}:`, error);
            }
          }
        }
        // // console.log('Página procesada.');
        fetchNextPage();
      },
      (err) => {
        if (err) {
          console.error('Error retrieving records from Airtable:', err);
        }
      }
    );
}

async function updateAirtableRecord(recordId, slugImagenGenerada) {
  try {
    const updatedRecord = await base('Modelos').update([
      {
        id: recordId,
        fields: {
          slugImagenGenerada: slugImagenGenerada,
        },
      },
    ]);

    // // console.log(updatedRecord);
  } catch (error) {
    console.error(error);
  }
}

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

// Función para componer las imágenes
async function composeImage(baseImageName, type) {
  // Definir las rutas base para cada tipo
  const basePaths = {
    t: 'plantillas/t/',
    m: 'plantillas/m/',
    s: 'plantillas/s/',
  };

  // Quitar la extensión del archivo para el nombre del directorio de salida
  const baseImageNameWithoutExt = path.parse(baseImageName).name;

  // Definir la ruta base de la imagen1
  const image1Path = `../temp/${baseImageName}`;

  // Leer las dimensiones de la imagen base
  const metadata = await sharp(image1Path).metadata();

  // Calcular la posición left para que el centro de la imagen esté en x=96
  const left = 96 - metadata.width / 2;
  // Calcular la posición top para centrar la imagen verticalmente
  const top = (256 - metadata.height) / 2;

  // Leer los archivos del directorio correspondiente al tipo
  const overlayImages = fs
    .readdirSync(basePaths[type])
    .filter((file) => path.extname(file).toLowerCase() === '.png');

  // Iterar a través de cada archivo de imagen de overlay
  for (const overlayImage of overlayImages) {
    // comment
    const image2Path = path.join(basePaths[type], overlayImage);
    // Construir la ruta de salida
    const outputDirectory = `../public/${type}/${baseImageNameWithoutExt}`;
    const outputFilename = `cambiar-${overlayImage.replace(
      '.png',
      ''
    )}-${baseImageNameWithoutExt}.webp`;
    const outputPath = path.join(outputDirectory, outputFilename);

    // Asegurarse de que el directorio de salida existe
    ensureDirectoryExistence(outputPath);

    // Crear la imagen base y componer las imágenes
    try {
      await sharp({
        create: {
          width: 384,
          height: 256,
          channels: 4,
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        },
      })
        .png()
        .composite([
          {
            input: image2Path,
          },
          {
            input: image1Path,
            top: Math.round(top),
            left: Math.round(left),
          },
        ])
        .webp()
        .toFile(outputPath);

      // // console.log(`Imagen compuesta creada: ${outputPath}`);
    } catch (err) {
      console.error('Error al crear la imagen compuesta:', err);
    }
  }
  // Crear un lienzo en blanco y superponer la imagen base en el centro
  const finalOutputPath = path.join(
    `../public/${type}/${baseImageNameWithoutExt}`,
    `reparar-${baseImageNameWithoutExt}.webp`
  );
  try {
    await sharp({
      create: {
        width: 256,
        height: 256,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      },
    })
      .png()
      .composite([
        {
          input: image1Path,
          gravity: 'center',
        },
      ])
      .webp()
      .toFile(finalOutputPath);

    // // console.log(`Imagen final centralizada creada: ${finalOutputPath}`);
  } catch (err) {
    console.error('Error al crear la imagen final centralizada:', err);
  }

  // Eliminar la imagen original en ./temp
  try {
    fs.unlinkSync(image1Path);
    // // console.log(`Imagen original eliminada: ${image1Path}`);
  } catch (err) {
    console.error('Error al eliminar la imagen original:', err);
  }
}

processImagesFromAirtable();
