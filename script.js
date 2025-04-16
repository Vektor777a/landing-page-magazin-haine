document.addEventListener("DOMContentLoaded", function () {
    let cart = [];
    const cartDisplay = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const searchInput = document.querySelector(".search-form input");
    const products = document.querySelectorAll(".product");

    function updateCart() {
        cartDisplay.textContent = cart.length;
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item) => {
            total += item.price;

            let li = document.createElement("li");
            li.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <span>${item.name} - ${item.price} MDL</span>
                    `;
            cartItems.appendChild(li);
        });

        cartTotal.textContent = total.toFixed(2);
    }

    
    searchInput.addEventListener("input", function() {
        const searchTerm = this.value.toLowerCase();
        
        products.forEach(product => {
            const productName = product.querySelector("h1").textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    });

   
    document.querySelectorAll(".buy-button").forEach(button => {
        button.classList.add("add-to-cart");
        button.setAttribute("data-name", button.parentElement.querySelector("h1").textContent);
        button.setAttribute("data-price", parseFloat(button.parentElement.querySelector("p").textContent.replace("Preț: ", "").replace(" MDL", "")));
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));
            const image = this.parentElement.querySelector("img").src;

            cart.push({ name, price, image });
            updateCart();
        });
    });

    window.addEventListener("beforeunload", function () {
        cart = [];
    });

    updateCart();
});