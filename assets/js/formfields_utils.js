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
        phone.setAttribute('maxlength', maxlengthPhoneField);
        phone.addEventListener("keydown", (e) =>{
            // Getting phone field
            const target = e.target;
            let updatedValue = '';

            // Getting phone field value (just digits)
            const value = target.value.replace(/\D/g, '');

            if(value.length > 0){
                // Just DDD or less
                if(value.length <= 2){
                    updatedValue = `(${value}`;
                }
                // DDD + prefix
                else if(value.length <=7){
                    updatedValue = `(${value.substring(0, 2)}) ${value.substring(2)}`;
                }
                // Whole phone number
                else{
                    updatedValue = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
                }

                target.value = updatedValue;
            }
        })
    }else
        console.log('Field not found');
}