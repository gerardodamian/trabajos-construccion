// Pequeña animación de entrada
document.querySelectorAll(".card").forEach((card, i) => {
    card.style.opacity = 0;
    card.style.transform = "translateY(20px)";

    setTimeout(() => {
        card.style.transition = "0.5s";
        card.style.opacity = 1;
        card.style.transform = "translateY(0)";
    }, i * 150);
});
