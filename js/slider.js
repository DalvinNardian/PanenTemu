// Fungsi JavaScript untuk navigasi slider
const sliderContainer = document.getElementById('sliderContainer');
const navigationButtons = document.querySelectorAll('.slider-navigation button');
let currentSlide = 0;
const totalSlides = navigationButtons.length;

function goToSlide(index) {
    sliderContainer.scrollLeft = sliderContainer.clientWidth * index;
    updateActiveButton(index);
}

function updateActiveButton(activeIndex) {
    navigationButtons.forEach((button, index) => {
        button.classList.toggle('active', index === activeIndex);
    });
}

// Fungsi untuk slider otomatis
function autoSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}

// Interval untuk menggerakkan slider setiap 3 detik
setInterval(autoSlide, 3000);

// Event listener untuk navigasi manual
navigationButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        currentSlide = index;
        goToSlide(index);
    });
});
