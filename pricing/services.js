
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
    const formSections = document.querySelectorAll('.form-section');
    const formSteps = document.querySelectorAll('.form-steps span');
    let currentStep = getCurrentStep();

    formSections[currentStep].classList.remove('active');
    formSteps[currentStep].classList.remove('active');
    currentStep++;
    formSections[currentStep].classList.add('active');
    formSteps[currentStep].classList.add('active');
  }

  function showPreviousStep() {
    const formSections = document.querySelectorAll('.form-section');
    const formSteps = document.querySelectorAll('.form-steps span');
    let currentStep = getCurrentStep();

    formSections[currentStep].classList.remove('active');
    formSteps[currentStep].classList.remove('active');
    currentStep--;
    formSections[currentStep].classList.add('active');
    formSteps[currentStep].classList.add('active');
  }

  function getCurrentStep() {
    return Array.from(document.querySelectorAll('.form-section')).findIndex((section) => section.classList.contains('active'));
  }

  function validateCurrentStep() {
    const currentSection = document.querySelector('.form-section.active');
    const formGroups = currentSection.querySelectorAll('.form-group');
    let isValid = true;

    formGroups.forEach((group) => {
      const input = group.querySelector('input');
      const errorMessage = group.querySelector('.error-message');

      if (input.hasAttribute('required') && !input.value.trim()) {
        group.classList.add('error');
        errorMessage.textContent = 'This field is required.';
        isValid = false;
      } else if (input.type === 'email' && !isValidEmail(input.value)) {
        group.classList.add('error');
        errorMessage.textContent = 'Please enter a valid email address.';
        isValid = false;
      } else {
        group.classList.remove('error');
        errorMessage.textContent = '';
      }
    });

    return isValid;
  }

  function isValidEmail(email) {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function updateReviewSection() {
    const reviewSection = document.getElementById('review-section');
    reviewSection.innerHTML = '';

    const formData = new FormData(document.getElementById('contact-form'));
    for (const [key, value] of formData.entries()) {
      const reviewItem = document.createElement('div');
      reviewItem.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`;
      reviewSection.appendChild(reviewItem);
    }
  }
  