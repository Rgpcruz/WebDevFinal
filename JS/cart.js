/// Carregar carrinho do localStorage
function loadCart() {
  let cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Atualizar carrinho no localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Atualizar a interface do carrinho
function updateCart() {
  let cartContent = document.getElementById("cart-content");
  cartContent.innerHTML = "";

  if (cart.length === 0) {
    cartContent.innerHTML = "<p>No items in the cart.</p>";
  } else {
    cart.forEach((item) => {
      let itemDiv = document.createElement("div");
      itemDiv.innerHTML = `<p>${item.name} - Quantity: ${item.quantity}, Size: ${item.size}</p>`;
      cartContent.appendChild(itemDiv);
    });
  }

  // Atualiza o contador de itens na navbar
  updateCartCount();

  // Salvar o carrinho no localStorage
  saveCart(cart);
}

// Função para aumentar a quantidade de um item
function increaseQuantity(index) {
  let quantityElement = document.getElementById(`quantity-${index}`);
  let quantity = parseInt(quantityElement.innerText);
  quantityElement.innerText = quantity + 1;
  cart[index].quantity = quantity + 1; // Atualizar no carrinho
  saveCart(cart); // Salvar no localStorage
}

// Função para diminuir a quantidade de um item
function decreaseQuantity(index) {
  let quantityElement = document.getElementById(`quantity-${index}`);
  let quantity = parseInt(quantityElement.innerText);
  if (quantity > 1) {
    quantityElement.innerText = quantity - 1;
    cart[index].quantity = quantity - 1; // Atualizar no carrinho
    saveCart(cart); // Salvar no localStorage
  }
}

// Função para adicionar um item ao carrinho
function addToCart(index) {
  let quantityElement = document.getElementById(`quantity-${index}`);
  let quantity = parseInt(quantityElement.innerText);

  let item = {
    name: document.querySelectorAll(".card-title")[index].innerText,
    quantity: quantity,
    size: document.getElementById(`size-${index}`).value,
  };

  // Verificar se o item já está no carrinho
  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.name === item.name && cartItem.size === item.size
  );
  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += quantity; // Aumentar a quantidade se o item já existir
  } else {
    cart.push(item); // Adicionar novo item ao carrinho
  }

  updateCart(); // Atualiza a interface e salva no localStorage
}

// Finalizar a compra
function completePurchase() {
  let paymentMethod = document.getElementById("payment-method").value;

  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert(`Purchase Made! Thank You!! \nPayment Method: ${paymentMethod}`);
    localStorage.removeItem("cart"); // Limpar o carrinho após a compra
    cart = []; // Limpar o array em memória
    updateCart(); // Atualiza a interface do carrinho
  }
}

// Atualiza o contador de itens no carrinho na navbar
function updateCartCount() {
  let cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length; // Atualiza o número de itens no carrinho
}

// Limpar o carrinho
function clearCart() {
  cart = []; // Limpar o array do carrinho
  localStorage.removeItem("cart"); // Limpar o carrinho no localStorage
  updateCart(); // Atualiza a interface do carrinho
}

// Carregar carrinho do localStorage quando a página for carregada
window.onload = function () {
  cart = loadCart(); // Carregar o carrinho do localStorage
  updateCart(); // Atualizar a interface do carrinho
};
