// ano atual
    document.getElementById('year').textContent = new Date().getFullYear();

    // revelar on scroll
    const onScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      const trigger = window.innerHeight * 0.88;
      reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if(rect.top < trigger){ el.classList.add('visible'); }
      });
    };
    document.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('load', onScroll);