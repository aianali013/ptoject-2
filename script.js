
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if(pre) pre.style.display = 'none';
});


const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  if(nav.style.display === 'flex') nav.style.display = '';
  else nav.style.display = 'flex';
});


let slideIndex = 0;
const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const total = slides.length;
function showSlide(i) {
  if (i < 0) {
    slideIndex = total - 1;
  } 
  else if (i >= total) {
    slideIndex = 0;
  } 
  else {
    slideIndex = i;
  }
  slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
  slidesContainer.style.transition = 'transform 0.5s ease';
}


document.getElementById('prev').addEventListener('click', () => showSlide(slideIndex - 1));
document.getElementById('next').addEventListener('click', () => showSlide(slideIndex + 1));


let carouselTimer = setInterval(() => showSlide(slideIndex + 1), 4000);


slidesContainer.addEventListener('mouseenter', () => clearInterval(carouselTimer));
slidesContainer.addEventListener('mouseleave', () => carouselTimer = setInterval(() => showSlide(slideIndex + 1), 4000));



const revealOnScroll = () => {
  document.querySelectorAll('.why, .shop, .contact').forEach(sec => {
    const r = sec.getBoundingClientRect();
    if(r.top < window.innerHeight - 80) sec.classList.add('visible');
  });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();


function loadRating(id){
  try {
    const raw = localStorage.getItem('rating_' + id);
    return raw ? JSON.parse(raw) : {value:0,count:0};
  } catch { return {value:0,count:0}; }
}
function saveRating(id, value){
  const cur = loadRating(id);
  const newCount = cur.count + 1;
  const newValue = Math.round(((cur.value * cur.count) + value) / newCount);
  const obj = { value: newValue, count: newCount };
  localStorage.setItem('rating_' + id, JSON.stringify(obj));
  return obj;
}
function renderRatings(){
  document.querySelectorAll('.rating').forEach(rEl => {
    const id = rEl.dataset.id;
    const info = loadRating(id);
    const stars = rEl.querySelectorAll('.stars span');
    stars.forEach(s => s.classList.remove('filled'));
    for(let i=0;i<info.value;i++){
      if(stars[i]) stars[i].classList.add('filled');
    }
    const rc = rEl.querySelector('.reviews-count');
    if(rc) rc.textContent = info.count;
  });
}
renderRatings();


document.addEventListener('click', e => {
  if(e.target.matches('.rating .stars span')){
    const span = e.target;
    const parent = span.closest('.rating');
    const id = parent.dataset.id;
    const value = parseInt(span.dataset.value, 10) || 0;
    const result = saveRating(id, value);
    renderRatings();
    span.closest('.product-card')?.querySelector('.product-body')?.classList.add('rated');
  }
});



document.querySelectorAll('.btn.wishlist').forEach(w => {
  w.addEventListener('click', () => {
    w.classList.toggle('saved');
    w.textContent = w.classList.contains('saved') ? '✓' : '♡';
  });
});

document.getElementById("goShopBtn").addEventListener("click", () => {
  document.querySelector("#shop").scrollIntoView({ behavior: "smooth" });
});


