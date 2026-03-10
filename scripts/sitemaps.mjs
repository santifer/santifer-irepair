import Airtable from 'airtable';
import sharp from 'sharp';
import fs from 'fs/promises'; // <-- Importa fs/promises para usar las funciones basadas en promesas
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

async function generateSitemapsFromAirtable() {
  try {
    const processPage = async (records, fetchNextPage) => {
      for (const record of records) {
        const sitemapIndex = record.get('sitemapINDEX');
        const sitemapUrl = record.get('sitemapURL');
        const sitemapImages = record.get('sitemapIMG');

        const baseDir = path.join(__dirname, '../public');
        // Asegúrate de que el directorio exista, utilizando promesas
        await fs.mkdir(baseDir, { recursive: true });

        // Escribir archivos de forma asíncrona, también utilizando promesas
        await fs.writeFile(
          path.join(baseDir, 'sitemap-index.xml'),
          sitemapIndex
        );
        await fs.writeFile(path.join(baseDir, 'sitemap-0.xml'), sitemapUrl);
        await fs.writeFile(
          path.join(baseDir, 'sitemap-images.xml'),
          sitemapImages
        );
      }
      fetchNextPage();
    };

    base('Sitemap')
      .select({ view: 'Sitemap' })
      .eachPage(processPage, (err) => {
        if (err) throw err;
      });
  } catch (error) {
    console.error('Error generando sitemaps desde Airtable:', error);
  }
}

generateSitemapsFromAirtable();
