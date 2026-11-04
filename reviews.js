(() => {
  const root = document.querySelector('.reviews');
  if (!root) return;
  const track = root.querySelector('.reviews-track');
  const cards = [...track.children];
  const pause = root.querySelector('.review-pause');
  const english = document.documentElement.lang === 'en';
  const rtl = getComputedStyle(track).direction === 'rtl';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, elapsed = 0, stopped = reduced.matches, hovered = false, focused = false, visible = false;
  const step = () => cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
  const max = () => Math.max(0, cards.length - Math.round(track.clientWidth / step()));
  function update(smooth = true) {
    index = Math.min(index, max());
    track.scrollTo({left: (rtl ? -1 : 1) * index * step(), behavior: smooth && !reduced.matches ? 'smooth' : 'instant'});
    root.querySelector('.reviews-count').textContent = `${index + 1} / ${max() + 1}`;
  }
  function state() {
    pause.setAttribute('aria-pressed', String(stopped));
    pause.textContent = stopped ? '▷' : 'Ⅱ';
    pause.setAttribute('aria-label', english ? (stopped ? 'Start automatic rotation' : 'Pause automatic rotation') : (stopped ? 'הפעלת ההחלפה האוטומטית' : 'עצירת ההחלפה האוטומטית'));
  }
  function move(delta) { elapsed = 0; index = (index + delta + max() + 1) % (max() + 1); update(); }
  root.querySelector('.review-next').addEventListener('click', () => move(1));
  root.querySelector('.review-prev').addEventListener('click', () => move(-1));
  pause.addEventListener('click', () => { stopped = !stopped; state(); });
  root.addEventListener('mouseenter', () => hovered = true);
  root.addEventListener('mouseleave', () => hovered = false);
  root.addEventListener('focusin', () => focused = true);
  root.addEventListener('focusout', e => focused = root.contains(e.relatedTarget));
  track.addEventListener('scroll', () => { index = Math.round(Math.abs(track.scrollLeft) / step()); root.querySelector('.reviews-count').textContent = `${index + 1} / ${max() + 1}`; }, {passive:true});
  new IntersectionObserver(([entry]) => visible = entry.isIntersecting, {threshold:0.3}).observe(root);
  new ResizeObserver(() => update(false)).observe(track);
  reduced.addEventListener('change', () => { if (reduced.matches) { stopped = true; state(); } });
  setInterval(() => {
    if (!visible || stopped || hovered || focused || document.hidden) return;
    const shown = cards.slice(index, index + cards.length - max());
    const words = Math.max(...shown.map(card => card.querySelector('blockquote').textContent.trim().split(/\s+/).length));
    elapsed += 1000;
    if (elapsed >= Math.max(7500, words * 350 + 2000)) move(1);
  }, 1000);
  state(); update(false);
})();
