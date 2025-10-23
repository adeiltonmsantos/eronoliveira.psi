document.addEventListener('DOMContentLoaded', () =>{

    // Array with instruments data added to cart in Local Storage
    let cartInstruments = JSON.parse(localStorage.getItem('cartInstruments')) || [];

    // Displaying container for items if there are items in the cart
    if(cartInstruments.length > 0){
        const itemsCartContainer = document.querySelector('.items-cart-container');
        itemsCartContainer.style.display = 'flex';
    }

    // Selecting container of all the items in the cart
    const itemsCartContainer = document.querySelector('.items-cart-container');

    // Selecting all the form buttons
    const btnBack = document.querySelector('.btn-form-cart:nth-child(1)');
    const btnDeleteItems = document.querySelector('.btn-form-cart:nth-child(2)');
    const btnSubmit = document.querySelector('.btn-form-cart:nth-child(3)');

    function verifyButtonsState(){
        if(cartInstruments.length > 0){
            btnDeleteItems.classList.remove('btn-disabled');
            btnSubmit.classList.remove('btn-disabled');
        }else{
            btnDeleteItems.classList.add('btn-disabled');
            btnSubmit.classList.add('btn-disabled');
        }
    }

    verifyButtonsState();

    const SERVICE_ID = 'service_5bm4yll';
    const TEMPLATE_ID = 'template_b48ndqe';
    const PUBLIC_KEY = '-j6Q3glibCsWMaqlL';

    (function() {
        emailjs.init({
            publicKey: PUBLIC_KEY,
        });
    })();

    // Event listener for the back button
    btnBack.addEventListener('click', () => {
        window.location.href = 'instruments.html';
    });

    // Event listener for send button
    btnSubmit.addEventListener('click', (event) => {
        event.preventDefault();

        // Selecting form
        const formContainer = document.querySelector('form');

        // Selecting name field
        const nameField = formContainer.querySelector('#name');

        // Selecting
        const emailField = formContainer.querySelector('#email');

        // Selecting confirm e-mail field
        const confirmEmailField = formContainer.querySelector('#email-confirm');

        // Updating validation message for confirm e-mail field
        if(emailField.value !== confirmEmailField.value){
            confirmEmailField.setCustomValidity('Os e-mails não são idênticos');
        }else{
            confirmEmailField.setCustomValidity('');
        }

        // Selecting phone field
        const phoneField = formContainer.querySelector('#cellphone');

        // Defining pattern for phone field
        phoneField.setAttribute('pattern', '\\(\\d{2}\\) (?:9\\d{4}-\\d{4}|\\d{4}-\\d{4})');

        // Defining validation message for phone field
        phoneField.setAttribute('title', 'Formato esperado: (XX) XXXX-XXXX ou (XX) 9XXXX-XXXX');

        // Flag to indicate if all fields are valid
        const validForm = formContainer.reportValidity();

        if(validForm){
            console.log('Formulário enviado')
        }
        else{
            console.log('Formulário inválido')
        }
    
    });

    // HTML code of each item in the cart
    const contentItemCartDiv = `
            <div class="item-title-img">
                <h1>
                </h1>
                <img src="" alt="">
            </div>
            <div class="items-media-container">
                <div class="item-media">
                    <h1>Mídia Digital</h1>
                    <div class="quant-control">
                        <button class="btn-remove">-</button>
                        <span></span>
                        <button class="btn-add">+</button>
                    </div>
                </div>

                <div class="item-media">
                    <h1>Mídia Física</h1>
                    <div class="quant-control">
                        <button class="btn-remove">-</button>
                        <span></span>
                        <button class="btn-add">+</button>
                    </div>
                </div>
            </div>
            <img src="assets/img/trash.png" class="img-trash" alt="Excluir item">
    `

    // Loop to fill the container with the items in the cart
    cartInstruments.forEach((instrument, index) => {
        // Creating a div for each item
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-cart-group');

        // Filling the div with the HTML code
        itemDiv.innerHTML = contentItemCartDiv;

        // Selecting h1 for the name of the instrument
        const itemTitle = itemDiv.querySelector('.item-title-img h1');
        itemTitle.textContent = `${index + 1}. ${instrument.h1}`;

        // Selecting img for the image of the instrument
        const itemImg = itemDiv.querySelector('.item-title-img img');
        itemImg.src = instrument.img_src;
        itemImg.alt = instrument.h1;

        // Selecting all the spans for the quantities
        const quantitySpans = itemDiv.querySelectorAll('.item-media .quant-control span');

        // Selecting span for the quantity of digital media
        quantitySpans[0].textContent = instrument.quant_digital;
        quantitySpans[1].textContent = instrument.quant_physical;

        //Selecting add media buttons
        const addButtons = itemDiv.querySelectorAll('.item-media .quant-control .btn-add');

        // *******************************************************************************
        // Handling digital media quantity changes
        // *******************************************************************************

        // Selecting add digital media button
        const addDigitalButton = addButtons[0];

        // Event listener for adding digital media
        addDigitalButton.addEventListener('click', () => {
            if(instrument.quant_digital === 0)
                instrument.quant_digital += 1;
                quantitySpans[0].textContent = instrument.quant_digital;
                localStorage.setItem('cartInstruments', JSON.stringify(cartInstruments));
        });

        // Selecting reduce digital media quantity button
        const removeDigitalButton = itemDiv.querySelectorAll('.item-media .quant-control .btn-remove')[0];

        // Event listener for reducing digital media
        removeDigitalButton.addEventListener('click', () => {
            if (instrument.quant_digital > 0) {
                instrument.quant_digital -= 1;
                quantitySpans[0].textContent = instrument.quant_digital;
                localStorage.setItem('cartInstruments', JSON.stringify(cartInstruments));
            }
        });

        // *******************************************************************************
        // Handling physical media quantity changes
        // *******************************************************************************

        // Selecting add physical media button
        const addPhysicalButton = addButtons[1];

        // Event listener for adding physical media
        addPhysicalButton.addEventListener('click', () => {
            instrument.quant_physical += 1;
            quantitySpans[1].textContent = instrument.quant_physical;
            localStorage.setItem('cartInstruments', JSON.stringify(cartInstruments));
        });

        // Selecting reduce physical media quantity button
        const removePhysicalButton = itemDiv.querySelectorAll('.item-media .quant-control .btn-remove')[1];

        // Event listener for reducing physical media
        removePhysicalButton.addEventListener('click', () => {
            if (instrument.quant_physical > 0) {
                instrument.quant_physical -= 1;
                quantitySpans[1].textContent = instrument.quant_physical;
                localStorage.setItem('cartInstruments', JSON.stringify(cartInstruments));
            }
        });
        
        // *******************************************************************************
        // Handling item removal from cart
        // *******************************************************************************
        const trashImg = itemDiv.querySelector('.img-trash');

        // Event listener for removing item from cart
        trashImg.addEventListener('click', () => {
            const updatedCart = cartInstruments.filter(item => item.id !== instrument.id);
            localStorage.setItem('cartInstruments', JSON.stringify(updatedCart));
            cartInstruments = updatedCart;
            window.location.reload();
        })

        itemsCartContainer.appendChild(itemDiv);
    });

});