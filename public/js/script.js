document.addEventListener("DOMContentLoaded", () => {
    const modalBtn = document.getElementById('main-product-button');
    const heroModal = document.getElementById('hero-modal');
    const closeBtn = document.getElementById('close-btn');

    if (modalBtn && heroModal) {
        modalBtn.addEventListener("click", () => {
            heroModal.showModal();
        });
    }

    if (closeBtn && heroModal) {
        closeBtn.addEventListener("click", () => {
            heroModal.close();  
        });
    }
    
    // Hamburger Menu Toggle
    const hamBtn = document.getElementById('ham-btn');
    const nav = document.querySelector('nav ul');

    if (hamBtn && nav) {
        hamBtn.addEventListener("click", () => {
            nav.classList.toggle('open');
        });
    }
});