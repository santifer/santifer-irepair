import Airtable from 'airtable';
import 'dotenv/config';
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

import type {  CasoExito } from './schema'
import {  CasoExitoFields, mapCasoExitoFields  } from './schema';

// Configura tu API key y Base ID de Airtable
const base = new Airtable({
  apiKey:
    apiKey,
}).base(baseId || ''); // Use an empty string as the default value if baseId is undefined

let caches: { [key: string]: CasoExito[] | undefined } = {};

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryWithBackoff<T>(operation: () => Promise<T>, retries: number = 5, delayTime: number = 500): Promise<T> {
    try {
        const result = await operation();  // Intenta ejecutar la operación
        return result;
    } catch (error: any) {
        if (retries > 0 && (error.statusCode === 502 || error.statusCode === 503)) {
            // console.log(`Retrying... ${retries} retries left. Waiting ${delayTime}ms. Error: ${error.statusCode}`);
            await delay(delayTime);
            return retryWithBackoff(operation, retries - 1, delayTime * 2);  // Reintenta con más tiempo de espera
        } else {
            console.error(`Operation failed after retries. Error: ${error.message}`);
            throw error;  // Si no quedan reintentos o el error no es retriable, lanza el error
        }
    }
}


async function loadCasosExito(baseReseñas: string, cacheKey: string): Promise<void> {
  if (caches[cacheKey]) {
    // // console.log('Caché ya cargada')
    return
  }; // Si ya está cargada, no hacer nada
  // console.log('Generando caché...')
  const viewName = 'CMSAstro';
  const fetchOperation = () => new Promise<CasoExito[]>((resolve, reject) => {
    const allRecords: CasoExito[] = [];
    base(baseReseñas)
      .select({ view: viewName, fields: CasoExitoFields })
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach(record => {
            allRecords.push(mapCasoExitoFields(record.fields));
          });
          fetchNextPage();
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(allRecords);
          }
        }
      );
  });

  try {
    caches[cacheKey] = await retryWithBackoff(fetchOperation);
  } catch (error) {
    console.error(`Failed to fetch records for ${cacheKey} with retries:`, error);
    throw error;
  }
}

// Exportar funciones para cargar y obtener datos de caché
export async function getCachedCasosExito(cacheKey: string): Promise<CasoExito[]> {
  if (!caches[cacheKey]) {
    throw new Error("Reseñas are not loaded yet for " + cacheKey);
  }
  return caches[cacheKey]!;
}

// Cargar diferentes cachés como sea necesario
export async function ensureCachesCasosExitoLoaded(): Promise<void> {
  // console.log('Ensuring caches are loaded...');
  await Promise.all([
    loadCasosExito('Casos de éxito', 'casosExito'),
  ]);
  // console.log('All caches are loaded.');
  // console.log('Casos de éxito cargados', caches['casosExito']?.length);
}

// Carga inicial
ensureCachesCasosExitoLoaded().catch(console.error);