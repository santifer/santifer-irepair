// src/scripts/modal-handler.js
function setupModal(openButtonId, modalId, iframeUrl) {
  const modal = document.getElementById(modalId);
  const openModalBtn = document.getElementById(openButtonId);

  // Manejador para abrir el modal e insertar el iframe

  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', iframeUrl);
  iframe.setAttribute('frameborder', '0');
  iframe.style.width = '85%'; // Ajusta según tus necesidades
  iframe.style.height = '85%'; // Ajusta según tus necesidades
  iframe.style.zIndex = '40'; // Establece z-index como solicitado
  iframe.style.position = 'relative'; // Asegura que z-index funcione
  iframe.style.borderRadius = '0.75rem'; // Aplica border-radius equivalente a rounded-xl en Tailwind
  iframe.style.overflow = 'hidden'; // Aplica overflow-hidden
  modal.innerHTML = ''; // Limpia el contenido previo
  modal.appendChild(iframe);
  modal.style.display = 'flex'; // Muestra el modal

  // Manejador para cerrar el modal y remover el iframe
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      // Verifica si el clic fue fuera del iframe
      modal.style.display = 'none'; // Oculta el modal
      modal.innerHTML = ''; // Limpia el contenido del modal
    }
  });

  // Cerrar con botón específico dentro del modal
  const closeButton = modal.querySelector('.close-modal-btn'); // Asegúrate que el botón tenga esta clase
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
      modal.innerHTML = ''; // Limpia el contenido del modal
    });
  }
}

// Hacer que la función esté disponible globalmente
window.setupModal = setupModal;
