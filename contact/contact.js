
const addEventOnElements = function (elements, eventType, callback){
    for(let i = 0, len = elements.length; i < len; i++){
        elements[i].addEventListener(eventType, callback);
    }
}

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavBar = function(){
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavBar);

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function(){
    if(window.scrollY > 100){
        header.classList.add("active");
    }else{
        header.classList.remove("active");
    }
})

/* SLIDER */

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function(currentSlider){
    const sliderContainer = currentSlider.querySelector("[data-slider-container]");
    const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
    const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

    let currentSlidePos = 0;

    const moveSliderItem = function(){
        sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
    }

    /* Next Slide */

    const slideNext = function(){
        const slideEnd = currentSlidePos >= sliderContainer.childElementCount - 1;

        if(slideEnd){
            currentSlidePos = 0 
        }else{
            currentSlidePos++;
        }

        moveSliderItem();
    }

    sliderNextBtn.addEventListener("click", slideNext);

    /* Previous Slide */

    const slidePrev = function(){
        if(currentSlidePos <= 0){
            currentSlidePos = sliderContainer.childElementCount - 1;
        }else{
            currentSlidePos--;
        }

        moveSliderItem();
    }

    sliderPrevBtn.addEventListener("click", slidePrev);

    /* For situations where only one image is displayed */
    
    const dontHaveExtraItem = sliderContainer.childElementCount <= 1;
    if(dontHaveExtraItem){
        sliderNextBtn.style.display = "none";
        sliderPrevBtn.style.display = "none";
    }
}

for(let i = 0, len = sliders.length; i < len; i++) {initSlider(sliders[i]);}

/* ACCORDIONS */

const accordions = document.querySelectorAll("[data-accordion]");

let lastActiveAccordion = accordions[0];

const initAccordion = function(currentAccordion){
    const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");
    
    const expandAccordion = function(){
        if(lastActiveAccordion && lastActiveAccordion != currentAccordion){
            lastActiveAccordion.classList.remove("expanded");
        }

        currentAccordion.classList.toggle("expanded");

        lastActiveAccordion = currentAccordion;
    }

    accordionBtn.addEventListener("click", expandAccordion);
}

function nextStep() {
    if (validateCurrentStep()) {
      showNextStep();
      updateReviewSection();
    }
  }

  function prevStep() {
    showPreviousStep();
    updateReviewSection();
  }

  function showNextStep() {
  }

    const form = document.getElementById("form");
    const result = document.getElementById("result");
    
    form.addEventListener("submit", function (e) {
      const formData = new FormData(form);
      e.preventDefault();
      var object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      var json = JSON.stringify(object);
      result.innerHTML = "Please wait...";
    
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      })
        .then(async (response) => {
          let json = await response.json();
          if (response.status == 200) {
            result.innerHTML = json.message;
            result.classList.remove("text-gray-500");
            result.classList.add("text-green-500");
          } else {
            console.log(response);
            result.innerHTML = json.message;
            result.classList.remove("text-gray-500");
            result.classList.add("text-red-500");
          }
        })
        .catch((error) => {
          console.log(error);
          result.innerHTML = "Something went wrong!";
        })
        .then(function () {
          form.reset();
          setTimeout(() => {
            result.style.display = "none";
          }, 5000);
        });
    });
    