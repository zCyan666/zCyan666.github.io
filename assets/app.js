const email = 'zhoulianhao123@gmail.com';
const themeToggle = document.querySelector('[data-theme-toggle]');
const themeStorageKey = 'software-services-theme';
function applyTheme(theme, remember = false) {
  const light = theme === 'light';
  document.documentElement.dataset.theme = light ? 'light' : 'dark';
  themeToggle?.setAttribute('aria-checked', String(light));
  themeToggle?.setAttribute('title', light ? uiCopy.night : uiCopy.day);
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = light ? '#f5f5f5' : '#0a0a0a';
  if (remember) {
    try { localStorage.setItem(themeStorageKey, light ? 'light' : 'dark'); } catch { /* Switching still works without storage. */ }
  }
}
applyTheme(document.documentElement.dataset.theme);
themeToggle?.addEventListener('click', () => {
  applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light', true);
});
window.addEventListener('storage', event => {
  if (event.key === themeStorageKey || event.key === null) applyTheme(event.newValue === 'light' ? 'light' : 'dark');
});
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menuButton?.setAttribute('aria-expanded', 'false'); menuButton?.setAttribute('aria-label', uiCopy.open); navigation?.classList.remove('is-open'); }
menuButton?.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? uiCopy.close : uiCopy.open); navigation.classList.toggle('is-open', open); });
navigation?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') { const wasOpen = menuButton?.getAttribute('aria-expanded') === 'true'; closeMenu(); if (wasOpen) menuButton.focus(); } });
document.addEventListener('click', e => { if (!e.target.closest('.nav-inner')) closeMenu(); });
const toast = document.querySelector('.toast');
let toastTimer;
function announce(text) { if (!toast) return; toast.textContent = text; toast.classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('visible'), 4000); }
async function copyText(text, fallback) { try { if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable'); await navigator.clipboard.writeText(text); announce(uiCopy.copied); } catch { if (fallback) { fallback.focus(); fallback.select(); announce(uiCopy.select); } else { announce(uiCopy.copy + text); } } }
document.querySelector('.copy-email')?.addEventListener('click', () => copyText(email));
const form = document.querySelector('#project-form');
if (form) {
  const service = document.querySelector('#service');
  const requested = new URLSearchParams(location.search).get('service');
  if ([...service.options].some(o => o.value === requested)) service.value = requested;
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const read = name => String(data.get(name) || '').trim();
    const serviceLabel = service.selectedOptions[0].textContent.trim();
    const budget = read('budget') === 'Not yet decided' ? uiCopy.undecided : read('budget');
    const subject = `${uiCopy.enquiry}: ${serviceLabel}`;
    const body = [uiCopy.hello, '', uiCopy.intro, '', `${uiCopy.name}: ${read('name')}`, `${uiCopy.email}: ${read('email')}`, `${uiCopy.service}: ${serviceLabel}`, `${uiCopy.budget}: ${budget}`, `${uiCopy.platform}: ${read('platform') || uiCopy.pending}`, '', `${uiCopy.details}:`, read('message'), '', uiCopy.privacy, ''].join('\n');
    const draft = document.querySelector('#draft-text');
    draft.value = `${uiCopy.subject}: ${subject}\n\n${body}`;
    document.querySelector('#open-draft').href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const panel = document.querySelector('#email-draft');
    panel.hidden = false;
    panel.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    draft.focus({ preventScroll: true });
    announce(uiCopy.ready);
  });
  document.querySelector('#copy-draft').addEventListener('click', () => { const draft = document.querySelector('#draft-text'); copyText(draft.value, draft); });
}
