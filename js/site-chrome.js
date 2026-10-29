/**
 * OMNI Exchange — registry chrome
 * Network template kit v1 · Q-NET-ADOPT-EX 2026-08-05
 * Explicit CSS (not Tailwind-only). Desktop: text nav + always-on hamburger.
 * Sisters: omit self. Tokens: --page-max / --page-pad / --header-h from page-layout.css.
 */
(function () {
  if (window.__oeSiteChrome) return;
  window.__oeSiteChrome = true;

  var KIT = 'network-template-kit-v1';
  var SELF_HOST_MARKERS = ['omniexchange.org', 'omni-exchange'];

  function year() {
    return new Date().getFullYear();
  }
  function esc(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  function isSelfSister(href) {
    var h = String(href || '').toLowerCase();
    for (var i = 0; i < SELF_HOST_MARKERS.length; i++) {
      if (h.indexOf(SELF_HOST_MARKERS[i]) !== -1) return true;
    }
    return false;
  }

  function filterSisters(list) {
    return (list || []).filter(function (s) {
      return s && s.href && s.label && !isSelfSister(s.href);
    });
  }

  var HAMBURGER =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';

  var MIRROR_URL = 'https://intekspace.com/forge/mirror?door=exchange';

  function mirrorAnchor(mode) {
    var tight = mode === 'tight';
    var inner = tight
      ? '<span class="mirror-door-long">Mirror · Soul-time</span><span class="mirror-door-short">open Mirror</span>'
      : mode === 'bar'
        ? 'open Mirror'
        : 'Mirror · Soul-time';
    return (
      '<a class="mirror-door' +
      (tight ? ' mirror-door-tight' : '') +
      '" href="' +
      MIRROR_URL +
      '" target="_blank" rel="noopener" aria-label="Open Mirror Soul-time (opens in new tab)">' +
      inner +
      '</a>'
    );
  }

  /* Structural chrome CSS — sizes use kit tokens when page-layout.css is loaded */
  var CHROME_CSS =
    'header[data-site-chrome="ready"]{border-bottom:1px solid rgba(255,255,255,0.05);position:sticky;top:0;z-index:var(--z-header,40);background:rgba(10,15,20,0.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);}' +
    '.net-bar{max-width:var(--page-max,56rem);margin:0 auto;padding:0 var(--page-pad,1.25rem);height:var(--header-h,3.5rem);display:flex;align-items:center;justify-content:space-between;gap:0.75rem;}' +
    '.net-brand{display:flex;align-items:center;gap:0.75rem;min-width:0;text-decoration:none;color:#e8e4d9;}' +
    '.net-mark{width:2rem;height:2rem;border-radius:9999px;border:1px solid rgba(196,163,90,0.4);display:inline-flex;align-items:center;justify-content:center;color:#c4a35a;font-size:0.7rem;font-weight:600;letter-spacing:0.08em;flex-shrink:0;}' +
    '.net-title{font-weight:600;font-size:0.875rem;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
    '.net-sub{font-size:10px;color:rgba(139,154,171,0.75);text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
    '.net-actions{display:flex;align-items:center;gap:0.75rem;flex-shrink:0;}' +
    '.net-nav-desktop{display:none;flex-wrap:wrap;justify-content:flex-end;gap:1.15rem;font-size:0.875rem;}' +
    '.net-nav-desktop a{color:rgba(139,154,171,0.85);text-decoration:none;}' +
    '.net-nav-desktop a:hover{color:#e8e4d9;}' +
    '.net-nav-toggle{display:inline-flex;width:2.5rem;height:2.5rem;align-items:center;justify-content:center;border-radius:9999px;border:1px solid rgba(196,163,90,0.35);background:transparent;color:#e8e4d9;cursor:pointer;padding:0;}' +
    '.net-nav-toggle:hover{border-color:rgba(196,163,90,0.7);}' +
    '.net-nav-toggle:focus-visible{outline:2px solid rgba(196,163,90,0.7);outline-offset:2px;}' +
    '#net-mobile-menu{display:none;border-top:1px solid rgba(255,255,255,0.05);background:rgba(10,15,20,0.98);}' +
    '#net-mobile-menu.open{display:block;}' +
    '#net-mobile-menu a{display:block;padding:0.85rem 1.25rem;color:#8b9aab;text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.04);font-size:0.95rem;min-height:44px;}' +
    '#net-mobile-menu a:hover{color:#e8e4d9;background:rgba(196,163,90,0.08);}' +
    'footer[data-site-chrome="ready"]{border-top:1px solid rgba(255,255,255,0.05);margin-top:3rem;}' +
    '.net-foot{max-width:var(--page-max,56rem);margin:0 auto;padding:2.5rem var(--page-pad,1.25rem);font-size:0.875rem;color:rgba(139,154,171,0.75);}' +
    '.net-foot a{color:inherit;}' +
    '.net-foot a:hover{color:#e8e4d9;}' +
    '.net-foot-row{display:flex;flex-direction:column;gap:0.75rem;}' +
    '.net-foot-sisters{font-size:0.75rem;color:rgba(139,154,171,0.85);margin-top:1rem;}' +
    '.net-foot-note{font-size:0.75rem;color:rgba(139,154,171,0.5);margin-top:0.75rem;}' +
    '.kingdom-bar{margin:0 0 1.35rem;padding:0.9rem 1rem 1rem;border:1px solid rgba(196,163,90,0.18);border-radius:0.9rem;background:linear-gradient(90deg,rgba(196,163,90,0.08),transparent 46%),rgba(14,20,26,0.72);}' +
    'footer[data-site-chrome]>.kingdom-bar{max-width:var(--page-max,56rem);width:calc(100% - (var(--page-pad,1.25rem) * 2));margin:2.5rem auto 0;}' +
    '.kingdom-kicker{margin:0 0 0.5rem;color:#c4a35a;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;line-height:1.4;}' +
    '.kingdom-links{display:flex;flex-wrap:wrap;gap:0.4rem;margin:0;padding:0;list-style:none;}' +
    '.kingdom-links li{display:flex;max-width:100%;}' +
    '.kingdom-bar .kingdom-links a{display:inline-flex;align-items:center;justify-content:center;position:relative;box-sizing:border-box;min-height:44px;max-width:100%;padding:0.4rem 0.8rem;border-radius:999px;border:1px solid rgba(196,163,90,0.3);background:rgba(196,163,90,0.06);color:#e8e4d9;font-size:0.8125rem;line-height:1.3;text-align:center;text-decoration:none;transition:background-color 0.15s ease,border-color 0.15s ease,color 0.15s ease;}' +
    '.kingdom-bar .kingdom-links a:hover{color:#e8e4d9;border-color:rgba(196,163,90,0.7);background:rgba(196,163,90,0.14);}' +
    '.kingdom-bar .kingdom-links a:focus-visible{outline:2px solid #c4a35a;outline-offset:3px;color:#e8e4d9;}' +
    '.kingdom-bar .kingdom-links a[aria-current="page"]{color:#c4a35a;border-color:rgba(196,163,90,0.75);}' +
    '.kingdom-newtab{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);clip-path:inset(50%);white-space:nowrap;border:0;}' +
    '@media (prefers-reduced-motion:reduce){.kingdom-bar .kingdom-links a{transition:none;}}' +
    /* Desktop: text nav AND always-on hamburger (kit + steward) */
    '@media (min-width:768px){' +
    '.net-nav-desktop{display:flex;}' +
    '.net-nav-toggle{display:inline-flex !important;}' +
    '.net-foot-row{flex-direction:row;align-items:center;justify-content:space-between;}' +
    '}';

  function ensureCss() {
    if (document.getElementById('net-chrome-css')) return;
    var s = document.createElement('style');
    s.id = 'net-chrome-css';
    s.setAttribute('data-kit', KIT);
    s.textContent = CHROME_CSS;
    document.head.appendChild(s);
  }

  function buildHeader(chrome) {
    var desktop = (chrome.nav || [])
      .map(function (item) {
        return '<a href="' + esc(item.href) + '">' + esc(item.label) + '</a>';
      })
      .join('');
    var mobile = (chrome.nav || [])
      .map(function (item) {
        return '<a href="' + esc(item.href) + '">' + esc(item.label) + '</a>';
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
      '<div class="net-actions">' +
      '<nav class="net-nav-desktop" aria-label="Primary">' +
      desktop +
      '</nav>' +
      mirrorAnchor('tight') +
      '<button type="button" id="net-nav-toggle" class="net-nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="net-mobile-menu">' +
      HAMBURGER +
      '</button></div></div>' +
      '<div id="net-mobile-menu" role="navigation" aria-label="Mobile">' +
      mobile +
      '</div>'
    );
  }

  /* Keep labels and hrefs aligned with site-registry.json kingdom_links. Includes this site. */
  var KINGDOM_LINKS = [
    { href: 'https://onemissionnetworkandinstitute.org', label: 'One Mission Network' },
    { href: 'https://intekspace.com', label: 'Intek' },
    { href: 'https://www.instituteofmatureimagination.org', label: 'Institute of Mature Imagination' },
    { href: 'https://onemissionfoundation.org', label: 'One Mission Foundation' },
    { href: 'https://omniexchange.org', label: 'OMNI Exchange' },
    { href: 'https://getomni.vercel.app', label: 'Get OMNI' },
    { href: 'https://x.com/omni_puzzler', label: 'X @omni_puzzler', rel: 'me' },
  ];

  function kingdomLinks(chrome) {
    var list = chrome && chrome.kingdom_links;
    if (!list || !list.length) return KINGDOM_LINKS;
    var clean = list.filter(function (s) {
      return s && s.href && s.label;
    });
    return clean.length ? clean : KINGDOM_LINKS;
  }

  function isExchangeHref(href) {
    return /omniexchange\.org/i.test(String(href || ''));
  }

  function isHomePage() {
    var path = String(location.pathname || '/').replace(/\/index\.html$/i, '/');
    return path === '/' || path === '';
  }

  function buildKingdomBar(links) {
    var items = (links || [])
      .map(function (s) {
        var external = !isExchangeHref(s.href);
        var rel = [];
        if (String(s.rel || '').indexOf('me') !== -1 || /x\.com\/omni_puzzler/i.test(s.href)) rel.push('me');
        if (external) {
          rel.push('noopener');
          rel.push('noreferrer');
        }
        var current = !external && isHomePage();
        return (
          '<li><a href="' +
          esc(s.href) +
          '"' +
          (rel.length ? ' rel="' + esc(rel.join(' ')) + '"' : '') +
          (external ? ' target="_blank"' : '') +
          (current ? ' aria-current="page"' : '') +
          '>' +
          esc(s.label) +
          (external ? '<span class="kingdom-newtab"> (opens in a new tab)</span>' : '') +
          '</a></li>'
        );
      })
      .join('');
    return (
      '<nav class="kingdom-bar" aria-label="Kingdom">' +
      '<p class="kingdom-kicker" aria-hidden="true">Kingdom</p>' +
      '<ul class="kingdom-links">' +
      items +
      '</ul></nav>'
    );
  }

  function buildFooter(chrome) {
    var sisters = filterSisters(chrome.sister_links)
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
      .map(function (n) {
        return '<a href="' + esc(n.href) + '">' + esc(n.label) + '</a>';
      })
      .join(' · ');
    return (
      '<div class="net-foot">' +
      buildKingdomBar(kingdomLinks(chrome)) +
      '<div class="net-foot-row">' +
      '<div>© <span id="y">' +
      year() +
      '</span> ' +
      esc(chrome.brand_primary || 'OMNI Exchange') +
      ' · One Mission</div>' +
      '<div style="font-size:0.75rem">' +
      local +
      '</div></div>' +
      '<div class="net-foot-door">' +
      mirrorAnchor('full') +
      '</div>' +
      '<div class="net-foot-sisters">Sister network: ' +
      (sisters || '—') +
      '</div>' +
      '<p class="net-foot-note">Trust loop · money traces secondary · not a bank or broker. See Refused. · kit ' +
      KIT +
      '</p>' +
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
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('open')) return;
      if (menu.contains(e.target) || btn.contains(e.target)) return;
      setOpen(false);
    });
  }

  function placeCompanionDoors() {
    var invites = document.querySelectorAll('.companion-invite > a.companion-cta');
    for (var i = 0; i < invites.length; i++) {
      var a = invites[i];
      if (a.parentElement.querySelector('.mirror-door')) continue;
      var row = document.createElement('div');
      row.className = 'companion-actions';
      a.parentElement.insertBefore(row, a);
      row.appendChild(a);
      row.insertAdjacentHTML('beforeend', mirrorAnchor('full'));
    }
    var bars = document.querySelectorAll('.companion-bar > a.companion-cta-bar');
    for (var j = 0; j < bars.length; j++) {
      var b = bars[j];
      if (b.parentElement.querySelector('.mirror-door')) continue;
      var actions = document.createElement('div');
      actions.className = 'companion-bar-actions';
      b.parentElement.insertBefore(actions, b);
      actions.appendChild(b);
      actions.insertAdjacentHTML('beforeend', mirrorAnchor('bar'));
    }
  }

  function apply(reg) {
    ensureCss();
    var chrome = reg.chrome || {};
    chrome.sister_links = filterSisters(chrome.sister_links);
    document.documentElement.setAttribute('data-network-kit', KIT);

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
    placeCompanionDoors();
  }

  var FALLBACK_CHROME = {
    chrome: {
      mark: 'OE',
      home_href: '/',
      brand_primary: 'OMNI Exchange',
      brand_secondary: 'Trust · Consilience · Traces',
      accent: 'hive',
      nav: [
        { href: 'traces.html', label: 'Traces' },
        { href: 'items-sent.html', label: 'Items sent' },
        { href: 'books.html', label: 'Books' },
        { href: 'rules.html', label: 'Rules' },
        { href: 'refused.html', label: 'Refused' },
        { href: 'network.html', label: 'Network' },
      ],
      sister_links: [
        { href: 'https://onemissionnetworkandinstitute.org/', label: 'One Mission' },
        { href: 'https://intekspace.com/', label: 'Intek Space' },
        { href: 'https://instituteofmatureimagination.org/', label: 'IMI' },
        { href: 'https://onemissionfoundation.org/', label: 'Foundation' },
      ],
      kingdom_links: [
        { href: 'https://onemissionnetworkandinstitute.org', label: 'One Mission Network' },
        { href: 'https://intekspace.com', label: 'Intek' },
        { href: 'https://www.instituteofmatureimagination.org', label: 'Institute of Mature Imagination' },
        { href: 'https://onemissionfoundation.org', label: 'One Mission Foundation' },
        { href: 'https://omniexchange.org', label: 'OMNI Exchange' },
        { href: 'https://getomni.vercel.app', label: 'Get OMNI' },
        { href: 'https://x.com/omni_puzzler', label: 'X @omni_puzzler', rel: 'me' },
      ],
    },
  };

  var X_PROFILE = 'https://x.com/omni_puzzler';

  function ensureIdentity() {
    var head = document.head;
    if (!head) return;
    if (!head.querySelector('link[rel="me"][href="' + X_PROFILE + '"]')) {
      var link = document.createElement('link');
      link.rel = 'me';
      link.href = X_PROFILE;
      head.appendChild(link);
    }
    var existing = head.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < existing.length; i++) {
      if (existing[i].textContent.indexOf(X_PROFILE) !== -1) return;
    }
    var ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://omniexchange.org/#website',
      name: 'OMNI Exchange',
      url: 'https://omniexchange.org/',
      sameAs: [X_PROFILE],
    });
    head.appendChild(ld);
  }

  function boot() {
    ensureIdentity();
    if (document.documentElement.getAttribute('data-site-chrome') === 'skip') return;
    fetch('site-registry.json', { credentials: 'same-origin' })
      .then(function (r) {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then(apply)
      .catch(function (e) {
        console.warn('[exchange site-chrome]', e);
        apply(FALLBACK_CHROME);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
