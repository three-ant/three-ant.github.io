document.addEventListener("scroll", function() {
    const sections = document.querySelectorAll('.sliding-section');
    
    sections.forEach(section => {
      if (isInViewport(section)) {
        section.classList.add('slide-in');
      }
    });
  });
  
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  }
  