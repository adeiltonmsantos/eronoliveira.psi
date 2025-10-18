document.addEventListener('DOMContentLoaded', () =>{

    // Array with instruments data added to cart in Local Storage
    let cartInstruments = JSON.parse(localStorage.getItem('cartInstruments')) || [];

    // Selecting container of all the items in the cart
    const itemsCartContainer = document.querySelector('.items-cart-container');

    // HTML code of each item in the cart
    const contentItemCartDiv = `
            <div id="" class="item-cart-group">
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
            </div>
    `

    // Loop to fill the container with the items in the cart
    cartInstruments.forEach((instrument, index) => {
        // Creating a div for each item
        const itemDiv = document.createElement('div');

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