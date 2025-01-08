let cart = [];

function increaseQuantity(index) {
    let quantityElement = document.getElementById(`quantity-${index}`);
    let quantity = parseInt(quantityElement.innerText);
    quantityElement.innerText = quantity + 1;
}

function decreaseQuantity(index) {
    let quantityElement = document.getElementById(`quantity-${index}`);
    let quantity = parseInt(quantityElement.innerText);
    if (quantity > 1) {
        quantityElement.innerText = quantity - 1;
    }
}

function addToCart(index) {
    let quantityElement = document.getElementById(`quantity-${index}`);
    let quantity = parseInt(quantityElement.innerText);
    
    let item = {
        name: document.querySelectorAll('.card-title')[index].innerText,
        quantity: quantity,
        size: document.getElementById(`size-${index}`).value
    };

    cart.push(item);
    updateCart();
}

function updateCart() {
    let cartContent = document.getElementById('cart-content');
    cartContent.innerHTML = '';

    if (cart.length === 0) {
        cartContent.innerHTML = '<p>No items in the cart.</p>';
    } else {
        cart.forEach(item => {
            let itemDiv = document.createElement('div');
            itemDiv.innerHTML = `<p>${item.name} - Quantity: ${item.quantity}, Size: ${item.size}</p>`;
            cartContent.appendChild(itemDiv);
        });
    }
}

function completePurchase() {
    let paymentMethod = document.getElementById('payment-method').value;

    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert(`Purchase Made! Thank You!! \nPayment Method: ${paymentMethod}`);
    }
}
