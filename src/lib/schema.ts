export interface Image {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  // Si necesitas un tipo específico para los thumbnails, define otra interfaz
  thumbnails: any; // Reemplaza `any` con una interfaz adecuada si es necesario
}

export interface CasoExito {
  id: string;
  quote: string;
  imageUrlPrevia: string;
  imageUrlReparado: string;
  dateCreated: string;
  slugFrontalPrevio: string;
  slugFrontalReparado: string;
  slugTraseraPrevio: string;
  slugTraseraReparado: string;
  altPrevia: string;
  altPosterior: string;
}

export const CasoExitoFields = [
  "id",
  "quote",
  "imageUrlPrevia",
  "imageUrlReparado",
  "dateCreated",
  "slugFrontalPrevio",
  "slugFrontalReparado",
  "slugTraseraPrevio",
  "slugTraseraReparado",
  "altPrevia",
  "altPosterior",
];

export function mapCasoExitoFields(data: any): CasoExito {
  return {
    quote: data["quote"] as string,
    imageUrlPrevia: data["imageUrlPrevia"] as string,
    imageUrlReparado: data["imageUrlReparado"] as string,
    dateCreated: data["dateCreated"] as string,
    id: data["id"] as string,
    slugFrontalPrevio: data["slugFrontalPrevio"] as string,
    slugFrontalReparado: data["slugFrontalReparado"] as string,
    slugTraseraPrevio: data["slugTraseraPrevio"] as string,
    slugTraseraReparado: data["slugTraseraReparado"] as string,
    altPrevia: data["altPrevia"] as string,
    altPosterior: data["altPosterior"] as string,
  };
}

// Interfaz para Tipos con todas las propiedades necesarias.
export interface ITipos {
  h2_local?: string;
  subH2Local?: string;
  version?: string;
  paramTipo: string;
  slug: string;
  slugImagen: string;
  slugImagenBackground: string;
  hijo1: string;
  enlaceHijo1: string;
  title: string;
  description: string;
  h1: string;
  textoH1: string;
  h2_1: string;
  textoH2_1: string;
  h2_2: string;
  textoH2_2: string;
  h2_3: string;
  textoH2_3: string;

  textoH2_Faqs: string;
  tipoMarca: string[];
  tipoReparaciones: string[];
  stringPrincipal: string;
  slugTotal: string;
  indexable: boolean;
  EnlacePrimero: string[];
  EnlaceSegundo: string[];
  filtroTipo: string;
  placeholderBuscador: string;
  h2_0: string;
  textoPreH2_1: string;
  imagesUploadedBig: Image[];
  tipoAmigable: string;
  referenciaLocal: boolean;
  Reseñas?: string[];
  subH2Reseñas: string;
  ReseñasInternas?: string[];
  numRep: number;
  precioMin: number;
  precioMax: number;
  h2_FAQs: string;
  FAQ1tit: string;
  FAQ1res: string;
  FAQ2tit: string;
  FAQ2res: string;
  FAQ3tit: string;
  FAQ3res: string;
  FAQ4tit: string;
  FAQ4res: string;
  FAQ5tit: string;
  FAQ5res: string;
  primeraPalabra: string;
  segundaPalabra: string;
  CasosDeExito?: string[];
  h2_casosExito: string;
  altPrincipal: string;
}

export interface ITiposDetalles {}

export const ITiposFields = [
  "paramTipo",
  "slug",
  "slugImagen",
  "hijo1",
  "enlaceHijo1",
  "title",
  "description",
  "h1",
  "textoH1",
  "h2_1",
  "textoH2_1",
  "h2_2",
  "textoH2_2",
  "h2_3",
  "textoH2_3",
  "textoH2_Faqs",
  "Tipo / Marca",
  "Reparaciones (Tipo)",
  "stringPrincipal",
  "slugTotal",
  "indexable",
  "EnlacePrimero",
  "EnlaceSegundo",
  "filtroTipo",
  "placeholderBuscador",
  "h2_0",
  "textoPreH2_1",
  "imagesUploadedBig",
  "tipoAmigable",
  "referenciaLocal",
  "slugImagenBackground",
  "h2_local",
  "Reseñas",
  "subH2Reseñas",
  "subH2Local",
  "ReseñasInternas",
  "numRep",
  "precioMin",
  "precioMax",
  "h2_FAQs",
  "FAQ1tit",
  "FAQ1res",
  "FAQ2tit",
  "FAQ2res",
  "FAQ3tit",
  "FAQ3res",
  "FAQ4tit",
  "FAQ4res",
  "FAQ5tit",
  "FAQ5res",
  "primeraPalabra",
  "segundaPalabra",
  "CasosExitoFiltrados",
  "h2_casosExito",
  "altPrincipal",
];

export function mapTiposFields(data: any): ITipos {
  return {
    paramTipo: data["paramTipo"] as string,
    slug: data["slug"] as string,
    slugImagen: data["slugImagen"] as string,
    hijo1: data["hijo1"] as string,
    enlaceHijo1: data["enlaceHijo1"] as string,
    title: data["title"] as string,
    description: data["description"] as string,
    h1: data["h1"] as string,
    textoH1: data["textoH1"] as string,
    h2_1: data["h2_1"] as string,
    textoH2_1: data["textoH2_1"] as string,
    h2_2: data["h2_2"] as string,
    textoH2_2: data["textoH2_2"] as string,
    h2_3: data["h2_3"] as string,
    textoH2_3: data["textoH2_3"] as string,
    h2_FAQs: data["h2_FAQs"] as string,
    textoH2_Faqs: data["textoH2_Faqs"] as string,
    tipoMarca: data["Tipo / Marca"] as string[],
    tipoReparaciones: data["Reparaciones (Tipo)"] as string[],
    stringPrincipal: data["stringPrincipal"] as string,
    slugTotal: data["slugTotal"] as string,
    indexable: data["indexable"] as boolean,
    EnlacePrimero: data["EnlacePrimero"] as string[],
    EnlaceSegundo: data["EnlaceSegundo"] as string[],
    filtroTipo: data["filtroTipo"] as string,
    placeholderBuscador: data["placeholderBuscador"] as string,
    h2_0: data["h2_0"] as string,
    textoPreH2_1: data["textoPreH2_1"] as string,
    imagesUploadedBig: data["imagesUploadedBig"] as Image[],
    tipoAmigable: data["tipoAmigable"] as string,
    referenciaLocal: data["referenciaLocal"] as boolean,
    slugImagenBackground: data["slugImagenBackground"] as string,
    h2_local: data["h2_local"] as string,
    Reseñas: data["Reseñas"] as string[],
    subH2Reseñas: data["subH2Reseñas"] as string,
    subH2Local: data["subH2Local"] as string,
    ReseñasInternas: data["ReseñasInternas"] as string[],
    numRep: data["numRep"] as number,
    precioMin: data["precioMin"] as number,
    precioMax: data["precioMax"] as number,
    FAQ1tit: data["FAQ1tit"] as string,
    FAQ1res: data["FAQ1res"] as string,
    FAQ2tit: data["FAQ2tit"] as string,
    FAQ2res: data["FAQ2res"] as string,
    FAQ3tit: data["FAQ3tit"] as string,
    FAQ3res: data["FAQ3res"] as string,
    FAQ4tit: data["FAQ4tit"] as string,
    FAQ4res: data["FAQ4res"] as string,
    FAQ5tit: data["FAQ5tit"] as string,
    FAQ5res: data["FAQ5res"] as string,
    primeraPalabra: data["primeraPalabra"] as string,
    segundaPalabra: data["segundaPalabra"] as string,
    CasosDeExito: data["CasosExitoFiltrados"] as string[],
    h2_casosExito: data["h2_casosExito"] as string,
    altPrincipal: data["altPrincipal"] as string,
  };
}

////////////////////////////////////////////////////////////

export interface IMarcas {
  altPrincipal: string;
  version?: string;
  subH2Local?: string;
  paramTipo?: string;
  modoApple?: boolean;
  paramMarca: string;
  slug: string;
  slugImagen: string;
  hijo1: string;
  enlaceHijo1: string;
  hijo2: string;
  title: string;
  description: string;
  h1: string;
  textoH1: string;
  h2_1: string;
  textoH2_1: string;
  h2_2: string;
  textoH2_2: string;
  tipoMarcaModelos: string[];
  tipoMarcaReparaciones: string[];
  familias: string[];
  numModelos: number;
  filtroTipo: string;
  filtroMarca: string;
  placeholderBuscador: string;
  h2_FAQs: string;
  FAQ1tit: string;
  FAQ1res: string;
  FAQ2tit: string;
  FAQ2res: string;
  FAQ3tit: string;
  FAQ3res: string;
  FAQ4tit: string;
  FAQ4res: string;
  FAQ5tit: string;
  FAQ5res: string;
  FAQ6tit: string;
  FAQ6res: string;
  imagesUploadedBig: Image[];
  textoPreH2_1: string;
  h2_0: string;
  stringPrincipal: string;
  EnlacePrimero: string[];
  EnlaceSegundo: string[];
  slugTotal: string;
  indexable: boolean;
  referenciaLocal: boolean;
  slugImagenBackground: string;
  h2_local?: string;
  subH2Reseñas: string;
  Reseñas?: string[];
  ReseñasInternas: string[];
  precioMin: number;
  precioMax: number;
  numRep: number;
  primeraPalabra: string;
  segundaPalabra: string;
  CasosDeExito?: string[];
  h2_casosExito: string;
}

export const IMarcasFields = [
  "altPrincipal",
  "paramTipo",
  "paramMarca",
  "slug",
  "slugImagen",
  "hijo1",
  "enlaceHijo1",
  "hijo2",
  "title",
  "description",
  "h1",
  "textoH1",
  "Modelos (sin familia)",
  "Reparaciones (Tipo y Marca)",
  "h2_1",
  "textoH2_1",
  "h2_2",
  "textoH2_2",
  "numModelos",
  "filtroTipo",
  "filtroMarca",
  "placeholderBuscador",
  "h2_FAQs",
  "FAQ1tit",
  "FAQ1res",
  "FAQ2tit",
  "FAQ2res",
  "FAQ3tit",
  "FAQ3res",
  "FAQ4tit",
  "FAQ4res",
  "FAQ5tit",
  "FAQ5res",
  "FAQ6tit",
  "FAQ6res",
  "Familia",
  "imagesUploadedBig",
  "textoPreH2_1",
  "h2_0",
  "stringPrincipal",
  "EnlacePrimero",
  "EnlaceSegundo",
  "slugTotal",
  "indexable",
  "referenciaLocal",
  "slugImagenBackground",
  "h2_local",
  "subH2Reseñas",
  "Reseñas",
  "subH2Local",
  "ReseñasInternas",
  "precioMin",
  "precioMax",
  "numRep",
  "primeraPalabra",
  "segundaPalabra",
  "CasosExitoFiltrados",
  "h2_casosExito",
];

export function mapMarcasFields(data: any): IMarcas {
  return {
    paramTipo: data["paramTipo"] as string,
    paramMarca: data["paramMarca"] as string,
    slug: data["slug"] as string,
    slugImagen: data["slugImagen"] as string,
    hijo1: data["hijo1"] as string,
    enlaceHijo1: data["enlaceHijo1"] as string,
    hijo2: data["hijo2"] as string,
    title: data["title"] as string,
    description: data["description"] as string,
    h1: data["h1"] as string,
    textoH1: data["textoH1"] as string,
    tipoMarcaModelos: data["Modelos (sin familia)"] as string[],
    tipoMarcaReparaciones: data["Reparaciones (Tipo y Marca)"] as string[],
    h2_1: data["h2_1"] as string,
    textoH2_1: data["textoH2_1"] as string,
    h2_2: data["h2_2"] as string,
    textoH2_2: data["textoH2_2"] as string,
    numModelos: data["numModelos"] as number,
    filtroTipo: data["filtroTipo"] as string,
    filtroMarca: data["filtroMarca"] as string,
    placeholderBuscador: data["placeholderBuscador"] as string,
    h2_FAQs: data["h2_FAQs"] as string,
    FAQ1tit: data["FAQ1tit"] as string,
    FAQ1res: data["FAQ1res"] as string,
    FAQ2tit: data["FAQ2tit"] as string,
    FAQ2res: data["FAQ2res"] as string,
    FAQ3tit: data["FAQ3tit"] as string,
    FAQ3res: data["FAQ3res"] as string,
    FAQ4tit: data["FAQ4tit"] as string,
    FAQ4res: data["FAQ4res"] as string,
    FAQ5tit: data["FAQ5tit"] as string,
    FAQ5res: data["FAQ5res"] as string,
    FAQ6tit: data["FAQ6tit"] as string,
    FAQ6res: data["FAQ6res"] as string,
    familias: data["Familia"] as string[],
    imagesUploadedBig: data["imagesUploadedBig"] as Image[],
    textoPreH2_1: data["textoPreH2_1"] as string,
    h2_0: data["h2_0"] as string,
    stringPrincipal: data["stringPrincipal"] as string,
    EnlacePrimero: data["EnlacePrimero"] as string[],
    EnlaceSegundo: data["EnlaceSegundo"] as string[],
    slugTotal: data["slugTotal"] as string,
    indexable: data["indexable"] as boolean,
    referenciaLocal: data["referenciaLocal"] as boolean,
    slugImagenBackground: data["slugImagenBackground"] as string,
    h2_local: data["h2_local"] as string,
    subH2Reseñas: data["subH2Reseñas"] as string,
    Reseñas: data["Reseñas"] as string[],
    subH2Local: data["subH2Local"] as string,
    ReseñasInternas: data["ReseñasInternas"] as string[],
    precioMin: data["precioMin"] as number,
    precioMax: data["precioMax"] as number,
    numRep: data["numRep"] as number,
    primeraPalabra: data["primeraPalabra"] as string,
    segundaPalabra: data["segundaPalabra"] as string,
    CasosDeExito: data["CasosExitoFiltrados"] as string[],
    h2_casosExito: data["h2_casosExito"] as string,
    altPrincipal: data["altPrincipal"] as string,
  };
}

////////////////////////////////////////////////////////////

export interface IMarcaReparaciones {
  version?: string;
  paramTipo?: string;
  modoApple?: boolean;
  paramMarca: string;
  paramMarcaReparacion: string;
  slug: string;
  slugImagen: string;
  hijo1: string;
  enlaceHijo1: string;
  hijo2: string;
  enlaceHijo2: string;
  hijo3: string;
  title: string;
  description: string;
  h1: string;
  reparaciones: string[];
  familias: string[];
  h2_1: string;
  h2_2: string;
  stringPrincipal: string;
  stringPrincipalFamilias: string;
  slugTotal: string;
  indexable: boolean;
  textoH1: string;
  textoH2_1: string;
  textoH2_2: string;
  textoPreH2_1: string;
  imagesUploadedBig: Image[];
  h2_0: string;
  ReparaciónSEO: string;
  nombreCorrectoSingular: string;
  EnlacePrimero: string[];
  EnlaceSegundo: string[];
  h2_FAQs: string;
  FAQ1tit: string;
  FAQ1res: string;
  FAQ2tit: string;
  FAQ2res: string;
  FAQ3tit: string;
  FAQ3res: string;
  FAQ4tit: string;
  FAQ4res: string;
  FAQ5tit: string;
  FAQ5res: string;
  FAQ6tit: string;
  FAQ6res: string;
  referenciaLocal: boolean;
  slugImagenBackground: string;
  h2_local?: string;
  subH2Reseñas: string;
  Reseñas?: string[];
  subH2Local?: string;
  ReseñasInternas?: string[];
  filtroTipo: string;
  precioMin: number;
  precioMax: number;
  numRep: number;
  primeraPalabra: string;
  segundaPalabra: string;
  imagenCasoExito: string;
  CasosDeExito?: string[];
  h2_casosExito: string;
  altPrincipal: string;
}

export const IMarcaReparacionesFields = [
  "paramTipo",
  "paramMarca",
  "paramMarcaReparacion",
  "slug",
  "slugImagen",
  "hijo1",
  "enlaceHijo1",
  "hijo2",
  "enlaceHijo2",
  "hijo3",
  "title",
  "description",
  "h1",
  "Reparaciones (de Modelos sin Familia)",
  "Reparaciones (Familia)",
  "h2_1",
  "h2_2",
  "stringPrincipal",
  "stringPrincipalFamilias",
  "slugTotal",
  "indexable",
  "textoH1",
  "textoH2_1",
  "textoH2_2",
  "textoPreH2_1",
  "imagesUploadedBig",
  "h2_0",
  "ReparaciónSEO",
  "nombreCorrectoSingular",
  "EnlacePrimero",
  "EnlaceSegundo",
  "h2_FAQs",
  "FAQ1tit",
  "FAQ1res",
  "FAQ2tit",
  "FAQ2res",
  "FAQ3tit",
  "FAQ3res",
  "FAQ4tit",
  "FAQ4res",
  "FAQ5tit",
  "FAQ5res",
  "FAQ6tit",
  "FAQ6res",
  "referenciaLocal",
  "slugImagenBackground",
  "h2_local",
  "subH2Reseñas",
  "Reseñas",
  "subH2Local",
  "ReseñasInternas",
  "filtroTipo",
  "precioMin",
  "precioMax",
  "numRep",
  "primeraPalabra",
  "segundaPalabra",
  "imagenCasoExito",
  "CasosExitoFiltrados",
  "h2_casosExito",
  "altPrincipal",
];

export function mapMarcaReparacionesFields(data: any): IMarcaReparaciones {
  return {
    paramTipo: data["paramTipo"] as string,
    paramMarca: data["paramMarca"] as string,
    paramMarcaReparacion: data["paramMarcaReparacion"] as string,
    slug: data["slug"] as string,
    slugImagen: data["slugImagen"] as string,
    hijo1: data["hijo1"] as string,
    enlaceHijo1: data["enlaceHijo1"] as string,
    hijo2: data["hijo2"] as string,
    enlaceHijo2: data["enlaceHijo2"] as string,
    hijo3: data["hijo3"] as string,
    title: data["title"] as string,
    description: data["description"] as string,
    h1: data["h1"] as string,
    reparaciones: data["Reparaciones (de Modelos sin Familia)"] as string[],
    familias: data["Reparaciones (Familia)"] as string[],
    h2_1: data["h2_1"] as string,
    h2_2: data["h2_2"] as string,
    stringPrincipal: data["stringPrincipal"] as string,
    stringPrincipalFamilias: data["stringPrincipalFamilias"] as string,
    slugTotal: data["slugTotal"] as string,
    indexable: data["indexable"] as boolean,
    textoH1: data["textoH1"] as string,
    textoH2_1: data["textoH2_1"] as string,
    textoH2_2: data["textoH2_2"] as string,
    textoPreH2_1: data["textoPreH2_1"] as string,
    imagesUploadedBig: data["imagesUploadedBig"] as Image[],
    h2_0: data["h2_0"] as string,
    ReparaciónSEO: data["ReparaciónSEO"] as string,
    nombreCorrectoSingular: data["nombreCorrectoSingular"] as string,
    EnlacePrimero: data["EnlacePrimero"] as string[],
    EnlaceSegundo: data["EnlaceSegundo"] as string[],
    h2_FAQs: data["h2_FAQs"] as string,
    FAQ1tit: data["FAQ1tit"] as string,
    FAQ1res: data["FAQ1res"] as string,
    FAQ2tit: data["FAQ2tit"] as string,
    FAQ2res: data["FAQ2res"] as string,
    FAQ3tit: data["FAQ3tit"] as string,
    FAQ3res: data["FAQ3res"] as string,
    FAQ4tit: data["FAQ4tit"] as string,
    FAQ4res: data["FAQ4res"] as string,
    FAQ5tit: data["FAQ5tit"] as string,
    FAQ5res: data["FAQ5res"] as string,
    FAQ6tit: data["FAQ6tit"] as string,
    FAQ6res: data["FAQ6res"] as string,
    referenciaLocal: data["referenciaLocal"] as boolean,
    slugImagenBackground: data["slugImagenBackground"] as string,
    h2_local: data["h2_local"] as string,
    subH2Reseñas: data["subH2Reseñas"] as string,
    Reseñas: data["Reseñas"] as string[],
    subH2Local: data["subH2Local"] as string,
    ReseñasInternas: data["ReseñasInternas"] as string[],
    filtroTipo: data["filtroTipo"] as string,
    precioMin: data["precioMin"] as number,
    precioMax: data["precioMax"] as number,
    numRep: data["numRep"] as number,
    primeraPalabra: data["primeraPalabra"] as string,
    segundaPalabra: data["segundaPalabra"] as string,
    imagenCasoExito: data["imagenCasoExito"] as string,
    CasosDeExito: data["CasosExitoFiltrados"] as string[],
    h2_casosExito: data["h2_casosExito"] as string,
    altPrincipal: data["altPrincipal"] as string,
  };
}

////////////////////////////////////////////////////////////

// Interfaz para Modelos con todas las propiedades necesarias.
export interface IModelos {
  paramTipo?: string;
  modoApple?: boolean;
  modoFamilia?: boolean;
  paramMarca: string;
  paramModelo: string;
  paramFamilia?: string;
  nombreModelo: string;
  slug: string;
  slugImagen: string;
  hijo1: string;
  enlaceHijo1: string;
  hijo2: string;
  enlaceHijo2: string;
  hijo3: string;
  enlaceHijo3: string;
  hijo4: string;
  title: string;
  description: string;
  h1: string;
  textoH1: string;
  Tipo: string; // Tipo de dispositivo (Teléfono, Tablet, Smartwatch)
  reparaciones: string[];
  h2_1: string;
  textoH2_1: string;
  imagesUploadedBig: Image[];
  textoPreH2_1: string;
  h2_0: string;
  h2_FAQs: string;
  FAQ1tit: string;
  FAQ1res: string;
  FAQ2tit: string;
  FAQ2res: string;
  FAQ3tit: string;
  FAQ3res: string;
  FAQ4tit: string;
  FAQ4res: string;
  FAQ5tit: string;
  FAQ5res: string;
  FAQ6tit: string;
  FAQ6res: string;
  stringPrincipal: string;
  enlacePrimero: string[];
  enlaceSegundo: string[];
  slugTotal: string;
  indexable: boolean;
  slugImagenBackground: string;
  subH2Reseñas: string;
  Reseñas?: string[];
  ReseñasInternas?: string[];
  citaDiag: string;
  urlPresupuesto: string;
  precioMin: number;
  precioMax: number;
  numRep: number;
  CasosDeExito?: string[];
  h2_casosExito: string;
  altPrincipal: string;
  microcopy: string;
}

// Lista de campos que se deben recuperar para un Modelo.
export const IModelosFields = [
  "paramTipo",
  "paramMarca",
  "paramModelo",
  "paramFamilia",
  "modelAmigable",
  "slug",
  "slugImagen",
  "hijo1",
  "enlaceHijo1",
  "hijo2",
  "enlaceHijo2",
  "hijo3",
  "enlaceHijo3",
  "hijo4",
  "title",
  "description",
  "h1",
  "Reparaciones",
  "h2_1",
  "textoH1",
  "textoH2_1",
  "imagesUploadedBig",
  "textoPreH2_1",
  "h2_0",
  "h2_FAQs",
  "FAQ1tit",
  "FAQ1res",
  "FAQ2tit",
  "FAQ2res",
  "FAQ3tit",
  "FAQ3res",
  "FAQ4tit",
  "FAQ4res",
  "FAQ5tit",
  "FAQ5res",
  "FAQ6tit",
  "FAQ6res",
  "stringPrincipal",
  "EnlacePrimero",
  "EnlaceSegundo",
  "slugTotal",
  "indexable",
  "slugImagenBackground",
  "subH2Reseñas",
  "Reseñas",
  "citaDiag",
  "urlPresupuesto",
  "ReseñasInternas",
  "precioMin",
  "precioMax",
  "numRep",
  "CasosExitoFiltrados",
  "h2_casosExito",
  "altPrincipal",
  "microcopy",
];

// Función para convertir datos crudos en un objeto IModelos.
export function mapModelosFields(data: any): IModelos {
  return {
    paramTipo: data["paramTipo"] as string,
    paramMarca: data["paramMarca"] as string,
    paramModelo: data["paramModelo"] as string,
    paramFamilia: data["paramFamilia"] as string,
    slug: data["slug"] as string,
    slugImagen: data["slugImagen"] as string,
    hijo1: data["hijo1"] as string,
    enlaceHijo1: data["enlaceHijo1"] as string,
    hijo2: data["hijo2"] as string,
    enlaceHijo2: data["enlaceHijo2"] as string,
    hijo3: data["hijo3"] as string,
    enlaceHijo3: data["enlaceHijo3"] as string,
    hijo4: data["hijo4"] as string,
    title: data["title"] as string,
    description: data["description"] as string,
    h1: data["h1"] as string,
    Tipo: data["Tipo"] as string,
    reparaciones: data["Reparaciones"] as string[],
    h2_1: data["h2_1"] as string,
    textoH1: data["textoH1"] as string,
    textoH2_1: data["textoH2_1"] as string,
    imagesUploadedBig: data["imagesUploadedBig"] as Image[],
    textoPreH2_1: data["textoPreH2_1"] as string,
    h2_0: data["h2_0"] as string,
    h2_FAQs: data["h2_FAQs"] as string,
    FAQ1tit: data["FAQ1tit"] as string,
    FAQ1res: data["FAQ1res"] as string,
    FAQ2tit: data["FAQ2tit"] as string,
    FAQ2res: data["FAQ2res"] as string,
    FAQ3tit: data["FAQ3tit"] as string,
    FAQ3res: data["FAQ3res"] as string,
    FAQ4tit: data["FAQ4tit"] as string,
    FAQ4res: data["FAQ4res"] as string,
    FAQ5tit: data["FAQ5tit"] as string,
    FAQ5res: data["FAQ5res"] as string,
    FAQ6tit: data["FAQ6tit"] as string,
    FAQ6res: data["FAQ6res"] as string,
    nombreModelo: data["modelAmigable"] as string,
    stringPrincipal: data["stringPrincipal"] as string,
    enlacePrimero: data["EnlacePrimero"] as string[],
    enlaceSegundo: data["EnlaceSegundo"] as string[],
    slugTotal: data["slugTotal"] as string,
    indexable: data["indexable"] as boolean,
    slugImagenBackground: data["slugImagenBackground"] as string,
    subH2Reseñas: data["subH2Reseñas"] as string,
    Reseñas: data["Reseñas"] as string[],
    citaDiag: data["citaDiag"] as string,
    urlPresupuesto: data["urlPresupuesto"] as string,
    ReseñasInternas: data["ReseñasInternas"] as string[],
    precioMin: data["precioMin"] as number,
    precioMax: data["precioMax"] as number,
    numRep: data["numRep"] as number,
    CasosDeExito: data["CasosExitoFiltrados"] as string[],
    h2_casosExito: data["h2_casosExito"] as string,
    altPrincipal: data["altPrincipal"] as string,
    microcopy: data["microcopy"] as string,
  };
}

////////////////////////////////////////////////////////////

export interface ITipoReparaciones {
  version?: string;
  paramTipo?: string;
  paramTipoReparacion: string;
  slug: string;
  slugImagen: string;
  hijo1: string;
  enlaceHijo1: string;
  hijo2: string;
  title: string;
  description: string;
  h1: string;
  h2_1: string;
  tipoMarcaReparacion: string[];
  stringPrincipal: string;
  slugTotal: string;
  indexable: boolean;
  textoH1: string;
  textoH2_1: string;
  h2_0: string;
  textoPreH2_1: string;
  imagesUploadedBig: Image[];
  h2_2: string;
  textoH2_2: string;
  EnlacePrimero: string[];
  EnlaceSegundo: string[];
  referenciaLocal: boolean;
  slugImagenBackground: string;
  h2_local?: string;
  subH2Reseñas: string;
  Reseñas?: string[];
  subH2Local?: string;
  ReseñasInternas?: string[];
  TipoAmigable: string;
  filtroTipo: string;
  precioMin: number;
  precioMax: number;
  numRep: number;
  h2_FAQs: string;
  FAQ1tit: string;
  FAQ1res: string;
  FAQ2tit: string;
  FAQ2res: string;
  FAQ3tit: string;
  FAQ3res: string;
  FAQ4tit: string;
  FAQ4res: string;
  FAQ5tit: string;
  FAQ5res: string;
  primeraPalabra: string;
  segundaPalabra: string;
  imagenCasoExito: string;
  CasosDeExito?: string[];
  h2_casosExito: string;
  altPrincipal: string;
}

export const ITipoReparacionesFields = [
  "paramTipo",
  "paramTipoReparacion",
  "slug",
  "slugImagen",
  "hijo1",
  "enlaceHijo1",
  "hijo2",
  "title",
  "description",
  "h1",
  "Reparaciones (Tipo y Marca)",
  "h2_1",
  "stringPrincipal",
  "slugTotal",
  "indexable",
  "textoH1",
  "textoH2_1",
  "h2_0",
  "textoPreH2_1",
  "imagesUploadedBig",
  "h2_2",
  "textoH2_2",
  "EnlacePrimero",
  "EnlaceSegundo",
  "referenciaLocal",
  "slugImagenBackground",
  "h2_local",
  "subH2Reseñas",
  "Reseñas",
  "subH2Local",
  "ReseñasInternas",
  "TipoAmigable",
  "filtroTipo",
  "precioMin",
  "precioMax",
  "numRep",
  "h2_FAQs",
  "FAQ1tit",
  "FAQ1res",
  "FAQ2tit",
  "FAQ2res",
  "FAQ3tit",
  "FAQ3res",
  "FAQ4tit",
  "FAQ4res",
  "FAQ5tit",
  "FAQ5res",
  "primeraPalabra",
  "segundaPalabra",
  "imagenCasoExito",
  "CasosExitoFiltrados",
  "h2_casosExito",
  "altPrincipal",
];

export function mapTipoReparacionesFields(data: any): ITipoReparaciones {
  return {
    paramTipo: data["paramTipo"] as string,
    paramTipoReparacion: data["paramTipoReparacion"] as string,
    slug: data["slug"] as string,
    slugImagen: data["slugImagen"] as string,
    hijo1: data["hijo1"] as string,
    enlaceHijo1: data["enlaceHijo1"] as string,
    hijo2: data["hijo2"] as string,
    title: data["title"] as string,
    description: data["description"] as string,
    h1: data["h1"] as string,
    tipoMarcaReparacion: data["Reparaciones (Tipo y Marca)"] as string[],
    h2_1: data["h2_1"] as string,
    stringPrincipal: data["stringPrincipal"] as string,
    slugTotal: data["slugTotal"] as string,
    indexable: data["indexable"] as boolean,
    textoH1: data["textoH1"] as string,
    textoH2_1: data["textoH2_1"] as string,
    h2_0: data["h2_0"] as string,
    textoPreH2_1: data["textoPreH2_1"] as string,
    imagesUploadedBig: data["imagesUploadedBig"] as Image[],
    h2_2: data["h2_2"] as string,
    textoH2_2: data["textoH2_2"] as string,
    EnlacePrimero: data["EnlacePrimero"] as string[],
    EnlaceSegundo: data["EnlaceSegundo"] as string[],
    referenciaLocal: data["referenciaLocal"] as boolean,
    slugImagenBackground: data["slugImagenBackground"] as string,
    h2_local: data["h2_local"] as string,
    subH2Reseñas: data["subH2Reseñas"] as string,
    Reseñas: data["Reseñas"] as string[],
    subH2Local: data["subH2Local"] as string,
    ReseñasInternas: data["ReseñasInternas"] as string[],
    TipoAmigable: data["TipoAmigable"] as string,
    filtroTipo: data["filtroTipo"] as string,
    precioMin: data["precioMin"] as number,
    precioMax: data["precioMax"] as number,
    numRep: data["numRep"] as number,
    h2_FAQs: data["h2_FAQs"] as string,
    FAQ1tit: data["FAQ1tit"] as string,
    FAQ1res: data["FAQ1res"] as string,
    FAQ2tit: data["FAQ2tit"] as string,
    FAQ2res: data["FAQ2res"] as string,
    FAQ3tit: data["FAQ3tit"] as string,
    FAQ3res: data["FAQ3res"] as string,
    FAQ4tit: data["FAQ4tit"] as string,
    FAQ4res: data["FAQ4res"] as string,
    FAQ5tit: data["FAQ5tit"] as string,
    FAQ5res: data["FAQ5res"] as string,
    primeraPalabra: data["primeraPalabra"] as string,
    segundaPalabra: data["segundaPalabra"] as string,
    imagenCasoExito: data["imagenCasoExito"] as string,
    CasosDeExito: data["CasosExitoFiltrados"] as string[],
    h2_casosExito: data["h2_casosExito"] as string,
    altPrincipal: data["altPrincipal"] as string,
  };
}

////////////////////////////////////////////////////////////

export interface IFamilias {
  paramTipo?: string;
  modoApple?: boolean;
  paramMarca: string;
  paramFamilia: string;
  slug: string;
  slugImagen: string;
  hijo1: string;
  enlaceHijo1: string;
  hijo2: string;
  enlaceHijo2: string;
  hijo3: string;
  title: string;
  description: string;
  h1: string;
  h2_1: string;
  textoH2_1: string;
  h2_2: string;
  textoH2_2: string;
  familiaModelos: string[];
  familiaReparaciones: string[];
  numModelos: number;
  filtroTipo: string;
  filtroMarca: string;
  placeholderBuscador: string;
  idAnexo: string;
  stringPrincipal: string;
  slugTotal: string;
  indexable: boolean;
  h2_0: string;
  textoPreH2_1: string;
  imagesUploadedBig: Image[];
  textoH1: string;
  EnlacePrimero: string[];
  EnlaceSegundo: string[];
  h2_FAQs: string;
  FAQ1tit: string;
  FAQ1res: string;
  FAQ2tit: string;
  FAQ2res: string;
  FAQ3tit: string;
  FAQ3res: string;
  FAQ4tit: string;
  FAQ4res: string;
  FAQ5tit: string;
  FAQ5res: string;
  FAQ6tit: string;
  FAQ6res: string;
  nombreAstro: string;
  slugImagenBackground: string;
  subH2Reseñas: string;
  Reseñas?: string[];
  ReseñasInternas?: string[];
  precioMin: number;
  precioMax: number;
  numRep: number;
  CasosDeExito?: string[];
  h2_casosExito: string;
  altPrincipal: string;
}

export const IFamiliasFields = [
  "paramTipo",
  "paramMarca",
  "paramFamilia",
  "slug",
  "slugImagen",
  "hijo1",
  "enlaceHijo1",
  "hijo2",
  "enlaceHijo2",
  "hijo3",
  "title",
  "description",
  "h1",
  "Modelos",
  "Reparaciones (Familia)",
  "h2_1",
  "textoH2_1",
  "h2_2",
  "textoH2_2",
  "numModelos",
  "filtroTipo",
  "filtroMarca",
  "placeholderBuscador",
  "idAnexo",
  "stringPrincipal",
  "slugTotal",
  "indexable",
  "h2_0",
  "textoPreH2_1",
  "imagesUploadedBig",
  "textoH1",
  "EnlacePrimero",
  "EnlaceSegundo",
  "h2_FAQs",
  "FAQ1tit",
  "FAQ1res",
  "FAQ2tit",
  "FAQ2res",
  "FAQ3tit",
  "FAQ3res",
  "FAQ4tit",
  "FAQ4res",
  "FAQ5tit",
  "FAQ5res",
  "FAQ6tit",
  "FAQ6res",
  "nombreAstro",
  "slugImagenBackground",
  "subH2Reseñas",
  "Reseñas",
  "ReseñasInternas",
  "precioMin",
  "precioMax",
  "numRep",
  "CasosExitoFiltrados",
  "h2_casosExito",
  "altPrincipal",
];

export function mapFamiliasFields(data: any): IFamilias {
  return {
    paramTipo: data["paramTipo"] as string,
    paramMarca: data["paramMarca"] as string,
    paramFamilia: data["paramFamilia"] as string,
    slug: data["slug"] as string,
    slugImagen: data["slugImagen"] as string,
    hijo1: data["hijo1"] as string,
    enlaceHijo1: data["enlaceHijo1"] as string,
    hijo2: data["hijo2"] as string,
    enlaceHijo2: data["enlaceHijo2"] as string,
    hijo3: data["hijo3"] as string,
    title: data["title"] as string,
    description: data["description"] as string,
    h1: data["h1"] as string,
    h2_1: data["h2_1"] as string,
    textoH2_1: data["textoH2_1"] as string,
    h2_2: data["h2_2"] as string,
    textoH2_2: data["textoH2_2"] as string,
    familiaModelos: data["Modelos"] as string[],
    familiaReparaciones: data["Reparaciones (Familia)"] as string[],
    numModelos: data["numModelos"] as number,
    filtroTipo: data["filtroTipo"] as string,
    filtroMarca: data["filtroMarca"] as string,
    placeholderBuscador: data["placeholderBuscador"] as string,
    idAnexo: data["idAnexo"] as string,
    stringPrincipal: data["stringPrincipal"] as string,
    slugTotal: data["slugTotal"] as string,
    indexable: data["indexable"] as boolean,
    h2_0: data["h2_0"] as string,
    textoPreH2_1: data["textoPreH2_1"] as string,
    imagesUploadedBig: data["imagesUploadedBig"] as Image[],
    textoH1: data["textoH1"] as string,
    EnlacePrimero: data["EnlacePrimero"] as string[],
    EnlaceSegundo: data["EnlaceSegundo"] as string[],
    h2_FAQs: data["h2_FAQs"] as string,
    FAQ1tit: data["FAQ1tit"] as string,
    FAQ1res: data["FAQ1res"] as string,
    FAQ2tit: data["FAQ2tit"] as string,
    FAQ2res: data["FAQ2res"] as string,
    FAQ3tit: data["FAQ3tit"] as string,
    FAQ3res: data["FAQ3res"] as string,
    FAQ4tit: data["FAQ4tit"] as string,
    FAQ4res: data["FAQ4res"] as string,
    FAQ5tit: data["FAQ5tit"] as string,
    FAQ5res: data["FAQ5res"] as string,
    FAQ6tit: data["FAQ6tit"] as string,
    FAQ6res: data["FAQ6res"] as string,
    nombreAstro: data["nombreAstro"] as string,
    slugImagenBackground: data["slugImagenBackground"] as string,
    subH2Reseñas: data["subH2Reseñas"] as string,
    Reseñas: data["Reseñas"] as string[],
    ReseñasInternas: data["ReseñasInternas"] as string[],
    precioMin: data["precioMin"] as number,
    precioMax: data["precioMax"] as number,
    numRep: data["numRep"] as number,
    CasosDeExito: data["CasosExitoFiltrados"] as string[],
    h2_casosExito: data["h2_casosExito"] as string,
    altPrincipal: data["altPrincipal"] as string,
  };
}

////////////////////////////////////////////////////////////

export interface IReparaciones {
  slug: string;
  slugImagen: string;
  modoApple: boolean;
  paramReparacion: string;
  hijo1: string;
  enlaceHijo1: string;
  hijo2: string;
  enlaceHijo2: string;
  hijo3: string;
  enlaceHijo3: string;
  hijo4: string;
  enlaceHijo4: string;
  hijo5: string;
  title: string;
  description: string;
  h1: string;
  precio: number;
  cita: string;
  precioCompatible: number;
  citaCompatible: string;
  textoPreH2_1: string;
  imagesUploadedBig: Image[];
  h2_0: string;
  textoH1: string;
  slugImagenModelo: string;
  fotoPieza: Image[];
  pieza: string;
  textoCard1: string;
  textoCard2: string;
  tiempoCita: string;
  h2_FAQs: string;
  FAQ1tit: string;
  FAQ1res: string;
  FAQ2tit: string;
  FAQ2res: string;
  FAQ3tit: string;
  FAQ3res: string;
  FAQ4tit: string;
  FAQ4res: string;
  enlacePrimero: string[];
  enlaceSegundo: string[];
  slugTotal: string;
  indexable: boolean;
  h2_2: string;
  textoH2_2: string;
  imagesUploadedBigHeredado: Image[];
  imagesUploadedBigHeredadoFamilia: Image[];
  imagenFamilia: boolean;
  slugImagenBackground: string;
  slugImagenBackgroundPrevio: string;
  modoPuente: number;
  textoPuente: string;
  reparacionesDestino: string[];
  citaDestino: string;
  precioDestino: string;
  citaDestinoCompa: string;
  precioDestinoCompa: string;
  modelAmigable: string;
  tieneFamilia: boolean;
  reparacion: string;
  h2_ficha: string;
  subH2Reseñas: string;
  Reseñas?: string[];
  ReseñasInternas?: string[];
  imagenCasoExito: string;
  CasosDeExito?: string[];
  h2_casosExito: string;
  altPrincipal: string;
  generoPieza: string;
  TipoDispositivo: string;
  urlRevFinal: string;
}

export const IReparacionesFields = [
  "slug",
  "modoApple",
  "slugImagen",
  "paramReparacion",
  "hijo1",
  "enlaceHijo1",
  "hijo2",
  "enlaceHijo2",
  "hijo3",
  "enlaceHijo3",
  "hijo4",
  "enlaceHijo4",
  "hijo5",
  "title",
  "description",
  "h1",
  "Precio",
  "Cita",
  "PrecioCompatible",
  "CitaCompatible",
  "textoPreH2_1",
  "imagesUploadedBig",
  "h2_0",
  "textoH1",
  "slugImagenModelo",
  "fotoPieza",
  "pieza",
  "textoCard1",
  "textoCard2",
  "tiempoCita",
  "FAQ1tit",
  "FAQ1res",
  "FAQ2tit",
  "FAQ2res",
  "FAQ3tit",
  "FAQ3res",
  "FAQ4tit",
  "FAQ4res",
  "h2_FAQs",
  "EnlacePrimero",
  "EnlaceSegundo",
  "slugTotal",
  "indexable",
  "h2_2",
  "textoH2_2",
  "imagesUploadedBigHeredado",
  "imagesUploadedBigHeredadoFamilia",
  "imagenFamilia",
  "slugImagenBackground",
  "slugImagenBackgroundPrevio",
  "modoPuente",
  "textoPuente",
  "ReparacionesDestino",
  "citaDestino",
  "precioDestino",
  "citaDestinoCompa",
  "precioDestinoCompa",
  "modelAmigable",
  "tieneFamilia",
  "TipoSEO",
  "h2_ficha",
  "subH2Reseñas",
  "Reseñas",
  "ReseñasInternas",
  "imagenCasoExito",
  "CasosExitoFiltrados",
  "h2_casosExito",
  "altPrincipal",
  "generoPieza",
  "TipoDispositivo",
  "urlRevFinal",
];

export function mapReparacionesFields(data: any): IReparaciones {
  return {
    paramReparacion: data["paramReparacion"] as string,
    modoApple: data["modoApple"] as boolean,
    slug: data["slug"] as string,
    slugImagen: data["slugImagen"] as string,
    hijo1: data["hijo1"] as string,
    enlaceHijo1: data["enlaceHijo1"] as string,
    hijo2: data["hijo2"] as string,
    enlaceHijo2: data["enlaceHijo2"] as string,
    hijo3: data["hijo3"] as string,
    enlaceHijo3: data["enlaceHijo3"] as string,
    hijo4: data["hijo4"] as string,
    enlaceHijo4: data["enlaceHijo4"] as string,
    hijo5: data["hijo5"] as string,
    title: data["title"] as string,
    description: data["description"] as string,
    h1: data["h1"] as string,
    precio: data["Precio"] as number,
    cita: data["Cita"] as string,
    precioCompatible: data["PrecioCompatible"] as number,
    citaCompatible: data["CitaCompatible"] as string,
    textoPreH2_1: data["textoPreH2_1"] as string,
    imagesUploadedBig: data["imagesUploadedBig"] as Image[],
    h2_0: data["h2_0"] as string,
    textoH1: data["textoH1"] as string,
    slugImagenModelo: data["slugImagenModelo"] as string,
    fotoPieza: data["fotoPieza"] as Image[],
    pieza: data["pieza"] as string,
    textoCard1: data["textoCard1"] as string,
    textoCard2: data["textoCard2"] as string,
    tiempoCita: data["tiempoCita"] as string,
    h2_FAQs: data["h2_FAQs"] as string,
    FAQ1tit: data["FAQ1tit"] as string,
    FAQ1res: data["FAQ1res"] as string,
    FAQ2tit: data["FAQ2tit"] as string,
    FAQ2res: data["FAQ2res"] as string,
    FAQ3tit: data["FAQ3tit"] as string,
    FAQ3res: data["FAQ3res"] as string,
    FAQ4tit: data["FAQ4tit"] as string,
    FAQ4res: data["FAQ4res"] as string,
    enlacePrimero: data["EnlacePrimero"] as string[],
    enlaceSegundo: data["EnlaceSegundo"] as string[],
    slugTotal: data["slugTotal"] as string,
    indexable: data["indexable"] as boolean,
    h2_2: data["h2_2"] as string,
    textoH2_2: data["textoH2_2"] as string,
    imagesUploadedBigHeredado: data["imagesUploadedBigHeredado"] as Image[],
    imagesUploadedBigHeredadoFamilia: data[
      "imagesUploadedBigHeredadoFamilia"
    ] as Image[],
    imagenFamilia: data["imagenFamilia"] as boolean,
    slugImagenBackground: data["slugImagenBackground"] as string,
    slugImagenBackgroundPrevio: data["slugImagenBackgroundPrevio"] as string,
    modoPuente: data["modoPuente"] as number,
    textoPuente: data["textoPuente"] as string,
    reparacionesDestino: data["ReparacionesDestino"] as string[],
    citaDestino: data["citaDestino"] as string,
    precioDestino: data["precioDestino"] as string,
    citaDestinoCompa: data["citaDestinoCompa"] as string,
    precioDestinoCompa: data["precioDestinoCompa"] as string,
    modelAmigable: data["modelAmigable"] as string,
    tieneFamilia: data["tieneFamilia"] as boolean,
    reparacion: data["TipoSEO"] as string,
    h2_ficha: data["h2_ficha"] as string,
    subH2Reseñas: data["subH2Reseñas"] as string,
    Reseñas: data["Reseñas"] as string[],
    ReseñasInternas: data["ReseñasInternas"] as string[],
    imagenCasoExito: data["imagenCasoExito"] as string,
    CasosDeExito: data["CasosExitoFiltrados"] as string[],
    h2_casosExito: data["h2_casosExito"] as string,
    altPrincipal: data["altPrincipal"] as string,
    generoPieza: data["generoPieza"] as string,
    TipoDispositivo: data["TipoDispositivo"] as string,
    urlRevFinal: data["urlRevFinal"] as string,
  };
}

////////////////////////////////////////////////////////////

export interface IDetails {
  slugTotal: string;
  slugImagen: string;
  h1: string;
  textoDestacado?: string;
  salto?: string;
  textoDestacado2?: string;
  salto2?: string;
  indexable?: boolean;
  microcopy?: string;
  precioMinCard?: string;
  precioMaxCard?: string;
}

export const IDetailsFields = [
  "slugTotal",
  "slugImagen",
  "h1",
  "textoDestacado",
  "salto",
  "textoDestacado2",
  "salto2",
  "indexable",
  "microcopy",
  "precioMinCard",
  "precioMaxCard",
];

export function mapDetailsFields(data: any): IDetails {
  return {
    slugTotal: data["slugTotal"] as string,
    slugImagen: data["slugImagen"] as string,
    h1: data["h1"] as string,
    textoDestacado: data["textoDestacado"] as string,
    salto: data["salto"] as string,
    textoDestacado2: data["textoDestacado2"] as string,
    salto2: data["salto2"] as string,
    indexable: data["indexable"] as boolean,
    microcopy: data["microcopy"] as string,
    precioMinCard: data["precioMinCard"] as string,
    precioMaxCard: data["precioMaxCard"] as string,
  };
}

export function mapDetailsRemotoFields(data: any): IDetails {
  return {
    slugTotal: data["slugTotalLocal"] as string,
    slugImagen: data["slugImagen"] as string,
    h1: data["h1Local"] as string,
    textoDestacado: data["textoDestacado"] as string,
    salto: data["saltoLocal"] as string,
    textoDestacado2: data["textoDestacado2Local"] as string,
    salto2: data["salto2"] as string,
    indexable: data["indexableLocal"] as boolean,
    microcopy: data["microcopy"] as string,
    precioMinCard: data["precioMinCard"] as string,
    precioMaxCard: data["precioMaxCard"] as string,
  };
}

export interface Reseña {
  id: string;
  quote: string;
  name: string;
  repair: string;
  imageUrl: string;
  puntuacion: number;
  respuesta: string;
  dateCreated: string;
}

export const ReseñaFields = [
  "id",
  "quote",
  "name",
  "repair",
  "imageUrl",
  "puntuacion",
  "Response",
  "dateCreated",
];

export function mapReseñaFields(data: any): Reseña {
  return {
    quote: data["quote"] as string,
    name: data["name"] as string,
    repair: data["repair"] as string,
    imageUrl: data["imageUrl"] as string,
    dateCreated: data["dateCreated"] as string,
    puntuacion: data["puntuacion"] as number,
    respuesta: data["Response"] as string,
    id: data["id"] as string,
  };
}

////////////////////////////////////////////////////////////

export interface IFamiliaReparaciones {
  modoApple?: boolean;
  paramMarca: string;
  paramFamilia: string;
  paramFamiliaReparacion: string;
  slug: string;
  slugImagen: string;
  hijo1: string;
  enlaceHijo1: string;
  hijo2: string;
  enlaceHijo2: string;
  hijo3: string;
  enlaceHijo3: string;
  hijo4: string;
  title: string;
  description: string;
  h1: string;
  reparaciones: string[];
  h2_1: string;
  stringPrincipal: string;
  idAnexo: string;
  slugTotal: string;
  indexable: boolean;
  textoH1: string;
  textoH2_1: string;
  h2_0: string;
  textoPreH2_1: string;
  imagesUploadedBig: Image[];
  EnlacePrimero: string[];
  EnlaceSegundo: string[];
  h2_2: string;
  textoH2_2: string;
  ReparaciónSEO: string;
  FamiliaNombreCorrecto: string;
  h2_FAQs: string;
  FAQ1tit: string;
  FAQ1res: string;
  FAQ2tit: string;
  FAQ2res: string;
  FAQ3tit: string;
  FAQ3res: string;
  FAQ4tit: string;
  FAQ4res: string;
  FAQ5tit: string;
  FAQ5res: string;
  FAQ6tit: string;
  FAQ6res: string;
  slugImagenBackground: string;
  subH2Reseñas: string;
  Reseñas?: string[];
  ReseñasInternas?: string[];
  precioMin: number;
  precioMax: number;
  numRep: number;
  imagenCasoExito: string;
  CasosDeExito?: string[];
  h2_casosExito: string;
  altPrincipal: string;
  Tipo: string;
}

export const IFamiliaReparacionesFields = [
  "paramMarca",
  "paramFamilia",
  "paramFamiliaReparacion",
  "slug",
  "slugImagen",
  "hijo1",
  "enlaceHijo1",
  "hijo2",
  "enlaceHijo2",
  "hijo3",
  "enlaceHijo3",
  "hijo4",
  "title",
  "description",
  "h1",
  "Reparaciones",
  "h2_1",
  "stringPrincipal",
  "idAnexo",
  "slugTotal",
  "indexable",
  "textoH1",
  "textoH2_1",
  "h2_0",
  "textoPreH2_1",
  "imagesUploadedBig",
  "EnlacePrimero",
  "EnlaceSegundo",
  "h2_2",
  "textoH2_2",
  "ReparaciónSEO",
  "FamiliaNombreCorrecto",
  "h2_FAQs",
  "FAQ1tit",
  "FAQ1res",
  "FAQ2tit",
  "FAQ2res",
  "FAQ3tit",
  "FAQ3res",
  "FAQ4tit",
  "FAQ4res",
  "FAQ5tit",
  "FAQ5res",
  "FAQ6tit",
  "FAQ6res",
  "slugImagenBackground",
  "subH2Reseñas",
  "Reseñas",
  "ReseñasInternas",
  "precioMin",
  "precioMax",
  "numRep",
  "imagenCasoExito",
  "CasosExitoFiltrados",
  "h2_casosExito",
  "altPrincipal",
  "Tipo",
];

export function mapFamiliaReparacionesFields(data: any): IFamiliaReparaciones {
  return {
    paramMarca: data["paramMarca"] as string,
    paramFamilia: data["paramFamilia"] as string,
    paramFamiliaReparacion: data["paramFamiliaReparacion"] as string,
    slug: data["slug"] as string,
    slugImagen: data["slugImagen"] as string,
    hijo1: data["hijo1"] as string,
    enlaceHijo1: data["enlaceHijo1"] as string,
    hijo2: data["hijo2"] as string,
    enlaceHijo2: data["enlaceHijo2"] as string,
    hijo3: data["hijo3"] as string,
    enlaceHijo3: data["enlaceHijo3"] as string,
    hijo4: data["hijo4"] as string,
    title: data["title"] as string,
    description: data["description"] as string,
    h1: data["h1"] as string,
    reparaciones: data["Reparaciones"] as string[],
    h2_1: data["h2_1"] as string,
    stringPrincipal: data["stringPrincipal"] as string,
    idAnexo: data["idAnexo"] as string,
    slugTotal: data["slugTotal"] as string,
    indexable: data["indexable"] as boolean,
    textoH1: data["textoH1"] as string,
    textoH2_1: data["textoH2_1"] as string,
    h2_0: data["h2_0"] as string,
    textoPreH2_1: data["textoPreH2_1"] as string,
    imagesUploadedBig: data["imagesUploadedBig"] as Image[],
    EnlacePrimero: data["EnlacePrimero"] as string[],
    EnlaceSegundo: data["EnlaceSegundo"] as string[],
    h2_2: data["h2_2"] as string,
    textoH2_2: data["textoH2_2"] as string,
    ReparaciónSEO: data["ReparaciónSEO"] as string,
    FamiliaNombreCorrecto: data["FamiliaNombreCorrecto"] as string,
    h2_FAQs: data["h2_FAQs"] as string,
    FAQ1tit: data["FAQ1tit"] as string,
    FAQ1res: data["FAQ1res"] as string,
    FAQ2tit: data["FAQ2tit"] as string,
    FAQ2res: data["FAQ2res"] as string,
    FAQ3tit: data["FAQ3tit"] as string,
    FAQ3res: data["FAQ3res"] as string,
    FAQ4tit: data["FAQ4tit"] as string,
    FAQ4res: data["FAQ4res"] as string,
    FAQ5tit: data["FAQ5tit"] as string,
    FAQ5res: data["FAQ5res"] as string,
    FAQ6tit: data["FAQ6tit"] as string,
    FAQ6res: data["FAQ6res"] as string,
    slugImagenBackground: data["slugImagenBackground"] as string,
    subH2Reseñas: data["subH2Reseñas"] as string,
    Reseñas: data["Reseñas"] as string[],
    ReseñasInternas: data["ReseñasInternas"] as string[],
    precioMin: data["precioMin"] as number,
    precioMax: data["precioMax"] as number,
    numRep: data["numRep"] as number,
    imagenCasoExito: data["imagenCasoExito"] as string,
    CasosDeExito: data["CasosExitoFiltrados"] as string[],
    h2_casosExito: data["h2_casosExito"] as string,
    altPrincipal: data["altPrincipal"] as string,
    Tipo: data["Tipo"] as string,
  };
}
