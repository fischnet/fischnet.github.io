function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsSummary = document.getElementById('cart-items-summary');
    const totalAmount = document.getElementById('total-amount');
    const totalCurrency = document.getElementById('total-currency');
    let totalRobux = 0;
    let totalCurrencyAmount = 0;

    cartItemsSummary.innerHTML = ''; 

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} - R$${item.price} x ${item.quantity}`;
        cartItemsSummary.appendChild(itemDiv);
        totalRobux += item.price * item.quantity;
        totalCurrencyAmount += item.currencyAmount * item.quantity;
    });

    totalAmount.textContent = Math.floor(totalRobux); 
    totalCurrency.textContent = formatCurrency(totalCurrencyAmount); 
}

document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty!'); 
        return; 
    }

    window.location.href = 'proceed.html'; 
});

window.onload = displayCartItems;