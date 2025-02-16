let cart = []; // Initialize an empty cart

function addToCart(itemName, itemPrice) {
    // Check if the item already exists in the cart
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        // If it exists, increment the quantity
        existingItem.quantity += 1;
    } else {
        // If it doesn't exist, add it to the cart with a quantity of 1
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartButton = document.querySelector('.cart-button');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Clear the current cart items display
    cartItemsContainer.innerHTML = '';

    // Populate the cart items display
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.style.display = 'flex'; // Use flexbox for alignment
        itemDiv.style.alignItems = 'center'; // Center items vertically
        
        // Display item name and quantity
        itemDiv.textContent = `${item.name} x${item.quantity} - R$${Math.floor(item.price * item.quantity)}`; // Show quantity and total price for that item
        
        // Create a remove icon for each item
        const removeIcon = document.createElement('i');
        removeIcon.className = 'fi fi-br-cross-circle'; // Set the icon class
        removeIcon.onclick = () => removeFromCart(index); // Set the onclick to remove the item
        removeIcon.style.cursor = 'pointer'; // Change cursor to pointer
        removeIcon.style.marginLeft = '10px'; // Add some space between text and icon
        removeIcon.style.verticalAlign = 'middle'; // Align icon vertically

        itemDiv.appendChild(removeIcon); // Append the remove icon to the item div
        cartItemsContainer.appendChild(itemDiv);
    });

    // Update the cart total
    const total = cart.reduce((acc, item) => acc + Math.floor(item.price * item.quantity), 0); // Calculate total based on quantity
    cartTotal.textContent = total; // Display total without decimals

    // Update the cart button text
    cartButton.innerHTML = `<i class="fi fi-br-shopping-cart"></i>`;
}

function removeFromCart(index) {
    // Check if the item exists and has a quantity greater than 1
    if (cart[index].quantity > 1) {
        // Decrement the quantity
        cart[index].quantity -= 1;
    } else {
        // If quantity is 1, remove the item from the cart
        cart.splice(index, 1);
    }
    updateCartDisplay(); // Update the display after removal
}

function toggleCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    cartSidebar.classList.toggle('active'); // Toggle the active class to show/hide
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Here you can implement the checkout logic, e.g., redirecting to a checkout page
    alert("Proceeding to checkout...");
    // Example: window.location.href = 'checkout.html';
}

// Add event listener to the cart button
document.querySelector('.cart-button').addEventListener('click', toggleCart);