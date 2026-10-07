// PDF Export Controller for Gilang Teja Krishna Services Brochure
// Universal bundle compatible with file://, http://, and https:// protocols

(function (global) {
  'use strict';

  function initBrochurePdfExport() {
    var exportBtn = document.getElementById('btn-export-pdf');
    if (!exportBtn) return;

    function triggerPdfExport() {
      exportBtn.disabled = true;
      exportBtn.setAttribute('aria-busy', 'true');

      // Allow UI tick before invoking native print dialog
      setTimeout(function () {
        window.print();
      }, 120);
    }

    exportBtn.addEventListener('click', function (e) {
      e.preventDefault();
      triggerPdfExport();
    });

    window.addEventListener('beforeprint', function () {
      exportBtn.disabled = true;
    });

    window.addEventListener('afterprint', function () {
      exportBtn.disabled = false;
      exportBtn.removeAttribute('aria-busy');
    });
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initBrochurePdfExport);
    } else {
      initBrochurePdfExport();
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initBrochurePdfExport: initBrochurePdfExport };
  } else if (typeof global !== 'undefined') {
    global.initBrochurePdfExport = initBrochurePdfExport;
  }
})(typeof window !== 'undefined' ? window : this);
