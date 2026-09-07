/**
 * OMNI Exchange · live traces v0
 * GET {apiBase}/api/exchange/traces — public HITL + platform soft rows.
 * Money traces are secondary labeled instruments. No bank balances.
 * Soft $ = planning hints only.
 */
(function (global) {
  var DEFAULT_API = 'https://onemission-omni-chat.azurewebsites.net';

  function apiBase() {
    if (global.OMNI_EXCHANGE_API) return String(global.OMNI_EXCHANGE_API).replace(/\/$/, '');
    return DEFAULT_API;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function shortAt(t) {
    if (!t) return '';
    try {
      return new Date(t).toLocaleString();
    } catch (e) {
      return String(t).slice(0, 19);
    }
  }

  function badge(source) {
    var s = String(source || '');
    if (s === 'platform_aggregate') {
      return '<span class="xt-badge xt-live">live</span>';
    }
    if (s === 'catalog') {
      return '<span class="xt-badge xt-catalog">catalog</span>';
    }
    return '<span class="xt-badge xt-hitl">HITL</span>';
  }

  function bookTone(book) {
    var b = String(book || '');
    if (b === 'gift') return 'gift';
    if (b === 'product') return 'product';
    if (b === 'fiat' || b === 'crypto') return 'fiat';
    return 'ops';
  }

  function renderRow(t) {
    var tone = bookTone(t.book);
    return (
      '<article class="xt-row xt-' +
      esc(tone) +
      '" data-trace-id="' +
      esc(t.id) +
      '">' +
      '<div class="xt-row-top">' +
      '<div class="xt-title">' +
      esc(t.title || 'Trace') +
      '</div>' +
      '<div class="xt-amount">' +
      esc(t.amount_label || '—') +
      '</div>' +
      '</div>' +
      '<div class="xt-meta">' +
      badge(t.source) +
      '<span class="xt-pill">' +
      esc(t.book || '—') +
      '</span>' +
      '<span class="xt-pill">' +
      esc(t.rail || '—') +
      '</span>' +
      '<span class="xt-pill">' +
      esc(t.wallet || 'none') +
      '</span>' +
      '<span class="xt-pill">' +
      esc(t.status || '—') +
      '</span>' +
      '<span class="xt-when">' +
      esc(shortAt(t.at)) +
      '</span>' +
      '</div>' +
      (t.purpose
        ? '<p class="xt-purpose">' + esc(t.purpose) + '</p>'
        : '') +
      '</article>'
    );
  }

  async function fetchTraces(opts) {
    opts = opts || {};
    var q = 'limit=' + encodeURIComponent(opts.limit || 40);
    if (opts.book) q += '&book=' + encodeURIComponent(opts.book);
    if (opts.rail) q += '&rail=' + encodeURIComponent(opts.rail);
    if (opts.include_live === false) q += '&include_live=false';
    var res = await fetch(apiBase() + '/api/exchange/traces?' + q, {
      headers: { Accept: 'application/json' },
    });
    var data = await res.json().catch(function () {
      return {};
    });
    return { ok: res.ok, status: res.status, data: data };
  }

  function render(host, data) {
    if (!host) return;
    var traces = (data && data.traces) || [];
    var law =
      (data && data.law) ||
      'Labeled money traces only. Soft $ rows are planning hints — not invoices, balances, or the headline of Exchange.';
    var head =
      '<div class="xt-head">' +
      '<div class="xt-head-row">' +
      '<div class="xt-kicker">Labeled money traces · secondary</div>' +
      '<button type="button" class="xt-refresh" data-xt-refresh>Refresh</button>' +
      '</div>' +
      '<p class="xt-law">' +
      esc(law) +
      '</p>' +
      '<p class="xt-counts text-sm">' +
      'Showing <strong>' +
      esc((data && data.count) || traces.length) +
      '</strong>' +
      ' · HITL ' +
      esc((data && data.hitl_count) != null ? data.hitl_count : '—') +
      ' · live ' +
      esc((data && data.live_count) != null ? data.live_count : '—') +
      ' · <span class="xt-ver">' +
      esc((data && data.version) || 'exchange-trace-v0') +
      '</span></p>' +
      '</div>';

    var body =
      traces.length === 0
        ? '<p class="xt-empty">No published money traces yet. Feedback and critiques do not wait on a dollar line.</p>'
        : '<div class="xt-list">' + traces.map(renderRow).join('') + '</div>';

    var foot =
      '<p class="xt-foot">' +
      'Trust loop first. Member product burn stays on ' +
      '<a class="gloss" href="https://onemissionnetworkandinstitute.org/profile.html?tab=usage">One Mission · Usage</a>. ' +
      'Get OMNI: <a class="gloss" href="https://onemissionnetworkandinstitute.org/">One Mission</a> · ' +
      '<a class="gloss" href="https://x.ai/bot/HAIGA0nUYgv85CtV5SMWa">x.ai/bot</a>. ' +
      'Structure: <a class="gloss" href="books.html">Books</a> · ' +
      '<a class="gloss" href="rules.html">Rules</a> · ' +
      '<a class="gloss" href="refused.html">Refused</a>.' +
      '</p>';

    host.innerHTML = head + body + foot;
    host.querySelectorAll('[data-xt-refresh]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        mount(host.id || host, { force: true });
      });
    });
  }

  function ensureStyles() {
    if (document.getElementById('exchange-traces-css')) return;
    var s = document.createElement('style');
    s.id = 'exchange-traces-css';
    s.textContent =
      '#exchange-traces-panel,.xt-mount{--xt-hive:#c4a35a;--xt-mist:#8b9aab;--xt-parchment:#e8e4d9;}' +
      '.xt-head{margin-bottom:1.25rem;}' +
      '.xt-head-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.75rem;}' +
      '.xt-kicker{font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:var(--xt-hive);}' +
      '.xt-refresh{font-size:11px;padding:.4rem .75rem;border-radius:999px;border:1px solid rgba(196,163,90,.4);background:transparent;color:var(--xt-parchment);cursor:pointer;}' +
      '.xt-refresh:hover{border-color:rgba(196,163,90,.8);}' +
      '.xt-law{margin-top:.75rem;font-size:.85rem;color:rgba(139,154,171,.9);line-height:1.5;max-width:42rem;}' +
      '.xt-counts{margin-top:.5rem;font-size:.75rem;color:rgba(139,154,171,.75);}' +
      '.xt-ver{color:rgba(196,163,90,.85);}' +
      '.xt-list{display:flex;flex-direction:column;gap:.75rem;}' +
      '.xt-row{border:1px solid rgba(196,163,90,.12);background:rgba(14,20,26,.85);border-radius:1rem;padding:1rem 1.1rem;}' +
      '.xt-row.xt-gift{border-color:rgba(107,143,113,.35);}' +
      '.xt-row.xt-product{border-color:rgba(14,165,233,.25);}' +
      '.xt-row.xt-fiat{border-color:rgba(196,163,90,.28);}' +
      '.xt-row-top{display:flex;flex-wrap:wrap;justify-content:space-between;gap:.5rem;align-items:baseline;}' +
      '.xt-title{font-family:Cormorant Garamond,Georgia,serif;font-size:1.2rem;color:var(--xt-parchment);font-weight:600;}' +
      '.xt-amount{font-size:.8rem;color:var(--xt-hive);font-weight:600;white-space:nowrap;}' +
      '.xt-meta{display:flex;flex-wrap:wrap;gap:.4rem;align-items:center;margin-top:.55rem;}' +
      '.xt-badge{font-size:10px;text-transform:uppercase;letter-spacing:.08em;padding:.15rem .45rem;border-radius:999px;border:1px solid rgba(196,163,90,.3);color:var(--xt-hive);}' +
      '.xt-badge.xt-live{border-color:rgba(14,165,233,.45);color:#7dd3fc;}' +
      '.xt-badge.xt-catalog{border-color:rgba(139,154,171,.4);color:var(--xt-mist);}' +
      '.xt-badge.xt-hitl{border-color:rgba(196,163,90,.55);color:#e8d9a8;}' +
      '.xt-pill{font-size:10px;padding:.15rem .45rem;border-radius:999px;background:rgba(255,255,255,.04);color:var(--xt-mist);}' +
      '.xt-when{font-size:10px;color:rgba(139,154,171,.65);margin-left:.25rem;}' +
      '.xt-purpose{margin-top:.65rem;font-size:.85rem;line-height:1.5;color:rgba(232,228,217,.82);}' +
      '.xt-empty{font-size:.9rem;color:var(--xt-mist);padding:1rem 0;}' +
      '.xt-foot{margin-top:1.25rem;font-size:.75rem;color:rgba(139,154,171,.7);line-height:1.5;}' +
      '.xt-foot a.gloss{color:#c4a35a;}' +
      '.xt-err{color:#fca5a5;font-size:.9rem;padding:1rem 0;}';
    document.head.appendChild(s);
  }

  async function mount(hostOrId, opts) {
    opts = opts || {};
    var host =
      typeof hostOrId === 'string' ? document.getElementById(hostOrId) : hostOrId;
    if (!host) return;
    ensureStyles();
    host.innerHTML = '<p class="xt-empty">Loading traces…</p>';
    try {
      var res = await fetchTraces(opts);
      if (!res.ok) {
        host.innerHTML =
          '<p class="xt-err">Could not load traces (HTTP ' +
          esc(res.status) +
          '). API may be restarting — try Refresh.</p>';
        return;
      }
      render(host, res.data || {});
    } catch (e) {
      host.innerHTML =
        '<p class="xt-err">Network error loading traces. Check API CORS / connectivity.</p>';
    }
  }

  global.OMNI_EXCHANGE_TRACES = {
    mount: mount,
    fetchTraces: fetchTraces,
    apiBase: apiBase,
  };
})(typeof window !== 'undefined' ? window : globalThis);
