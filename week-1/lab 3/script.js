const images = [
    { full: "1.jpg", thumbnail: "1.jpg", caption: "This is image 1" },
    { full: "2.jpg", thumbnail: "2.jpg", caption: "This is image 2" },
    { full: "3.jpg", thumbnail: "3.jpg", caption: "This is image 3" },
    { full: "4.jpg", thumbnail: "4.jpg", caption: "This is image 4" },
    { full: "5.jpg", thumbnail: "5.jpg", caption: "This is image 5" },
    { full: "6.jpg", thumbnail: "6.jpg", caption: "This is image 6" },
    { full: "7.jpg", thumbnail: "7.jpg", caption: "This is image 7" },
    { full: "4.jpg", thumbnail: "3.jpg", caption: "This is image 8" },
    { full: "1.jpg", thumbnail: "1.jpg", caption: "This is image 1" },
    { full: "2.jpg", thumbnail: "2.jpg", caption: "This is image 2" },
    { full: "3.jpg", thumbnail: "3.jpg", caption: "This is image 3" },
    { full: "4.jpg", thumbnail: "4.jpg", caption: "This is image 4" },
    { full: "5.jpg", thumbnail: "5.jpg", caption: "This is image 5" },
    { full: "6.jpg", thumbnail: "6.jpg", caption: "This is image 6" },
    { full: "7.jpg", thumbnail: "7.jpg", caption: "This is image 7" },
    { full: "4.jpg", thumbnail: "3.jpg", caption: "This is image 8" },
   { full: "1.jpg", thumbnail: "1.jpg", caption: "This is image 1" },
    { full: "2.jpg", thumbnail: "2.jpg", caption: "This is image 2" },
    { full: "3.jpg", thumbnail: "3.jpg", caption: "This is image 3" },
    { full: "4.jpg", thumbnail: "4.jpg", caption: "This is image 4" },
    { full: "5.jpg", thumbnail: "5.jpg", caption: "This is image 5" },
    { full: "6.jpg", thumbnail: "6.jpg", caption: "This is image 6" },
    { full: "7.jpg", thumbnail: "7.jpg", caption: "This is image 7" },
    { full: "4.jpg", thumbnail: "3.jpg", caption: "This is image 8" },
      { full: "1.jpg", thumbnail: "1.jpg", caption: "This is image 1" },
    { full: "2.jpg", thumbnail: "2.jpg", caption: "This is image 2" },

    { full: "4.jpg", thumbnail: "3.jpg", caption: "This is image 8" }
];

const galleryContainer = document.getElementById("gallery-container");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const caption = document.getElementById("caption");
const closeButton = document.getElementById("close-btn");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

let currentIndex = -1;

// Function to create thumbnails with lazy loading
function createThumbnails() {
    images.forEach((image, index) => {
        const thumbnail = document.createElement("img");
        thumbnail.src = image.thumbnail; // Lazy load the thumbnail
        thumbnail.alt = image.caption;
        thumbnail.classList.add("thumbnail");
        thumbnail.loading = "lazy";
        thumbnail.addEventListener("click", () => openLightbox(index));
        galleryContainer.appendChild(thumbnail);
    });
}

// Function to open the lightbox and display the image
function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = "flex";
    lightboxImage.src = images[currentIndex].full;
    caption.innerHTML = images[currentIndex].caption;
    lightboxImage.onload = () => {
        lightboxImage.style.opacity = 1; // Fade in the image
    };
    updateNavButtons();
}

// Function to close the lightbox
function closeLightbox() {
    lightbox.style.display = "none";
    currentIndex = -1;
    lightboxImage.style.opacity = 0;
}

// Function to update the Next/Previous buttons
function updateNavButtons() {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === images.length - 1;
    if (currentIndex === 0) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'block';
    }

    // Hide the next button if we're at the last image
    if (currentIndex === images.length - 1) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'block';
    }
}



// Function to go to the previous image
function goToPreviousImage() {
    if (currentIndex > 0) {
        openLightbox(currentIndex - 1);
    }
}

// Function to go to the next image
function goToNextImage() {
    if (currentIndex < images.length - 1) {
        openLightbox(currentIndex + 1);
    }
    if (currentIndex === 0) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'block';
    }

    // Hide the next button if we're at the last image
    if (currentIndex === images.length - 1) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'block';
    }
}

// Event listeners
closeButton.addEventListener("click", closeLightbox);
prevButton.addEventListener("click", goToPreviousImage);
nextButton.addEventListener("click", goToNextImage);

// Initialize the gallery
createThumbnails();