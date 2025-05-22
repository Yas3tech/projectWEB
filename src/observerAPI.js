// observerAPI.js
export function observeCards(container) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
    });
  
    container.querySelectorAll('.card').forEach(card => observer.observe(card));
  }
  