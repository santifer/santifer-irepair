// searchComponent7.js

function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function obtenerModelos() {
  const resultados = document.getElementById('resultados');

  // Leer los filtros desde los atributos data-*
  const filtroTipo = searchBox.dataset.filtroTipo;
  const filtroMarca = searchBox.dataset.filtroMarca;

  let modelosconv = JSON.parse(localStorage.getItem('modelosconv030624')) || [];

  // function guardarModelos(modelos) {
  //   const dataParaAlmacenar = {
  //     timestamp: Date.now(),
  //     data: modelos,
  //   };
  //   localStorage.setItem(
  //     'modelosconv030624',
  //     JSON.stringify(dataParaAlmacenar)
  //   );
  // }

  async function cargarYConvertirModelos() {
    const urlModelos = '/modelos5.json';
    try {
      const response = await fetch(urlModelos);
      const modelos = await response.json();

      modelosconv = modelos.flatMap((marca) => [
        ...(marca.m
          ? marca.m.map((modelo) => ({
              b: marca.b,
              t: 'm',
              n: `${marca.b} ${modelo}`,
              u:
                marca.b.toLowerCase() === 'apple'
                  ? `/reparar-iphone/${modelo
                      // Elimina paréntesis abiertos
                      .replace(/$begin:math:text$/g, '')
                      // Elimina paréntesis cerrados
                      .replace(/$end:math:text$/g, '')
                      // Elimina "iphone" al inicio (mayúsc/minúsc.)
                      .replace(/iphone\s*/i, '')
                      // Sustituye espacios por guiones
                      .replace(/\s+/g, '-')
                      // A minúsculas
                      .toLowerCase()}`
                  : `/reparar-movil/${marca.b.toLowerCase()}/${modelo
                      .replace(/$begin:math:text$/g, '')
                      .replace(/$end:math:text$/g, '')
                      .replace(/\s+/g, '-')
                      .replace(/\./g, '')
                      .toLowerCase()}`,
            }))
          : []),
        ...(marca.t
          ? marca.t.map((tablet) => ({
              b: marca.b,
              t: 't',
              n: `${marca.b} ${tablet}`,
              u:
                marca.b.toLowerCase() === 'apple'
                  ? `/reparar-ipad/${tablet
                      .replace(/ipad\s*/i, '')
                      .replace(/(pro|mini|air)\s*/i, '$1/')
                      .replace(/\s+/g, '-')
                      .replace(/$begin:math:text$/g, '')
                      .replace(/$end:math:text$/g, '')
                      .replace(/\./g, '')
                      .toLowerCase()}`
                  : `/reparar-tablet/${marca.b.toLowerCase()}/${tablet
                      .replace(/$begin:math:text$/g, '')
                      .replace(/$end:math:text$/g, '')
                      .replace(/\s+/g, '-')
                      .toLowerCase()}`,
            }))
          : []),
        ...(marca.s
          ? marca.s.map((watch) => ({
              b: marca.b,
              t: 's',
              n: `${marca.b} ${watch}`,
              u:
                marca.b.toLowerCase() === 'apple'
                  ? `/reparar-apple-watch/${watch
                      .replace(/\s+/g, '-')
                      .replace(/$begin:math:text$/g, '')
                      .replace(/$end:math:text$/g, '')
                      .toLowerCase()
                      .replace('watch-', '')
                      .replace(/^(se|serie-\d+)-/, (match, p1) =>
                        p1 === 'se' ? 'se/' : `${p1}/`
                      )}`
                  : `/reparar-smartwatch/${marca.b.toLowerCase()}/${watch
                      .replace(/$begin:math:text$/g, '')
                      .replace(/$end:math:text$/g, '')
                      .replace(/\s+/g, '-')
                      .replace(/\./g, '')
                      .toLowerCase()}`,
            }))
          : []),
      ]);
      localStorage.setItem('modelosconv030624', JSON.stringify(modelosconv));
    } catch (error) {
      console.error('Error cargando y convirtiendo los modelos:', error);
    }
  }

  function calcularPuntuacion(modelo, terminosBusqueda) {
    let puntuacion = 0;
    const nombreModelo = modelo.n.toLowerCase();

    // Chequear si todos los términos de búsqueda están en el nombre del modelo
    const todasLasPalabrasPresentes = terminosBusqueda.every((termino) =>
      nombreModelo.includes(termino)
    );

    if (todasLasPalabrasPresentes) {
      puntuacion += 20; // Base si incluye todas las palabras
      const nombreModeloPalabras = nombreModelo.split(/\s+/);

      // Penalización por palabra extra en el nombre
      const penalizacionPorPalabrasExtra = nombreModeloPalabras.filter(
        (palabra) => !terminosBusqueda.includes(palabra)
      ).length;
      puntuacion -= penalizacionPorPalabrasExtra * 2;

      // Bono si el término es exactamente el modelo
      if (nombreModelo === terminosBusqueda.join(' ')) {
        puntuacion += 30;
      }

      // Bono si el nombre comienza con el término
      if (nombreModelo.startsWith(terminosBusqueda.join(' '))) {
        puntuacion += 10;
      }
    }

    return puntuacion;
  }

  function mostrarResultados(valorDeBusqueda, filtroTipo, filtroMarca) {
    if (valorDeBusqueda.length < 2 && !filtroMarca) {
      // Si la búsqueda es muy corta y no hay filtro, no mostramos
      return;
    }

    let resultadosFiltrados = modelosconv;

    // Filtrado por tipo y/o marca
    if (filtroTipo) {
      resultadosFiltrados = resultadosFiltrados.filter(
        (modelo) => modelo.t === filtroTipo
      );
    }
    if (filtroMarca) {
      resultadosFiltrados = resultadosFiltrados.filter(
        (modelo) => modelo.b.toLowerCase() === filtroMarca.toLowerCase()
      );
    }

    const terminosBusqueda = valorDeBusqueda.toLowerCase().split(/\s+/);

    resultadosFiltrados = resultadosFiltrados
      .map((modelo) => ({
        ...modelo,
        puntuacion: calcularPuntuacion(modelo, terminosBusqueda),
      }))
      .filter((modelo) => modelo.puntuacion > 0)
      .sort((a, b) => b.puntuacion - a.puntuacion);

    if (resultadosFiltrados.length === 0) {
      resultados.innerHTML = `<div class="flex justify-center items-center p-5">¿No aparece tu modelo? Pídenos presupuesto</div>`;
    } else {
      const resultadosLimitados = resultadosFiltrados.slice(0, 6);
      resultados.innerHTML = resultadosLimitados
        .map(({ b, t, n, u }) => {
          let iconoTipo;
          switch (t) {
            case 'm':
              iconoTipo = 'movil.svg';
              break;
            case 't':
              iconoTipo = 'tablet.svg';
              break;
            case 's':
              iconoTipo = 'smartwatch.svg';
              break;
            default:
              iconoTipo = '';
          }
          return `
          <a role="option" href="${u}" class="flex items-center p-2 hover:bg-blue-500 hover:text-white hover:font-bold">
            ${
              iconoTipo
                ? `<img src="/${iconoTipo}" alt="${t}" class="h-8 w-8 mr-2" />`
                : ''
            }
            <img src="/marcas/${b.toLowerCase()}.svg" alt="${b}" class="h-8 w-8 mr-2" />
            <span>${n}</span>
          </a>
        `;
        })
        .join('');
    }
  }

  // Evento de entrada (escritura) en el buscador
  document.querySelector('input').addEventListener('input', async (e) => {
    const valorDeBusqueda = e.target.value;
    const debeMostrarResultados = valorDeBusqueda.length >= 2 || filtroMarca;

    if (valorDeBusqueda && debeMostrarResultados) {
      resultados.classList.remove('hidden');
      // Si no tenemos nada cargado en memoria, cargamos ahora
      if (modelosconv.length === 0) {
        await cargarYConvertirModelos();
      }
      mostrarResultados(valorDeBusqueda, filtroTipo, filtroMarca);
    } else {
      resultados.classList.add('hidden');
    }
  });

  // Verificar si hay un parámetro 'q' en la URL y disparar la búsqueda
  const searchQuery = getQueryParameter('q');
  if (searchQuery) {
    const inputElement = document.querySelector('input');
    if (inputElement) {
      inputElement.value = searchQuery;
      const event = new Event('input', { bubbles: true });
      inputElement.dispatchEvent(event);
    }
  }
}

// ---------- Mostrar/ocultar resultados con transiciones ----------
window.mostrarResultados = function () {
  const resultados = document.getElementById('resultados');
  resultados.classList.remove('hidden');
  setTimeout(() => {
    resultados.classList.remove('opacity-0');
    resultados.classList.add('opacity-100');
  }, 10);
};

window.ocultarResultados = function () {
  const resultados = document.getElementById('resultados');
  resultados.classList.remove('opacity-100');
  resultados.classList.add('opacity-0');
  setTimeout(() => {
    resultados.classList.add('hidden');
  }, 300); // Debe coincidir con el transition-duration
};

window.clearInput = function () {
  const inputElement = document.querySelector('#searchBox input');
  if (inputElement) {
    inputElement.value = '';
    ocultarResultados();
    document.getElementById('boton-buscador').classList.add('hidden');
    document.getElementById('icono-lupa').classList.remove('hidden');
  }
};

window.handleInput = function (event) {
  const inputElement = event.target;
  const searchBox = inputElement.closest('#searchBox');

  if (searchBox) {
    searchBox.classList.remove('animate-borderPulse');
  }

  const botonBuscador = document.getElementById('boton-buscador');
  const iconoLupa = document.getElementById('icono-lupa');

  if (inputElement.value.trim() !== '') {
    mostrarResultados();
    botonBuscador.classList.remove('hidden');
    iconoLupa.classList.add('hidden');
  } else {
    ocultarResultados();
    botonBuscador.classList.add('hidden');
    iconoLupa.classList.remove('hidden');
  }
};

window.handleFocus = function (event) {
  const inputElement = event.target;
  const searchBox = inputElement.closest('#searchBox');

  if (searchBox) {
    searchBox.classList.remove('animate-borderPulse');
  }

  const botonBuscador = document.getElementById('boton-buscador');
  const iconoLupa = document.getElementById('icono-lupa');

  if (inputElement.value.trim() !== '') {
    mostrarResultados();
    botonBuscador.classList.remove('hidden');
    iconoLupa.classList.add('hidden');
  } else {
    ocultarResultados();
    botonBuscador.classList.add('hidden');
    iconoLupa.classList.remove('hidden');
  }
};

// Ocultar resultados cuando se hace clic fuera
document.addEventListener('click', (event) => {
  const searchBoxContainer = document.getElementById('searchBox');
  const resultados = document.getElementById('resultados');
  if (
    !searchBoxContainer.contains(event.target) &&
    !resultados.contains(event.target)
  ) {
    ocultarResultados();
  }
});

/*  
   ─────────────────────────────────────────────────────────────────
   ELIMINAMOS las llamadas automáticas a obtenerModelos() 
   y en su lugar creamos un listener de focus para cargarlo 
   solo cuando el usuario haga clic en el input. 
   ─────────────────────────────────────────────────────────────────
*/

// obtenerModelos();
// document.addEventListener('astro:after-swap', obtenerModelos);

// Versión lazy: se configura el buscador la primera vez que se hace foco
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('#searchBox input');
  if (searchInput) {
    searchInput.addEventListener(
      'focus',
      () => {
        obtenerModelos();
      },
      { once: true } // Se ejecuta solo la primera vez
    );
  }
});
