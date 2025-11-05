document.addEventListener('DOMContentLoaded', () =>{

    // Array with instruments data added to cart in Local Storage
    let cartInstruments = JSON.parse(localStorage.getItem('cartInstruments')) || [];
    
    // Selecting container of all the items in the cart
    const itemsCartContainer = document.querySelector('.items-cart-container');

    // Selecting all the form buttons
    const btn = document.querySelectorAll('.btn-form-cart');
    const btnBack = btn[0];
    const btnDeleteItems = btn[1];
    const btnSubmit = btn[2];

    // **************************************************************************** //
    //                       Functions of the cart page
    // **************************************************************************** //

    // Function to clear cart in localStorage
    function clearCart(){
        localStorage.removeItem('cartInstruments')
        cartInstruments = [];
        itemsCartContainer.innerHTML = '';
        itemsCartContainer.classList.add('hidden-element');
    }

    // Function to enable or desable buttons, depending on the number of items in the cart in localStorage
    function verifyFormButtonsState(){
        if(cartInstruments.length > 0){
            btnDeleteItems.classList.remove('btn-disabled');
            btnSubmit.classList.remove('btn-disabled');
        }else{
            btnDeleteItems.classList.add('btn-disabled');
            btnSubmit.classList.add('btn-disabled');
        }
    }

    // Function to update subtotal of each item on screen
    function updateSubTotalItem(itemID){
        try{
            // Subtotal digital media value of the item
            const subTotalDigitalValue = cartInstruments.find(item => item.id === itemID).subTotal_digital;
            // Subtotal physical media value of the item
            const subtTotalPhysicalValue = cartInstruments.find(item => item.id === itemID).subTotal_physical;
            // Selecting subtotal item (digital + physical medias) container
            const subtotalContainer = document.querySelector(`#${itemID} .subtotal-container p span`);
            
            // Calculating subtotal value (digital + physical medias) and formatting to local currency
            const subTotalValue = (subTotalDigitalValue + subtTotalPhysicalValue).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            // Updating subtotal value in container
            subtotalContainer.textContent = subTotalValue;

            // Selecting total of all items container
            const totalContainer = document.querySelector('.total-container p span');
        }catch(error){
            console.log('Item excluído do carrinho');
        }
    }

    // Functiom to update the total of all items together
    function updateTotal(){
        // Selecting total container
        const totalContainer = document.querySelector('.total-container p span');
        
        // Adding up all the subtotals of the items in localStorage (cart)
        const total = cartInstruments.reduce((acc, item) => {
            return acc + item.subTotal_digital + item.subTotal_physical;
        }, 0);

        if(totalContainer)
            totalContainer.textContent = total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    }


    // **************************************************************************** //
    //                   End of functions of the cart page
    // **************************************************************************** //



    // Selecting hidden splash and its sons
    const splash = document.querySelector('.splash-form'); // Parent splash
    const splashQuestion = splash.querySelector('.splash-form-question'); // Son element
    const splashWait = splash.querySelector('.splash-form-wait'); // Son element
    const splashSucess = splash.querySelector('.splash-form-sucess'); // Son element
    const splashFail = splash.querySelector('.splash-form-fail'); // Son element

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

    // Event listener for exclude button (all items in cart)
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

    // Displaying container for items if there are items in cart
    if(cartInstruments.length > 0){
        const itemsCartContainer = document.querySelector('.items-cart-container');
        itemsCartContainer.classList.remove('hidden-element');
    // Disableing form fields because there are no items in cart
    }else{
        const formFields = document.querySelectorAll('form input');
        formFields.forEach(field => field.disabled = true);
    }

    // *****************************************************************************
    //                   Rendering all items of cart on screen 
    // *****************************************************************************

    // HTML code of each item in the cart
    const contentItemCartDiv = `
            <div id="" class="item-title-img">
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
                    <h2>R$ 100,00</h2>
                </div>

                <div class="item-media">
                    <h1>Mídia Física</h1>
                    <div class="quant-control">
                        <button class="btn-remove">-</button>
                        <span></span>
                        <button class="btn-add">+</button>
                    </div>
                    <h2>R$ 200,00</h2>
                </div>
            </div>
            <div class="subtotal-container"><p>Sub-total: <span></span></p></div>
            <img src="assets/img/trash.png" class="img-trash" alt="Excluir item">
    `

    // Loop to fill the container with the items in the cart
    cartInstruments.forEach((instrument, index) => {
        // Creating a div for each item
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-cart-group');

        // Filling the div with the HTML code
        itemDiv.innerHTML = contentItemCartDiv;

        // Defining the item div id
        itemDiv.id = instrument.id;

        // Selecting h1 for the name of the instrument
        const itemTitle = itemDiv.querySelector('.item-title-img h1');
        itemTitle.textContent = `${index + 1}. ${instrument.h1}`;

        // Selecting img tag for the image of the instrument
        const itemImg = itemDiv.querySelector('.item-title-img img');
        itemImg.src = instrument.img_src;
        itemImg.alt = instrument.h1;

        // Selecting all the spans for the quantities
        const quantitySpans = itemDiv.querySelectorAll('.item-media .quant-control span');

        // Selecting spans for the quantity of digital and physical medias
        quantitySpans[0].textContent = instrument.quant_digital;
        quantitySpans[1].textContent = instrument.quant_physical;

        // Selecting h2 tags for subtotal of each media
        const subtotals = itemDiv.querySelectorAll('.item-media h2');
        const subtotalDigital = subtotals[0];
        const subtotalPhysical = subtotals[1];

        // Calculating subtotals
        const subtotalDigitalValue = instrument.subTotal_digital.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        const subtotalPhysicalValue = instrument.subTotal_physical.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

        // Filling subtotals
        subtotalDigital.textContent = subtotalDigitalValue;
        subtotalPhysical.textContent = subtotalPhysicalValue;


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
                // Adding one digital media
                instrument.quant_digital += 1;
                // Updating span with quantity of digital media
                quantitySpans[0].textContent = instrument.quant_digital;
                // Updating subtotal of digital media in localStorage
                instrument.subTotal_digital = instrument.quant_digital * instrument.price_digital;
                localStorage.setItem('cartInstruments', JSON.stringify(cartInstruments));
                // Updating subtotal of digital media on screen
                subtotalDigital.textContent = instrument.subTotal_digital.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
                updateSubTotalItem(instrument.id);
                updateTotal();
        });

        // Selecting reduce digital media quantity button
        const removeDigitalButton = itemDiv.querySelectorAll('.item-media .quant-control .btn-remove')[0];

        // Event listener for reducing digital media
        removeDigitalButton.addEventListener('click', () => {
            // There's a digital item. Removing...
            if(instrument.quant_digital === 1){
                instrument.quant_digital -= 1;
                quantitySpans[0].textContent = instrument.quant_digital;
                // Updating span with quantity of digital media
                quantitySpans[0].textContent = instrument.quant_digital;
                // Updating subtotal of digital media in localStorage
                instrument.subTotal_digital = instrument.quant_digital * instrument.price_digital;
                localStorage.setItem('cartInstruments', JSON.stringify(cartInstruments));
                // Updating subtotal of digital media on screen
                subtotalDigital.textContent = instrument.subTotal_digital.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
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
                updateSubTotalItem(instrument.id);
                updateTotal();
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

            // Updating span with quantity of physical media
            quantitySpans[1].textContent = instrument.quant_physical;
            // Updating subtotal of physical media in localStorage
            instrument.subTotal_physical = instrument.quant_physical * instrument.price_physical;
            localStorage.setItem('cartInstruments', JSON.stringify(cartInstruments));
            // Updating subtotal of physical media on screen
            subtotalPhysical.textContent = instrument.subTotal_physical.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            // Updating subtotal of whole item
            updateSubTotalItem(instrument.id);
            updateTotal();
        });

        // Selecting reduce physical media quantity button
        const removePhysicalButton = itemDiv.querySelectorAll('.item-media .quant-control .btn-remove')[1];

        // Event listener for reducing physical media
        removePhysicalButton.addEventListener('click', () => {
            // Quantity of physical media higher then zero
            if (instrument.quant_physical > 0) {
                instrument.quant_physical -= 1;

                // Updating span with quantity of physical media
                quantitySpans[1].textContent = instrument.quant_physical;
                // Updating subtotal of physical media in localStorage
                instrument.subTotal_physical = instrument.quant_physical * instrument.price_physical;
                localStorage.setItem('cartInstruments', JSON.stringify(cartInstruments));
                // Updating subtotal of physical media on screen
                subtotalPhysical.textContent = instrument.subTotal_physical.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

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
                // Updating subtotal of whole item
                updateSubTotalItem(instrument.id);
                updateTotal();
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
        updateSubTotalItem(instrument.id);
    });

    // Adding div with total of the items
    const divTotalContent = `
        <div class="total-container">
            <p>
                Total Geral: <span>R$ 1000,00</span>
            </p>
        </div>
    `;
    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = divTotalContent;
    itemsCartContainer.appendChild(totalDiv);

    updateTotal();

});