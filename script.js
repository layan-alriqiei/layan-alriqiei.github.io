/* السنة في الفوتر */
document.getElementById('year').textContent = new Date().getFullYear();

/* الهيدر يتغير لما تنزلين */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20));

/* قائمة الجوال */
const navLinks = document.getElementById('navLinks');
document.getElementById('menuBtn').addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* الكتابة المتحركة */
const phrases = {
  en: ['Building real-world web systems', 'PHP • MySQL • JavaScript', 'Turning ideas into working systems', 'Always learning something new 🌱'],
  ar: ['أبني أنظمة ويب حقيقية', 'PHP • MySQL • JavaScript', 'أحوّل الأفكار إلى أنظمة شغّالة', 'أتعلم شي جديد كل يوم 🌱']
};
let lang = 'en';
let pIndex = 0, cIndex = 0, deleting = false, timer;
const typed = document.getElementById('typed');
function type() {
  const list = phrases[lang];
  const word = list[pIndex % list.length];
  typed.textContent = word.slice(0, cIndex);
  if (!deleting && cIndex < word.length) { cIndex++; timer = setTimeout(type, 70); }
  else if (!deleting) { deleting = true; timer = setTimeout(type, 1500); }
  else if (cIndex > 0) { cIndex--; timer = setTimeout(type, 35); }
  else { deleting = false; pIndex++; timer = setTimeout(type, 300); }
}
type();

/* تبديل اللغة */
const langBtn = document.getElementById('langBtn');
function setLang(newLang) {
  lang = newLang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-en]').forEach(el => { el.textContent = el.dataset[lang]; });
  langBtn.textContent = lang === 'ar' ? 'English' : 'عربي';
  document.title = lang === 'ar' ? 'ليان الرقيعي | مطوّرة ويب' : 'Layan Alriqiei | Web Developer';
  clearTimeout(timer); pIndex = 0; cIndex = 0; deleting = false; type();
  try { localStorage.setItem('lang', lang); } catch (e) {}
}
langBtn.addEventListener('click', () => setLang(lang === 'en' ? 'ar' : 'en'));
try { if (localStorage.getItem('lang') === 'ar') setLang('ar'); } catch (e) {}

/* حركة ظهور الأقسام */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
