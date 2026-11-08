/* Aggregate traffic reports are private to the site's Vercel account. */
(() => {
  const productionHosts = new Set(['www.maayanrabinovich.co.il', 'maayanrabinovich.co.il']);
  if (!productionHosts.has(window.location.hostname)) return;
  if (navigator.globalPrivacyControl || navigator.doNotTrack === '1' || window.doNotTrack === '1') return;
  if (document.querySelector('script[data-maayan-analytics]')) return;

  window.va = window.va || function () {
    (window.vaq = window.vaq || []).push(arguments);
  };
  // Do not send search terms, URL fragments, or query-string contact information.
  window.va('beforeSend', event => {
    try {
      const url = new URL(event.url, window.location.origin);
      if (!productionHosts.has(url.hostname)) return null;
      return { ...event, url: url.origin + url.pathname };
    } catch {
      return null;
    }
  });

  const script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  script.dataset.maayanAnalytics = 'true';
  document.head.appendChild(script);
})();
