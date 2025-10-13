document.addEventListener('DOMContentLoaded', () =>{
    
    // Main container for each instrument
    const instrumentsContainer = document.querySelector('.instruments-list-container');

    // Array with instruments data added to cart in Local Storage
    let cartInstruments = JSON.parse(localStorage.getItem('cartInstruments')) || [];

    // Selecting span with quantity of items in cart
    const cartQuantity = document.querySelector('.cart-count-items');
    
    // Function to update cart quantity display
    function updateCartQuantity() {
        if (cartQuantity) {
            cartQuantity.textContent = cartInstruments.length;
        }
    }

    // Function to increase cart quantity display
    function increaseCartQuantityDisplay() {
        cartQuantity.textContent = parseInt(cartQuantity.textContent) + 1;
    }
    
    updateCartQuantity(); // Initial update of cart quantity display

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

            <button class="btn-go-to-cart">IR PARA O CARRINHO</button>

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

            if(instrumentsContainer){
                instrumentsContainer.appendChild(instrumentDiv);
            }

            // Selecting containers of digital and physycal order data
            const mediaOrderContainers = instrumentDiv.querySelectorAll('.instruments-order-container');
            
            // **********************************************
            // Selecting all the containers of digital media
            // **********************************************
            
            // Selecting digital order data container
            const digitalOrderContainer = mediaOrderContainers[0];

            // Selecting digital quantity container
            const quantDigital = digitalOrderContainer.querySelector('.quant-control-container span');
            
            // Just value of quantity of digital media
            let valueQuantDigital = parseInt(quantDigital.textContent);

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
            
            // Selecting button to add digital media to cart
            const btnAddCartDig = digitalOrderContainer.querySelector('.order-container-details .img-cart-instruments');
            
            // Assigning click event to add to cart button
            btnAddCartDig.addEventListener('click', () => {
                // Checking if cart exists. If doesn't, create in Local Storage, only if quantity is 1
                if(!localStorage.getItem('cartInstruments') && valueQuantDigital === 1){
                    localStorage.setItem('cartInstruments', JSON.stringify([]));
                }
                
                // Creating object with instrument data to add to cart
                const item = {
                    id: instrument.h1,
                    type: 'Mídia Digital',
                    img_src: instrument.img_src,
                    quantity: valueQuantDigital,
                }

                // Adding digital media to cart only if quantity is 1 and not already added
                if(valueQuantDigital === 1 && !(cartInstruments.some(item => item.id === instrument.h1 && item.type === 'Mídia Digital'))){
                    cartInstruments.push(item);
                    localStorage.setItem('cartInstruments', JSON.stringify(cartInstruments));
                    // Updating cart quantity display
                    increaseCartQuantityDisplay();
                    updateCartQuantity();
                }

            });


            // **********************************************
            // Selecting all the containers of physical media
            // **********************************************

            // Selecting physical order data container
            const physicalOrderContainer = mediaOrderContainers[1];

            // Selecting physical quantity container
            const quantPhysical = physicalOrderContainer.querySelector('.quant-control-container span');

            // Just value of quantity of physical media
            let valueQuantPhysical = parseInt(quantPhysical.textContent);

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

            // Selecting button to add physical media to cart
            const btnAddCartPhy = physicalOrderContainer.querySelector('.order-container-details .img-cart-instruments');
            
            // Assigning click event to add to cart button
            btnAddCartPhy.addEventListener('click', () => {
                // Checking if cart exists. If doesn't, create in Local Storage, only if quantity is 1
                if(!localStorage.getItem('cartInstruments') && valueQuantPhysical > 0){
                    localStorage.setItem('cartInstruments', JSON.stringify([]));
                }
                
                // Creating object with instrument data to add to cart
                const item = {
                    id: instrument.h1,
                    type: 'Mídia Física',
                    img_src: instrument.img_src,
                    quantity: valueQuantPhysical,
                }

                // Searching if item already exists in cart. If exists, update quantity. If doesn't, add new item.
                const idItem = cartInstruments.findIndex(item => item.id === instrument.h1 && item.type === 'Mídia Física');
                if(idItem === -1 && valueQuantPhysical > 0){
                    cartInstruments.push(item);
                    localStorage.setItem('cartInstruments', JSON.stringify(cartInstruments));
                    // Updating cart quantity display
                    increaseCartQuantityDisplay();
                    updateCartQuantity();
                }else{
                    cartInstruments[idItem].quantity = valueQuantPhysical;
                    localStorage.setItem('cartInstruments', JSON.stringify(cartInstruments));
                }

                
            });



        }))
    

})