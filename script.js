document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartDisplay = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartButton = document.querySelector(".cart-button");
    const cartContent = document.querySelector(".cart-content");

    function updateCart() {
        cartDisplay.textContent = cart.length;
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;

            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
                <span>${item.name} - ${item.price} MDL</span>
                <button class="remove-item" data-index="${index}" aria-label="Remove item">×</button>
            `;
            cartItems.appendChild(li);
        });

        cartTotal.textContent = total.toFixed(2);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    document.querySelectorAll(".buy-button").forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            const productCard = this.closest(".product");
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));
            const image = productCard.querySelector("img").src;

            cart.push({ name, price, image });
            updateCart();
            
            const originalText = this.textContent;
            this.textContent = "Adăugat!";
            this.style.backgroundColor = "#28a745";
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = "";
            }, 1000);
        });
    });

    document.addEventListener("click", function(e) {
        if (e.target.classList.contains("remove-item")) {
            const index = parseInt(e.target.getAttribute("data-index"));
            cart.splice(index, 1);
            updateCart();
        }
    });

    cartButton.addEventListener("click", function(e) {
        e.stopPropagation();
        cartContent.classList.toggle("active");
    });

    document.addEventListener("click", function() {
        cartContent.classList.remove("active");
    });

    cartContent.addEventListener("click", function(e) {
        e.stopPropagation();
    });

    updateCart();
});