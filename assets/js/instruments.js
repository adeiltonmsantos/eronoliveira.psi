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

            <div class="group-instruments-order-container">
                <div class="instruments-order-container">
                    <div class="instrument-media-option">
                        <h1>Mídia Digital</h1>
                    </div>
                    <div class="order-container-details">
                        <div class="group-detail">
                            <div class="quant-control-container">
                                <button class="btn-remove">-</button>
                                <span>0</span>
                                <button class="btn-add">+</button>
                            </div>
                        </div>
                        <img class="img-cart-instruments" src="assets/img/instrumentos/shopping_cart.svg"
                            alt="Carrinho de compras" title="Adicionar ao orçamento">
                    </div>
                </div>

                <div class="instruments-order-container">
                    <div class="instrument-media-option">
                        <h1>Mídia Física</h1>
                    </div>
                    <div class="order-container-details">
                        <div class="group-detail">
                            <div class="quant-control-container">
                                <button class="btn-remove">-</button>
                                <span>0</span>
                                <button class="btn-add">+</button>
                            </div>
                        </div>
                        <img class="img-cart-instruments" src="assets/img/instrumentos/shopping_cart.svg"
                            alt="Carrinho de compras" title="Adicionar ao orçamento">
                    </div>
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

            // Selecting containers of digital and physycal order data
            const mediaOrderContainers = instrumentDiv.querySelectorAll('.instruments-order-container');
            
            // **********************************************
            // Selecting all the containers of digital media
            // **********************************************
            
            // Selecting digital order data container
            const digitalOrderContainer = mediaOrderContainers[0];

            // Selecting digital price container
            const priceDigital = digitalOrderContainer.querySelector('.instrument-media-option h1');

            // Just unitary value of digital media price
            // const valuePriceDigital = parseFloat(priceDigital.textContent.split('R$ ')[1].replace(',', '.'));

            // Selecting digital quantity container
            const quantDigital = digitalOrderContainer.querySelector('.quant-control-container span');
            
            // Just value of quantity of digital media
            let valueQuantDigital = parseInt(quantDigital.textContent);

            // Selecting digital total value container
            const totalDigital = digitalOrderContainer.querySelector('.order-container-details .group-detail p');

            // Just total value of digital media
            // let valueTotalDigital = valuePriceDigital * valueQuantDigital;

            // Selecting button to add quantity of digital media
            const btnAddDig = digitalOrderContainer.querySelector('.quant-control-container .btn-add');

            // Assigning click event to add button
            btnAddDig.addEventListener('click', () => {
                if(valueQuantDigital === 0){
                    valueQuantDigital++;
                    quantDigital.textContent = valueQuantDigital;
                }
            })

            // Selecting button to reduce quantity of digital media
            const btnRemoveDig = digitalOrderContainer.querySelector('.quant-control-container .btn-remove');

            // Assigning click event to reduce button
            btnRemoveDig.addEventListener('click', () => {
                if(valueQuantDigital === 1){
                    valueQuantDigital--;
                    quantDigital.textContent = valueQuantDigital;
                    // totalDigital.textContent = 'R$ 0,00';
                }
            })

            // **********************************************
            // Selecting all the containers of physical media
            // **********************************************

            // Selecting physical order data container
            const physicalOrderContainer = mediaOrderContainers[1];

            // Selecting physical price container
            const pricePhysical = physicalOrderContainer.querySelector('.instrument-media-option h1');

            // Selecting physical quantity container
            const quantPhysical = physicalOrderContainer.querySelector('.quant-control-container span');

            // Just value of quantity of physical media
            let valueQuantPhysical = parseInt(quantPhysical.textContent);

            // Selecting physical total value container
            const totalPhysical = physicalOrderContainer.querySelector('.order-container-details .group-detail p');

            // Selecting button to add quantity of physical media
            const btnAddPhy = physicalOrderContainer.querySelector('.quant-control-container .btn-add');

            // Assigning click event to add button
            btnAddPhy.addEventListener('click', () => {
                if(valueQuantPhysical >= 0){
                    valueQuantPhysical++;
                    quantPhysical.textContent = valueQuantPhysical;
                }
            })

            // Selecting button to reduce quantity of digital media
            const btnRemovePhy = physicalOrderContainer.querySelector('.quant-control-container .btn-remove');

            // Assigning click event to reduce button
            btnRemovePhy.addEventListener('click', () => {
                if(valueQuantPhysical > 0){
                    valueQuantPhysical--;
                    quantPhysical.textContent = valueQuantPhysical;
                }
            })

        }))
    

})