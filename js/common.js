// js/common.js

function initParticles(){
  const particlesContainer = document.getElementById('particles');
  if(!particlesContainer) return;

  // allow particles on all screens
  const count = window.innerWidth > 1400 ? 60 : (window.innerWidth > 768 ? 40 : 25);
  // ^ fewer particles on very small phones so it’s lighter

  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 3 + Math.random()*8;
    p.style.width = p.style.height = `${size}px`;
    p.style.left = `${Math.random()*100}vw`;
    p.style.top = `${Math.random()*100}vh`;
    p.style.opacity = 0.25 + Math.random()*0.7;
    p.style.background = Math.random() > 0.5 ? '#00EAFF' : '#00FFD1';
    const dur = 8 + Math.random()*12;
    p.style.animation = `floatUp ${dur}s linear ${Math.random()*-dur}s infinite`;
    particlesContainer.appendChild(p);
  }
}


function initGSAPSections(){
  if(typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Generic section fade
  gsap.utils.toArray('.section').forEach((sec) => {
    gsap.from(sec, {
      scrollTrigger: { trigger: sec, start: 'top 85%' },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power2.out'
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initGSAPSections();
});
