// mobile nav toggle
document.addEventListener('DOMContentLoaded', ()=>{
  const toggle = document.querySelector('.navtoggle');
  const links = document.querySelector('.navlinks');
  if(toggle && links){
    toggle.addEventListener('click', ()=> links.classList.toggle('open'));
  }

  // scroll reveal
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  // live search: filters any .pass card within [data-search-scope]
  const searchInput = document.querySelector('[data-search]');
  const scope = document.querySelector('[data-search-scope]');
  const countEl = document.querySelector('[data-search-count]');
  if(searchInput && scope){
    const cards = Array.from(scope.querySelectorAll('.pass'));
    const updateCount = ()=>{
      const visible = cards.filter(c=>c.style.display !== 'none').length;
      if(countEl) countEl.textContent = visible + ' of ' + cards.length + ' shown';
    };
    searchInput.addEventListener('input', ()=>{
      const q = searchInput.value.trim().toLowerCase();
      cards.forEach(card=>{
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(q) ? '' : 'none';
      });
      updateCount();
    });
    updateCount();
  }

  // scroll-linked parallax (background layer + globe drift)
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(parallaxEls.length && !reducedMotion){
    let ticking = false;
    function updateParallax(){
      const y = window.scrollY;
      parallaxEls.forEach(el=>{
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
        el.style.transform = 'translateY(' + (y * speed) + 'px)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', ()=>{
      if(!ticking){ requestAnimationFrame(updateParallax); ticking = true; }
    }, {passive:true});
    updateParallax();
  }
});
