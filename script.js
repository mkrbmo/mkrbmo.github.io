
document.querySelectorAll('.post label').forEach(label => {
    label.addEventListener('click', () => {
        if (window.innerWidth > 768) {
            var parentElementId = label.parentElement.id
            openPost(parentElementId)
            
            setTimeout(() => {
                var targetElement = document.getElementById(parentElementId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
            , 100);
        } else {
            setTimeout(() => {
                const navHeight = document.getElementById('navigation-container').offsetHeight;
                const elementTop = label.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementTop - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100);
}
        
    });
})


document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("lightbox-overlay");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");

    let currentImages = [];
    let currentIndex = 0;

    // Get all carousel images
    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll(".post-image");

        images.forEach((img, index) => {
            img.addEventListener("click", () => {
                currentImages = Array.from(images);
                currentIndex = index;
                showLightbox(currentImages[currentIndex].src);
            });
        });
    });

    function showLightbox(src) {
        lightboxImage.src = src;
        overlay.classList.remove("hidden");
    }

    function closeLightbox() {
        overlay.classList.add("hidden");
        lightboxImage.src = "";
    }

    function showNext() {
        if (!currentImages.length) return;
        currentIndex = (currentIndex + 1) % currentImages.length;
        lightboxImage.src = currentImages[currentIndex].src;
    }

    function showPrev() {
        if (!currentImages.length) return;
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        lightboxImage.src = currentImages[currentIndex].src;
    }

    // Event Listeners
    closeBtn.addEventListener("click", closeLightbox);
    nextBtn.addEventListener("click", showNext);
    prevBtn.addEventListener("click", showPrev);

    document.addEventListener("keydown", (e) => {
        if (overlay.classList.contains("hidden")) return;

        switch (e.key) {
            case "Escape":
                closeLightbox();
                break;
            case "ArrowRight":
                showNext();
                break;
            case "ArrowLeft":
                showPrev();
                break;
        }
    });

    // Optional: Close lightbox when clicking outside the image
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            closeLightbox();
        }
    });
});

