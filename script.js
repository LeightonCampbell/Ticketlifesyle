// Smooth scroll enhancement with focus management
function handleAnchorClick(event) {
  const anchor = event.target.closest('a[href^="#"]');
  if (!anchor) return;
  const targetId = anchor.getAttribute('href').slice(1);
  if (!targetId) return;
  const target = document.getElementById(targetId);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // Move focus after the scroll
  setTimeout(() => {
    const focusable = target.querySelector('h1, h2, h3, [tabindex="-1"]');
    (focusable || target).setAttribute('tabindex', '-1');
    (focusable || target).focus({ preventScroll: true });
  }, 300);
}

document.addEventListener('click', handleAnchorClick);

// Quote form handling (client-side only)
(function initQuoteForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;
  const statusEl = form.querySelector('.form-status');

  function setStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.remove('success', 'error');
    if (type) statusEl.classList.add(type);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const productType = formData.get('productType');
    const quantity = Number(formData.get('quantity'));

    if (!fullName || !email || !productType || !quantity || Number.isNaN(quantity) || quantity < 1) {
      setStatus('Please complete required fields and enter a valid quantity.', 'error');
      return;
    }

    // Simulate submission success (replace with real endpoint later)
    setStatus('Thank you! Your request has been received. We\'ll be in touch shortly.', 'success');
    form.reset();
  });
})();