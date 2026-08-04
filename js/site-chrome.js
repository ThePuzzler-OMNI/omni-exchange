/**
 * OMNI Exchange — registry chrome (network chrome contract 2026-08-04).
 * Visibility uses explicit CSS (not Tailwind-only) so the hamburger always works
 * after dynamic inject under Tailwind CDN.
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

  var CHROME_CSS =
    'header[data-site-chrome="ready"]{border-bottom:1px solid rgba(255,255,255,0.05);position:sticky;top:0;z-index:40;background:rgba(10,15,20,0.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);}' +
    '.net-bar{max-width:56rem;margin:0 auto;padding:0 1.25rem;height:3.5rem;display:flex;align-items:center;justify-content:space-between;gap:0.75rem;}' +
    '.net-brand{display:flex;align-items:center;gap:0.75rem;min-width:0;text-decoration:none;color:#e8e4d9;}' +
    '.net-mark{width:2rem;height:2rem;border-radius:9999px;border:1px solid rgba(196,163,90,0.4);display:inline-flex;align-items:center;justify-content:center;color:#c4a35a;font-size:0.7rem;font-weight:600;letter-spacing:0.08em;flex-shrink:0;}' +
    '.net-title{font-weight:600;font-size:0.875rem;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
    '.net-sub{font-size:10px;color:rgba(139,154,171,0.75);text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
    '.net-nav-desktop{display:none;flex-wrap:wrap;justify-content:flex-end;gap:1.15rem;font-size:0.875rem;}' +
    '.net-nav-desktop a{color:rgba(139,154,171,0.85);text-decoration:none;}' +
    '.net-nav-desktop a:hover{color:#e8e4d9;}' +
    '.net-nav-toggle{display:inline-flex;width:2.5rem;height:2.5rem;align-items:center;justify-content:center;border-radius:9999px;border:1px solid rgba(196,163,90,0.35);background:transparent;color:#e8e4d9;cursor:pointer;padding:0;}' +
    '.net-nav-toggle:hover{border-color:rgba(196,163,90,0.7);}' +
    '#net-mobile-menu{display:none;border-top:1px solid rgba(255,255,255,0.05);background:rgba(10,15,20,0.98);}' +
    '#net-mobile-menu.open{display:block;}' +
    '#net-mobile-menu a{display:block;padding:0.85rem 1.25rem;color:#8b9aab;text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.04);font-size:0.95rem;}' +
    '#net-mobile-menu a:hover{color:#e8e4d9;background:rgba(196,163,90,0.08);}' +
    'footer[data-site-chrome="ready"]{border-top:1px solid rgba(255,255,255,0.05);margin-top:3rem;}' +
    '.net-foot{max-width:56rem;margin:0 auto;padding:2.5rem 1.25rem;font-size:0.875rem;color:rgba(139,154,171,0.75);}' +
    '.net-foot a{color:inherit;}' +
    '.net-foot a:hover{color:#e8e4d9;}' +
    '.net-foot-row{display:flex;flex-direction:column;gap:0.75rem;}' +
    '.net-foot-sisters{font-size:0.75rem;color:rgba(139,154,171,0.85);margin-top:1rem;}' +
    '.net-foot-note{font-size:0.75rem;color:rgba(139,154,171,0.5);margin-top:0.75rem;}' +
    /* Desktop: keep text nav AND always show hamburger (steward request) */
    '@media (min-width:768px){' +
    '.net-nav-desktop{display:flex;}' +
    '.net-nav-toggle{display:inline-flex !important;}' +
    '.net-foot-row{flex-direction:row;align-items:center;justify-content:space-between;}' +
    '}';

  function ensureCss() {
    if (document.getElementById('net-chrome-css')) return;
    var s = document.createElement('style');
    s.id = 'net-chrome-css';
    s.textContent = CHROME_CSS;
    document.head.appendChild(s);
  }

  function buildHeader(chrome) {
    var desktop = (chrome.nav || [])
      .map(function (item) {
        return (
          '<a href="' + esc(item.href) + '">' + esc(item.label) + '</a>'
        );
      })
      .join('');
    var mobile = (chrome.nav || [])
      .map(function (item) {
        return (
          '<a href="' + esc(item.href) + '">' + esc(item.label) + '</a>'
        );
      })
      .join('');
    return (
      '<div class="net-bar">' +
      '<a class="net-brand" href="' +
      esc(chrome.home_href || '/') +
      '">' +
      '<span class="net-mark">' +
      esc(chrome.mark || 'OE') +
      '</span>' +
      '<span><div class="net-title">' +
      esc(chrome.brand_primary || 'OMNI Exchange') +
      '</div><div class="net-sub">' +
      esc(chrome.brand_secondary || '') +
      '</div></span></a>' +
      '<nav class="net-nav-desktop" aria-label="Primary">' +
      desktop +
      '</nav>' +
      '<button type="button" id="net-nav-toggle" class="net-nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="net-mobile-menu">' +
      HAMBURGER +
      '</button></div>' +
      '<div id="net-mobile-menu" role="navigation" aria-label="Mobile">' +
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
          '" target="_blank" rel="noopener">' +
          esc(s.label) +
          '</a>'
        );
      })
      .join(' · ');
    var local = (chrome.nav || [])
      .slice(0, 5)
      .map(function (n) {
        return '<a href="' + esc(n.href) + '">' + esc(n.label) + '</a>';
      })
      .join(' · ');
    return (
      '<div class="net-foot">' +
      '<div class="net-foot-row">' +
      '<div>© <span id="y">' +
      year() +
      '</span> ' +
      esc(chrome.brand_primary || 'OMNI Exchange') +
      ' · One Mission</div>' +
      '<div style="font-size:0.75rem">' +
      local +
      '</div></div>' +
      '<div class="net-foot-sisters">Sister network: ' +
      sisters +
      '</div>' +
      '<p class="net-foot-note">Traces only · not a bank or broker. See Refused.</p>' +
      '</div>'
    );
  }

  function bindMobile() {
    var btn = document.getElementById('net-nav-toggle');
    var menu = document.getElementById('net-mobile-menu');
    if (!btn || !menu) return;
    function setOpen(o) {
      if (o) menu.classList.add('open');
      else menu.classList.remove('open');
      btn.setAttribute('aria-expanded', o ? 'true' : 'false');
      btn.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
    }
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      setOpen(!menu.classList.contains('open'));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        setOpen(false);
      });
    });
  }

  function apply(reg) {
    ensureCss();
    var chrome = reg.chrome || {};
    var headers = document.querySelectorAll('header');
    if (!headers.length) {
      var h = document.createElement('header');
      h.setAttribute('data-site-chrome', 'ready');
      h.innerHTML = buildHeader(chrome);
      document.body.insertBefore(h, document.body.firstChild);
    } else {
      headers.forEach(function (el, i) {
        if (el.getAttribute('data-site-chrome') === 'skip') return;
        if (i > 0) return;
        el.setAttribute('data-site-chrome', 'ready');
        el.innerHTML = buildHeader(chrome);
      });
    }
    bindMobile();
    var footers = document.querySelectorAll('footer');
    if (!footers.length) {
      var f = document.createElement('footer');
      f.setAttribute('data-site-chrome', 'ready');
      f.innerHTML = buildFooter(chrome);
      document.body.appendChild(f);
    } else {
      footers.forEach(function (f) {
        if (f.getAttribute('data-site-chrome') === 'skip') return;
        f.setAttribute('data-site-chrome', 'ready');
        f.innerHTML = buildFooter(chrome);
      });
    }
  }

  function boot() {
    if (document.documentElement.getAttribute('data-site-chrome') === 'skip') return;
    // Remove broken leftover year scripts that run before #y exists
    fetch('site-registry.json', { credentials: 'same-origin' })
      .then(function (r) {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then(apply)
      .catch(function (e) {
        console.warn('[exchange site-chrome]', e);
        // Fallback chrome so hamburger still exists if registry fails
        apply({
          chrome: {
            mark: 'OE',
            home_href: '/',
            brand_primary: 'OMNI Exchange',
            brand_secondary: 'Fiat · Crypto · Traces',
            nav: [
              { href: 'books.html', label: 'Books' },
              { href: 'rules.html', label: 'Rules' },
              { href: 'refused.html', label: 'Refused' },
              { href: 'network.html', label: 'Network' },
            ],
            sister_links: [
              {
                href: 'https://onemissionnetworkandinstitute.org/',
                label: 'One Mission',
              },
              { href: 'https://intekspace.com/', label: 'Intek Space' },
              {
                href: 'https://instituteofmatureimagination.org/',
                label: 'IMI',
              },
              {
                href: 'https://onemissionfoundation.org/',
                label: 'Foundation',
              },
            ],
          },
        });
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
