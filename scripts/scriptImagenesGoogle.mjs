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
const baseId = 'appnG7eujMmsF6Kxs';

https: if (!apiKey) {
  throw new Error('An API key is required to connect to Airtable');
}

// Configura tu API key y Base ID de Airtable
const base = new Airtable({
  apiKey: apiKey,
}).base(baseId || ''); // Usa una cadena vacía como valor predeterminado si baseId no está definido

async function processImagesFromAirtable(tableAirtable) {
  try {
    // Aseguramos que la función select retorna una promesa correctamente manejada
    await base(tableAirtable)
      .select({ view: 'script' })
      .eachPage(async (records, fetchNextPage) => {
        for (const record of records) {
          const FotoUrl = record.get('FotoUrl');
          // console.log(FotoUrl);

          try {
            // Descomenta y ajusta la siguiente línea si tienes una función para actualizar el registro
            await updateAirtableRecord(record.getId(), FotoUrl, tableAirtable);
          } catch (error) {
            console.error(`Error añadiendo imagen de ${FotoUrl}:`, error);
          }
        }
        fetchNextPage();
      });
  } catch (error) {
    console.error('Error procesando imágenes desde Airtable:', error);
  }
}

async function updateAirtableRecord(recordId, FotoUrl, tableAirtable) {
  try {
    const updatedRecord = await base(tableAirtable).update([
      {
        id: recordId,
        fields: {
          Foto: [
            { url: FotoUrl }, // Especifica la URL dentro de un objeto
          ],
        },
      },
    ]);

    // // console.log(updatedRecord);
  } catch (error) {
    console.error(error);
  }
}

processImagesFromAirtable('Importado');
