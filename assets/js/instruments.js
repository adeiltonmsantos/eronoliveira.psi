window.addEventListener('DOMContentLoaded', () =>{
    
    // Main container for each instrument
    const instrumentsContainer = document.querySelector('.instruments-list-container');
    
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
                    <h1>Mídia Digital: <span></span></h1>
                </div>
                <div class="order-container-details">
                    <div class="group-detail">
                        <span>Quant.:</span>
                        <div class="quant-control-container">
                            <button class="btn-remove">-</button>
                            <span>0</span>
                            <button class="btn-add">+</button>
                        </div>
                    </div>
                    <div class="group-detail">
                        <span>Total:</span>
                        <p>R$ 0,00</p>
                    </div>
                    <img class="img-cart-instruments" src="assets/img/instrumentos/shopping_cart.svg"
                        alt="Carrinho de compras">
                </div>
            </div>

            <div class="instruments-order-container">
                <div class="instrument-media-option">
                    <h1>Mídia Física: <span></span></h1>
                </div>
                <div class="order-container-details">
                    <div class="group-detail">
                        <span>Quant.:</span>
                        <div class="quant-control-container">
                            <button class="btn-remove">-</button>
                            <span>0</span>
                            <button class="btn-add">+</button>
                        </div>
                    </div>
                    <div class="group-detail">
                        <span>Total:</span>
                        <p>R$ 0,00</p>
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
            price[0].textContent = 'Mídia Digital: ' + instrument.price_digital_media;

            // Definig price of physical media
            price[1].textContent = 'Mídia Física: ' + instrument.price_physical_media;

            // Naming slider section with instrument id
            const sliderSection = instrumentDiv.querySelector('.slider-section');

            // Selecting slides
            const slides = sliderSection.querySelectorAll('.slider-container video');

            // Defining url of each slide
            for(let i = 0; i < instrument.url_medias.length; i++){
                slides[i].src = instrument.url_medias[i];
            }
            
            // Automating sliders
            automateSliders(sliderSection);

            instrumentsContainer.appendChild(instrumentDiv);

            // Array with instruments cards
            const instrumentCards = document.querySelectorAll('.instruments-container')

            // instrumentCards.forEach(card => {
                
            //     // Card id
            //     const idInstrument = card.querySelector('.instruments-card.instruments-container-card').id;

            //     // Selecting containers with digital and physical data of a card
            //     const mediaContainers = card.querySelectorAll('.instruments-order-container');

            //     // Digital data container
            //     const digitalContainer = mediaContainers[0];

            //     // Physical data container
            //     const physicalContainer = mediaContainers[1];

            //     // Price of digital media
            //     const priceDigital = digitalContainer.querySelector('.instrument-media-option h1').textContent;
            //     let valuePriceDigital = priceDigital.split('R$ ')[1].replace(',', '.');
            //     valuePriceDigital = parseFloat(valuePriceDigital);

            //     // Price of physical media
            //     const pricePhysical = physicalContainer.querySelector('.instrument-media-option h1').textContent;
            //     let valuePricePhysical = pricePhysical.split('R$ ')[1].replace(',', '.');
            //     valuePricePhysical = parseFloat(valuePricePhysical);

            //     // Span with the total quantity of digital media
            //     const totalDigital = digitalContainer.querySelector('.quant-control-container span')
            //     let valueTotalDigital = parseInt(totalDigital.textContent);

            //     // Span with the total quantity of physical media
            //     const totalPhysical = physicalContainer.querySelector('.quant-control-container span')
            //     let valueTotalPhysical = parseInt(totalPhysical.textContent);

            //     // Span with total value of digital media in R$
            //     const totalDigitalInReais = digitalContainer.querySelector('.order-container-details .group-detail p');

            //     // Span with total value of physical media in R$
            //     const totalPhysicalInReais = physicalContainer.querySelector('.order-container-details .group-detail p');

            //     // Button to increase quantity of digital media
            //     const btnAddDig = digitalContainer.querySelector('.quant-control-container .btn-add')

            //     btnAddDig.addEventListener('click', () => {
            //         if(parseInt(valueTotalDigital) === 0){
            //             totalDigital.textContent = 1;
            //             valueTotalDigital = 1;
            //             totalDigitalInReais.textContent = `R$ ${valueTotalDigital * valuePriceDigital}`;
            //         }
            //     });
                
            //     // Button to increase quantity of physical media
            //     const btnAddPhy = physicalContainer.querySelector('.quant-control-container .btn-add')

            //     btnAddPhy.addEventListener('click', () => {
            //         if(parseInt(valueTotalPhysical) === 0){
            //             totalPhysical.textContent = 1;
            //             valueTotalPhysical = 1;
            //             totalPhysicalInReais.textContent = `R$ ${valueTotalPhysical * valuePricePhysical}`;
            //         }else{
            //             console.log(totalPhysical.textContent + ' ' + idInstrument)
            //             totalPhysical.textContent = parseInt(totalPhysical.textContent) + 1;
            //             valueTotalPhysical = parseInt(totalPhysical.textContent);
            //         }
            //     });
                
            //     // Button to decrease quantity
            //     const btnRemoveDig = digitalContainer.querySelector('.quant-control-container .btn-remove');

            //     btnRemoveDig.addEventListener('click', () => {
            //         if(parseInt(valueTotalDigital) === 1){
            //             totalDigital.textContent = 0;
            //             valueTotalDigital = 0;
            //             totalDigitalInReais.textContent = `R$ ${valueTotalDigital * valuePriceDigital}`;
            //         }
            //     });

            // });

        }))
    

})