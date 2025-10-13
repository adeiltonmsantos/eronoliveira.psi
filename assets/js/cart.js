document.addEventListener('DOMContentLoaded', () =>{

    // Array with instruments data added to cart in Local Storage
    let cartInstruments = JSON.parse(localStorage.getItem('cartInstruments')) || [];

    console.log(cartInstruments);

    const itemCartDiv = `
        <div class="items-cart-container">
            <div class="item-cart-group">
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
                            <span>0</span>
                            <button class="btn-add">-</button>
                        </div>
                    </div>

                    <div class="item-media">
                        <h1>Mídia Física</h1>
                        <div class="quant-control">
                            <button class="btn-remove">+</button>
                            <span>0</span>
                            <button class="btn-add">-</button>
                        </div>
                    </div>
                </div>
                <img src="assets/img/trash.png" class="img-trash" alt="Excluir item">
            </div>
        </div>
    `


    if(cartInstruments.length === 0){

    }

});