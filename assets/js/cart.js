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
                            <button class="btn-remove">+</button>
                            <span></span>
                            <button class="btn-add">-</button>
                        </div>
                    </div>

                    <div class="item-media">
                        <h1>Mídia Física</h1>
                        <div class="quant-control">
                            <button class="btn-remove">+</button>
                            <span></span>
                            <button class="btn-add">-</button>
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

        itemsCartContainer.appendChild(itemDiv);
    });
});