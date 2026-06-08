/* ============================================================
   AMPLIFIED — shared site chrome + interactions
   Each page sets <body data-page="home"> etc. before this loads.
   ============================================================ */
(function () {
  var PAGE = document.body.getAttribute('data-page') || '';
  var LINKS = {
    email: 'mailto:info@amplified.com',
    careers: 'mailto:info@amplified.com?subject=Joining%20the%20Amplified%20studio',
    phone: 'tel:+256702366511',
    whatsapp: 'https://wa.me/256702366511?text=Hello%20Amplified%20Kreative%2C%20I%27d%20like%20to%20discuss%20a%20creative%20project.',
    calendly: 'https://calendly.com/amplifiedkreative/30min',
    instagram: 'https://www.instagram.com/ug_amplified/',
    twitter: 'https://twitter.com/amplified_ug',
    youtube: 'https://youtube.com/channel/UC7o0IxsaUdEou6fdTFi2HIw'
  };

  var SERVICES = [
    ['Branding & Graphic Design', '/branding-graphic-design/'],
    ['Video Production', '/video-production/'],
    ['Website Design & Development', '/website-design-development/'],
    ['Digital Marketing', '/digital-marketing/'],
    ['Audio Production', '/audio-production/'],
    ['Photography', '/photography/'],
    ['Printing', '/printing-3/']
  ];

  var NAV = [
    ['Work', '/portfolio/', 'work'],
    ['Services', '/services/', 'services'],
    ['Pricing', '/pricing/', 'pricing'],
    ['About', '/about/', 'about'],
    ['Contact', '/contact-us/', 'contact']
  ];

  /* ---------- NAV ---------- */
  function buildNav() {
    var links = NAV.map(function (n) {
      var active = n[2] === PAGE ? ' is-active' : '';
      var current = active ? ' aria-current="page"' : '';
      return '<a href="' + n[1] + '" class="' + active.trim() + '"' + current + '>' + n[0] + '</a>';
    }).join('');

    var html =
      '<div class="nav__inner">' +
        '<a href="/" class="nav__logo" aria-label="Amplified Kreative home">' +
          '<img decoding="async" src="assets/logo.webp" alt="" width="38" height="38">' +
          '<span>Amplified</span>' +
        '</a>' +
        '<nav class="nav__links" id="primary-navigation" aria-label="Primary navigation">' + links + '</nav>' +
        '<div class="nav__cta">' +
          '<a href="' + LINKS.calendly + '" target="_blank" rel="noopener" class="nav__book">Book a call</a>' +
          '<a href="/contact-us/" class="btn btn--primary">Start a project <span class="arr">&#8599;</span></a>' +
          '<button class="nav__burger" type="button" aria-label="Open menu" aria-controls="primary-navigation" aria-expanded="false"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</div>';

    var nav = document.createElement('header');
    nav.className = 'nav';
    nav.innerHTML = html;
    document.body.insertBefore(nav, document.body.firstChild);

    var skip = document.createElement('a');
    skip.className = 'skip-link';
    skip.href = '#main-content';
    skip.textContent = 'Skip to content';
    document.body.insertBefore(skip, nav);

    var burger = nav.querySelector('.nav__burger');
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('.nav__links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  /* ---------- FOOTER ---------- */
  function buildFooter() {
    var svcLinks = SERVICES.map(function (s) {
      return '<li><a href="' + s[1] + '">' + s[0] + '</a></li>';
    }).join('');

    var html =
      '<div class="wrap">' +
        '<div class="foot__top">' +
          '<div class="foot__brand foot__col">' +
            '<div class="foot__mark"><span class="tri"></span> Amplified</div>' +
            '<p>A full-service creative studio helping bold brands across East Africa and beyond be seen, be remembered, and be heard.</p>' +
          '</div>' +
          '<div class="foot__col"><h5>Services</h5><ul>' + svcLinks + '</ul></div>' +
          '<div class="foot__col"><h5>Studio</h5><ul>' +
            '<li><a href="/portfolio/">Work</a></li>' +
            '<li><a href="/services/">Services</a></li>' +
            '<li><a href="/pricing/">Pricing</a></li>' +
            '<li><a href="/about/">About us</a></li>' +
            '<li><a href="/contact-us/">Contact</a></li>' +
            '<li><a href="' + LINKS.calendly + '" target="_blank" rel="noopener">Book a free call</a></li>' +
          '</ul></div>' +
          '<div class="foot__col"><h5>Connect</h5><ul>' +
            '<li><a href="' + LINKS.email + '">info@amplified.com</a></li>' +
            '<li><a href="' + LINKS.phone + '">+256 702 366 511</a></li>' +
            '<li style="margin-top:8px"><div class="soc-icons">' +
              '<a href="' + LINKS.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' +
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>' +
              '</a>' +
              '<a href="' + LINKS.twitter + '" target="_blank" rel="noopener" aria-label="Twitter / X">' +
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' +
              '</a>' +
              '<a href="' + LINKS.whatsapp + '" target="_blank" rel="noopener" aria-label="WhatsApp">' +
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
              '</a>' +
              '<a href="' + LINKS.youtube + '" target="_blank" rel="noopener" aria-label="YouTube">' +
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>' +
              '</a>' +
            '</div></li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="foot__bigword">BE <em>HEARD.</em></div>' +
        '<div class="foot__bottom">' +
          '<span>&copy; ' + new Date().getFullYear() + ' Amplified Kreative. Kampala, Uganda.</span>' +
          '<span>Design that refuses to whisper.</span>' +
        '</div>' +
      '</div>';

    var foot = document.createElement('footer');
    foot.className = 'foot';
    foot.innerHTML = html;
    document.body.appendChild(foot);
  }

  /* ---------- persistent contact actions ---------- */
  function buildContactActions() {
    var actions = document.createElement('div');
    actions.className = 'contact-actions';
    actions.setAttribute('aria-label', 'Quick contact options');
    actions.innerHTML =
      '<a class="contact-action contact-action--book" href="' + LINKS.calendly + '" target="_blank" rel="noopener" aria-label="Book a free 30-minute call">' +
        '<span class="contact-action__label">Book a call</span><span class="contact-action__icon">&#8599;</span>' +
      '</a>' +
      '<a class="contact-action contact-action--whatsapp" href="' + LINKS.whatsapp + '" target="_blank" rel="noopener" aria-label="Chat with Amplified Kreative on WhatsApp">' +
        '<span class="contact-action__label">WhatsApp</span>' +
        '<svg class="contact-action__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
      '</a>';
    document.body.appendChild(actions);
  }

  /* ---------- SCROLL REVEAL ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- FAQ accordion ---------- */
  function initFaq() {
    document.querySelectorAll('.faq__item').forEach(function (item) {
      var q = item.querySelector('.faq__q');
      var a = item.querySelector('.faq__a');
      if (!q || !a) return;
      var id = 'faq-answer-' + Math.random().toString(36).slice(2, 9);
      a.id = id;
      q.setAttribute('aria-controls', id);
      q.setAttribute('aria-expanded', 'false');
      q.addEventListener('click', function () {
        var open = item.classList.contains('open');
        item.classList.toggle('open');
        a.style.maxHeight = open ? '0px' : a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', String(!open));
      });
    });
  }

  /* ---------- expose helpers ---------- */
  window.AMP = { SERVICES: SERVICES, LINKS: LINKS };

  function init() {
    buildNav();
    initReveal();
    initFaq();
    buildFooter();
    buildContactActions();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
