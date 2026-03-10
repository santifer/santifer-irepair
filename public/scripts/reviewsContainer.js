function cargarLogica() {
  // // console.log('empezamos');

  let currentReviewIndex = 0;
  const reviews = document.querySelectorAll('.review');
  let autoAdvanceTimer;

  function changeReview(newIndex) {
    const currentReview = reviews[currentReviewIndex];
    const nextReview = reviews[newIndex];

    currentReview.classList.replace('opacity-100', 'opacity-0');
    setTimeout(() => {
      currentReview.classList.add('hidden');
      nextReview.classList.remove('hidden');
      nextReview.classList.replace('opacity-0', 'opacity-100');
      currentReviewIndex = newIndex;
    }, 700); // Espera la finalización de la transición de opacidad
  }

  function resetAutoAdvanceTimer() {
    // // console.log('resetting timer');
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
    }
    autoAdvanceTimer = setInterval(() => {
      let newIndex = (currentReviewIndex + 1) % reviews.length;
      changeReview(newIndex);
    }, 9000);
  }

  // Inicia la navegación automática al cargar.
  resetAutoAdvanceTimer();
  // // console.log('timer started');

  document.getElementById('prev-review').addEventListener('click', () => {
    const newIndex =
      currentReviewIndex > 0 ? currentReviewIndex - 1 : reviews.length - 1;
    changeReview(newIndex);
    resetAutoAdvanceTimer();
  });

  document.getElementById('next-review').addEventListener('click', () => {
    const newIndex = (currentReviewIndex + 1) % reviews.length;
    changeReview(newIndex);
    resetAutoAdvanceTimer();
  });
}

cargarLogica();
document.addEventListener('astro:after-swap', cargarLogica);
