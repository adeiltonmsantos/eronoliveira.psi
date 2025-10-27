// Centering an element relative to its parent
function centerElement(element){
    // Getting element dimensions
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    // Getting parent element dimensions
    const parentWidth = element.parentElement.offsetWidth;
    const parentHeight = element.parentElement.offsetHeight;

    // Calculating top and left postions element to centering relative to its parent
    const top = (parentHeight - elementHeight) / 2;
    const left = (parentWidth - elementWidth) / 2;

    // Positioning element
    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
}

// Apply mask in value of phone field
function maskPhone(idPhoneField, maxlengthPhoneField){
    const phone = document.getElementById(idPhoneField);
    if(phone){
        phone.maxlength = 14;
        phone.addEventListener("keydown", (e) =>{
            e.preventDefault()
    
            // Function to insert digits of value in mask (##) ####-####
            function valueMasked(digits){
                const value = String(digits).split('');
                let finalValue = '';
                
                value.forEach((item, index) => {
                    switch(index){
                        // First digit
                        case 0:
                            finalValue += '('+item;
                            break;
                        // Second digit
                        case 1:
                            finalValue += item+') ';
                            break;
                        // Third digit
                        case 2:
                            finalValue += ' '+ item;
                            break;
                        // Seventh digit
                        case 7:
                            finalValue += '-'+item;
                            break;
                        // Any other digit
                        default:
                            finalValue += item;
                            break;
                    }
                })
    
                return finalValue;
            }
    
            // Value of field (only digits)
            const digits = phone.value.replace(/\D/g, '');
    
            if(!isNaN(e.key) && e.key !== ' ' && phone.value.length <= maxlengthPhoneField){
                const newDigits = digits + e.key;
                phone.value = valueMasked(newDigits);
            }
            if(e.key === "Backspace"){
                const newDigits = digits.slice(0, -1);
                phone.value = valueMasked(newDigits);
            }
        })
    }else
        console.log('Field not found');
}