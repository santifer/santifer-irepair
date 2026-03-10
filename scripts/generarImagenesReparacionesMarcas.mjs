// script.mjs

// 1. Importaciones ESM
import Airtable from "airtable";
import sharp from "sharp"; // Si lo usas en otro punto
import fs from "fs";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
// 2. Lee variables de entorno
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

if (!apiKey) {
  throw new Error("OUEEEE An API key is required to connect to Airtable");
}
// 3. Configura la base de Airtable en ESM
const base = new Airtable({ apiKey }).base(baseId || "");

// 4. Mapea los tipos de dispositivo (ejemplo de tu código original)
const tipoMap = {
  Teléfono: "m",
  Tablet: "t",
  SmartWatch: "s",
};

// 5. Función principal que hace el select y procesa las imágenes
async function processSVGImagesFromAirtable() {
  base("Tipo: Marca")
    .select({
      view: "scriptGenerarImagenes",
    })
    .eachPage(
      async (records, fetchNextPage) => {
        for (const record of records) {
          const svgData = record.get("svgMarca");
          const svgUrl = svgData?.[0]?.url;
          const name = record.get("Name");
          const tipo = record.get("Tipo");
          const mappedTipo = tipoMap[tipo];

          if (svgUrl && name && mappedTipo) {
            try {
              // Descargar el SVG
              const response = await axios({
                url: svgUrl,
                responseType: "arraybuffer",
              });
              const svgBuffer = response.data;
              const imageName = `${name}.svg`;

              // Asegurarnos de que el directorio existe
              const imagePath = path.join("./temp/", imageName);
              ensureDirectoryExistence(imagePath);

              // Guardar en disco
              fs.writeFileSync(imagePath, svgBuffer);

              // Actualizar registro en Airtable
              await updateAirtableRecord(record.getId(), name);
            } catch (error) {
              console.error(`Error processing ${name}:`, error);
            }
          }
        }
        fetchNextPage();
      },
      (err) => {
        if (err) {
          console.error("Error retrieving records from Airtable:", err);
        }
      },
    );
}

// 6. Función auxiliar para crear el directorio si no existe
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
  }
}

// 7. Actualiza registro en Airtable
async function updateAirtableRecord(recordId, slugImagenGenerada) {
  try {
    await base("Tipo: Marca").update([
      {
        id: recordId,
        fields: {
          slugImagenGenerada: slugImagenGenerada,
        },
      },
    ]);
    // console.log(`Record updated: ${JSON.stringify(updatedRecord)}`);
  } catch (error) {
    console.error(`Error updating record:`, error);
  }
}

// 8. Llamada a la función principal
processSVGImagesFromAirtable();
