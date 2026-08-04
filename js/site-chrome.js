/**
 * OMNI Exchange — registry chrome (network chrome contract 2026-08-04).
 * Same structure as Foundation / Intek / IMI.
 */
(function () {
  if (window.__oeSiteChrome) return;
  window.__oeSiteChrome = true;

  function year() {
    return new Date().getFullYear();
  }
  function esc(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }
  var HAMBURGER =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';

  function buildHeader(chrome) {
    var desktop = (chrome.nav || [])
      .map(function (item) {
        return (
          '<a href="' +
          esc(item.href) +
          '" class="text-sm text-mist/75 hover:text-parchment transition">' +
          esc(item.label) +
          '</a>'
        );
      })
      .join('');
    var mobile = (chrome.nav || [])
      .map(function (item) {
        return (
          '<a href="' +
          esc(item.href) +
          '" class="block px-5 py-3 text-sm text-mist border-b border-white/5 hover:text-parchment hover:bg-white/[0.03]">' +
          esc(item.label) +
          '</a>'
        );
      })
      .join('');
    return (
      '<div class="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between gap-3">' +
      '<a href="' +
      esc(chrome.home_href || '/') +
      '" class="flex items-center gap-3 min-w-0">' +
      '<div class="w-8 h-8 rounded-full border border-hive/40 flex items-center justify-center text-hive text-xs font-semibold tracking-widest shrink-0">' +
      esc(chrome.mark || 'OE') +
      '</div>' +
      '<div class="min-w-0">' +
      '<div class="font-semibold tracking-tight text-parchment text-sm truncate">' +
      esc(chrome.brand_primary || 'OMNI Exchange') +
      '</div>' +
      '<div class="text-[10px] text-mist/70 uppercase tracking-wider truncate">' +
      esc(chrome.brand_secondary || '') +
      '</div></div></a>' +
      '<nav class="hidden md:flex flex-wrap justify-end gap-4 lg:gap-5 text-sm" aria-label="Primary">' +
      desktop +
      '</nav>' +
      '<button type="button" id="net-nav-toggle" class="md:hidden inline-flex w-10 h-10 items-center justify-center rounded-full border border-hive/30 text-parchment bg-transparent cursor-pointer" aria-label="Open menu" aria-expanded="false" aria-controls="net-mobile-menu">' +
      HAMBURGER +
      '</button></div>' +
      '<div id="net-mobile-menu" class="hidden md:hidden border-t border-white/5 bg-ink/95">' +
      mobile +
      '</div>'
    );
  }

  function buildFooter(chrome) {
    var sisters = (chrome.sister_links || [])
      .map(function (s) {
        return (
          '<a href="' +
          esc(s.href) +
          '" class="hover:text-parchment" target="_blank" rel="noopener">' +
          esc(s.label) +
          '</a>'
        );
      })
      .join(' · ');
    var local = (chrome.nav || [])
      .slice(0, 5)
      .map(function (n) {
        return (
          '<a href="' +
          esc(n.href) +
          '" class="hover:text-mist">' +
          esc(n.label) +
          '</a>'
        );
      })
      .join(' · ');
    return (
      '<div class="max-w-4xl mx-auto px-5 py-10 text-sm text-mist/70 space-y-4">' +
      '<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">' +
      '<div>© <span id="y">' +
      year() +
      '</span> ' +
      esc(chrome.brand_primary || 'OMNI Exchange') +
      ' · One Mission</div>' +
      '<div class="flex flex-wrap gap-x-2 gap-y-1 text-xs">' +
      local +
      '</div></div>' +
      '<div class="text-xs text-mist/80">Sister network: ' +
      sisters +
      '</div>' +
      '<p class="text-xs text-mist/50">Traces only · not a bank or broker. See Refused.</p>' +
      '</div>'
    );
  }

  function bindMobile() {
    var btn = document.getElementById('net-nav-toggle');
    var menu = document.getElementById('net-mobile-menu');
    if (!btn || !menu) return;
    function setOpen(o) {
      menu.classList.toggle('hidden', !o);
      btn.setAttribute('aria-expanded', o ? 'true' : 'false');
      btn.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
    }
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      setOpen(menu.classList.contains('hidden'));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        setOpen(false);
      });
    });
  }

  function apply(reg) {
    var chrome = reg.chrome || {};
    var headers = document.querySelectorAll('header');
    if (!headers.length) {
      var h = document.createElement('header');
      h.className =
        'border-b border-white/5 sticky top-0 z-40 bg-ink/85 backdrop-blur-md';
      h.setAttribute('data-site-chrome', 'ready');
      h.innerHTML = buildHeader(chrome);
      document.body.insertBefore(h, document.body.firstChild);
    } else {
      headers.forEach(function (el, i) {
        if (el.getAttribute('data-site-chrome') === 'skip') return;
        if (i > 0) return;
        el.className =
          'border-b border-white/5 sticky top-0 z-40 bg-ink/85 backdrop-blur-md';
        el.setAttribute('data-site-chrome', 'ready');
        el.innerHTML = buildHeader(chrome);
      });
    }
    bindMobile();
    var footers = document.querySelectorAll('footer');
    if (!footers.length) {
      var f = document.createElement('footer');
      f.className = 'border-t border-white/5 mt-12';
      f.setAttribute('data-site-chrome', 'ready');
      f.innerHTML = buildFooter(chrome);
      document.body.appendChild(f);
    } else {
      footers.forEach(function (f) {
        if (f.getAttribute('data-site-chrome') === 'skip') return;
        f.className = 'border-t border-white/5 mt-12';
        f.setAttribute('data-site-chrome', 'ready');
        f.innerHTML = buildFooter(chrome);
      });
    }
  }

  function boot() {
    if (document.documentElement.getAttribute('data-site-chrome') === 'skip') return;
    fetch('site-registry.json', { credentials: 'same-origin' })
      .then(function (r) {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then(apply)
      .catch(function (e) {
        console.warn('[exchange site-chrome]', e);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
