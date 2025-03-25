 // Define product arrays for each section
        const shoes = [
        { id: 1, name: 'NIKE', price: 300,imageUrl: 'images/shoes1.png'},
        { id: 2, name: 'PUMA', price: 250,imageUrl: 'images/shoes1.png' },
        { id: 3, name: 'US POLO', price: 150,imageUrl: 'images/shoes1.png' },
        { id: 4, name: 'ADDIDAS', price: 200,imageUrl: 'images/shoes1.png' }
        ];
    
        const perfumes = [
        { id: 1, name: 'DENVER', price: 300,imageUrl: 'images/perfume.png' },
        { id: 2, name: 'GUCCI', price: 250,imageUrl: 'images/perfume.png'},
        { id: 3, name: 'COCO', price: 150,imageUrl: 'images/perfume.png' },
        { id: 4, name: 'PARIS', price: 200,imageUrl: 'images/perfume.png' }
        ];
        const womens = [
        { id: 1, name: 'ZARA', price: 300,imageUrl: 'images/dress.png' },
        { id: 2, name: 'H & M', price: 250,imageUrl: 'images/dress.png'},
        { id: 3, name: 'J-CREW', price: 150,imageUrl: 'images/dress.png' },
        { id: 4, name: 'GUCCI', price: 200,imageUrl: 'images/dress.png' }
        ];
        const mens = [
        { id: 1, name: 'Louis Vuitton', price: 300,imageUrl: 'images/mens.png' },
        { id: 2, name: 'GUCCI', price: 250,imageUrl: 'images/mens.png'},
        { id: 3, name: 'H&M', price: 150,imageUrl: 'images/mens.png' },
        { id: 4, name: 'ZARA', price: 200,imageUrl: 'images/mens.png' }
        ];
    
        let cartItems = []; // Array to store cart items
        let totalPrice = 0;
    
        // Function to generate product cards dynamically
        function generateProductCards(products, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        // Create elements for the product card
        const card = document.createElement('div');
        card.classList.add('card');

        const brandImage = document.createElement('div');
        brandImage.classList.add('brand-image');
        brandImage.style.backgroundImage = `url(${product.imageUrl})`; // Apply dynamic image URL

        const description = document.createElement('div');
        description.classList.add('description');
        description.innerHTML = `<h1 id="brandName${product.id}">${product.name}</h1><p>SPECIAL EDITION</p>`;

        const price = document.createElement('div');
        price.classList.add('price');
        price.innerHTML = `<div class="price1"><h1 id="amount${product.id}">${product.price}</h1><h1>$</h1></div>`;

        // Create the add to cart button
        const button = document.createElement('button');
        button.textContent = 'add to cart';
        button.onclick = () => {
        addToCart(product.id, product.name, product.price);
        };
        const button1 = document.createElement('button');
        button1.textContent = 'BUY';
        button1.onclick = () => {
        document.querySelector('.priceorder').scrollIntoView({ behavior: 'smooth' });
        };


        // Append elements to the card
        price.appendChild(button);
        price.appendChild(button1);
        card.appendChild(brandImage);
        card.appendChild(description);
        card.appendChild(price);

        // Append card to the container
        container.appendChild(card);
    });
}

    
        // Function to show the selected section
        function showSection(section) {
            // Hide all sections
            document.getElementById('shoesSection').style.display = 'none';
            document.getElementById('perfumesSection').style.display = 'none';
            document.getElementById('womensSection').style.display = 'none';
            document.getElementById('mensSection').style.display = 'none';
    
            // Show the selected section
            let sectionId;
            if (section === 'shoes') {
                sectionId = 'shoesSection';
                generateProductCards(shoes, 'shoesContainer');
            } else if (section === 'perfumes') {
                sectionId = 'perfumesSection';
                generateProductCards(perfumes, 'perfumesContainer');
            } else if (section === 'womens') {
                sectionId = 'womensSection';
                generateProductCards(womens, 'womensContainer');
            } else if (section === 'mens') {
                sectionId = 'mensSection';
                generateProductCards(mens, 'mensContainer');
            }
                // Display the section and scroll into view
                const sectionElement = document.getElementById(sectionId);
            sectionElement.style.display = 'block';
            document.querySelector('.visit').addEventListener('click', () => {
    // Get the current scroll position
    const currentScroll = window.scrollY || window.pageYOffset;

    // Get the height of the viewport
    const viewportHeight = window.innerHeight;

    // Calculate the next scroll position
    const nextScroll = currentScroll + viewportHeight;

    // Scroll to the calculated position smoothly
    window.scrollTo({
        top: nextScroll,
        behavior: 'smooth'
    });
        });
        }
    
        // Function to add item to cart
        function addToCart(productId, productName, productPrice) {
            // Check if the product is already in cart
            const existingItem = cartItems.find(item => item.productId === productId);
    
            if (existingItem) {
                // If item already exists, increment quantity
                existingItem.quantity++;
            } else {
                // If item doesn't exist, add it to the cart
                cartItems.push({ productId, productName, price: productPrice, quantity: 1 });
            }
    
            // Update the display in the final billing section
            updateFinalBilling();
        }
    
        // Function to update final billing section
        function updateFinalBilling() {
            const orderList = document.getElementById('orderList');
            orderList.innerHTML = ''; // Clear previous items
    
            totalPrice = 0;
    
            // Iterate through cartItems to update the display
            cartItems.forEach(item => {
                const listItem = document.createElement('li');
                listItem.classList.add('order-item'); // Add a class for styling
    
                // Create buttons for incrementing and decrementing quantity
                const quantityControls = `
                  <button onclick="decrementQuantity(${item.productId})" class="inc">-</button>
                  <span>${item.quantity}</span>
                  <button onclick="incrementQuantity(${item.productId})" class="dec"> + </button>
                `;
    
                // Set the content of the item div
                listItem.innerHTML = `${item.productName} ${quantityControls} - $${(item.price * item.quantity).toFixed(2)}`;
                orderList.appendChild(listItem);
    
                totalPrice += item.price * item.quantity;
            });
    
            // Update total price display
            const finalTotal = document.getElementById('finalTotal');
            finalTotal.textContent = `TOTAL: $${totalPrice.toFixed(2)}`;
        }
    
        // Function to increment quantity
        function incrementQuantity(productId) {
            const item = cartItems.find(item => item.productId === productId);
            if (item) {
                item.quantity++;
                updateFinalBilling();
            }
        }
    
        // Function to decrement quantity
        function decrementQuantity(productId) {
            const item = cartItems.find(item => item.productId === productId);
            if (item && item.quantity > 1) {
                item.quantity--;
                updateFinalBilling();
            }
        }
    
        // Function to clear the cart
        function clearCart() {
            cartItems.length = 0; // Clear the cartItems array
            updateFinalBilling();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    
        // Function to handle final purchase
        function buy() {
            // Implement logic to finalize the purchase (if needed)
            alert("Purchase finalized!");
        }
    
        // Initialize the first section
        showSection('shoes');
