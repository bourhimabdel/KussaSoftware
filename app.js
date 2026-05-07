const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')
const monthlyBtn = document.getElementById("monthlyBtn");
const annualBtn = document.getElementById("annualBtn");
const proPrice = document.getElementById("proPrice");


if (menu && menuLinks) {
    menu.addEventListener('click', function () {
      menu.classList.toggle('is-active');
      menuLinks.classList.toggle('active');
    });
  }
  
  // Pricing toggle
  if (monthlyBtn && annualBtn && proPrice) {
    monthlyBtn.onclick = () => {
      monthlyBtn.classList.add("active");
      annualBtn.classList.remove("active");
      proPrice.innerText = "$7.5";
    };
  
    annualBtn.onclick = () => {
      annualBtn.classList.add("active");
      monthlyBtn.classList.remove("active");
      proPrice.innerText = "$60";
    };
  }