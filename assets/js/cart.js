document.addEventListener('DOMContentLoaded', () =>{

    // Array with instruments data added to cart in Local Storage
    let cartInstruments = JSON.parse(localStorage.getItem('cartInstruments')) || [];
    
    // Selecting container of all the items in the cart
    const itemsCartContainer = document.querySelector('.items-cart-container');

    // Function to clear cart
    function clearCart(){
        localStorage.removeItem('cartInstruments')
        cartInstruments = [];
        itemsCartContainer.innerHTML = '';
        itemsCartContainer.classList.add('hidden-element');
    }

    // Selecting hidden splash and its sons
    const splash = document.querySelector('.splash-form'); // Parent splash
    const splashQuestion = splash.querySelector('.splash-form-question'); // Son element
    const splashWait = splash.querySelector('.splash-form-wait'); // Son element
    const splashSucess = splash.querySelector('.splash-form-sucess'); // Son element
    const splashFail = splash.querySelector('.splash-form-fail'); // Son element



    // Selecting all the form buttons
    const btn = document.querySelectorAll('.btn-form-cart');

    const btnBack = btn[0];
    const btnDeleteItems = btn[1];
    const btnSubmit = btn[2];

    function verifyFormButtonsState(){
        if(cartInstruments.length > 0){
            btnDeleteItems.classList.remove('btn-disabled');
            btnSubmit.classList.remove('btn-disabled');
        }else{
            btnDeleteItems.classList.add('btn-disabled');
            btnSubmit.classList.add('btn-disabled');
        }
    }

    verifyFormButtonsState();

    // Event listener for the back button
    btnBack.addEventListener('click', () => {
        window.location.href = 'instruments.html';
    });

    // Applying mask to phone field
    maskPhone('cellphone', 15);

    // Selecting form
    const formContainer = document.querySelector('form');

    // Selecting name field
    const nameField = formContainer.querySelector('#name');

    // Selecting e-mail field
    const emailField = formContainer.querySelector('#email');

    // Selecting confirm e-mail field
    const confirmEmailField = formContainer.querySelector('#email-confirm');

    // Event listener for exclude button
    btnDeleteItems.addEventListener('click', () => {
        if(cartInstruments && cartInstruments.length > 0){
            // Focusing back button
            btnBack.focus();

            // Displaying and positioning splash
            splash.classList.remove('hidden-element');
            splashQuestion.classList.remove('hidden-element');

            // Centering splash inside its parent
            centerElement(splash);

            // Selecting splash buttons
            const splashBtn = splash.querySelectorAll('button');
            const splashConfirm = splashBtn[0];
            const splashCancel = splashBtn[1];

            // Event handler for confirm button
            splashConfirm.addEventListener('click', () => {
                clearCart();
                splash.classList.add('hidden-element');
                verifyFormButtonsState();
            })

            // Event handler for cancel button
            splashCancel.addEventListener('click', () => {
                splash.classList.add('hidden-element');
                splashQuestion.classList.add('hidden-element');
                // Focusing back button
                btnBack.focus();
            })
        }
    })

    // Selecting phone field
    const phoneField = document.querySelector('#cellphone');

    // Confuguration for sending e-mail via API
    const SERVICE_ID = 'service_5bm4yll';
    const TEMPLATE_ID = 'template_b48ndqe';
    const PUBLIC_KEY = '-j6Q3glibCsWMaqlL';

    (function() {
        emailjs.init({
            publicKey: PUBLIC_KEY,
        });
    })();

    // Event listener for send button
    btnSubmit.addEventListener('click', (event) => {
        event.preventDefault();
        if(cartInstruments.length > 0){

            // Updating validation message for confirm e-mail field
            if(emailField.value !== confirmEmailField.value){
                confirmEmailField.setCustomValidity('Os e-mails não são idênticos');
            }else{
                confirmEmailField.setCustomValidity('');
            }

            // Defining validation message for phone field
            if(phoneField.value.length < 16){
                phoneField.setCustomValidity('Está faltando algum dígito');
            }

            // Flag to indicate if all fields are valid
            const validForm = formContainer.reportValidity();

            if(validForm){
                // Formating items
                let strItems = '';
                cartInstruments.forEach((item, index) => {
                    const digQuant = item.quant_digital === 0 ? '' : 'uma cópia digital em PDF e';
                    const phyQuant = item.quant_physical === 0 ? '' : `${item.quant_physical} cópia(s) impressa(s)`;
                    strItems += `- ${item.h1}: ${digQuant} ${phyQuant}\n`;
                })

                // Form data to send
                const templateParams = {
                    nome: emailField.value,
                    message: `
                        Nome do cliente: ${nameField.value}
                        E-mail do cliente: ${emailField.value}
                        Telefone do cliente: ${phoneField.value}
                        Item(ns) selecionado(s):
                        ${strItems}
                    `
                }

                // Displaying splash
                splash.classList.remove('hidden-element');
                splashWait.classList.remove('hidden-element');

                // Centering splash relative to its parent
                centerElement(splash);

                emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
                    .then(response => {
                        // Hiding wait splash
                        splashWait.classList.add('hidden-element');
                        // E-mail sent sucessfully
                        if(response.status === 200){
                            // Displaying sucess splash
                            splashSucess.classList.remove('hidden-element');
                            centerElement(splash);
                            // Hiding sucess splash after 3 seconds
                            setInterval(() => {
                                splashSucess.classList.add('hidden-element');
                            }, 3000);
                            // Reseting form
                            formContainer.reset();
                            // Clearing items from cart
                            clearCart();
                            // Disabling form buttons
                            verifyFormButtonsState();
                        }
                        // E-mail not sent
                        else{
                            // Displaying fail splash
                            splashFail.classList.remove('hidden-element');
                            // Hiding fail splash
                            setInterval(() => {
                                splashFail.classList.add('hidden-element');
                            }, 3000);
                        }
                    })
                    .catch(error => {
                        console.log('FAILED...', error);
                    });
            }
        }
    
    });

    // Displaying container for items if there are items in the cart
    if(cartInstruments.length > 0){
        const itemsCartContainer = document.querySelector('.items-cart-container');
        itemsCartContainer.classList.remove('hidden-element');
    }else{
        // Disableing form fields
        const formFields = document.querySelectorAll('form input');
        formFields.forEach(field => field.disabled = true);
    }

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
            // There's a digital item. Removing...
            if(instrument.quant_digital === 1){
                instrument.quant_digital -= 1;
                quantitySpans[0].textContent = instrument.quant_digital;
                localStorage.setItem('cartInstruments', JSON.stringify(cartInstruments));
                // Also there's no physical item. Removing whole item from cart
                if(instrument.quant_physical === 0) {
                    const newCart = cartInstruments.filter(item => item.id !== instrument.id);
                    cartInstruments = newCart;
                    itemsCartContainer.removeChild(itemDiv);
                    // Cart is empty. Cleaning cart and screen...
                    if(cartInstruments.length === 0){
                        clearCart();
                        itemsCartContainer.classList.add('hidden-element');
                        verifyFormButtonsState();
                    }
                    // Cart isn't empty. Updating cart
                    else{
                        localStorage.setItem('cartInstruments', JSON.stringify(cartInstruments));
                    }
                }
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
            // Quantity of physical media higher then zero
            if (instrument.quant_physical > 0) {
                instrument.quant_physical -= 1;
                quantitySpans[1].textContent = instrument.quant_physical;
                localStorage.setItem('cartInstruments', JSON.stringify(cartInstruments));
                // Quantity of physical media and digital media are zero. Removing item...
                if(instrument.quant_digital === 0 && instrument.quant_physical === 0){
                    const newCart = cartInstruments.filter(item => item.id !== instrument.id)
                    cartInstruments = newCart;
                    localStorage.setItem('cartInstruments', JSON.stringify(cartInstruments));
                    itemsCartContainer.removeChild(itemDiv);
                    // Cart is empty. Cleaning cart and screen...
                    if(cartInstruments.length === 0){
                        itemsCartContainer.innerHTML = '';
                        itemsCartContainer.classList.add('hidden-element');
                        clearCart();
                        verifyFormButtonsState();
                    }
                }
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