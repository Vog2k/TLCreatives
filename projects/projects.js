
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

  $(document).ready(function(){


    /* Toggle Video Modal
    -----------------------------------------*/
    function toggle_video_modal() {
        
        // Click on video thumbnail or link
        $(".js-trigger-video-modal").on("click", function(e){
            
            // prevent default behavior for a-tags, button tags, etc. 
            e.preventDefault();
          
            // Grab the video ID from the element clicked
            var id = $(this).attr('data-youtube-id');
  
            // Autoplay when the modal appears
            // Note: this is intetnionally disabled on most mobile devices
            // If critical on mobile, then some alternate method is needed
            var autoplay = '?autoplay=1';
  
            // Don't show the 'Related Videos' view when the video ends
            var related_no = '&rel=0';
  
            // String the ID and param variables together
            var src = '//www.youtube.com/embed/'+id+autoplay+related_no;
            
            // Pass the YouTube video ID into the iframe template...
            // Set the source on the iframe to match the video ID
            $("#youtube").attr('src', src);
            
            // Add class to the body to visually reveal the modal
            $("body").addClass("show-video-modal noscroll");
        
        });
  
        // Close and Reset the Video Modal
        function close_video_modal() {
          
          event.preventDefault();
  
          // re-hide the video modal
          $("body").removeClass("show-video-modal noscroll");
  
          // reset the source attribute for the iframe template, kills the video
          $("#youtube").attr('src', '');
          
        }
        // if the 'close' button/element, or the overlay are clicked 
        $('body').on('click', '.close-video-modal, .video-modal .overlay', function(event) {
            
            // call the close and reset function
            close_video_modal();
            
        });
        // if the ESC key is tapped
        $('body').keyup(function(e) {
            // ESC key maps to keycode `27`
            if (e.keyCode == 27) { 
              
              // call the close and reset function
              close_video_modal();
              
            }
        });
    }
    toggle_video_modal();
  
  
  
  });