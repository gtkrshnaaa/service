import { initEstimator } from './estimator.js';
import { initModal } from './modal.js';
import { initNavigation } from './navigation.js';
import { initFaq } from './faq.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initEstimator();
  initModal();
  initFaq();
});
