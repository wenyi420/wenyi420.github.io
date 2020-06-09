let loading = true;

// loading
document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    // 處理文字初始呈問題
    let loadingText = document.querySelector(".loading__wrapper__text");
    loadingText.style.opacity = 1;

    showTextAnimate("loading__wrapper__text", 500);
    sleep(1.5)
      .then(() => {
        loading = false;
        if (!loading) {
          closeTextAnimate("loading__wrapper__text");
        }
      })
      .then(() => {
        sleep(1.2).then(() => {
          let loadingWarpper = document.querySelector(".loading__wrapper");
          loadingWarpper.classList.add("close");
        });
      })
      .then(() => {
        sleep(1.7).then(() => {
          bannerTextAnimate();
          // wow.js
          new WOW().init();
        });
      });
  }
};

// scroll
let swiperBanner = document.querySelector(".swiper-container");
let header = document.querySelector("header");

window.addEventListener("scroll", function () {
  if (window.scrollY === 0) {
    header.classList.remove("scroll");
    swiperBanner.style.transform = `translate3d(0, 0, 0)`;
  }
  if (window.scrollY !== 0) {
    header.classList.add("scroll");
    scroll_position = window.scrollY / 5;
    swiperBanner.style.transform = `translate3d(0, ${scroll_position}px, 0)`;
  }
});

// mobile nav toggle
let mobile_nav_button = document.querySelector(".mb-navbtn");

mobile_nav_button.addEventListener("click", function () {
  let header = document.querySelector("header");
  header.classList.toggle("open");
});

// banner swiper
let mySwiper = new Swiper(".swiper-container", {
  spaceBetween: 40,
  slidesPerView: "auto",
  speed: 1000,
  loop: true,
  autoplay: {
    disableOnInteraction: false,
  },
  effect: "fade",
  fade: {
    crossFade: false,
  },
});

// 文字特效
const showTextAnimate = function (el, delay) {
  let textWrapper = document.querySelector(`.${el}`);
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

  anime.timeline({ loop: false }).add({
    targets: `.${el} .letter`,
    translateX: [40, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1500,
    delay: (el, i) => delay + 30 * i,
  });
};

const closeTextAnimate = function (el) {
  anime.timeline({ loop: false }).add({
    targets: `.${el} .letter`,
    translateX: [0, -30],
    opacity: [1, 0],
    easing: "easeInExpo",
    duration: 1100,
    delay: (el, i) => 100 + 30 * i,
  });
};

// 計時器
const sleep = (sec) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), sec * 1000);
  });
};

const bannerTextAnimate = function () {
  showTextAnimate("ml12", 500);
  showTextAnimate("ml13", 800);
  showTextAnimate("ml14", 1000);
};
