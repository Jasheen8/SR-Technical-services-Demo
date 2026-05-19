document.documentElement.classList.add('js');

const fallbackSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#04080F"/>
        <stop offset="55%" stop-color="#3E68A3"/>
        <stop offset="100%" stop-color="#A1C6EA"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="800" fill="url(#g)"/>
    <circle cx="985" cy="180" r="130" fill="rgba(255,255,255,.10)"/>
    <circle cx="230" cy="640" r="170" fill="rgba(255,255,255,.08)"/>
    <rect x="90" y="90" width="1020" height="620" rx="34" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.18)"/>
    <text x="600" y="392" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="54" fill="#FFFFFF" font-weight="700">SR Technical Services LLC</text>
    <text x="600" y="452" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="24" fill="#E0E9F6">Premium maintenance • renovation • fit-out</text>
  </svg>
`);
const fallbackSrc = `data:image/svg+xml;charset=UTF-8,${fallbackSvg}`;

function addFallback(img) {
  if (!img || img.dataset.fallbackReady) return;
  img.dataset.fallbackReady = '1';
  img.addEventListener('error', () => {
    img.src = fallbackSrc;
  });
}

document.querySelectorAll('img').forEach(addFallback);

const slides = document.querySelectorAll('.main-slide');
let current = 0;
let playing = true;
let autoTimer = setInterval(nextSlide, 3200);

function showSlide(i) {
  slides.forEach((slide, idx) => slide.classList.toggle('active', idx === i));
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

function toggleSlide() {
  const btn = document.getElementById('pauseBtn');
  if (playing) {
    clearInterval(autoTimer);
    btn.innerText = 'Play';
  } else {
    autoTimer = setInterval(nextSlide, 3200);
    btn.innerText = 'Pause';
  }
  playing = !playing;
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('active');
}

document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('active');
  });
});

function toggleDropdown(e) {
  if (window.innerWidth <= 900) {
    e.preventDefault();
    document.getElementById('serviceDropdown').classList.toggle('open');
  }
}

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('active');
//     }
//   });
// }, {
//   threshold: 0.12
// });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.25
});

document.querySelectorAll('.reveal, .section-animate').forEach((el) => {
  observer.observe(el);
});

document.addEventListener('click', (e) => {
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.querySelector('.menu-btn');
  const dropdown = document.getElementById('serviceDropdown');

  if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
    sidebar.classList.remove('active');
  }
  if (window.innerWidth <= 900 && dropdown.classList.contains('open') && !dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});

const heroPanel = document.querySelector('.hero-panel');
heroPanel.addEventListener('mouseenter', () => clearInterval(autoTimer));
heroPanel.addEventListener('mouseleave', () => {
  if (playing) autoTimer = setInterval(nextSlide, 3200);
});