function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function addToCart(itemName, itemPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const currencyAmount = parseInt(itemName.replace(/[^0-9]/g, '')); 

    const newItem = {
        name: itemName,
        price: itemPrice,
        quantity: 1,
        currencyAmount: currencyAmount 
    };

    const existingItemIndex = cart.findIndex(item => item.name === itemName);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1; 
    } else {
        cart.push(newItem); 
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function loadCart() {
    updateCartDisplay();
}

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; 

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item'); 

        const itemText = document.createElement('span');
        itemText.classList.add('item-text'); 
        itemText.textContent = `${item.name} - R$${item.price} x ${item.quantity}`;

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button'); 

        const icon = document.createElement('i');
        icon.className = 'fi fi-br-cross-circle'; 

        removeButton.appendChild(icon);
        removeButton.onclick = () => removeFromCart(index); 

        itemDiv.appendChild(itemText); 
        itemDiv.appendChild(removeButton); 
        cartItemsContainer.appendChild(itemDiv); 
    });

    const totalRobux = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = Math.floor(totalRobux); 

    const totalCurrency = cart.reduce((sum, item) => sum + (item.currencyAmount * item.quantity), 0);
    document.getElementById('cart-total-currency').textContent = formatCurrency(totalCurrency); 
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty!'); 
        return; 
    }
    window.location.href = 'checkout.html';
}

function toggleCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    cartSidebar.classList.toggle('active'); 
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCartDisplay();
}

window.onload = loadCart;