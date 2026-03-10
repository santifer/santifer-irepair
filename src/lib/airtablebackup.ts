import Airtable from 'airtable';
import 'dotenv/config';
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

import type { ITipos, IMarcas, ITipoReparaciones, IMarcaReparaciones, IModelos, IFamilias, IDetails, IReparaciones, IFamiliaReparaciones } from './schema'
import { ITiposFields, mapTiposFields, IMarcasFields, IMarcaReparacionesFields, mapMarcasFields, ITipoReparacionesFields, mapTipoReparacionesFields, mapMarcaReparacionesFields, IModelosFields, mapModelosFields, IFamiliasFields, mapFamiliasFields, mapDetailsFields, mapReparacionesFields, IReparacionesFields, IFamiliaReparacionesFields, mapFamiliaReparacionesFields, mapDetailsRemotoFields  } from './schema';

// Configura tu API key y Base ID de Airtable
const base = new Airtable({
  apiKey:
    apiKey,
}).base(baseId || ''); // Use an empty string as the default value if baseId is undefined



export async function getRecordsTipos(version: string = ''): Promise<ITipos[]> {
  // // console.log('getRecordsTipos');
  const baseName = version === 'local' ? 'Tipo (Local)' : 'Tipo';
  return new Promise((resolve, reject) => {
    const allRecords: ITipos[] = [];
    base(baseName)
      .select({
        view:'CMSAstro',
        fields: ITiposFields
      })
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach((record) => {
            const fields = record.fields;
            // Dentro de .eachPage callback
            allRecords.push(mapTiposFields(fields));
          });
          fetchNextPage();
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            // // // console.log(`Total de registros rescatados: ${allRecords.length}`);
            // // // console.log(allRecords)
            resolve(allRecords);
          }
        }
      );
  });
}


export async function getRecordsTipoReparaciones(version: string = ''): Promise<ITipoReparaciones[]> {
  // // console.log('getRecordsTipoReparaciones');
  const baseName = version === 'local' ? 'Tipo: Reparaciones (Local)' : 'Tipo: Reparaciones';
  return new Promise((resolve, reject) => {
    const allRecords: ITipoReparaciones[] = [];
    base(baseName)
      .select({
        view:'CMSAstro',
        fields: ITipoReparacionesFields
      })
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach((record) => {
            const fields = record.fields;
            // Dentro de .eachPage callback
            allRecords.push(mapTipoReparacionesFields(fields));
          });
          fetchNextPage();
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            // // // console.log(`Total de registros rescatados: ${allRecords.length}`);
            // // // console.log(allRecords)
            resolve(allRecords);
          }
        }
      );
  });
}

export async function getRecordsMarcas(modoApple: boolean = false, version: string = ''): Promise<IMarcas[]> {
  const viewName = modoApple ? 'CMSAstro(Apple)' : 'CMSAstro'; // Determina la vista basada en modoApple
  const baseName = version === 'local' ? 'Tipo: Marca (Local)' : 'Tipo: Marca';
  // // console.log(`Fetching records for ${modoApple ? 'Apple' : 'all'} marcas`);

  return new Promise((resolve, reject) => {
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
            // // console.log(`Total records fetched: ${allRecords.length}`);
            resolve(allRecords);
          }
        }
      );
  });
}



export async function getRecordsMarcaReparaciones(modoApple: boolean = false, version: string = ''): Promise<IMarcaReparaciones[]> {
  const viewName = modoApple ? 'CMSAstro(Apple)' : 'CMSAstro'; // Determina la vista basada en modoApple
  const baseName = version === 'local' ? 'Tipo y marca: Reparaciones (Local)' : 'Tipo y marca: Reparaciones';
  // // console.log(`Fetching records for ${modoApple ? 'Apple' : 'all'} marcas`);
  // // console.log("HOLA LITA")
  return new Promise((resolve, reject) => {
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
            // // console.log(`Total records fetched: ${allRecords.length}`);
            resolve(allRecords);
          }
        }
      );
  });
}


export async function getRecordsFamilias(modoApple: boolean = false): Promise<IFamilias[]> {
  const viewName = modoApple ? 'CMSAstro(Apple)' : 'CMSAstro';  // Determina la vista basada en modoApple
  // // console.log(`Obteniendo registros para ${modoApple ? 'Apple' : 'todos los'} modelos`);

  return new Promise((resolve, reject) => {
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
            // Dentro del callback .eachPage
            allRecords.push(mapFamiliasFields(fields));
          });
          fetchNextPage();
        },
        (err) => {
          if (err) {
            reject(err);  // Rechaza la promesa si hay un error
          } else {
            // // console.log(`Total de registros rescatados: ${allRecords.length}`);
            resolve(allRecords);  // Resuelve la promesa con los registros obtenidos
          }
        }
      );
  });
}


export async function getRecordsModelos(modoApple: boolean = false, modoFamilia: boolean = false): Promise<IModelos[]> {
  const viewName = modoFamilia ? 'CMSAstro(Familias)' : modoApple ? 'CMSAstro(Apple)' : 'CMSAstro';  // Determina la vista basada en modoApple
  // // console.log(`Obteniendo registros para ${modoApple ? 'Apple' : 'todos los'} modelos`);

  return new Promise((resolve, reject) => {
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
            // Dentro del callback .eachPage
            allRecords.push(mapModelosFields(fields));
          });
          fetchNextPage();
        },
        (err) => {
          if (err) {
            reject(err);  // Rechaza la promesa si hay un error
          } else {
            // // console.log(`Total de registros rescatados: ${allRecords.length}`);
            resolve(allRecords);  // Resuelve la promesa con los registros obtenidos
          }
        }
      );
  });
}

export async function getRecordsReparaciones(modoApple: boolean = false): Promise<IReparaciones[]> {
  const viewName = modoApple ? 'CMSAstro(Apple)' : 'CMSAstro';  // Determina la vista basada en modoApple
  // // console.log(`Obteniendo registros para ${modoApple ? 'Apple' : 'todos los'} modelos`);

  return new Promise((resolve, reject) => {
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
            // Dentro del callback .eachPage
            allRecords.push(mapReparacionesFields(fields));
          });
          fetchNextPage();
        },
        (err) => {
          if (err) {
            reject(err);  // Rechaza la promesa si hay un error
          } else {
            // // console.log(`Total de registros rescatados: ${allRecords.length}`);
            resolve(allRecords);  // Resuelve la promesa con los registros obtenidos
          }
        }
      );
  });
}

export async function getRecordDetailById(recordId: string, baseName: string): Promise<IDetails> {
  // // // console.log(`Fetching marca record for ID: ${recordId}`);

  return new Promise((resolve, reject) => {
    const table = base(baseName);
    table.find(recordId, (err, record) => {
      if (err || !record) {
        console.error('Error fetching marca record:', err);
        reject(err);
      } else {
        // // // console.log(`Record fetched for ID: ${recordId}`);
        // Asumiendo que mapMarcaDetailsFields está correctamente definido
        resolve(mapDetailsFields(record.fields));
      }
    });
  });
}

export async function getRecordDetailByIdRemoto(recordId: string, baseName: string): Promise<IDetails> {
  // // // console.log(`Fetching marca record for ID: ${recordId}`);

  return new Promise((resolve, reject) => {
    const table = base(baseName);
    table.find(recordId, (err, record) => {
      if (err || !record) {
        console.error('Error fetching marca record:', err);
        reject(err);
      } else {
        // // // console.log(`Record fetched for ID: ${recordId}`);
        // Asumiendo que mapMarcaDetailsFields está correctamente definido
        resolve(mapDetailsRemotoFields(record.fields));
      }
    });
  });
}


export async function getRecordsFamiliaReparaciones(modoApple: boolean = false): Promise<IFamiliaReparaciones[]> {
  const viewName = modoApple ? 'CMSAstro' : 'CMSAstro';  // Determina la vista basada en modoApple
  // // console.log(`Obteniendo registros para ${modoApple ? 'Apple' : 'todos los'} modelos`);

  return new Promise((resolve, reject) => {
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
            // Dentro del callback .eachPage
            allRecords.push(mapFamiliaReparacionesFields(fields));
          });
          fetchNextPage();
        },
        (err) => {
          if (err) {
            reject(err);  // Rechaza la promesa si hay un error
          } else {
            // // console.log(`Total de registros rescatados: ${allRecords.length}`);
            resolve(allRecords);  // Resuelve la promesa con los registros obtenidos
          }
        }
      );
  });
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
