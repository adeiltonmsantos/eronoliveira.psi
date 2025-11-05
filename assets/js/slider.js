/*
    automateSliders(sliderSection)

    Function to activate an automatic slider. The main container (sliderSection)
    must be specified. The main container (sliderSection) has the following structure

    -> sliderSection (main container class)
        -> slider (second level class to contain div with slides)
            -> slider-container (third level class of slides container)
                -> slide-01 (image or video)
                -> slide-02 (image or video)
                (...)
        -> slider-controls (second level class to contain previous/next buttons)
            -> prevBtn (previous slide button class)
            -> nextBtn (next slide button class)
*/
function automateSliders(sliderSection, slideTime=6000){
    // Selecting the video container
    const sliderContainer = sliderSection.querySelector('.slider-container');

    // Selecting the array with the slider videos
    const videos = sliderSection.querySelectorAll('.slider-container video');

    // Selecting the next button
    const nextButton = sliderSection.querySelector('.nextBtn');
    
    // Selecting the back button
    const prevButton = sliderSection.querySelector('.prevBtn');

    // Setting the current video pointer for the slider
    let currentVideo = 0;

    // Defining the total number of videos in the slider
    const totalVideos = videos.length;

    // Duration of each transition
    const transitionTime = 1500;

    // Display duration of each video in milliseconds
    const displayTime = slideTime;

    // Function to move a video on the slider based on the current pointer
    function updateVideoPosition(){
        const videoWidth = videos[0].clientWidth;
        sliderContainer.style.transform = `translateX(-${currentVideo * videoWidth}px)`;
    }

    // Function to advance to the next video
    function nextVideo(){
        currentVideo = (currentVideo + 1) % totalVideos;
        updateVideoPosition();
    }

    // Function to return to the previous video
    function prevVideo(){
        currentVideo = (currentVideo - 1 + totalVideos) % totalVideos;
        updateVideoPosition();
    }

    // Automating video transitions
    let videoTimer = setInterval(nextVideo, displayTime);

    // Adding a click event to the next button
    nextButton.addEventListener('click', () => {
        nextVideo();
        resetSlider();
    })

    // Adding a click event to the back button
    prevButton.addEventListener('click', () => {
        prevVideo();
        resetSlider();
    })

    // Function to reset the slider timer by clicking the buttons
    function resetSlider(){
        clearInterval(videoTimer);
        videoTimer = setInterval(nextVideo, displayTime);
    }
}