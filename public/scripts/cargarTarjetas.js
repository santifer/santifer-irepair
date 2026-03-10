window.loadMoreRepairs = function (buttonId, gridId) {
  const button = document.getElementById(buttonId);
  if (!button) {
    console.error('El botón no fue encontrado');
    return;
  }

  const details = JSON.parse(button.getAttribute('data-details'));
  const container = document.getElementById(gridId);
  if (!container) {
    console.error('El contenedor para las tarjetas no fue encontrado');
    return;
  }

  details.forEach((detail) => {
    const card = document.createElement('a');
    card.className =
      'border-2 hover:border-blue-400 w-full card group bg-white flex flex-row sm:flex-col items-center justify-center overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300';

    card.href = detail.slugTotal;

    const image = document.createElement('img');
    image.src = detail.slugImagen;
    image.alt = `Imagen de ${detail.h1.firstPart}${detail.h1.highlightText}${detail.h1.secondPart}`;
    image.title = `${detail.h1.firstPart}${detail.h1.highlightText}${detail.h1.secondPart}`;
    image.className =
      'w-1/2 h-auto max-h-[256px]  sm:w-auto object-contain p-2 transition-transform duration-300 ease-in-out group-hover:scale-105';

    const textDiv = document.createElement('div');
    textDiv.className =
      'bg-gradient-to-r from-blue-50 to-white p-4 flex flex-col items-center justify-center sm:items-center sm:justify-start w-full h-full text-center group-hover:bg-gradient-to-r group-hover:from-blue-100 group-hover:to-blue-50';

    const title = document.createElement('h3');
    title.className = 'text-lg font-light';

    // Agregar el firstPart
    title.appendChild(document.createTextNode(detail.h1.firstPart));

    // Condicionales para los saltos de línea
    if (detail.h1.highlightText) {
      title.appendChild(document.createElement('br')); // Salto de línea antes de highlightText
    }

    // Crear y añadir el span para highlightText si existe
    if (detail.h1.highlightText) {
      const span = document.createElement('span');
      span.className = 'text-lg sm:text-xl font-semibold text-blue-600';
      span.textContent = detail.h1.highlightText;
      title.appendChild(span);
    }

    // Condicionales para los saltos de línea
    if (detail.h1.secondPart) {
      title.appendChild(document.createElement('br')); // Salto de línea antes de secondPart
    }

    // Agregar el secondPart si existe
    if (detail.h1.secondPart) {
      title.appendChild(document.createTextNode(detail.h1.secondPart));
    }

    textDiv.appendChild(title);
    card.appendChild(image);
    card.appendChild(textDiv);

    container.appendChild(card);
  });

  // Eliminar el botón del DOM después de cargar los detalles
  button.parentNode.removeChild(button);
};
