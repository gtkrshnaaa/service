// Interactive Collaboration Workflow Pipeline Module
// Production-grade ES module & vanilla JS controller for Gilang Teja Krishna Services

export const WORKFLOW_STAGES = [
  {
    id: 1,
    number: '01',
    eyebrow: 'Tahap 01 • Penjajakan Awal',
    title: 'Konsultasi & Pemetaan Kebutuhan',
    shortTitle: 'Konsultasi & Scope',
    duration: '1-2 Hari',
    summary: 'Diskusi mendalam via WhatsApp atau Google Meet untuk membedah kendala bisnis kamu. Kita tentukan skala solusi yang tepat (UMKM atau Bisnis) tanpa biaya komitmen di muka.',
    deliverables: [
      'Analisis masalah operasional & spesifikasi kebutuhan sistem',
      'Rekomendasi solusi & pemilihan skala layanan yang realistis',
      'Estimasi biaya transparan dan estimasi timeline pengerjaan terikat'
    ],
    clientRole: 'Ceritakan alur kerja saat ini dan fitur yang ingin diwujudkan melalui chat atau diskusi santai.',
    badge: 'Bebas Biaya di Muka',
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
    summary: 'Penyambungan domain resmi klien, konfigurasi SSL aman, rilis sistem ke server produksi (atau paket APK Android), serta penyerahan penuh seluruh source code.',
    deliverables: [
      'Domain resmi aktif dengan sertifikat keamanan SSL HTTPS',
      '100% kepemilikan repository GitHub diserahkan ke akun klien',
      'Dokumentasi panduan pengoperasian & garansi pemeliharaan awal'
    ],
    clientRole: 'Menerima akses penuh seluruh aset sistem dan mengoperasikan aplikasi secara mandiri.',
    badge: '100% Hak Milik Klien',
    animationType: 'launch'
  }
];

export function getVisualSvg(animationType) {
  switch (animationType) {
    case 'consultation':
      return `
        <svg class="wf-svg" viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sageWash1" x1="0" y1="0" x2="480" y2="300" gradientUnits="userSpaceOnUse">
              <stop stop-color="#5a8357" stop-opacity="0.12"/>
              <stop offset="1" stop-color="#84a98c" stop-opacity="0.04"/>
            </linearGradient>
            <pattern id="gridPattern1" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#252724" stroke-opacity="0.05" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="480" height="300" rx="12" fill="url(#sageWash1)"/>
          <rect width="480" height="300" rx="12" fill="url(#gridPattern1)"/>
          
          <!-- Client Inquiry Card -->
          <g class="wf-anim-card-left">
            <rect x="36" y="44" width="180" height="100" rx="10" fill="#ffffff" stroke="#252724" stroke-width="1.5" stroke-opacity="0.85"/>
            <rect x="52" y="60" width="70" height="8" rx="4" fill="#5a8357"/>
            <rect x="52" y="78" width="130" height="6" rx="3" fill="#252724" fill-opacity="0.25"/>
            <rect x="52" y="92" width="105" height="6" rx="3" fill="#252724" fill-opacity="0.25"/>
            <rect x="52" y="106" width="120" height="6" rx="3" fill="#252724" fill-opacity="0.25"/>
            <circle cx="192" cy="64" r="5" fill="#5a8357"/>
          </g>

          <!-- Interactive Connection Beam -->
          <path class="wf-anim-beam" d="M 216 94 C 250 94, 250 170, 274 170" stroke="#5a8357" stroke-width="2.5" stroke-dasharray="6 6"/>
          <circle class="wf-anim-pulse-dot" cx="245" cy="132" r="4.5" fill="#5a8357"/>

          <!-- Scope & Agreement Output Card -->
          <g class="wf-anim-card-right">
            <rect x="274" y="110" width="170" height="146" rx="10" fill="#ffffff" stroke="#252724" stroke-width="1.5" stroke-opacity="0.85"/>
            <rect x="294" y="130" width="85" height="9" rx="4.5" fill="#252724"/>
            
            <!-- Checklist items -->
            <g class="wf-check-item wf-item-1">
              <circle cx="304" cy="158" r="7" fill="#5a8357" fill-opacity="0.2"/>
              <path d="M 300 158 L 303 161 L 308 155" stroke="#5a8357" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
              <rect x="318" y="155" width="100" height="6" rx="3" fill="#252724" fill-opacity="0.6"/>
            </g>
            <g class="wf-check-item wf-item-2">
              <circle cx="304" cy="180" r="7" fill="#5a8357" fill-opacity="0.2"/>
              <path d="M 300 180 L 303 183 L 308 177" stroke="#5a8357" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
              <rect x="318" y="177" width="85" height="6" rx="3" fill="#252724" fill-opacity="0.6"/>
            </g>
            <g class="wf-check-item wf-item-3">
              <circle cx="304" cy="202" r="7" fill="#5a8357" fill-opacity="0.2"/>
              <path d="M 300 202 L 303 205 L 308 199" stroke="#5a8357" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
              <rect x="318" y="199" width="95" height="6" rx="3" fill="#252724" fill-opacity="0.6"/>
            </g>
            
            <rect x="294" y="224" width="130" height="18" rx="6" fill="#fbfbfa" stroke="#5a8357" stroke-width="1"/>
            <text x="359" y="236" font-size="9" font-family="'DM Sans', sans-serif" font-weight="600" fill="#5a8357" text-anchor="middle">Milestone &amp; Budget Fixed</text>
          </g>
        </svg>
      `;

    case 'architecture':
      return `
        <svg class="wf-svg" viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sageWash2" x1="0" y1="0" x2="480" y2="300" gradientUnits="userSpaceOnUse">
              <stop stop-color="#5a8357" stop-opacity="0.12"/>
              <stop offset="1" stop-color="#cad2c5" stop-opacity="0.08"/>
            </linearGradient>
            <pattern id="gridPattern2" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#252724" stroke-opacity="0.05" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="480" height="300" rx="12" fill="url(#sageWash2)"/>
          <rect width="480" height="300" rx="12" fill="url(#gridPattern2)"/>

          <!-- Architecture Node: Client Layer -->
          <g class="wf-arch-node">
            <rect x="40" y="70" width="115" height="85" rx="8" fill="#ffffff" stroke="#252724" stroke-width="1.5"/>
            <rect x="52" y="82" width="60" height="8" rx="4" fill="#252724"/>
            <rect x="52" y="98" width="90" height="5" rx="2.5" fill="#252724" fill-opacity="0.3"/>
            <rect x="52" y="110" width="75" height="5" rx="2.5" fill="#252724" fill-opacity="0.3"/>
            <rect x="52" y="126" width="55" height="15" rx="4" fill="#5a8357" fill-opacity="0.15"/>
            <text x="80" y="137" font-size="8" font-family="'DM Sans', sans-serif" font-weight="600" fill="#5a8357" text-anchor="middle">UI Layout</text>
          </g>

          <!-- Interconnect 1 -->
          <path class="wf-anim-line-1" d="M 155 112 L 205 112" stroke="#5a8357" stroke-width="2" stroke-dasharray="5 5"/>
          <circle class="wf-anim-pulse-h1" cx="180" cy="112" r="4" fill="#5a8357"/>

          <!-- Architecture Node: API / Logic Engine -->
          <g class="wf-arch-node">
            <rect x="205" y="70" width="115" height="85" rx="8" fill="#ffffff" stroke="#252724" stroke-width="1.5"/>
            <rect x="217" y="82" width="65" height="8" rx="4" fill="#5a8357"/>
            <rect x="217" y="98" width="90" height="5" rx="2.5" fill="#252724" fill-opacity="0.3"/>
            <rect x="217" y="110" width="80" height="5" rx="2.5" fill="#252724" fill-opacity="0.3"/>
            <rect x="217" y="126" width="65" height="15" rx="4" fill="#252724" fill-opacity="0.08"/>
            <text x="250" y="137" font-size="8" font-family="'DM Sans', sans-serif" font-weight="600" fill="#252724" text-anchor="middle">API Contracts</text>
          </g>

          <!-- Interconnect 2 -->
          <path class="wf-anim-line-2" d="M 262 155 L 262 185 L 340 185" stroke="#5a8357" stroke-width="2" stroke-dasharray="5 5"/>
          <circle class="wf-anim-pulse-h2" cx="295" cy="185" r="4" fill="#5a8357"/>

          <!-- Architecture Node: Database Schema -->
          <g class="wf-arch-node">
            <rect x="340" y="140" width="115" height="105" rx="8" fill="#ffffff" stroke="#252724" stroke-width="1.5"/>
            <rect x="352" y="152" width="70" height="8" rx="4" fill="#252724"/>
            <line x1="352" y1="170" x2="443" y2="170" stroke="#252724" stroke-opacity="0.15" stroke-width="1"/>
            <rect x="352" y="180" width="80" height="5" rx="2.5" fill="#5a8357" fill-opacity="0.5"/>
            <rect x="352" y="192" width="65" height="5" rx="2.5" fill="#252724" fill-opacity="0.3"/>
            <rect x="352" y="204" width="75" height="5" rx="2.5" fill="#252724" fill-opacity="0.3"/>
            <rect x="352" y="222" width="80" height="14" rx="4" fill="#5a8357" fill-opacity="0.15"/>
            <text x="392" y="232" font-size="8" font-family="'DM Sans', sans-serif" font-weight="600" fill="#5a8357" text-anchor="middle">Relational Schema</text>
          </g>
        </svg>
      `;

    case 'development':
      return `
        <svg class="wf-svg" viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sageWash3" x1="0" y1="0" x2="480" y2="300" gradientUnits="userSpaceOnUse">
              <stop stop-color="#5a8357" stop-opacity="0.1"/>
              <stop offset="1" stop-color="#252724" stop-opacity="0.04"/>
            </linearGradient>
            <pattern id="gridPattern3" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#252724" stroke-opacity="0.05" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="480" height="300" rx="12" fill="url(#sageWash3)"/>
          <rect width="480" height="300" rx="12" fill="url(#gridPattern3)"/>

          <!-- Terminal / Code Editor Window -->
          <g class="wf-term-window">
            <rect x="34" y="44" width="210" height="190" rx="10" fill="#252724" stroke="#252724" stroke-width="1.5"/>
            <circle cx="50" cy="58" r="4" fill="#ff5f56"/>
            <circle cx="62" cy="58" r="4" fill="#ffbd2e"/>
            <circle cx="74" cy="58" r="4" fill="#27c93f"/>
            <line x1="34" y1="72" x2="244" y2="72" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1"/>
            
            <text x="50" y="92" font-family="monospace" font-size="9" fill="#84a98c">&gt; git commit -m "feat: auth"</text>
            <text x="50" y="110" font-family="monospace" font-size="9" fill="#ffffff" fill-opacity="0.7">[sprint] 12 files changed</text>
            <text x="50" y="128" font-family="monospace" font-size="9" fill="#84a98c">&gt; pnpm build</text>
            <text x="50" y="146" font-family="monospace" font-size="9" fill="#ffffff" fill-opacity="0.7">[ok] bundle compiled in 420ms</text>
            <text x="50" y="164" font-family="monospace" font-size="9" fill="#5a8357">&gt; deploy: staging live</text>
            
            <rect x="50" y="184" width="150" height="28" rx="6" fill="#323630"/>
            <circle cx="64" cy="198" r="4" fill="#27c93f" class="wf-anim-blink"/>
            <text x="76" y="201" font-family="'DM Sans', sans-serif" font-size="9" font-weight="600" fill="#ffffff">staging.domain.my.id</text>
          </g>

          <!-- Interactive Mobile Frame with Live Components -->
          <g class="wf-phone-frame">
            <rect x="274" y="34" width="160" height="220" rx="16" fill="#ffffff" stroke="#252724" stroke-width="2"/>
            <rect x="324" y="44" width="60" height="5" rx="2.5" fill="#252724" fill-opacity="0.2"/>
            
            <!-- App Content Header -->
            <rect x="290" y="60" width="70" height="8" rx="4" fill="#5a8357"/>
            <rect x="290" y="74" width="128" height="30" rx="6" fill="#fbfbfa" stroke="#252724" stroke-opacity="0.1" stroke-width="1"/>
            <rect x="300" y="82" width="70" height="6" rx="3" fill="#252724" fill-opacity="0.5"/>
            <rect x="300" y="92" width="50" height="5" rx="2.5" fill="#5a8357"/>

            <!-- App Grid Cards -->
            <rect class="wf-anim-card-pop1" x="290" y="112" width="60" height="55" rx="6" fill="#fbfbfa" stroke="#252724" stroke-opacity="0.1" stroke-width="1"/>
            <rect x="296" y="148" width="48" height="5" rx="2.5" fill="#252724" fill-opacity="0.4"/>

            <rect class="wf-anim-card-pop2" x="358" y="112" width="60" height="55" rx="6" fill="#fbfbfa" stroke="#252724" stroke-opacity="0.1" stroke-width="1"/>
            <rect x="364" y="148" width="48" height="5" rx="2.5" fill="#252724" fill-opacity="0.4"/>

            <!-- Action Button -->
            <rect class="wf-anim-btn-pulse" x="290" y="178" width="128" height="24" rx="6" fill="#252724"/>
            <text x="354" y="193" font-size="8" font-family="'DM Sans', sans-serif" font-weight="600" fill="#ffffff" text-anchor="middle">Live User Preview</text>
            
            <circle cx="354" cy="242" r="5" fill="#252724" fill-opacity="0.15"/>
          </g>
        </svg>
      `;

    case 'testing':
      return `
        <svg class="wf-svg" viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sageWash4" x1="0" y1="0" x2="480" y2="300" gradientUnits="userSpaceOnUse">
              <stop stop-color="#5a8357" stop-opacity="0.14"/>
              <stop offset="1" stop-color="#84a98c" stop-opacity="0.05"/>
            </linearGradient>
            <pattern id="gridPattern4" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#252724" stroke-opacity="0.05" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="480" height="300" rx="12" fill="url(#sageWash4)"/>
          <rect width="480" height="300" rx="12" fill="url(#gridPattern4)"/>

          <!-- Test Suite Diagnostic Frame -->
          <rect x="40" y="40" width="400" height="220" rx="12" fill="#ffffff" stroke="#252724" stroke-width="1.5"/>
          
          <rect x="64" y="60" width="140" height="10" rx="5" fill="#252724"/>
          <text x="64" y="86" font-size="10" font-family="'DM Sans', sans-serif" font-weight="600" fill="#5a8357">Automated Verification &amp; Security Checks</text>

          <!-- Gauge Item 1: Performance -->
          <g class="wf-metric-row wf-m1">
            <rect x="64" y="102" width="352" height="32" rx="6" fill="#fbfbfa" stroke="#252724" stroke-opacity="0.08" stroke-width="1"/>
            <circle cx="82" cy="118" r="8" fill="#5a8357" fill-opacity="0.2"/>
            <path d="M 78 118 L 81 121 L 86 115" stroke="#5a8357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="100" y="122" font-size="9" font-family="'DM Sans', sans-serif" font-weight="600" fill="#252724">Integrasi Alur Transaksi &amp; WhatsApp</text>
            <text x="390" y="122" font-size="9" font-family="'DM Sans', sans-serif" font-weight="700" fill="#5a8357" text-anchor="end">PASSED (100%)</text>
          </g>

          <!-- Gauge Item 2: Mobile Responsive -->
          <g class="wf-metric-row wf-m2">
            <rect x="64" y="142" width="352" height="32" rx="6" fill="#fbfbfa" stroke="#252724" stroke-opacity="0.08" stroke-width="1"/>
            <circle cx="82" cy="158" r="8" fill="#5a8357" fill-opacity="0.2"/>
            <path d="M 78 158 L 81 161 L 86 155" stroke="#5a8357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="100" y="162" font-size="9" font-family="'DM Sans', sans-serif" font-weight="600" fill="#252724">Responsivitas Multi-Device (Mobile &amp; Desktop)</text>
            <text x="390" y="162" font-size="9" font-family="'DM Sans', sans-serif" font-weight="700" fill="#5a8357" text-anchor="end">PASSED (0 Overflow)</text>
          </g>

          <!-- Gauge Item 3: Latency & Speed -->
          <g class="wf-metric-row wf-m3">
            <rect x="64" y="182" width="352" height="32" rx="6" fill="#fbfbfa" stroke="#252724" stroke-opacity="0.08" stroke-width="1"/>
            <circle cx="82" cy="198" r="8" fill="#5a8357" fill-opacity="0.2"/>
            <path d="M 78 198 L 81 201 L 86 195" stroke="#5a8357" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="100" y="202" font-size="9" font-family="'DM Sans', sans-serif" font-weight="600" fill="#252724">Audit Keamanan &amp; Integritas Data</text>
            <text x="390" y="202" font-size="9" font-family="'DM Sans', sans-serif" font-weight="700" fill="#5a8357" text-anchor="end">PASSED (Zero Breach)</text>
          </g>

          <!-- Client Approval Stamp -->
          <rect x="180" y="224" width="130" height="22" rx="6" fill="#5a8357" fill-opacity="0.12" stroke="#5a8357" stroke-width="1"/>
          <text x="245" y="238" font-size="8.5" font-family="'DM Sans', sans-serif" font-weight="700" fill="#5a8357" text-anchor="middle">Uji Coba Klien Disetujui</text>
        </svg>
      `;

    case 'launch':
      return `
        <svg class="wf-svg" viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sageWash5" x1="0" y1="0" x2="480" y2="300" gradientUnits="userSpaceOnUse">
              <stop stop-color="#5a8357" stop-opacity="0.16"/>
              <stop offset="1" stop-color="#84a98c" stop-opacity="0.08"/>
            </linearGradient>
            <pattern id="gridPattern5" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#252724" stroke-opacity="0.05" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="480" height="300" rx="12" fill="url(#sageWash5)"/>
          <rect width="480" height="300" rx="12" fill="url(#gridPattern5)"/>

          <!-- Production URL Bar -->
          <g class="wf-url-bar">
            <rect x="50" y="40" width="380" height="42" rx="10" fill="#ffffff" stroke="#252724" stroke-width="1.5"/>
            <!-- Lock Icon -->
            <rect x="66" y="53" width="16" height="15" rx="3" fill="#5a8357"/>
            <path d="M 70 53 V 49 C 70 46.8 71.8 45 74 45 C 76.2 45 78 46.8 78 49 V 53" stroke="#5a8357" stroke-width="2" stroke-linecap="round"/>
            <text x="92" y="65" font-family="'DM Sans', sans-serif" font-size="10" font-weight="600" fill="#252724">https://brandkamu.com</text>
            <rect x="350" y="49" width="68" height="24" rx="6" fill="#252724"/>
            <text x="384" y="64" font-family="'DM Sans', sans-serif" font-size="8.5" font-weight="700" fill="#ffffff" text-anchor="middle">ONLINE</text>
          </g>

          <!-- Handover Key & Repository Box -->
          <g class="wf-handover-box">
            <rect x="50" y="104" width="230" height="150" rx="12" fill="#ffffff" stroke="#252724" stroke-width="1.5"/>
            <rect x="70" y="124" width="120" height="10" rx="5" fill="#252724"/>
            <rect x="70" y="142" width="170" height="6" rx="3" fill="#252724" fill-opacity="0.3"/>
            <rect x="70" y="154" width="150" height="6" rx="3" fill="#252724" fill-opacity="0.3"/>
            
            <rect x="70" y="174" width="190" height="60" rx="8" fill="#fbfbfa" stroke="#5a8357" stroke-width="1" stroke-dasharray="4 4"/>
            <text x="82" y="196" font-family="monospace" font-size="9" font-weight="600" fill="#5a8357">github.com/client-org</text>
            <text x="82" y="214" font-family="'DM Sans', sans-serif" font-size="8.5" fill="#252724" fill-opacity="0.7">100% Repository &amp; Asset Ownership</text>
          </g>

          <!-- Launch Certificate Badge -->
          <g class="wf-badge-launch">
            <rect x="300" y="104" width="130" height="150" rx="12" fill="#252724" stroke="#252724" stroke-width="1.5"/>
            <circle cx="365" cy="150" r="28" fill="#5a8357" fill-opacity="0.25"/>
            <circle cx="365" cy="150" r="18" fill="#5a8357"/>
            <path d="M 358 150 L 363 155 L 373 145" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="365" y="198" font-family="'Fraunces', serif" font-size="12" font-weight="600" fill="#ffffff" text-anchor="middle">Resmi Aktif</text>
            <text x="365" y="216" font-family="'DM Sans', sans-serif" font-size="8" fill="#ffffff" fill-opacity="0.75" text-anchor="middle">Garansi Siap Pakai</text>
          </g>
        </svg>
      `;

    default:
      return '';
  }
}

export function initWorkflow() {
  const container = document.getElementById('workflow-interactive');
  if (!container) return;

  let currentStageIndex = 0;
  let autoplayInterval = null;
  let isAutoplayActive = true;
  let progressTimer = null;
  let progressPercent = 0;
  const AUTOPLAY_DURATION_MS = 5000;
  const TICK_INTERVAL_MS = 50;

  // Elements
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

    // Update Tabs
    tabs.forEach((tab, i) => {
      const isSelected = i === index;
      tab.classList.toggle('active', isSelected);
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      tab.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    // Animate Text Update
    if (stageEyebrow) stageEyebrow.textContent = stage.eyebrow;
    if (stageTitle) stageTitle.textContent = stage.title;
    if (stageDuration) stageDuration.textContent = stage.duration;
    if (stageSummary) stageSummary.textContent = stage.summary;
    if (stageClientRole) stageClientRole.textContent = stage.clientRole;
    if (stageBadge) stageBadge.textContent = stage.badge;

    // Render Deliverables
    if (stageDeliverables) {
      stageDeliverables.innerHTML = stage.deliverables
        .map(
          item => `
          <li class="wf-deliverable-item">
            <svg class="wf-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${item}</span>
          </li>
        `
        )
        .join('');
    }

    // Render Dynamic Animated SVG
    if (visualSlot) {
      visualSlot.innerHTML = getVisualSvg(stage.animationType);
    }

    // Update CTA Button Preselect
    if (ctaBtn) {
      ctaBtn.setAttribute('data-workflow-stage', stage.title);
    }

    // Reset Progress Bar
    resetProgressBar();
  }

  function resetProgressBar() {
    progressPercent = 0;
    if (progressBar) {
      progressBar.style.width = '0%';
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

    progressTimer = setInterval(() => {
      progressPercent += (TICK_INTERVAL_MS / AUTOPLAY_DURATION_MS) * 100;
      if (progressBar) {
        progressBar.style.width = `${Math.min(progressPercent, 100)}%`;
      }
      if (progressPercent >= 100) {
        nextStage();
      }
    }, TICK_INTERVAL_MS);
  }

  function stopAutoplay() {
    if (progressTimer) {
      clearInterval(progressTimer);
      progressTimer = null;
    }
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
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
        // Pause icon
        icon.innerHTML = `
          <rect x="6" y="4" width="4" height="16" rx="1"></rect>
          <rect x="14" y="4" width="4" height="16" rx="1"></rect>
        `;
      } else {
        // Play icon
        icon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
      }
    }
  }

  // Attach tab events
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      renderStage(index);
      // When user clicks manually, pause or reset timer
      if (isAutoplayActive) {
        startAutoplay();
      }
    });

    tab.addEventListener('keydown', e => {
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

  // Controls
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevStage();
      if (isAutoplayActive) startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextStage();
      if (isAutoplayActive) startAutoplay();
    });
  }

  const nextBtn2 = container.querySelector('#wf-next-btn-2');
  if (nextBtn2) {
    nextBtn2.addEventListener('click', () => {
      nextStage();
      if (isAutoplayActive) startAutoplay();
    });
  }

  if (autoplayToggleBtn) {
    autoplayToggleBtn.addEventListener('click', () => {
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

  // Pause on hover
  container.addEventListener('mouseenter', () => {
    if (isAutoplayActive && progressTimer) {
      clearInterval(progressTimer);
      progressTimer = null;
    }
  });

  container.addEventListener('mouseleave', () => {
    if (isAutoplayActive && !progressTimer) {
      startAutoplay();
    }
  });

  // Initial Render
  renderStage(0);
  startAutoplay();
}
