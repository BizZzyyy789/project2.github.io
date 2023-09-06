const inputEl = document.querySelector(".input");
const bodyEl = document.querySelector("body");
inputEl.checked = JSON.parse(localStorage.getItem("mode"));
updateBody();
function updateBody() {
  if (inputEl.checked) {
    bodyEl.style.background = "black";
  } else {
    bodyEl.style.background = "blue";
  }
}
inputEl.addEventListener("input", () => {
  updateBody();
  updateLocalStorage();
});
function updateLocalStorage() {
  localStorage.setItem("mode", JSON.stringify(inputEl.checked));
}
document.querySelector("body").style.visibility = "hidden";
document.addEventListener("DOMContentLoaded", function() {
    var timeoutId = setTimeout(function() {
        document.querySelector(".pencil").style.visibility = "visible";
    }, 100);
    setTimeout(function() {
        clearTimeout(timeoutId);
        document.querySelector("body").style.visibility = "visible";
        document.querySelector(".pencil").style.visibility = "hidden";
    }, 200);
});

  
const scroling = document.querySelector(".back-to-top");
window.addEventListener('scroll', checkHeight);
 function checkHeight()
 {
   if(window.scrollY > 200)
   {
      scroling.style.display = "flex";
   }
   else
   {
      scroling.style.display = "none";
   }
 }



//  slideshow
const removeClasses = (allSlides) => {
  allSlides.forEach(el => {
    el.classList.remove("prev", "current");
  });
};

const addClasses = (slideArr, className) => {
  slideArr.forEach(el => {
    el.classList.add(className);
  });
};

const Carousel = () => {
  const slides = document.querySelectorAll(".slide");
  const slidesLength = slides.length / 2;
  let timerId;
  let prev = slidesLength - 1;
  let curr = 0;

  const getSlides = (slideIndex) => {
    return [...slides].filter((item) => slideIndex == item.dataset.id);
  };

  const changeSlide = (direction) => {
    removeClasses(slides);
    prev = curr;
    if (direction === "right") {
      curr = (curr + 1) % slidesLength;
    } else {
      curr = (slidesLength + curr - 1) % slidesLength;
    }
    const prevSlides = getSlides(prev);
    const currentSlides = getSlides(curr);
    addClasses(prevSlides, "prev");
    addClasses(currentSlides, "current");
  };
  const throttleButtons = function (func, direction, delay) {

    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(direction);
    }, delay);
  };

  const nextSlide = () => {
    throttleButtons(changeSlide, "right", 300);
  };

  const previousSlide = () => {
    throttleButtons(changeSlide, "left", 300);
  };

  const startAutoPlay = () => {
    setInterval(() => {
      nextSlide();
    }, 30000);
  };
  const init = () => {
    slides[0].classList.add("current");
    slides[slidesLength].classList.add("current");
    const buttonLeft = document.querySelector(".btn-left");
    const buttonRight = document.querySelector(".btn-right");
    buttonLeft.addEventListener("click", previousSlide);
    buttonRight.addEventListener("click", nextSlide);
    startAutoPlay(); 
  };
  return { init };
};

window.addEventListener("load", Carousel().init);
const wrapper = document.querySelector('.new');
let isPressed = false;
let startX = 0;
let scrollLeft = 0;
wrapper.addEventListener('mousedown', function (e) {
  isPressed = true;
  startX = e.clientX;
  scrollLeft = this.scrollLeft;
  this.style.cursor = 'grabbing';
});
wrapper.addEventListener('mouseleave', function () {
  isPressed = false;
  this.style.cursor = 'grab';
});
window.addEventListener('mouseup', function () {
  isPressed = false;
  wrapper.style.cursor = 'grab';
});
wrapper.addEventListener('mousemove', function (e) {
  if (!isPressed) {
    return;
  }
  const deltaX = startX - e.clientX;
  this.scrollLeft = scrollLeft + deltaX;
  e.preventDefault();
});
function animateScroll() {
  if (!isPressed) {
    return;
  }
  requestAnimationFrame(animateScroll);
}
wrapper.addEventListener('mousedown', function () {
  animateScroll();
});






