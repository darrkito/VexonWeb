/** Interacciones globales: hojas inferiores, medición de CTAs, compartir y service worker. */
declare global {
  interface Window {
    vxTrack?: (name: string, params?: Record<string, unknown>) => void;
  }
}

const track = (name: string, params: Record<string, unknown> = {}) => window.vxTrack?.(name, { page: location.pathname, ...params });

function openSheet(id: string) {
  const d = document.getElementById(id) as HTMLDialogElement | null;
  if (!d) return;
  d.showModal();
  if (id === 'cotizador') track('open_cotizador');
}

function enableSheet(d: HTMLDialogElement) {
  // Cerrar al tocar fuera
  d.addEventListener('click', (e) => {
    const r = d.getBoundingClientRect();
    const t = e as MouseEvent;
    if (t.clientX < r.left || t.clientX > r.right || t.clientY < r.top || t.clientY > r.bottom) d.close();
  });
  // Cerrar deslizando hacia abajo (móvil)
  let startY = 0;
  let dy = 0;
  d.addEventListener('touchstart', (e) => {
    if (d.scrollTop > 0) return;
    startY = e.touches[0].clientY;
    dy = 0;
  }, { passive: true });
  d.addEventListener('touchmove', (e) => {
    if (!startY) return;
    dy = Math.max(0, e.touches[0].clientY - startY);
    d.style.transform = `translateY(${dy}px)`;
  }, { passive: true });
  d.addEventListener('touchend', () => {
    d.style.transform = '';
    if (dy > 90) d.close();
    startY = 0;
  });
}

export function initUI() {
  document.querySelectorAll<HTMLDialogElement>('dialog.sheet').forEach(enableSheet);

  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('a, button');
    if (!el) return;
    if (el.matches('[data-open-menu]')) openSheet('menu');
    if (el.matches('[data-open-cotizador]')) openSheet('cotizador');
    if (el.matches('[data-close-sheet]')) el.closest('dialog')?.close();
    if (el.closest('#menu') && el.matches('a')) (document.getElementById('menu') as HTMLDialogElement)?.close();

    if (el.matches('[data-wa]')) {
      track('click_whatsapp', { block: el.dataset.block, model: el.dataset.model });
      if ('vibrate' in navigator) navigator.vibrate?.(10);
    }
    if (el.matches('[data-call]') || el.getAttribute('href')?.startsWith('tel:')) track('click_call', { block: el.dataset.block });
    if (el.matches('[data-ficha]')) track('download_ficha', { model: el.dataset.model });
    if (el.matches('[data-share]')) {
      e.preventDefault();
      const data = { title: document.title, text: el.dataset.shareText ?? document.title, url: location.href.split('#')[0] };
      track('share_model', { model: el.dataset.model });
      if (navigator.share) {
        navigator.share(data).catch(() => {});
      } else {
        navigator.clipboard?.writeText(data.url).then(() => {
          const label = el.querySelector('[data-share-label]');
          if (label) {
            const prev = label.textContent;
            label.textContent = 'Enlace copiado';
            setTimeout(() => (label.textContent = prev), 2200);
          }
        });
      }
    }
  });

  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
  }
}
