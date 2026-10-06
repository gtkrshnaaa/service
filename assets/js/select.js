export function initCustomSelects() {
  const containers = document.querySelectorAll('.custom-select-container');

  containers.forEach((container) => {
    const trigger = container.querySelector('.custom-select-trigger');
    const label = container.querySelector('.custom-select-label');
    const dropdown = container.querySelector('.custom-select-dropdown');
    const options = container.querySelectorAll('.custom-select-option');
    const nativeSelect = container.querySelector('select');

    if (!trigger || !dropdown) return;

    function openDropdown() {
      containers.forEach((other) => {
        if (other !== container) {
          other.classList.remove('open');
          const otherTrigger = other.querySelector('.custom-select-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });
      container.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
      container.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }

    function toggleDropdown(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (container.classList.contains('open')) {
        closeDropdown();
      } else {
        openDropdown();
      }
    }

    trigger.addEventListener('click', toggleDropdown);

    options.forEach((opt) => {
      opt.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const val = opt.getAttribute('data-value');
        const title = opt.querySelector('.custom-select-option-title')?.textContent || opt.textContent.trim();

        options.forEach((o) => {
          o.classList.remove('selected');
          o.removeAttribute('aria-selected');
        });
        opt.classList.add('selected');
        opt.setAttribute('aria-selected', 'true');

        if (label) {
          label.textContent = opt.getAttribute('data-display') || title;
        }

        if (nativeSelect) {
          nativeSelect.value = val;
          nativeSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }

        closeDropdown();
        trigger.focus();
      });
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDropdown();
        const selected = container.querySelector('.custom-select-option.selected') || options[0];
        if (selected) selected.focus();
      }
    });

    dropdown.addEventListener('keydown', (e) => {
      const current = document.activeElement;
      if (e.key === 'Escape') {
        closeDropdown();
        trigger.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = current.nextElementSibling;
        if (next && next.classList.contains('custom-select-option')) next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = current.previousElementSibling;
        if (prev && prev.classList.contains('custom-select-option')) prev.focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        current.click();
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select-container')) {
      containers.forEach((container) => {
        container.classList.remove('open');
        const trigger = container.querySelector('.custom-select-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      containers.forEach((container) => {
        container.classList.remove('open');
        const trigger = container.querySelector('.custom-select-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }
  });
}
