/* ═══════════════════════════════════════════════════════
   SHRI GURUKRUPA BUILDERS — Shared JavaScript
   ═══════════════════════════════════════════════════════ */

// ─── NAV EMBLEM IMAGE ───
function getNavEmblem(root) {
  return `<img src="${root}assets/Pics/logo-transparent.png" alt="Shri Gurukrupa Builders logo" />`;
}

let __agentResizeLogged = false;

function __agentDebugLog(runId, hypothesisId, location, message, data) {
  // #region agent log
  fetch('http://127.0.0.1:7374/ingest/4fd5f7c4-1004-4320-a2fc-bbedb838388e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96b0ff'},body:JSON.stringify({sessionId:'96b0ff',runId,hypothesisId,location,message,data,timestamp:Date.now()})}).catch(()=>{});
  // #endregion
}

// #region agent log
__agentDebugLog(`boot-${Date.now()}`, 'H5', 'assets/js/main.js:boot', 'main.js loaded', {
  readyState: document.readyState,
  href: window.location.href
});
// #endregion

function __agentAuditImageVisibility(runId) {
  const imgs = Array.from(document.querySelectorAll('img'));
  const broken = imgs.filter(img => img.complete && img.naturalWidth === 0).slice(0, 8).map(img => img.getAttribute('src'));
  __agentDebugLog(runId, 'H3', 'assets/js/main.js:image-audit', 'Image visibility audit', {
    totalImages: imgs.length,
    brokenCount: broken.length,
    brokenSources: broken
  });
}

function __agentAuditLayoutOverlap(runId) {
  const body = document.body;
  const doc = document.documentElement;
  const overflowX = Math.max(body.scrollWidth, doc.scrollWidth) - doc.clientWidth;
  const navbar = document.getElementById('navbar');
  const firstSection = document.querySelector('main section');
  let overlappingSections = [];
  let topLoadOverlap = false;
  if (navbar) {
    const navBottom = navbar.getBoundingClientRect().bottom;
    overlappingSections = Array.from(document.querySelectorAll('main section')).filter(sec => {
      const r = sec.getBoundingClientRect();
      return r.top < navBottom && r.bottom > navBottom;
    }).slice(0, 5).map(sec => sec.className || sec.id || sec.tagName);
    if (firstSection && window.scrollY < 5) {
      topLoadOverlap = firstSection.getBoundingClientRect().top < navBottom;
    }
  }
  __agentDebugLog(runId, 'H2', 'assets/js/main.js:layout-audit', 'Layout overlap/overflow audit', {
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    scrollY: window.scrollY,
    overflowX,
    hasNavbar: !!navbar,
    overlappingSections,
    topLoadOverlap
  });
}

function __agentAuditInteractiveVisibility(runId) {
  const selectors = ['.portfolio-card', '.blog-list-card', '.blog-featured', '.team-card', '.venture-card'];
  let checked = 0;
  let hidden = 0;
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      checked += 1;
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const isHidden = cs.display === 'none' || cs.visibility === 'hidden' || (parseFloat(cs.opacity || '1') === 0 && rect.height > 0);
      if (isHidden) hidden += 1;
    });
  });
  __agentDebugLog(runId, 'H6', 'assets/js/main.js:visibility-audit', 'Interactive visibility audit', {
    checked,
    hidden
  });
}

// ─── INJECT NAV ───
function injectNav(activePage) {
  const root = document.querySelector('html').dataset.root || '';
  const nav = document.createElement('nav');
  nav.id = 'navbar';
  nav.innerHTML = `
    <a href="${root}index.html" class="nav-logo">
      <div class="nav-logo-emblem">${getNavEmblem(root)}</div>
      <div class="nav-logo-text">
        <div class="brand">Shri Gurukrupa</div>
        <div class="tagline-mini">Builders &amp; Contractors — Nagpur</div>
      </div>
    </a>
    <ul class="nav-links">
      <li><a href="${root}index.html" ${activePage==='home'?'class="active"':''}>Home</a></li>
      <li><a href="${root}about.html" ${activePage==='about'?'class="active"':''}>About Us</a></li>
      <li><a href="${root}portfolio.html" ${activePage==='portfolio'?'class="active"':''}>Portfolio</a></li>
      <li><a href="${root}blog.html" ${activePage==='blog'?'class="active"':''}>Insights</a></li>
      <li><a href="${root}contact.html" class="nav-cta">Enquire Now</a></li>
    </ul>
    <button class="nav-mobile-toggle" onclick="openMobileNav()" aria-label="Open menu">☰</button>
  `;

  const mobileNav = document.createElement('div');
  mobileNav.className = 'mobile-nav';
  mobileNav.id = 'mobileNav';
  mobileNav.innerHTML = `
    <button class="mobile-close" onclick="closeMobileNav()" aria-label="Close menu">✕</button>
    <a href="${root}index.html" onclick="closeMobileNav()">Home</a>
    <a href="${root}about.html" onclick="closeMobileNav()">About Us</a>
    <a href="${root}portfolio.html" onclick="closeMobileNav()">Portfolio</a>
    <a href="${root}blog.html" onclick="closeMobileNav()">Insights</a>
    <a href="${root}contact.html" onclick="closeMobileNav()">Enquire Now</a>
  `;

  document.body.prepend(mobileNav);
  document.body.prepend(nav);
}

// ─── INJECT FOOTER ───
function injectFooter() {
  const root = document.querySelector('html').dataset.root || '';
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="brand-name">Shri Gurukrupa Builders</div>
        <div class="brand-sub">&amp; Government Contractors, Nagpur</div>
        <p>Pioneering next-generation rural and urban infrastructure across Nagpur, Umred, and the Vidarbha region. Built on faith, driven by vision, delivered with pride.</p>
        <div class="footer-social">
          <a href="#" class="social-btn" title="Facebook" aria-label="Facebook">f</a>
          <a href="#" class="social-btn" title="Instagram" aria-label="Instagram">ig</a>
          <a href="#" class="social-btn" title="LinkedIn" aria-label="LinkedIn">in</a>
          <a href="#" class="social-btn" title="YouTube" aria-label="YouTube">▶</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="${root}about.html">About Us</a></li>
          <li><a href="${root}portfolio.html">Portfolio</a></li>
          <li><a href="${root}blog.html">Blog &amp; Insights</a></li>
          <li><a href="${root}contact.html">Contact Us</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="#">Residential Projects</a></li>
          <li><a href="#">Commercial Spaces</a></li>
          <li><a href="#">Government Contracts</a></li>
          <li><a href="#">Rural Infrastructure</a></li>
          <li><a href="#">Roads &amp; Bridges</a></li>
          <li><a href="#">Interior Design</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} Shri Gurukrupa Builders &amp; Contractors, Nagpur. All rights reserved.</p>
      <div class="footer-rera">RERA Reg: P51700025632 · MahaRERA · ISO 9001:2015 Certified</div>
    </div>
  `;
  document.body.appendChild(footer);
}

// ─── MOBILE NAV ───
function openMobileNav() { document.getElementById('mobileNav').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMobileNav() { document.getElementById('mobileNav').classList.remove('open'); document.body.style.overflow = ''; }

// ─── NAVBAR SCROLL ───
function initNavScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60), { passive: true });
}

// ─── SCROLL REVEAL ───
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: isMobile ? 0.02 : 0.1, rootMargin: isMobile ? '0px 0px -10px 0px' : '0px 0px -40px 0px' });
  reveals.forEach(el => obs.observe(el));
}

// ─── COUNT-UP ───
function initCountUp() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current).toLocaleString('en-IN');
      }, 16);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  els.forEach(el => obs.observe(el));
}

// ─── 3D CARD TILT ───
function initCardTilt(selector = '.tilt-card') {
  document.querySelectorAll(selector).forEach(card => {
    const applyTilt = (clientX, clientY) => {
      const r = card.getBoundingClientRect();
      const x = (clientX - r.left) / r.width - 0.5;
      const y = (clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x*10}deg) rotateX(${-y*7}deg) translateY(-4px) scale(1.01)`;
    };

    card.addEventListener('mousemove', e => {
      applyTilt(e.clientX, e.clientY);
    });
    card.addEventListener('touchmove', e => {
      const t = e.touches[0];
      if (!t) return;
      applyTilt(t.clientX, t.clientY);
    }, { passive: true });
    card.addEventListener('touchstart', e => {
      const t = e.touches[0];
      if (!t) return;
      applyTilt(t.clientX, t.clientY);
    }, { passive: true });
    const resetTilt = () => {
      card.style.transition = 'transform 0.5s ease';
      card.style.transform = '';
      setTimeout(() => card.style.transition = '', 500);
    };
    card.addEventListener('mouseleave', resetTilt);
    card.addEventListener('touchend', resetTilt);
    card.addEventListener('touchcancel', resetTilt);
    card.addEventListener('blur', resetTilt);
    card.addEventListener('focusout', resetTilt);
    card.addEventListener('pointercancel', resetTilt);
    card.addEventListener('pointerup', e => {
      if (e.pointerType === 'touch') resetTilt();
    });
  });
}

// ─── FORM SUBMIT ───
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  const original = btn.innerHTML;
  btn.innerHTML = '<span>✓ Enquiry Received! We\'ll contact you shortly.</span>';
  btn.style.background = 'linear-gradient(135deg,#1a4a1a,#0d2d0d)';
  btn.style.color = '#90EE90';
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 4000);
}

// ─── INIT ALL ───
function initPage(activePage) {
  const runId = `run-${activePage}-${Date.now()}`;
  __agentDebugLog(runId, 'H1', 'assets/js/main.js:initPage', 'initPage start', {
    activePage,
    url: window.location.pathname,
    viewportWidth: window.innerWidth
  });

  injectNav(activePage);
  injectFooter();
  initNavScroll();
  initScrollReveal();
  initCountUp();
  initCardTilt();
  // Attach form handler
  document.querySelectorAll('form.enquiry-form').forEach(f => f.addEventListener('submit', handleFormSubmit));

  __agentDebugLog(runId, 'H4', 'assets/js/main.js:initPage-post', 'Post-init structure counts', {
    navCount: document.querySelectorAll('#navbar').length,
    footerCount: document.querySelectorAll('footer').length,
    sectionCount: document.querySelectorAll('main section').length
  });

  const imageRunId = `${runId}-img`;
  if (document.readyState === 'complete') {
    __agentAuditImageVisibility(imageRunId);
    __agentAuditLayoutOverlap(imageRunId);
    __agentAuditInteractiveVisibility(imageRunId);
  } else {
    window.addEventListener('load', () => {
      __agentAuditImageVisibility(imageRunId);
      __agentAuditLayoutOverlap(imageRunId);
      __agentAuditInteractiveVisibility(imageRunId);
    }, { once: true });
  }

  window.addEventListener('resize', () => {
    if (__agentResizeLogged) return;
    __agentResizeLogged = true;
    __agentAuditLayoutOverlap(`${runId}-resize`);
  }, { passive: true });
}
