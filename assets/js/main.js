import { initEstimator } from './estimator.js';
import { initModal } from './modal.js';
import { initNavigation } from './navigation.js';
import { initFaq } from './faq.js';
import { initCustomSelects } from './select.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCustomSelects();
  initEstimator();
  initModal();
  initFaq();
});
