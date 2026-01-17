document.addEventListener("DOMContentLoaded", () => {
    const modalBtn = document.getElementById('main-product-button');
    const heroModal = document.getElementById('hero-modal');
    const closeBtn = document.getElementById('close-btn');

    modalBtn.addEventListener("click", () => {
        heroModal.showModal();
    });

    closeBtn.addEventListener("click", () => {
        heroModal.close();  
    });
});

// Hamburger Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
    const hamBtn = document.getElementById('ham-btn');
    const nav = document.querySelector('nav ul');

    hamBtn.addEventListener("click", () => {
        nav.classList.toggle('open');
    });
});