// Nav solid on scroll
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('solid', scrollY > 60));

// Scroll progress bar
const bar = document.getElementById('progress');
addEventListener('scroll', () => {
  const h = document.documentElement;
  bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%';
});

// Modern cursor — fast follow (skips mobile/touch)
if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
  const glow = document.getElementById('cursorGlow');
  const dot = document.getElementById('cursorDot');
  let mx = innerWidth / 2, my = innerHeight / 2;
  let gx = mx, gy = my;
  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    glow.classList.remove('cursor-hidden');
    dot.classList.remove('cursor-hidden');
  });
  (function follow() {
    gx += (mx - gx) * 0.4;   // higher = faster, snappier ring
    gy += (my - gy) * 0.4;
    glow.style.transform = `translate(${gx}px,${gy}px) translate(-50%,-50%)`;
    requestAnimationFrame(follow);
  })();
  document.querySelectorAll('a,button,.card,.ex,.b-card,input,textarea,.burger').forEach(el => {
    el.addEventListener('mouseenter', () => { glow.classList.add('active'); dot.classList.add('active'); });
    el.addEventListener('mouseleave', () => { glow.classList.remove('active'); dot.classList.remove('active'); });
  });
  addEventListener('mouseleave', () => { glow.classList.add('cursor-hidden'); dot.classList.add('cursor-hidden'); });
}

// Mobile menu
const burger = document.getElementById('burger');
const links = document.getElementById('links');
burger.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// Reveal on scroll
const els = document.querySelectorAll('.bento,.about,.exotic,.shop,.team,.contact,.ex,.card,.t-card');
els.forEach(e => e.classList.add('reveal'));
const io = new IntersectionObserver(en => en.forEach(x => x.isIntersecting && x.target.classList.add('in')), { threshold: .08 });
els.forEach(e => io.observe(e));

// 3D tilt on shop cards
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5;
    const py = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

// Counters
const counters = document.querySelectorAll('[data-count]');
let done = false;
function run() {
  if (done) return;
  const b = document.querySelector('.bento');
  if (!b || b.getBoundingClientRect().top > innerHeight) return;
  done = true;
  counters.forEach(c => {
    const t = +c.dataset.count; let n = 0; const s = Math.ceil(t / 50);
    const id = setInterval(() => {
      n += s; if (n >= t) { n = t; clearInterval(id); }
      c.textContent = (n >= 1000 ? n.toLocaleString() : n) + '+';
    }, 28);
  });
}
addEventListener('scroll', run);
addEventListener('load', run);

// Form demo
const form = document.getElementById('contact-form');
const msg = document.getElementById('form-msg');
form.addEventListener('submit', e => {
  e.preventDefault();
  msg.textContent = '✅ Enquiry sent! We will get back to you shortly.';
  form.reset();
  setTimeout(() => msg.textContent = '', 5000);
});
