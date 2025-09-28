function automateSliders(sliderSection){
    // Selecionando o container dos vídeos
    const sliderContainer = sliderSection.querySelector('.slider-container');

    // Selecionando o array com os vídeos do slider
    const videos = sliderSection.querySelectorAll('.slider-container video');

    // Selecionando o botão de avançar
    const nextButton = sliderSection.querySelector('.nextBtn');
    
    // Selecionando o botão de voltar
    const prevButton = sliderSection.querySelector('.prevBtn');

    // Definindo o ponteiro do vídeo atual do slider
    let currentVideo = 0;

    // Definindo o total de vídeos do slider
    const totalVideos = videos.length;

    // Duração de cada transição
    const transitionTime = 1500;

    // Duração de exibição de cada vídeo
    const displayTime = 6000;

    // Função para mover um vídeo no slider com base no ponteiro atual
    function updateVideoPosition(){
        const videoWidth = videos[0].clientWidth;
        sliderContainer.style.transform = `translateX(-${currentVideo * videoWidth}px)`;
    }

    // Função para avançar para o próximo vídeo
    function nextVideo(){
        currentVideo = (currentVideo + 1) % totalVideos;
        updateVideoPosition();
    }

    // Função para voltar para o vídeo anterior
    function prevVideo(){
        currentVideo = (currentVideo - 1 + totalVideos) % totalVideos;
        updateVideoPosition();
    }

    // Automatizando a transição de vídeos
    let videoTimer = setInterval(nextVideo, displayTime);

    // Adicionando evento de clique ao botão de avançar
    nextButton.addEventListener('click', () => {
        nextVideo();
        resetSlider();
    })

    // Adicionando evento de clique ao botão de voltar
    prevButton.addEventListener('click', () => {
        prevVideo();
        resetSlider();
    })

    // Função para resetar o timer do slider ao clicar nos botões
    function resetSlider(){
        clearInterval(videoTimer);
        videoTimer = setInterval(nextVideo, displayTime);
    }
}