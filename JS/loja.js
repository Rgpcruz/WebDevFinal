function increaseQuantity(cardIndex) {
    const quantityElement = document.getElementById(`quantity-${cardIndex}`);
    let currentQuantity = parseInt(quantityElement.innerText);
    quantityElement.innerText = currentQuantity + 1;
}

function decreaseQuantity(cardIndex) {
    const quantityElement = document.getElementById(`quantity-${cardIndex}`);
    let currentQuantity = parseInt(quantityElement.innerText);
    if (currentQuantity > 1) {
        quantityElement.innerText = currentQuantity - 1;
    }
}