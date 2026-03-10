// En el archivo /src/utils/textProcessing.ts


/**
 * Limpia y procesa el texto dividiéndolo en párrafos.
 * Si el texto no contiene saltos de línea, devuelve un array con el texto original después de limpiarlo.
 * @param text El texto a procesar.
 * @returns Un array de párrafos limpios.
 */
export function cleanAndSplitText(text: string): string[] {
  // Comprobamos si el texto contiene dobles saltos de línea
  if (!text.includes('\n\n')) {
    // Si no los contiene, devolvemos un array con el texto limpio
    return [text.trim()].filter((paragraph) => paragraph !== '');
  }
  // Si contiene dobles saltos de línea, procesamos como antes
  return text
    .split('\n\n')
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph !== '');
}


// export function prepareTextForDisplay(detail: IDetails, modo:string) {
//   const saltoFinal = modo === 'alternativo' ? detail.salto2 : detail.salto;
//   const textoDestacadoFinal =
//      modo === 'alternativo' ? detail.textoDestacado2 : detail.textoDestacado;

//   const replacedH1 = detail.h1.replace(
//     textoDestacadoFinal, 'PLACEHOLDERTEXT'
//   );
//   const highlightIndex = replacedH1.indexOf('PLACEHOLDERTEXT');

//   let firstPart, secondPart, highlightedText;

//   if (saltoFinal === 'antes' || saltoFinal === 'ambos') {
//     firstPart = replacedH1.slice(0, highlightIndex);
//   } else {
//     firstPart = replacedH1.slice(0,highlightIndex + 'PLACEHOLDERTEXT'.length);
//   }

//   if (saltoFinal === 'después' || saltoFinal === 'ambos') {
//     secondPart = replacedH1.slice(
//     highlightIndex + 'PLACEHOLDERTEXT'.length
//   );
//   highlightedText = (<> <br /> <span class="text-lg sm:text-xl font-semibold text-blue-600"> ${textoDestacadoFinal} </span> <br /> </>) ;
//   } else {
//     secondPart = '';
//     highlightedText = <br/> <span class="text-lg sm:text-xl font-semibold text-blue-600"> ${textoDestacadoFinal} </span> ;
//   }

// return { firstPart, highlightedText, secondPart };
// }
