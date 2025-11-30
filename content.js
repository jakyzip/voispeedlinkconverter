(function() {
  "use strict";

  // --- Utilità per numeri ---
  function normalizeNumber(num) {
    if (!num) return null;
    return num.replace(/[^\d+]/g, "");
  }

  function extractPhone(str) {
    if (!str) return null;
    try {
      let u = new URL(str, location.href);
      if (u.protocol === 'tel:') {
        return normalizeNumber(u.pathname || u.href.replace('tel:', ''));
      }
      if (u.searchParams && u.searchParams.get('phone')) {
        return normalizeNumber(u.searchParams.get('phone'));
      }
      let m = u.pathname.match(/\/(?:call|tel|phone)\/(\+?\d[\d\-\.\s]+)/i);
      if (m) return normalizeNumber(m[1]);
    } catch(e) {
      // non è un URL valido → prova regex
    }
    let found = str.match(/(\+?\d[\d\-\.\s]{5,}\d)/);
    if (found) return normalizeNumber(found[1]);
    return null;
  }

  // --- Creazione link voispeed ---
  function makeVoispeedHref(number) {
    return `voispeed:${encodeURIComponent(number)}`;
  }

  // --- Verifica se il link è già di tipo voispeed --
  function shouldRewriteAnchor(a) {
    if (!a || !a.href) return false;
    if (a.href.startsWith('voispeed:')) return false;
    if (a.classList.contains('voispeed-rewritten')) return false;
    try {
      let u = new URL(a.href, location.href);

      if (u.hostname.includes('whatsapp.com')) return false;
      if (u.protocol === 'tel:') return true;
    } catch(e) {
      // href non valido → tentiamo comunque
      return false;
    }
    return false;
  }

  function rewriteLink(a) {
    if (!a || !a.href) return;
    if (!shouldRewriteAnchor(a)) return;
    let phone = extractPhone(a.href) || extractPhone(a.textContent);
    if (!phone) return;
    a.dataset.voispeedOrig = a.href;
    a.href = makeVoispeedHref(phone);
    a.setAttribute('data-voispeed-number', phone);
    a.classList.add('voispeed-rewritten');
    a.target = '_self'; // evita apertura nuova tab
  }

  function rewriteAll() {
    document.querySelectorAll('a[href]').forEach(rewriteLink);
  }

  // --- Gestione click ---
  document.addEventListener('click', function(ev) {
    try {
      let a = ev.target.closest && ev.target.closest('a');
      if (!a) return;
      if (a.href && a.href.startsWith('voispeed:')) return;
      rewriteLink(a);
    } catch(e) {
      // ignora
    }
  }, true);

  // --- Observer ottimizzato ---
  const pendingLinks = new Set();
  let scheduled = false;

  function processPendingLinks() {
    scheduled = false;
    for (const a of pendingLinks) {
      rewriteLink(a);
    }
    pendingLinks.clear();
  }

  function scheduleProcess() {
    if (scheduled) return;
    scheduled = true;
    if ('requestIdleCallback' in window) {
      requestIdleCallback(processPendingLinks, { timeout: 200 });
    } else {
      setTimeout(processPendingLinks, 100);
    }
  }

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.type !== 'childList') continue;
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;

        if (node.matches && node.matches('a[href]')) {
          pendingLinks.add(node);
        }

        if (node.querySelectorAll) {
          for (const a of node.querySelectorAll('a[href]')) {
            pendingLinks.add(a);
          }
        }
      }
    }
    if (pendingLinks.size > 0) scheduleProcess();
  });

  observer.observe(document.documentElement || document.body, {
    childList: true,
    subtree: true
  });

  // --- Prima riscrittura ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rewriteAll);
  } else {
    rewriteAll();
  }

})();
