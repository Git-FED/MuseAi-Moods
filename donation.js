(() => {
  const gate = document.querySelector('#age-gate');
  const content = document.querySelector('#donation-content');
  const confirm = document.querySelector('#age-confirm');
  if (!gate || !content || !confirm) return;

  const showSupport = () => {
    gate.hidden = true;
    content.hidden = false;
    sessionStorage.setItem('muse-ai-moods-age-confirmed', 'yes');
    document.querySelectorAll('[data-src]').forEach((element) => element.setAttribute('src', element.dataset.src));
    loadPayPal();
    loadStripe();
    loadKofi();
  };

  const loadScript = (src, attributes = {}) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    Object.entries(attributes).forEach(([key, value]) => script.setAttribute(key, value));
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  const loadPayPal = async () => {
    const status = document.querySelector('#paypal-status');
    try {
      await loadScript('https://www.paypal.com/sdk/js?client-id=BAA_ndqaWMyQwTnDZ0LXwLQ22jdJo9uxkeXYqmBbF-hD41HMiZ83mvOcx1Kti0b6ZfXfje7Q1ievNaS8Ok&vault=true&intent=subscription', {'data-sdk-integration-source': 'button-factory'});
      if (!window.paypal) throw new Error('PayPal unavailable');
      window.paypal.Buttons({
        style: { shape: 'rect', color: 'gold', layout: 'vertical', label: 'subscribe' },
        createSubscription: (data, actions) => actions.subscription.create({ plan_id: 'P-4FD24238VX4902214NK2XP2Y', quantity: 1 }),
        onApprove: (data) => { status.textContent = `Subscription approved: ${data.subscriptionID}`; }
      }).render('#paypal-button-container-P-4FD24238VX4902214NK2XP2Y');
    } catch (error) { status.textContent = 'PayPal could not load here. Use another support option below.'; }
  };

  const loadStripe = async () => {
    const status = document.querySelector('#stripe-status');
    try {
      await loadScript('https://js.stripe.com/v3/buy-button.js');
      const button = document.createElement('stripe-buy-button');
      button.setAttribute('buy-button-id', 'buy_btn_1UJKaaJaRf233kfWKZ81fcIe');
      button.setAttribute('publishable-key', 'pk_live_51UIdAGJaRf233kfWlFacR31IYVGdjCVAttNFzIgQGXQzrUdc894iJcBqamRZNwF11z2AN5kvjyzitor462f2egVI00UmKj0sd8');
      document.querySelector('#stripe-buy-button-slot').appendChild(button);
    } catch (error) { status.textContent = 'Stripe could not load here. Use another support option above.'; }
  };

  const loadKofi = async () => {
    try {
      await loadScript('https://storage.ko-fi.com/cdn/scripts/overlay-widget.js');
      if (window.kofiWidgetOverlay) window.kofiWidgetOverlay.draw('fedpromptly', {
        'type': 'floating-chat',
        'floating-chat.donateButton.text': 'Support me',
        'floating-chat.donateButton.background-color': '#00b9fe',
        'floating-chat.donateButton.text-color': '#fff'
      });
    } catch (error) { /* The visible Ko-fi card remains available without the overlay. */ }
  };

  confirm.addEventListener('click', showSupport);
  if (sessionStorage.getItem('muse-ai-moods-age-confirmed') === 'yes') showSupport();
})();
