document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".buy-button");

    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Produsul a fost adaugat in cos!");
        });
    });
});