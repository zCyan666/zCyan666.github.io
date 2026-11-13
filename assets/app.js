const email = 'zhoulianhao123@gmail.com';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menuButton?.setAttribute('aria-expanded', 'false'); menuButton?.setAttribute('aria-label', 'Open navigation'); navigation?.classList.remove('is-open'); }
menuButton?.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); navigation.classList.toggle('is-open', open); });
navigation?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') { const wasOpen = menuButton?.getAttribute('aria-expanded') === 'true'; closeMenu(); if (wasOpen) menuButton.focus(); } });
document.addEventListener('click', e => { if (!e.target.closest('.nav-inner')) closeMenu(); });
const toast = document.querySelector('.toast');
let toastTimer;
function announce(text) { if (!toast) return; toast.textContent = text; toast.classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('visible'), 4000); }
async function copyText(text, fallback) { try { if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable'); await navigator.clipboard.writeText(text); announce('Copied to clipboard.'); } catch { if (fallback) { fallback.focus(); fallback.select(); announce('Select and copy the draft below.'); } else { announce(`Please copy: ${text}`); } } }
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
    const subject = `Project enquiry: ${read('service')}`;
    const body = `Hello,\n\nI would like to discuss a software development project.\n\nName: ${read('name')}\nEmail: ${read('email')}\nService: ${read('service')}\nEstimated budget (USD): ${read('budget')}\nTarget platform: ${read('platform') || 'To be confirmed'}\n\nProject details:\n${read('message')}\n\nI have read the website privacy policy.\n`;
    const draft = document.querySelector('#draft-text');
    draft.value = `Subject: ${subject}\n\n${body}`;
    document.querySelector('#open-draft').href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const panel = document.querySelector('#email-draft');
    panel.hidden = false;
    panel.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    draft.focus({ preventScroll: true });
    announce('Draft ready. Review it and send it from your email app.');
  });
  document.querySelector('#copy-draft').addEventListener('click', () => { const draft = document.querySelector('#draft-text'); copyText(draft.value, draft); });
}
