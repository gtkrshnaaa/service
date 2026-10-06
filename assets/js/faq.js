export function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-question');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others for single-accordion UX
      faqItems.forEach((other) => {
        other.classList.remove('open');
      });

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}
