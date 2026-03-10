import Airtable from 'airtable';
import 'dotenv/config';
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

import type { ITipos, IMarcas, ITipoReparaciones, IMarcaReparaciones, IModelos, IFamilias, IDetails, IReparaciones, IFamiliaReparaciones, Reseña, CasoExito } from './schema'
import { ITiposFields, mapTiposFields, IMarcasFields, IMarcaReparacionesFields, mapMarcasFields, ITipoReparacionesFields, mapTipoReparacionesFields, mapMarcaReparacionesFields, IModelosFields, mapModelosFields, IFamiliasFields, mapFamiliasFields, mapDetailsFields, mapReparacionesFields, IReparacionesFields, IFamiliaReparacionesFields, mapFamiliaReparacionesFields, mapDetailsRemotoFields, mapReseñaFields  } from './schema';
import { ensureCachesLoaded, getCachedReseñas } from './reseñasCache';
import { ensureCachesCasosExitoLoaded, getCachedCasosExito } from './casosExitoCache';


// Configura tu API key y Base ID de Airtable
const base = new Airtable({
  apiKey:
    apiKey,
}).base(baseId || ''); // Use an empty string as the default value if baseId is undefined

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

export async function getRecordsTipos(version: string = ''): Promise<ITipos[]> {
    const baseName = version === 'local' ? 'Tipo (Local)' : 'Tipo';
    const selectOptions = {
        view: 'CMSAstro',
        fields: ITiposFields
    };

    const fetchOperation = () => new Promise<ITipos[]>((resolve, reject) => {
        const allRecords: ITipos[] = [];
        base(baseName)
            .select(selectOptions)
            .eachPage(
                (records, fetchNextPage) => {
                    records.forEach((record) => {
                        const fields = record.fields;
                        allRecords.push(mapTiposFields(fields));
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
        return await retryWithBackoff(fetchOperation);  // Usa la función de reintento
    } catch (error) {
        console.error('Failed to fetch records for Tipos with retries:', error);
        throw error;  // Lanza el error si los reintentos fallan
    }
}


export async function getRecordsTipoReparaciones(version: string = ''): Promise<ITipoReparaciones[]> {
  const baseName = version === 'local' ? 'Tipo: Reparaciones (Local)' : 'Tipo: Reparaciones';
  const selectOptions = {
    view: 'CMSAstro',
    fields: ITipoReparacionesFields
  };

  const fetchOperation = () => new Promise<ITipoReparaciones[]>((resolve, reject) => {
    const allRecords: ITipoReparaciones[] = [];
    base(baseName)
      .select(selectOptions)
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach(record => {
            const fields = record.fields;
            allRecords.push(mapTipoReparacionesFields(fields));
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
    return await retryWithBackoff(fetchOperation);
  } catch (error) {
    console.error('Failed to fetch records for TipoReparaciones with retries:', error);
    throw error;
  }
}

export async function getRecordsMarcas(modoApple: boolean = false, version: string = ''): Promise<IMarcas[]> {
  const viewName = modoApple ? 'CMSAstro(Apple)' : 'CMSAstro'; // Determina la vista basada en modoApple
  const baseName = version === 'local' ? 'Tipo: Marca (Local)' : 'Tipo: Marca';

  const fetchOperation = () => new Promise<IMarcas[]>((resolve, reject) => {
    const allRecords: IMarcas[] = [];
    base(baseName)
      .select({
        view: viewName,
        fields: IMarcasFields
      })
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach((record) => {
            const fields = record.fields;
            allRecords.push(mapMarcasFields(fields));
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
    return await retryWithBackoff(fetchOperation);
  } catch (error) {
    console.error(`Failed to fetch records for marcas with retries:`, error);
    throw error;
  }
}

export async function getRecordsMarcaReparaciones(modoApple: boolean = false, version: string = ''): Promise<IMarcaReparaciones[]> {
  const viewName = modoApple ? 'CMSAstro(Apple)' : 'CMSAstro'; // Determina la vista basada en modoApple
  const baseName = version === 'local' ? 'Tipo y marca: Reparaciones (Local)' : 'Tipo y marca: Reparaciones';

  const fetchOperation = () => new Promise<IMarcaReparaciones[]>((resolve, reject) => {
    const allRecords: IMarcaReparaciones[] = [];
    base(baseName)
      .select({
        view: viewName,
        fields: IMarcaReparacionesFields
      })
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach((record) => {
            const fields = record.fields;
            allRecords.push(mapMarcaReparacionesFields(fields));
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
    return await retryWithBackoff(fetchOperation);
  } catch (error) {
    console.error(`Failed to fetch records for Marca Reparaciones with retries:`, error);
    throw error;
  }
}

export async function getRecordsFamilias(modoApple: boolean = false): Promise<IFamilias[]> {
  const viewName = modoApple ? 'CMSAstro(Apple)' : 'CMSAstro';  // Determina la vista basada en modoApple

  const fetchOperation = () => new Promise<IFamilias[]>((resolve, reject) => {
    const allRecords: IFamilias[] = [];
    base('Marca: Familia')
      .select({
        view: viewName,
        fields: IFamiliasFields
      })
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach((record) => {
            const fields = record.fields;
            allRecords.push(mapFamiliasFields(fields));  // Mapeo de campos
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
    return await retryWithBackoff(fetchOperation);
  } catch (error) {
    console.error(`Failed to fetch records for Familias with retries:`, error);
    throw error;
  }
}

export async function getRecordsModelos(modoApple: boolean = false, modoFamilia: boolean = false): Promise<IModelos[]> {
  const viewName = modoFamilia ? 'CMSAstro(Familias)' : modoApple ? 'CMSAstro(Apple)' : 'CMSAstro';  // Determina la vista basada en modoApple o modoFamilia

  const fetchOperation = () => new Promise<IModelos[]>((resolve, reject) => {
    const allRecords: IModelos[] = [];
    base('Modelos')
      .select({
        view: viewName,
        fields: IModelosFields,
        sort: [{ field: 'fechaAstro', direction: 'desc' }]
      })
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach((record) => {
            const fields = record.fields;
            allRecords.push(mapModelosFields(fields));  // Mapeo de campos
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
    return await retryWithBackoff(fetchOperation);
  } catch (error) {
    console.error(`Failed to fetch records for Modelos with retries:`, error);
    throw error;
  }
}

export async function getRecordsReparaciones(modoApple: boolean = false): Promise<IReparaciones[]> {
  const viewName = modoApple ? 'CMSAstro(Apple)' : 'CMSAstro';  // Determina la vista basada en modoApple

  const fetchOperation = () => new Promise<IReparaciones[]>((resolve, reject) => {
    const allRecords: IReparaciones[] = [];
    base('Reparaciones')
      .select({
        view: viewName,
        fields: IReparacionesFields,
        sort: [{ field: 'fechaAstro', direction: 'desc' }]
      })
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach((record) => {
            const fields = record.fields;
            allRecords.push(mapReparacionesFields(fields));  // Mapeo de campos
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
    return await retryWithBackoff(fetchOperation);
  } catch (error) {
    console.error(`Failed to fetch records for Reparaciones with retries:`, error);
    throw error;
  }
}

async function fetchRecordById(recordId: string, baseName: string, mapFunction: (fields: any) => IDetails): Promise<IDetails> {
  return new Promise((resolve, reject) => {
    const table = base(baseName);
    table.find(recordId, (err, record) => {
      if (err || !record) {
        console.error('Error fetching record:', err);
        reject(err);
      } else {
        resolve(mapFunction(record.fields));
      }
    });
  });
}

export async function getRecordDetailById(recordId: string, baseName: string): Promise<IDetails> {
  const fetchOperation = () => fetchRecordById(recordId, baseName, mapDetailsFields);
  try {
    return await retryWithBackoff(fetchOperation);
  } catch (error) {
    console.error(`Failed to fetch record detail by ID with retries: ${recordId}`, error);
    throw error;
  }
}


export async function getRecordDetailByIdRemoto(recordId: string, baseName: string): Promise<IDetails> {
  const fetchOperation = () => fetchRecordById(recordId, baseName, mapDetailsRemotoFields);
  try {
    return await retryWithBackoff(fetchOperation);
  } catch (error) {
    console.error(`Failed to fetch remote record detail by ID with retries: ${recordId}`, error);
    throw error;
  }
}

// export async function getReseñas(recordId: string, baseName: string): Promise<Reseña> {
//   const fetchOperation = () => fetchReseñaById(recordId, baseName);  // Usa directamente fetchReseñaById sin mapFunction adicional.
//   try {
//     return await retryWithBackoff(fetchOperation);
//   } catch (error) {
//     console.error(`Failed to fetch reseña by ID with retries: ${recordId}`, error);
//     throw error;
//   }
// }


// async function fetchReseñaById(recordId: string, baseName: string): Promise<Reseña> {
//   return new Promise((resolve, reject) => {
//     const table = base(baseName);
//     table.find(recordId, (err, record) => {
//       if (err || !record) {
//         console.error('Error fetching reseña record:', err);
//         reject(err);
//       } else {
//         resolve(mapReseñaFields(record.fields));  // Asegúrate de que mapReseñaFields está correctamente definido y usado.
//       }
//     });
//   });
// }

export async function getCasosExito(recordId: string, cacheKey: string): Promise<CasoExito> {
  try {
    // Obtener la caché utilizando la clave proporcionada
    const cachedCasosExito = await getCachedCasosExito(cacheKey);
    // // console.log('Reseñas cargadas en getReseñas', cachedReseñas);
    // Buscar la reseña específica por ID en la caché
    const casoExito = cachedCasosExito.find((r: { id: string; }) => r.id === recordId);
    
    if (casoExito) {
      return casoExito;
    } else {
      throw new Error(`Caso de éxito with ID ${recordId} not found in cache.`);
    }
  } catch (error) {
    throw error; 
  }
}


export async function getReseñas(recordId: string, cacheKey: string): Promise<Reseña> {
  try {
    // Obtener la caché utilizando la clave proporcionada
    const cachedReseñas = await getCachedReseñas(cacheKey);
    // // console.log('Reseñas cargadas en getReseñas', cachedReseñas);
    // Buscar la reseña específica por ID en la caché
    const reseña = cachedReseñas.find((r: { id: string; }) => r.id === recordId);
    
    if (reseña) {
      return reseña;
    } else {
      throw new Error(`Reseña with ID ${recordId} not found in cache.`);
    }
  } catch (error) {
    // console.error('Error fetching reseña from cache:', error);
    throw error;  // Manejo de errores si la reseña no se encuentra o si la caché aún no está cargada
  }
}

export async function getReseñasHome(baseName: string, viewName: string): Promise<Reseña[]> {
  const fetchOperation = () => {
    return new Promise<Reseña[]>((resolve, reject) => {
      const table = base(baseName);
      const allReseñas: Reseña[] = [];

      table.select({
        view: viewName,
        maxRecords: 5
      }).eachPage((records, fetchNextPage) => {
        records.forEach(record => {
          try {
            allReseñas.push(mapReseñaFields(record.fields));
          } catch (error) {
            console.error('Error mapping reseña fields:', error);
          }
        });
        fetchNextPage();
      }, (err) => {
        if (err) {
          console.error('Error fetching reseñas from view:', err);
          reject(err);
        } else {
          resolve(allReseñas);
        }
      });
    });
  };

  try {
    return await retryWithBackoff(fetchOperation);
  } catch (error) {
    console.error(`Failed to fetch reseñas from view ${viewName} with retries:`, error);
    throw error;
  }
}




export async function getRecordsFamiliaReparaciones(modoApple: boolean = false): Promise<IFamiliaReparaciones[]> {
  const viewName = modoApple ? 'CMSAstro' : 'CMSAstro';  // La vista no cambia basada en modoApple

  const fetchOperation = () => new Promise<IFamiliaReparaciones[]>((resolve, reject) => {
    const allRecords: IFamiliaReparaciones[] = [];
    base('Familia: Reparaciones')
      .select({
        view: viewName,
        fields: IFamiliaReparacionesFields
      })
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach((record) => {
            const fields = record.fields;
            allRecords.push(mapFamiliaReparacionesFields(fields));  // Mapeo de campos
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
    return await retryWithBackoff(fetchOperation);
  } catch (error) {
    console.error(`Failed to fetch records for Familia Reparaciones with retries:`, error);
    throw error;
  }
}


export async function loadDetails(ids: string[], baseDetails: string): Promise<IDetails[]> {
  if (!ids || ids.length === 0) {
    return [];
  }
  
  try {
    return await Promise.all(
      ids.map(id => getRecordDetailById(id, baseDetails))
    );
  } catch (error) {
    console.error('Error loading details for', baseDetails, ':', error);
    return [];
  }
}
