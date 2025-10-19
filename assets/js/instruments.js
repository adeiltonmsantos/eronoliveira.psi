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
                    </div>
                </div>
                <img class="img-cart-instruments" src="assets/img/instrumentos/shopping_cart.svg"
                    alt="Carrinho de compras" title="Adicionar ao orçamento">
                
            </div>

            <button class="btn-go-to-cart btn-disabled">IR PARA O CARRINHO</button>

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
        .then(response => {
            response.forEach(instrument => {

                // Creating div for an instrument, defining class CSS and inserting HTML content 
                const instrumentDiv = document.createElement('div');
                instrumentDiv.classList.add('instruments-container');
                instrumentDiv.innerHTML = content;

                // Function to verify if cart is not empty to enable "Go to cart" button
                function updateButtonGoToCart(){
                    const btnGoToCart = instrumentDiv.querySelector('.btn-go-to-cart');
                    if(cartInstruments.length > 0){
                        btnGoToCart.classList.remove('btn-disabled');
                    }else{
                        btnGoToCart.classList.add('btn-disabled');
                    }
                }
                updateButtonGoToCart();

                // Defining id value
                instrumentDiv.querySelector('.instruments-card.instruments-container-card').id = instrument.id;

                // Defining h1 value
                instrumentDiv.querySelector('.instruments-card.instruments-container-card h1').textContent = instrument.h1;

                // Defining description of instrument
                instrumentDiv.querySelector('.instruments-card-text p').textContent = instrument.resume;

                // Defining image of instrument (src and alt values)
                instrumentDiv.querySelector('.instruments-card-details img').src = instrument.img_src;
                instrumentDiv.querySelector('.instruments-card-details img').alt = instrument.img_alt;

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
                    }
                })
                
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

                // Selecting button to add instrument and its media quantities to cart
                const btnAddCartInstrument = instrumentDiv.querySelector('.img-cart-instruments');

                // Assigning click event to add to cart button
                btnAddCartInstrument.addEventListener('click', () => {

                    // Object with data to add to cart
                    const item = {
                        id: instrument.id,
                        quant_digital: valueQuantDigital,
                        quant_physical: valueQuantPhysical,
                        img_src: instrument.img_src,
                        h1: instrument.h1
                    }

                    // Selecting all rendered buttons with 'go-to-cart' class
                    const btnsGoToCart = document.querySelectorAll('.btn-go-to-cart');

                    // Checking if cart exists. If doesn't, create in Local Storage, only if quantity is 1
                    if(!localStorage.getItem('cartInstruments') && (valueQuantDigital > 0 || valueQuantPhysical > 0)){
                        localStorage.setItem('cartInstruments', JSON.stringify([]));
                    }
                    
                    // Searching if item already exists in cart. If exists, update quantity. If doesn't, add new item.
                    const idItem = cartInstruments.findIndex(item => item.id === instrument.id);
                    if(idItem === -1 && (valueQuantDigital > 0 || valueQuantPhysical > 0)){
                        cartInstruments.push(item);
                        localStorage.setItem('cartInstruments', JSON.stringify(cartInstruments));
                        // Updating cart quantity display
                        increaseCartQuantityDisplay();
                        updateCartQuantity();

                    // Found item in cart, updating quantities
                    }else if (idItem !== -1 && (valueQuantDigital > 0 || valueQuantPhysical > 0)){
                        cartInstruments[idItem].quant_digital = valueQuantDigital;
                        cartInstruments[idItem].quant_physical = valueQuantPhysical;
                        localStorage.setItem('cartInstruments', JSON.stringify(cartInstruments));

                        // Removing item from cart if both quantities are zero
                    }else if(idItem !== -1 && (valueQuantDigital === 0 && valueQuantPhysical === 0)){
                        const updatedCart = cartInstruments.filter(item => item.id !== instrument.id);
                        localStorage.setItem('cartInstruments', JSON.stringify(updatedCart));
                        cartInstruments = updatedCart;
                        // Updating cart quantity display
                        updateCartQuantity();
                    }
                    updateButtonGoToCart();

                })

                // Selecting "Go to cart" button
                const btnGoToCart = instrumentDiv.querySelector('.btn-go-to-cart');

                // Assigning click event to "Go to cart" button
                btnGoToCart.addEventListener('click', () => {
                    if(cartInstruments.length > 0){
                        window.location.href = 'cart.html';
                    }
                })
            
            })
        })
        .then(() => {
            // List of all "Add to cart" buttons
            const listBtnAddToCart = document.querySelectorAll('.img-cart-instruments');
            
            // List of all "Go to cart" buttons
            const listBtnGoToCart = document.querySelectorAll('.btn-go-to-cart');

            // Event listener for each "Add to cart" button
            listBtnAddToCart.forEach((btnAdd, index) => {
                btnAdd.addEventListener('click', () => {
                    if(cartInstruments.length > 0){
                        listBtnGoToCart.forEach(btn => btn.classList.remove('btn-disabled'));
                    }
                })
            });          
        })


})