window.addEventListener('DOMContentLoaded', () =>{
    
    // Main container for each instrument
    const instrumentsContainer = document.querySelector('section.main-container.main-container-instruments');
    
    // Content for each instrument container
    const content = `
            <div id="#" class="instruments-card instruments-container-card">
                <h1>Baralho Depressão</h1>
                <div class="instruments-card-details">
                    <div class="instruments-card-text">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab rerum aliquam accusantium
                            suscipit consequatur
                        </p>
                    </div>
                    <img src="assets/img/instrumentos/card-baralho-depressao.png" alt="Imagem baralho TDAH">
                </div>
            </div>

            <div class="instruments-order-container">
                <div class="instrument-media-option">
                    <h1>Mídia Digital: <span>R$ 90,00</span></h1>
                </div>
                <div class="order-container-details">
                    <div class="group-detail">
                        <span>Quant.:</span>
                        <div class="quant-control-container">
                            <button class="btn-add">+</button>
                            <span>0</span>
                            <button class="btn-remove">-</button>
                        </div>
                    </div>
                    <div class="group-detail">
                        <span>Total:</span>
                        <p>C
                            R$ 250,00
                        </p>
                    </div>
                    <img class="img-cart-instruments" src="assets/img/instrumentos/shopping_cart.svg"
                        alt="Carrinho de compras">
                </div>
            </div>

            <div class="instruments-order-container">
                <div class="instrument-media-option">
                    <h1>Mídia Física: <span>R$ 250,00</span></h1>
                </div>
                <div class="order-container-details">
                    <div class="group-detail">
                        <span>Quant.:</span>
                        <div class="quant-control-container">
                            <button class="btn-add">+</button>
                            <span>0</span>
                            <button class="btn-remove">-</button>
                        </div>
                    </div>
                    <div class="group-detail">
                        <span>Total:</span>
                        <p>
                            R$ 250,00
                        </p>
                    </div>
                    <img class="img-cart-instruments" src="assets/img/instrumentos/shopping_cart.svg"
                        alt="Carrinho de compras">
                </div>
            </div>

            <div class="main-container-slider main-container-slider-instruments">
                <div class="slider-section" id="#">
                    <div class="slider">
                        <div class="slider-container">
                            <video src="#" autoplay loop muted></video>
                            <video src="#" autoplay loop muted></video>
                            <video src="#" autoplay loop muted></video>
                            <video src="#" autoplay loop muted></video>
                        </div>
                    </div>
                    <div class="slider-controls">
                        <button class="prevBtn">
                            <img src="assets/img/slider-img/rewind.png" alt="Slide anterior">
                        </button>
                        <button class="nextBtn">
                            <img src="assets/img/slider-img/forward.png" alt="Slide anterior">
                        </button>
                    </div>
                </div>
            </div>
    `
    
    // Loading JSON objects list
    fetch('assets/js/instruments.json')
        .then(instrumentsList => instrumentsList.json())
        .then(response => response.forEach(instrument => {

            // Creating div for an instrument, defining class CSS and inserting HTML content 
            const instrumentDiv = document.createElement('div');
            instrumentDiv.classList.add('instruments-container');
            instrumentDiv.innerHTML = content;

            // Defining id value
            instrumentDiv.querySelector('.instruments-card.instruments-container-card').id = instrument.id;

            // Defining h1 value
            instrumentDiv.querySelector('.instruments-card.instruments-container-card h1').textContent = instrument.h1;

            // Defining description of instrument
            instrumentDiv.querySelector('.instruments-card-text p').textContent = instrument.resume;

            // Defining image of instrument (src and alt values)
            instrumentDiv.querySelector('.instruments-card-details img').src = instrument.img_src;
            instrumentDiv.querySelector('.instruments-card-details img').alt = instrument.img_alt;

            // Selecting both containers with instruments-order-container
            const price = instrumentDiv.querySelectorAll('.instruments-order-container .instrument-media-option h1');

            // Definig price of digital media
            price[0].textContent = 'Mídia Digital: R$ ' + instrument.price_digital_media;

            // Definig price of physical media
            price[1].textContent = 'Mídia Física: R$ ' + instrument.price_physical_media;

            // Naming slider section with instrument id
            const sliderSection = instrumentDiv.querySelector('.slider-section');

            // Selecting slides
            const slides = sliderSection.querySelectorAll('.slider-container video');

            // Defining url of each slide
            for(let i = 0; i < instrument.url_medias.length; i++){
                slides[i].src = instrument.url_medias[i];
            }
            
            automateSliders(sliderSection);
            instrumentsContainer.appendChild(instrumentDiv);

        }));
    

})