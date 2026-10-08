// Production Application Bundle for Gilang Teja Krishna Service Portal
// Fully compatible with file://, http://, and https:// protocols

(function () {
  'use strict';

  function initNavigation() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    const closeBtn = document.getElementById('mobile-drawer-close');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    if (!toggleBtn || !drawer) return;

    function openDrawer() {
      drawer.classList.add('open');
      if (backdrop) backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      if (backdrop) backdrop.classList.remove('active');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
    }

    function toggleDrawer(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (drawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    }

    toggleBtn.addEventListener('click', toggleDrawer);

    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeDrawer();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', function (e) {
        e.preventDefault();
        closeDrawer();
      });
    }

    drawerLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeDrawer();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  function initCustomSelects() {
    const containers = document.querySelectorAll('.custom-select-container');

    containers.forEach(function (container) {
      const trigger = container.querySelector('.custom-select-trigger');
      const label = container.querySelector('.custom-select-label');
      const dropdown = container.querySelector('.custom-select-dropdown');
      const options = container.querySelectorAll('.custom-select-option');
      const nativeSelect = container.querySelector('select');

      if (!trigger || !dropdown) return;

      function openDropdown() {
        containers.forEach(function (other) {
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

      options.forEach(function (opt) {
        opt.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          const val = opt.getAttribute('data-value');
          const title = opt.querySelector('.custom-select-option-title')?.textContent || opt.textContent.trim();

          options.forEach(function (o) {
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

      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDropdown();
          const selected = container.querySelector('.custom-select-option.selected') || options[0];
          if (selected) selected.focus();
        }
      });

      dropdown.addEventListener('keydown', function (e) {
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

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.custom-select-container')) {
        containers.forEach(function (container) {
          container.classList.remove('open');
          const trigger = container.querySelector('.custom-select-trigger');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        containers.forEach(function (container) {
          container.classList.remove('open');
          const trigger = container.querySelector('.custom-select-trigger');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  function initEstimator() {
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
      'umkm-landing': { base: 600000, duration: '1 - 3 hari kerja', label: 'Landing Page (1 Halaman)' },
      'umkm-multipage': { base: 1200000, duration: '3 - 5 hari kerja', label: 'Web Profil Multi-Halaman' },
      'umkm-catalog': { base: 2500000, duration: '5 - 7 hari kerja', label: 'Web Bisnis & Katalog Produk' },
      'umkm-laravel': { base: 3800000, duration: '7 - 10 hari kerja', label: 'Fullstack Laravel Web UMKM' }
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

    scaleButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        scaleButtons.forEach(function (b) { b.classList.remove('active'); });
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

    document.querySelectorAll('.option-radio-btn[data-platform]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const platformVal = btn.getAttribute('data-platform') || '';
        const parentGrid = btn.closest('.estimator-options');
        if (parentGrid) {
          parentGrid.querySelectorAll('.option-radio-btn').forEach(function (b) { b.classList.remove('active'); });
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

    document.querySelectorAll('.addon-checkbox').forEach(function (cb) {
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
        activeAddons.forEach(function (cb) {
          total += parseInt(cb.getAttribute('data-cost') || '0', 10);
          selectedAddons.push(cb.getAttribute('data-name') || 'Add-on');
        });

        // Strict enforcement of UMKM budget boundaries: min 600k, max 5.0M
        total = Math.min(5000000, Math.max(600000, total));
      } else {
        const item = bisnisRates[currentPlatformBisnis] || bisnisRates.web;
        const scopeVal = scopeSelect ? scopeSelect.value : 'starter';
        const scopeData = bisnisMultipliers[scopeVal] || bisnisMultipliers.starter;

        total = item.base * scopeData.mult;
        durationText = scopeData.durationMod;
        platformLabel = item.label + ' (' + (scopeVal.charAt(0).toUpperCase() + scopeVal.slice(1)) + ')';

        const activeAddons = addonsBisnis ? addonsBisnis.querySelectorAll('.addon-checkbox:checked') : [];
        activeAddons.forEach(function (cb) {
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

  function initModal() {
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

    openButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
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
                options.forEach(function (o) {
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

    closeButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        close();
      });
    });

    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) {
        close();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
        close();
      }
    });

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('client-name')?.value || 'Klien';
        const service = document.getElementById('modal-service-select')?.value || 'Software Engineering Consultation';
        const notes = document.getElementById('client-notes')?.value || 'Tidak ada catatan tambahan';

        const msg = [
          'Halo Gilang Teja Krishna,',
          'Saya ingin mengajukan konsultasi teknis untuk software engineering.',
          '',
          '*Detail Konsultasi Proyek:*',
          '- Nama: ' + name,
          '- Layanan / Skala: ' + service,
          '- Ringkasan Kebutuhan: ' + notes,
          '',
          'Mohon informasi jadwal konsultasi dan alur pengerjaan berikutnya.'
        ].join('\n');

        const waPhone = '6285150771763';
        const waUrl = 'https://wa.me/' + waPhone + '?text=' + encodeURIComponent(msg);
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        close();
        form.reset();
      });
    }
  }

  function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
      const trigger = item.querySelector('.faq-question');
      if (!trigger) return;

      trigger.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');

        faqItems.forEach(function (other) {
          other.classList.remove('open');
        });

        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  }

  function bootstrap() {
    initNavigation();
    initCustomSelects();
    initEstimator();
    initModal();
    initFaq();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
