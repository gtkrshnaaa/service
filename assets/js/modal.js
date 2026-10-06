export function initModal() {
  const modalBackdrop = document.getElementById('consultation-modal');
  const openButtons = document.querySelectorAll('[data-open-modal]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');
  const form = document.getElementById('consultation-form');

  if (!modalBackdrop) return;

  function open() {
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    const firstInput = modalBackdrop.querySelector('input, select, textarea');
    if (firstInput) firstInput.focus();
  }

  function close() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceTarget = btn.getAttribute('data-service-preselect');
      if (serviceTarget) {
        const selectEl = document.getElementById('modal-service-select');
        if (selectEl) {
          selectEl.value = serviceTarget;
          const container = document.getElementById('modal-service-container');
          if (container) {
            const options = container.querySelectorAll('.custom-select-option');
            const targetOpt = container.querySelector('.custom-select-option[data-value="' + serviceTarget + '"]');
            if (targetOpt) {
              options.forEach(o => {
                o.classList.remove('selected');
                o.removeAttribute('aria-selected');
              });
              targetOpt.classList.add('selected');
              targetOpt.setAttribute('aria-selected', 'true');
              const label = container.querySelector('.custom-select-label');
              if (label) label.textContent = targetOpt.getAttribute('data-display') || targetOpt.textContent.trim();
            }
          }
        }
      }
      open();
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      close();
    });
  });

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      close();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      close();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('client-name')?.value || 'Client';
      const service = document.getElementById('modal-service-select')?.value || 'Software Engineering';
      const notes = document.getElementById('client-notes')?.value || 'No additional notes';

      const msg = [
        'Hello Gilang Teja Krishna,',
        'I am submitting an inquiry for software engineering services.',
        '',
        '*Client Inquiry Details:*',
        '- Name: ' + name,
        '- Service Required: ' + service,
        '- Project Brief: ' + notes,
        '',
        'Looking forward to your technical response and schedule.'
      ].join('\n');

      const waPhone = '6285150771763';
      const waUrl = 'https://wa.me/' + waPhone + '?text=' + encodeURIComponent(msg);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      close();
      form.reset();
    });
  }
}
