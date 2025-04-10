document.addEventListener("DOMContentLoaded", function () {
    let cart = [];
    const cartDisplay = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

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

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
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