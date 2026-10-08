export function initEstimator() {
  const scaleButtons = document.querySelectorAll('.scale-tab-btn[data-scale]');
  const optionsUmkm = document.getElementById('options-umkm');
  const optionsBisnis = document.getElementById('options-bisnis');
  const addonsUmkm = document.getElementById('addons-umkm');
  const addonsBisnis = document.getElementById('addons-bisnis');
  const tierGroupBisnis = document.getElementById('tier-group-bisnis');
  const scopeSelect = document.getElementById('project-scope');
  const priceDisplay = document.getElementById('price-estimate-val');
  const durationDisplay = document.getElementById('duration-estimate-val');
  const waEstimatorBtn = document.getElementById('wa-estimator-trigger');

  if (!priceDisplay || !waEstimatorBtn) return;

  let currentScale = 'umkm';
  let currentPlatformUmkm = 'umkm-landing';
  let currentPlatformBisnis = 'web';

  const umkmRates = {
    'umkm-landing': { base: 1200000, duration: '3 - 5 hari kerja', label: 'Landing Page / Company Profile' },
    'umkm-catalog': { base: 2500000, duration: '1 - 2 minggu', label: 'Web Bisnis & Katalog Produk' },
    'umkm-laravel': { base: 3800000, duration: '2 - 3 minggu', label: 'Fullstack Laravel Web UMKM' }
  };

  const bisnisRates = {
    web: { base: 8500000, duration: '2 - 3 weeks', label: 'Web Application Engineering' },
    mobile: { base: 12000000, duration: '3 - 4 weeks', label: 'Mobile App (Flutter / React Native)' },
    laravel: { base: 10500000, duration: '2 - 4 weeks', label: 'Fullstack Laravel & Backend' },
    custom: { base: 16500000, duration: '4 - 6 weeks', label: 'Custom Multi-platform Suite' }
  };

  const bisnisMultipliers = {
    starter: { mult: 1.0, durationMod: '1 - 2 weeks' },
    production: { mult: 1.6, durationMod: '3 - 4 weeks' },
    enterprise: { mult: 2.5, durationMod: '6 - 8 weeks' }
  };

  scaleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      scaleButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentScale = btn.getAttribute('data-scale') || 'umkm';
      syncScaleVisibility();
      recalculate();
    });
  });

  function syncScaleVisibility() {
    if (optionsUmkm) optionsUmkm.style.display = currentScale === 'umkm' ? 'grid' : 'none';
    if (optionsBisnis) optionsBisnis.style.display = currentScale === 'bisnis' ? 'grid' : 'none';
    if (addonsUmkm) addonsUmkm.style.display = currentScale === 'umkm' ? 'grid' : 'none';
    if (addonsBisnis) addonsBisnis.style.display = currentScale === 'bisnis' ? 'grid' : 'none';
    if (tierGroupBisnis) tierGroupBisnis.style.display = currentScale === 'bisnis' ? 'block' : 'none';
  }

  document.querySelectorAll('.option-radio-btn[data-platform]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const platformVal = btn.getAttribute('data-platform') || '';
      const parentGrid = btn.closest('.estimator-options');
      if (parentGrid) {
        parentGrid.querySelectorAll('.option-radio-btn').forEach((b) => b.classList.remove('active'));
      }
      btn.classList.add('active');

      if (currentScale === 'umkm') {
        currentPlatformUmkm = platformVal;
      } else {
        currentPlatformBisnis = platformVal;
      }
      recalculate();
    });
  });

  if (scopeSelect) {
    scopeSelect.addEventListener('change', recalculate);
  }

  document.querySelectorAll('.addon-checkbox').forEach((cb) => {
    cb.addEventListener('change', recalculate);
  });

  function recalculate() {
    let total = 0;
    let durationText = '';
    let platformLabel = '';
    let selectedAddons = [];
    const isUmkm = currentScale === 'umkm';

    if (isUmkm) {
      const item = umkmRates[currentPlatformUmkm] || umkmRates['umkm-landing'];
      total = item.base;
      durationText = item.duration;
      platformLabel = item.label;

      const activeAddons = addonsUmkm ? addonsUmkm.querySelectorAll('.addon-checkbox:checked') : [];
      activeAddons.forEach((cb) => {
        total += parseInt(cb.getAttribute('data-cost') || '0', 10);
        selectedAddons.push(cb.getAttribute('data-name') || 'Add-on');
      });

      // Strict enforcement of UMKM budget boundaries: min 1.2M, max 5.0M
      total = Math.min(5000000, Math.max(1200000, total));
    } else {
      const item = bisnisRates[currentPlatformBisnis] || bisnisRates.web;
      const scopeVal = scopeSelect ? scopeSelect.value : 'starter';
      const scopeData = bisnisMultipliers[scopeVal] || bisnisMultipliers.starter;

      total = item.base * scopeData.mult;
      durationText = scopeData.durationMod;
      platformLabel = item.label + ' (' + (scopeVal.charAt(0).toUpperCase() + scopeVal.slice(1)) + ')';

      const activeAddons = addonsBisnis ? addonsBisnis.querySelectorAll('.addon-checkbox:checked') : [];
      activeAddons.forEach((cb) => {
        total += parseInt(cb.getAttribute('data-cost') || '0', 10);
        selectedAddons.push(cb.getAttribute('data-name') || 'Add-on');
      });
    }

    const formattedPrice = 'Rp ' + Math.round(total).toLocaleString('id-ID');
    priceDisplay.textContent = formattedPrice;
    if (durationDisplay) durationDisplay.textContent = durationText;

    const scaleTitle = isUmkm ? 'Skala UMKM (Web Only)' : 'Skala Bisnis';
    const msg = [
      'Halo Gilang Teja Krishna,',
      'Saya ingin konsultasi mengenai software engineering service.',
      '',
      '*Estimasi Spesifikasi Proyek:*',
      '- Skala Layanan: ' + scaleTitle,
      '- Solusi / Platform: ' + platformLabel,
      '- Estimasi Biaya: ' + formattedPrice,
      '- Estimasi Pengerjaan: ' + durationText,
      selectedAddons.length > 0 ? '- Fitur Tambahan: ' + selectedAddons.join(', ') : '',
      '',
      'Bisa kita jadwalkan sesi konsultasi untuk membahas detail teknis dan kebutuhan proyek?'
    ].filter(Boolean).join('\n');

    waEstimatorBtn.href = 'https://wa.me/6285150771763?text=' + encodeURIComponent(msg);
  }

  syncScaleVisibility();
  recalculate();
}
