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
      'umkm-landing': { base: 600000, duration: '1 - 3 hari kerja', label: 'Landing Page Promosi (1 Halaman)' },
      'umkm-multipage': { base: 1200000, duration: '3 - 5 hari kerja', label: 'Web Profil Usaha Multi-Halaman' },
      'umkm-catalog': { base: 2500000, duration: '5 - 7 hari kerja', label: 'Web Showcase & Katalog Produk' },
      'umkm-laravel': { base: 3800000, duration: '7 - 10 hari kerja', label: 'Sistem Web Usaha Fullstack' }
    };

    const bisnisRates = {
      web: { base: 8500000, duration: '2 - 3 weeks', label: 'Aplikasi Web & Portal Operasional' },
      mobile: { base: 12000000, duration: '3 - 4 weeks', label: 'Aplikasi Mobile Android' },
      laravel: { base: 10500000, duration: '2 - 4 weeks', label: 'Integrasi Sistem Terpusat' },
      custom: { base: 16500000, duration: '4 - 6 weeks', label: 'Paket Terpadu Web & Android' }
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

  function initWorkflow() {
    const container = document.getElementById('workflow-interactive');
    if (!container) return;

    const WORKFLOW_STAGES = [
      {
        id: 1,
        number: '01',
        eyebrow: 'Tahap 01 • Penjajakan Awal',
        title: 'Konsultasi & Pemetaan Kebutuhan',
        shortTitle: 'Konsultasi & Scope',
        duration: '1-2 Hari',
        summary: 'Diskusi mendalam via WhatsApp atau Google Meet untuk membedah kendala bisnis kamu. Kita tentukan skala solusi yang tepat (UMKM atau Bisnis). Secara default tanpa uang muka (DP): seluruh transaksi pembayaran jasa dilakukan di akhir setelah proyek selesai dan siap diserahterimakan.',
        deliverables: [
          'Analisis masalah operasional & spesifikasi kebutuhan sistem',
          'Rekomendasi solusi & pemilihan skala layanan yang realistis',
          'Estimasi biaya transparan dan kesepakatan tanpa DP di muka'
        ],
        clientRole: 'Cukup ceritakan alur bisnis dan kebutuhan fitur. Tidak ada uang muka (DP) di awal, kecuali jika disepakati bersama bahwa klien memodali hal tertentu untuk pengembangan (seperti domain atau hosting).',
        badge: 'Default Tanpa DP (Bayar di Akhir)',
        animationType: 'consultation'
      },
      {
        id: 2,
        number: '02',
        eyebrow: 'Tahap 02 • Desain Sistem',
        title: 'Perancangan Arsitektur & Roadmap Sprint',
        shortTitle: 'Desain Arsitektur',
        duration: '2-4 Hari',
        summary: 'Merancang struktur database relasional, kontrak API terpadu, dan wireframe antarmuka pengguna yang bersih dan mudah diakses sebelum proses coding dimulai.',
        deliverables: [
          'Pemodelan skema database & relasi entitas',
          'Desain wireframe alur kerja antarmuka pengguna',
          'Penyusunan backlog sprint terstruktur dengan milestone terukur'
        ],
        clientRole: 'Menyetujui ringkasan desain sistem dan rencana jadwal rilis tiap milestone.',
        badge: 'Blueprint Teruji',
        animationType: 'architecture'
      },
      {
        id: 3,
        number: '03',
        eyebrow: 'Tahap 03 • Eksekusi Pengerjaan',
        title: 'Pengerjaan Modular & Live Demo Staging',
        shortTitle: 'Pengerjaan & Demo',
        duration: '1-3 Minggu',
        summary: 'Implementasi kode bersih dengan pengetikan ketat (type-safe). Kamu mendapatkan tautan staging privat sehingga bisa memantau perkembangan software langsung di HP atau laptop.',
        deliverables: [
          'Pengembangan fitur modular per sprint secara konsisten',
          'Tautan server staging privat yang selalu aktif untuk testing',
          'Riwayat git commits transparan dengan update progres rutin'
        ],
        clientRole: 'Membuka tautan demo staging kapan saja untuk melihat fitur nyata yang selesai dikerjakan.',
        badge: 'Live Staging Aktif',
        animationType: 'development'
      },
      {
        id: 4,
        number: '04',
        eyebrow: 'Tahap 04 • Verifikasi Kualitas',
        title: 'Pengujian Menyeluruh & Uji Bersama',
        shortTitle: 'Uji Coba Bersama',
        duration: '3-5 Hari',
        summary: 'Pengujian menyeluruh untuk memastikan kestabilan sistem, audit keamanan dasar, performa responsif di berbagai ukuran layar smartphone, dan uji alur transaksi nyata.',
        deliverables: [
          'Pemeriksaan bug fungsional & verifikasi integritas data',
          'Optimasi kecepatan loading dan responsivitas layar smartphone',
          'Sesi uji coba langsung (User Acceptance Testing) oleh klien'
        ],
        clientRole: 'Mencoba langsung alur kerja sistem di perangkat pribadi dan memberikan catatan penyesuaian akhir.',
        badge: 'Bebas Bug Kritis',
        animationType: 'testing'
      },
      {
        id: 5,
        number: '05',
        eyebrow: 'Tahap 05 • Rilis & Kepemilikan',
        title: 'Peluncuran Resmi & 100% Serah Terima',
        shortTitle: 'Peluncuran & Rilis',
        duration: '1-2 Hari',
        summary: 'Penyambungan domain resmi klien, konfigurasi SSL aman, rilis sistem ke server produksi (atau paket APK Android), penyelesaian transaksi di akhir setelah uji coba tuntas, serta penyerahan 100% kepemilikan source code.',
        deliverables: [
          'Domain resmi aktif dengan sertifikat keamanan SSL HTTPS',
          '100% kepemilikan repository GitHub diserahkan ke akun klien',
          'Transaksi jasa diselesaikan di akhir setelah sistem tuntas'
        ],
        clientRole: 'Menerima akses penuh seluruh aset sistem dan mengoperasikan aplikasi secara mandiri.',
        badge: '100% Hak Milik Klien',
        animationType: 'launch'
      }
    ];

    function getVisualSvg(type) {
      if (type === 'consultation') {
        return '<svg class="wf-svg" viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sageWash1" x1="0" y1="0" x2="480" y2="300" gradientUnits="userSpaceOnUse"><stop stop-color="#5a8357" stop-opacity="0.12"/><stop offset="1" stop-color="#84a98c" stop-opacity="0.04"/></linearGradient><pattern id="gridPattern1" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="#252724" stroke-opacity="0.05" stroke-width="1"/></pattern></defs><rect width="480" height="300" rx="12" fill="url(#sageWash1)"/><rect width="480" height="300" rx="12" fill="url(#gridPattern1)"/><g class="wf-anim-card-left"><rect x="36" y="44" width="180" height="100" rx="10" fill="#ffffff" stroke="#252724" stroke-width="1.5" stroke-opacity="0.85"/><rect x="52" y="60" width="70" height="8" rx="4" fill="#5a8357"/><rect x="52" y="78" width="130" height="6" rx="3" fill="#252724" fill-opacity="0.25"/><rect x="52" y="92" width="105" height="6" rx="3" fill="#252724" fill-opacity="0.25"/><rect x="52" y="106" width="120" height="6" rx="3" fill="#252724" fill-opacity="0.25"/><circle cx="192" cy="64" r="5" fill="#5a8357"/></g><path class="wf-anim-beam" d="M 216 94 C 250 94, 250 170, 274 170" stroke="#5a8357" stroke-width="2.5" stroke-dasharray="6 6"/><circle class="wf-anim-pulse-dot" cx="245" cy="132" r="4.5" fill="#5a8357"/><g class="wf-anim-card-right"><rect x="274" y="110" width="170" height="146" rx="10" fill="#ffffff" stroke="#252724" stroke-width="1.5" stroke-opacity="0.85"/><rect x="294" y="130" width="85" height="9" rx="4.5" fill="#252724"/><g class="wf-check-item wf-item-1"><circle cx="304" cy="158" r="7" fill="#5a8357" fill-opacity="0.2"/><path d="M 300 158 L 303 161 L 308 155" stroke="#5a8357" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/><rect x="318" y="155" width="100" height="6" rx="3" fill="#252724" fill-opacity="0.6"/></g><g class="wf-check-item wf-item-2"><circle cx="304" cy="180" r="7" fill="#5a8357" fill-opacity="0.2"/><path d="M 300 180 L 303 183 L 308 177" stroke="#5a8357" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/><rect x="318" y="177" width="85" height="6" rx="3" fill="#252724" fill-opacity="0.6"/></g><g class="wf-check-item wf-item-3"><circle cx="304" cy="202" r="7" fill="#5a8357" fill-opacity="0.2"/><path d="M 300 202 L 303 205 L 308 199" stroke="#5a8357" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/><rect x="318" y="199" width="95" height="6" rx="3" fill="#252724" fill-opacity="0.6"/></g><rect x="294" y="224" width="130" height="18" rx="6" fill="#fbfbfa" stroke="#5a8357" stroke-width="1"/><text x="359" y="236" font-size="9" font-family=\'DM Sans\', sans-serif font-weight="600" fill="#5a8357" text-anchor="middle">Tanpa DP - Bayar di Akhir</text></g></svg>';
      }
      if (type === 'architecture') {
        return '<svg class="wf-svg" viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sageWash2" x1="0" y1="0" x2="480" y2="300" gradientUnits="userSpaceOnUse"><stop stop-color="#5a8357" stop-opacity="0.12"/><stop offset="1" stop-color="#cad2c5" stop-opacity="0.08"/></linearGradient><pattern id="gridPattern2" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="#252724" stroke-opacity="0.05" stroke-width="1"/></pattern></defs><rect width="480" height="300" rx="12" fill="url(#sageWash2)"/><rect width="480" height="300" rx="12" fill="url(#gridPattern2)"/><g class="wf-arch-node"><rect x="40" y="70" width="115" height="85" rx="8" fill="#ffffff" stroke="#252724" stroke-width="1.5"/><rect x="52" y="82" width="60" height="8" rx="4" fill="#252724"/><rect x="52" y="98" width="90" height="5" rx="2.5" fill="#252724" fill-opacity="0.3"/><rect x="52" y="110" width="75" height="5" rx="2.5" fill="#252724" fill-opacity="0.3"/><rect x="52" y="126" width="55" height="15" rx="4" fill="#5a8357" fill-opacity="0.15"/><text x="80" y="137" font-size="8" font-family=\'DM Sans\', sans-serif font-weight="600" fill="#5a8357" text-anchor="middle">UI Layout</text></g><path class="wf-anim-line-1" d="M 155 112 L 205 112" stroke="#5a8357" stroke-width="2" stroke-dasharray="5 5"/><circle class="wf-anim-pulse-h1" cx="180" cy="112" r="4" fill="#5a8357"/><g class="wf-arch-node"><rect x="205" y="70" width="115" height="85" rx="8" fill="#ffffff" stroke="#252724" stroke-width="1.5"/><rect x="217" y="82" width="65" height="8" rx="4" fill="#5a8357"/><rect x="217" y="98" width="90" height="5" rx="2.5" fill="#252724" fill-opacity="0.3"/><rect x="217" y="110" width="80" height="5" rx="2.5" fill="#252724" fill-opacity="0.3"/><rect x="217" y="126" width="65" height="15" rx="4" fill="#252724" fill-opacity="0.08"/><text x="250" y="137" font-size="8" font-family=\'DM Sans\', sans-serif font-weight="600" fill="#252724" text-anchor="middle">API Contracts</text></g><path class="wf-anim-line-2" d="M 262 155 L 262 185 L 340 185" stroke="#5a8357" stroke-width="2" stroke-dasharray="5 5"/><circle class="wf-anim-pulse-h2" cx="295" cy="185" r="4" fill="#5a8357"/><g class="wf-arch-node"><rect x="340" y="140" width="115" height="105" rx="8" fill="#ffffff" stroke="#252724" stroke-width="1.5"/><rect x="352" y="152" width="70" height="8" rx="4" fill="#252724"/><line x1="352" y1="170" x2="443" y2="170" stroke="#252724" stroke-opacity="0.15" stroke-width="1"/><rect x="352" y="180" width="80" height="5" rx="2.5" fill="#5a8357" fill-opacity="0.5"/><rect x="352" y="192" width="65" height="5" rx="2.5" fill="#252724" fill-opacity="0.3"/><rect x="352" y="204" width="75" height="5" rx="2.5" fill="#252724" fill-opacity="0.3"/><rect x="352" y="222" width="80" height="14" rx="4" fill="#5a8357" fill-opacity="0.15"/><text x="392" y="232" font-size="8" font-family=\'DM Sans\', sans-serif font-weight="600" fill="#5a8357" text-anchor="middle">Relational Schema</text></g></svg>';
      }
      if (type === 'development') {
        return '<svg class="wf-svg" viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sageWash3" x1="0" y1="0" x2="480" y2="300" gradientUnits="userSpaceOnUse"><stop stop-color="#5a8357" stop-opacity="0.1"/><stop offset="1" stop-color="#252724" stop-opacity="0.04"/></linearGradient><pattern id="gridPattern3" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="#252724" stroke-opacity="0.05" stroke-width="1"/></pattern></defs><rect width="480" height="300" rx="12" fill="url(#sageWash3)"/><rect width="480" height="300" rx="12" fill="url(#gridPattern3)"/><g class="wf-term-window"><rect x="34" y="44" width="210" height="190" rx="10" fill="#252724" stroke="#252724" stroke-width="1.5"/><circle cx="50" cy="58" r="4" fill="#ff5f56"/><circle cx="62" cy="58" r="4" fill="#ffbd2e"/><circle cx="74" cy="58" r="4" fill="#27c93f"/><line x1="34" y1="72" x2="244" y2="72" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1"/><text x="50" y="92" font-family="monospace" font-size="9" fill="#84a98c">&gt; git commit -m "feat: auth"</text><text x="50" y="110" font-family="monospace" font-size="9" fill="#ffffff" fill-opacity="0.7">[sprint] 12 files changed</text><text x="50" y="128" font-family="monospace" font-size="9" fill="#84a98c">&gt; pnpm build</text><text x="50" y="146" font-family="monospace" font-size="9" fill="#ffffff" fill-opacity="0.7">[ok] bundle compiled in 420ms</text><text x="50" y="164" font-family="monospace" font-size="9" fill="#5a8357">&gt; deploy: staging live</text><rect x="50" y="184" width="150" height="28" rx="6" fill="#323630"/><circle cx="64" cy="198" r="4" fill="#27c93f" class="wf-anim-blink"/><text x="76" y="201" font-family=\'DM Sans\', sans-serif font-size="9" font-weight="600" fill="#ffffff">staging.domain.my.id</text></g><g class="wf-phone-frame"><rect x="274" y="34" width="160" height="220" rx="16" fill="#ffffff" stroke="#252724" stroke-width="2"/><rect x="324" y="44" width="60" height="5" rx="2.5" fill="#252724" fill-opacity="0.2"/><rect x="290" y="60" width="70" height="8" rx="4" fill="#5a8357"/><rect x="290" y="74" width="128" height="30" rx="6" fill="#fbfbfa" stroke="#252724" stroke-opacity="0.1" stroke-width="1"/><rect x="300" y="82" width="70" height="6" rx="3" fill="#252724" fill-opacity="0.5"/><rect x="300" y="92" width="50" height="5" rx="2.5" fill="#5a8357"/><rect class="wf-anim-card-pop1" x="290" y="112" width="60" height="55" rx="6" fill="#fbfbfa" stroke="#252724" stroke-opacity="0.1" stroke-width="1"/><rect x="296" y="148" width="48" height="5" rx="2.5" fill="#252724" fill-opacity="0.4"/><rect class="wf-anim-card-pop2" x="358" y="112" width="60" height="55" rx="6" fill="#fbfbfa" stroke="#252724" stroke-opacity="0.1" stroke-width="1"/><rect x="364" y="148" width="48" height="5" rx="2.5" fill="#252724" fill-opacity="0.4"/><rect class="wf-anim-btn-pulse" x="290" y="178" width="128" height="24" rx="6" fill="#252724"/><text x="354" y="193" font-size="8" font-family=\'DM Sans\', sans-serif font-weight="600" fill="#ffffff" text-anchor="middle">Live User Preview</text><circle cx="354" cy="242" r="5" fill="#252724" fill-opacity="0.15"/></g></svg>';
      }
      if (type === 'testing') {
        return '<svg class="wf-svg" viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sageWash4" x1="0" y1="0" x2="480" y2="300" gradientUnits="userSpaceOnUse"><stop stop-color="#5a8357" stop-opacity="0.14"/><stop offset="1" stop-color="#84a98c" stop-opacity="0.05"/></linearGradient><pattern id="gridPattern4" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="#252724" stroke-opacity="0.05" stroke-width="1"/></pattern></defs><rect width="480" height="300" rx="12" fill="url(#sageWash4)"/><rect width="480" height="300" rx="12" fill="url(#gridPattern4)"/><rect x="40" y="40" width="400" height="220" rx="12" fill="#ffffff" stroke="#252724" stroke-width="1.5"/><rect x="64" y="60" width="140" height="10" rx="5" fill="#252724"/><text x="64" y="86" font-size="10" font-family=\'DM Sans\', sans-serif font-weight="600" fill="#5a8357">Automated Verification &amp; Security Checks</text><g class="wf-metric-row wf-m1"><rect x="64" y="102" width="352" height="32" rx="6" fill="#fbfbfa" stroke="#252724" stroke-opacity="0.08" stroke-width="1"/><circle cx="82" cy="118" r="8" fill="#5a8357" fill-opacity="0.2"/><path d="M 78 118 L 81 121 L 86 115" stroke="#5a8357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><text x="100" y="122" font-size="9" font-family=\'DM Sans\', sans-serif font-weight="600" fill="#252724">Integrasi Alur Transaksi &amp; WhatsApp</text><text x="390" y="122" font-size="9" font-family=\'DM Sans\', sans-serif font-weight="700" fill="#5a8357" text-anchor="end">PASSED (100%)</text></g><g class="wf-metric-row wf-m2"><rect x="64" y="142" width="352" height="32" rx="6" fill="#fbfbfa" stroke="#252724" stroke-opacity="0.08" stroke-width="1"/><circle cx="82" cy="158" r="8" fill="#5a8357" fill-opacity="0.2"/><path d="M 78 158 L 81 161 L 86 155" stroke="#5a8357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><text x="100" y="162" font-size="9" font-family=\'DM Sans\', sans-serif font-weight="600" fill="#252724">Responsivitas Multi-Device (Mobile &amp; Desktop)</text><text x="390" y="162" font-size="9" font-family=\'DM Sans\', sans-serif font-weight="700" fill="#5a8357" text-anchor="end">PASSED (0 Overflow)</text></g><g class="wf-metric-row wf-m3"><rect x="64" y="182" width="352" height="32" rx="6" fill="#fbfbfa" stroke="#252724" stroke-opacity="0.08" stroke-width="1"/><circle cx="82" cy="198" r="8" fill="#5a8357" fill-opacity="0.2"/><path d="M 78 198 L 81 201 L 86 195" stroke="#5a8357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><text x="100" y="202" font-size="9" font-family=\'DM Sans\', sans-serif font-weight="600" fill="#252724">Audit Keamanan &amp; Integritas Data</text><text x="390" y="202" font-size="9" font-family=\'DM Sans\', sans-serif font-weight="700" fill="#5a8357" text-anchor="end">PASSED (Zero Breach)</text></g><rect x="180" y="224" width="130" height="22" rx="6" fill="#5a8357" fill-opacity="0.12" stroke="#5a8357" stroke-width="1"/><text x="245" y="238" font-size="8.5" font-family=\'DM Sans\', sans-serif font-weight="700" fill="#5a8357" text-anchor="middle">Uji Coba Klien Disetujui</text></svg>';
      }
      if (type === 'launch') {
        return '<svg class="wf-svg" viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sageWash5" x1="0" y1="0" x2="480" y2="300" gradientUnits="userSpaceOnUse"><stop stop-color="#5a8357" stop-opacity="0.16"/><stop offset="1" stop-color="#84a98c" stop-opacity="0.08"/></linearGradient><pattern id="gridPattern5" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="#252724" stroke-opacity="0.05" stroke-width="1"/></pattern></defs><rect width="480" height="300" rx="12" fill="url(#sageWash5)"/><rect width="480" height="300" rx="12" fill="url(#gridPattern5)"/><g class="wf-url-bar"><rect x="50" y="40" width="380" height="42" rx="10" fill="#ffffff" stroke="#252724" stroke-width="1.5"/><rect x="66" y="53" width="16" height="15" rx="3" fill="#5a8357"/><path d="M 70 53 V 49 C 70 46.8 71.8 45 74 45 C 76.2 45 78 46.8 78 49 V 53" stroke="#5a8357" stroke-width="2" stroke-linecap="round"/><text x="92" y="65" font-family=\'DM Sans\', sans-serif font-size="10" font-weight="600" fill="#252724">https://brandkamu.com</text><rect x="350" y="49" width="68" height="24" rx="6" fill="#252724"/><text x="384" y="64" font-family=\'DM Sans\', sans-serif font-size="8.5" font-weight="700" fill="#ffffff" text-anchor="middle">ONLINE</text></g><g class="wf-handover-box"><rect x="50" y="104" width="230" height="150" rx="12" fill="#ffffff" stroke="#252724" stroke-width="1.5"/><rect x="70" y="124" width="120" height="10" rx="5" fill="#252724"/><rect x="70" y="142" width="170" height="6" rx="3" fill="#252724" fill-opacity="0.3"/><rect x="70" y="154" width="150" height="6" rx="3" fill="#252724" fill-opacity="0.3"/><rect x="70" y="174" width="190" height="60" rx="8" fill="#fbfbfa" stroke="#5a8357" stroke-width="1" stroke-dasharray="4 4"/><text x="82" y="196" font-family="monospace" font-size="9" font-weight="600" fill="#5a8357">github.com/client-org</text><text x="82" y="214" font-family=\'DM Sans\', sans-serif font-size="8.5" fill="#252724" fill-opacity="0.7">100% Repository &amp; Asset Ownership</text></g><g class="wf-badge-launch"><rect x="300" y="104" width="130" height="150" rx="12" fill="#252724" stroke="#252724" stroke-width="1.5"/><circle cx="365" cy="150" r="28" fill="#5a8357" fill-opacity="0.25"/><circle cx="365" cy="150" r="18" fill="#5a8357"/><path d="M 358 150 L 363 155 L 373 145" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><text x="365" y="198" font-family=\'Fraunces\', serif font-size="12" font-weight="600" fill="#ffffff" text-anchor="middle">Resmi Aktif</text><text x="365" y="216" font-family=\'DM Sans\', sans-serif font-size="8" fill="#ffffff" fill-opacity="0.75" text-anchor="middle">Garansi Siap Pakai</text></g></svg>';
      }
      return '';
    }

    let currentStageIndex = 0;
    let isAutoplayActive = true;
    let progressTimer = null;
    let isIntersecting = false;
    const AUTOPLAY_DURATION_MS = 5000;

    const tabs = container.querySelectorAll('.wf-step-tab');
    const stageEyebrow = container.querySelector('#wf-stage-eyebrow');
    const stageTitle = container.querySelector('#wf-stage-title');
    const stageDuration = container.querySelector('#wf-stage-duration');
    const stageSummary = container.querySelector('#wf-stage-summary');
    const stageDeliverables = container.querySelector('#wf-stage-deliverables');
    const stageClientRole = container.querySelector('#wf-stage-client-role');
    const stageBadge = container.querySelector('#wf-stage-badge');
    const visualSlot = container.querySelector('#wf-visual-slot');
    const prevBtn = container.querySelector('#wf-prev-btn');
    const nextBtn = container.querySelector('#wf-next-btn');
    const autoplayToggleBtn = container.querySelector('#wf-autoplay-toggle');
    const progressBar = container.querySelector('#wf-progress-bar');
    const ctaBtn = container.querySelector('#wf-cta-btn');

    function renderStage(index) {
      if (index < 0 || index >= WORKFLOW_STAGES.length) return;
      currentStageIndex = index;
      const stage = WORKFLOW_STAGES[index];

      tabs.forEach(function (tab, i) {
        const isSelected = i === index;
        tab.classList.toggle('active', isSelected);
        tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        tab.setAttribute('tabindex', isSelected ? '0' : '-1');
      });

      if (stageEyebrow) stageEyebrow.textContent = stage.eyebrow;
      if (stageTitle) stageTitle.textContent = stage.title;
      if (stageDuration) stageDuration.textContent = stage.duration;
      if (stageSummary) stageSummary.textContent = stage.summary;
      if (stageClientRole) stageClientRole.textContent = stage.clientRole;
      if (stageBadge) stageBadge.textContent = stage.badge;

      if (stageDeliverables) {
        stageDeliverables.innerHTML = stage.deliverables
          .map(function (item) {
            return '<li class="wf-deliverable-item"><svg class="wf-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>' + item + '</span></li>';
          })
          .join('');
      }

      if (visualSlot) {
        visualSlot.innerHTML = getVisualSvg(stage.animationType);
      }

      if (ctaBtn) {
        ctaBtn.setAttribute('data-workflow-stage', stage.title);
      }

      resetProgressBar();
    }

    function resetProgressBar() {
      if (progressBar) {
        progressBar.style.transition = 'none';
        progressBar.style.transformOrigin = 'left';
        progressBar.style.transform = 'scaleX(0)';
      }
    }

    function nextStage() {
      const nextIdx = (currentStageIndex + 1) % WORKFLOW_STAGES.length;
      renderStage(nextIdx);
    }

    function prevStage() {
      const prevIdx = (currentStageIndex - 1 + WORKFLOW_STAGES.length) % WORKFLOW_STAGES.length;
      renderStage(prevIdx);
    }

    function startAutoplay() {
      stopAutoplay();
      isAutoplayActive = true;
      updateAutoplayUi();

      if (!isIntersecting || (typeof document !== 'undefined' && document.hidden)) {
        return;
      }

      if (progressBar) {
        progressBar.style.transition = 'none';
        progressBar.style.transformOrigin = 'left';
        progressBar.style.transform = 'scaleX(0)';
        void progressBar.offsetWidth;
        progressBar.style.transition = 'transform ' + AUTOPLAY_DURATION_MS + 'ms linear';
        progressBar.style.transform = 'scaleX(1)';
      }

      progressTimer = setTimeout(function () {
        nextStage();
        if (isAutoplayActive && isIntersecting) {
          startAutoplay();
        }
      }, AUTOPLAY_DURATION_MS);
    }

    function stopAutoplay() {
      if (progressTimer) {
        clearTimeout(progressTimer);
        progressTimer = null;
      }
      if (progressBar) {
        const computed = window.getComputedStyle(progressBar);
        const matrix = computed.transform;
        progressBar.style.transition = 'none';
        if (matrix && matrix !== 'none') {
          progressBar.style.transform = matrix;
        }
      }
    }

    function updateAutoplayUi() {
      if (!autoplayToggleBtn) return;
      autoplayToggleBtn.setAttribute('aria-pressed', isAutoplayActive ? 'true' : 'false');
      const labelSpan = autoplayToggleBtn.querySelector('.wf-autoplay-label');
      if (labelSpan) {
        labelSpan.textContent = isAutoplayActive ? 'Jeda Otomatis' : 'Putar Alur';
      }
      const icon = autoplayToggleBtn.querySelector('.wf-autoplay-icon');
      if (icon) {
        if (isAutoplayActive) {
          icon.innerHTML = '<rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect>';
        } else {
          icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
        }
      }
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        renderStage(index);
        if (isAutoplayActive) startAutoplay();
      });

      tab.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIdx = (index + 1) % WORKFLOW_STAGES.length;
          tabs[nextIdx].focus();
          renderStage(nextIdx);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIdx = (index - 1 + WORKFLOW_STAGES.length) % WORKFLOW_STAGES.length;
          tabs[prevIdx].focus();
          renderStage(prevIdx);
        }
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevStage();
        if (isAutoplayActive) startAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextStage();
        if (isAutoplayActive) startAutoplay();
      });
    }

    const nextBtn2 = container.querySelector('#wf-next-btn-2');
    if (nextBtn2) {
      nextBtn2.addEventListener('click', function () {
        nextStage();
        if (isAutoplayActive) startAutoplay();
      });
    }

    if (autoplayToggleBtn) {
      autoplayToggleBtn.addEventListener('click', function () {
        if (isAutoplayActive) {
          isAutoplayActive = false;
          stopAutoplay();
          resetProgressBar();
          updateAutoplayUi();
        } else {
          startAutoplay();
        }
      });
    }

    container.addEventListener('mouseenter', function () {
      if (isAutoplayActive && progressTimer) {
        stopAutoplay();
      }
    });

    container.addEventListener('mouseleave', function () {
      if (isAutoplayActive && !progressTimer && isIntersecting) {
        startAutoplay();
      }
    });

    // Viewport IntersectionObserver to conserve mobile CPU and battery
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          isIntersecting = entry.isIntersecting;
          if (isIntersecting && isAutoplayActive) {
            startAutoplay();
          } else {
            stopAutoplay();
          }
        });
      }, { threshold: 0.15 });
      observer.observe(container);
    } else {
      isIntersecting = true;
    }

    // Page Visibility API to pause animations when tab/app is hidden
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          stopAutoplay();
        } else if (isAutoplayActive && isIntersecting) {
          startAutoplay();
        }
      }, { passive: true });
    }

    // Check prefers-reduced-motion
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      isAutoplayActive = false;
      updateAutoplayUi();
    }

    // Initial Render
    renderStage(0);
  }

  function bootstrap() {
    initNavigation();
    initCustomSelects();
    initEstimator();
    initModal();
    initFaq();
    initWorkflow();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
