// script.js
const menuContainer = document.getElementById("menu-container");
let isDragging = false;
let startPositionX = 0;
let currentTranslateX = 0;

menuContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    startPositionX = e.clientX - currentTranslateX;
    menuContainer.style.transition = "none";
});
menuContainer.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startPositionX;
    menuContainer.style.transform = `translateX(${deltaX}px)`;
});
menuContainer.addEventListener("mouseup", () => {
    if (!isDragging) return;

    isDragging = false;
    currentTranslateX = parseInt(menuContainer.style.transform.replace("translateX(", ""), 10);
    menuContainer.style.transition = "transform 0.3s ease-in-out";
    if (Math.abs(currentTranslateX) < menuContainer.clientWidth / 2) {
        menuContainer.style.transform = "translateX(0)";
    } else {

    }
});

menuContainer.addEventListener("mouseleave", () => {
    if (!isDragging) return;
    
    isDragging = false;
    menuContainer.style.transition = "transform 0.3s ease-in-out";
    menuContainer.style.transform = "translateX(0)";
});
