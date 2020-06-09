// wow.js
new WOW().init();

let loading = true;
let textWrapper = document.querySelector(".loading__wrapper");
var textWrapperText = document.querySelector(".loading__wrapper__text");
textWrapperText.innerHTML = textWrapperText.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);
const sleep = (sec) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), sec * 1000);
  });
};
console.log("warpper", textWrapper);
textWrapper.style.display = "block";

// loading
document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    loadingAnimate();
    sleep(1.5)
      .then(() => {
        console.log("1s");
        loading = false;
        if (!loading) {
          loadingDone();
        }
      })
      .then(() => {
        sleep(1.2).then(() => {
          console.log("1.2s");
          let loadingWarpper = document.querySelector(".loading__wrapper");
          loadingWarpper.classList.add("close");
        });
      })
      .then(() => {
        sleep(1.7).then(() => {
          console.log("0.5s");
          bannerTextAnimate();
        });
      });
  }
};

const loadingAnimate = function () {
  anime.timeline({ loop: false }).add({
    targets: ".loading__wrapper__text .letter",
    translateX: [40, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1500,
    delay: (el, i) => 500 + 30 * i,
  });
};
// loadingAnimate();
const loadingDone = function () {
  anime.timeline({ loop: false }).add({
    targets: ".loading__wrapper__text .letter",
    translateX: [0, -30],
    opacity: [1, 0],
    easing: "easeInExpo",
    duration: 1100,
    delay: (el, i) => 100 + 30 * i,
  });
};
// setTimeout(function () {
//   console.log("已經1.5秒");
//   loading = false;
//   if (!loading) {
//     loadingDone();

//     setTimeout(function () {
//       let loadingWarpper = document.querySelector(".loading__wrapper");
//       loadingWarpper.classList.add("close");
//     }, 1200);
//   }
// }, 1500);

let mySwiper = new Swiper(".swiper-container", {
  spaceBetween: 40,
  slidesPerView: "auto",
  speed: 1000,
  loop: true,
  autoplay: {
    // 防止點擊後自動播放停止
    disableOnInteraction: false,
  },
  effect: "fade",
  fade: {
    crossFade: false,
  },
});

// mobile nav toggle
let mobile_nav_button = document.querySelector(".mb-navbtn");

mobile_nav_button.addEventListener("click", function () {
  let header = document.querySelector("header");
  header.classList.toggle("open");
});

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
    console.log(scroll_position);
  }
});

const bannerTextAnimate = function () {
  // Wrap every letter in a span
  var textWrapper = document.querySelector(".ml12");
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

  anime.timeline({ loop: false }).add({
    targets: ".ml12 .letter",
    translateX: [40, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1500,
    delay: (el, i) => 500 + 30 * i,
  });

  var textWrapper = document.querySelector(".ml13");
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

  anime.timeline({ loop: false }).add({
    targets: ".ml13 .letter",
    translateX: [40, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1500,
    delay: (el, i) => 800 + 30 * i,
  });
  var textWrapper = document.querySelector(".ml14");
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

  anime.timeline({ loop: false }).add({
    targets: ".ml14 .letter",
    translateX: [40, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1500,
    delay: (el, i) => 1000 + 30 * i,
  });
};
