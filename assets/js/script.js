window.addEventListener('DOMContentLoaded', () => {
    // Selecting slider section element
    const sliderSection = document.querySelector('.slider-section');

    // Automating the slider
    if (sliderSection && typeof automateSliders === 'function') {
        automateSliders(sliderSection);
    }
})