export function initEstimator() {
  const platformButtons = document.querySelectorAll('.option-radio-btn[data-platform]');
  const scopeSelect = document.getElementById('project-scope');
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
  const priceDisplay = document.getElementById('price-estimate-val');
  const durationDisplay = document.getElementById('duration-estimate-val');
  const waEstimatorBtn = document.getElementById('wa-estimator-trigger');

  if (!priceDisplay || !waEstimatorBtn) return;

  const baseRates = {
    web: { base: 8500000, duration: '2 - 3 weeks', label: 'Web Application Engineering' },
    mobile: { base: 12000000, duration: '3 - 4 weeks', label: 'Mobile App (Flutter / React Native)' },
    laravel: { base: 10500000, duration: '2 - 4 weeks', label: 'Fullstack Laravel & Backend' },
    custom: { base: 16500000, duration: '4 - 6 weeks', label: 'Custom Multi-platform Suite' }
  };

  const scopeMultipliers = {
    starter: { mult: 1.0, durationMod: '1 - 2 weeks' },
    production: { mult: 1.6, durationMod: '3 - 4 weeks' },
    enterprise: { mult: 2.5, durationMod: '6 - 8 weeks' }
  };

  let currentPlatform = 'web';

  platformButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      platformButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentPlatform = btn.getAttribute('data-platform') || 'web';
      recalculate();
    });
  });

  if (scopeSelect) {
    scopeSelect.addEventListener('change', recalculate);
  }

  addonCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', recalculate);
  });

  function recalculate() {
    const platformData = baseRates[currentPlatform] || baseRates.web;
    const scopeVal = scopeSelect ? scopeSelect.value : 'starter';
    const scopeData = scopeMultipliers[scopeVal] || scopeMultipliers.starter;

    let total = platformData.base * scopeData.mult;
    let selectedAddons = [];

    addonCheckboxes.forEach((cb) => {
      if (cb.checked) {
        const addonCost = parseInt(cb.getAttribute('data-cost') || '0', 10);
        total += addonCost;
        selectedAddons.push(cb.getAttribute('data-name') || 'Add-on');
      }
    });

    const formattedPrice = 'Rp ' + Math.round(total).toLocaleString('id-ID');
    priceDisplay.textContent = formattedPrice;
    if (durationDisplay) {
      durationDisplay.textContent = scopeData.durationMod;
    }

    // Build pre-filled WhatsApp message
    const msg = [
      'Hello Gilang Teja Krishna,',
      'I would like to inquire about software engineering services.',
      '',
      '*Project Scope Estimate:*',
      '- Platform: ' + platformData.label,
      '- Tier: ' + (scopeVal.charAt(0).toUpperCase() + scopeVal.slice(1)),
      '- Estimated Budget: ' + formattedPrice,
      selectedAddons.length > 0 ? '- Add-ons: ' + selectedAddons.join(', ') : '',
      '',
      'Could we schedule a consultation to discuss technical specifications and timeline?'
    ].filter(Boolean).join('\n');

    const dummyPhone = '6281234567890';
    waEstimatorBtn.href = 'https://wa.me/' + dummyPhone + '?text=' + encodeURIComponent(msg);
  }

  // Initial calculation
  recalculate();
}
