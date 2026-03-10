function cargarChat() {
  !(function (t, e, r) {
    if (!document.getElementById(t)) {
      var n = document.createElement('script');
      for (var a in ((n.src =
        'https://js.usemessages.com/conversations-embed.js'),
      (n.type = 'text/javascript'),
      (n.id = t),
      r))
        r.hasOwnProperty(a) && n.setAttribute(a, r[a]);
      var i = document.getElementsByTagName('script')[0];
      i.parentNode.insertBefore(n, i);
    }
  })('hubspot-messages-loader', 0, {
    'data-loader': 'hs-scriptloader',
    'data-hsjs-portal': 7549129,
    'data-hsjs-env': 'prod',
    'data-hsjs-hublet': 'na1',
  });

  !(function (t, e, r) {
    if (!document.getElementById(t)) {
      var n = document.createElement('script');
      for (var a in ((n.src =
        'https://js.hscollectedforms.net/collectedforms.js'),
      (n.type = 'text/javascript'),
      (n.id = t),
      r))
        r.hasOwnProperty(a) && n.setAttribute(a, r[a]);
      var i = document.getElementsByTagName('script')[0];
      i.parentNode.insertBefore(n, i);
    }
  })('CollectedForms-7549129', 0, {
    crossorigin: 'anonymous',
    'data-leadin-portal-id': 7549129,
    'data-leadin-env': 'prod',
    'data-loader': 'hs-scriptloader',
    'data-hsjs-portal': 7549129,
    'data-hsjs-env': 'prod',
    'data-hsjs-hublet': 'na1',
  });

  var _hsp = (window._hsp = window._hsp || []);
  _hsp.push(['addEnabledFeatureGates', []]);
  _hsp.push(['useV2Wildcard', true]);

  !(function (t, e, r) {
    if (!document.getElementById(t)) {
      var n = document.createElement('script');
      for (var a in ((n.src = 'https://js.hs-banner.com/v2/7549129/banner.js'),
      (n.type = 'text/javascript'),
      (n.id = t),
      r))
        r.hasOwnProperty(a) && n.setAttribute(a, r[a]);
      var i = document.getElementsByTagName('script')[0];
      i.parentNode.insertBefore(n, i);
    }
  })('cookieBanner-7549129', 0, {
    'data-cookieconsent': 'ignore',
    'data-hs-ignore': true,
    'data-loader': 'hs-scriptloader',
    'data-hsjs-portal': 7549129,
    'data-hsjs-env': 'prod',
    'data-hsjs-hublet': 'na1',
  });

  !(function (e, t) {
    if (!document.getElementById(e)) {
      var c = document.createElement('script');
      (c.src =
        'https://js.hs-analytics.net/analytics/1717052700000/7549129.js'),
        (c.type = 'text/javascript'),
        (c.id = e);
      var n = document.getElementsByTagName('script')[0];
      n.parentNode.insertBefore(c, n);
    }
  })('hs-analytics');
}

// Cargar el chat en la carga inicial de la página
cargarChat();

// Cargar el chat en la navegación de la página
document.addEventListener('astro:page-load', cargarChat);
