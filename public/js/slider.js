const sliderContainer = document.getElementById('sliderContainer');
const cards = sliderContainer.querySelectorAll('.card');
const navigationButtons = document.querySelectorAll('.slider-navigation button');
let currentSlide = 0;
const totalSlides = navigationButtons.length;

// Fungsi untuk berpindah ke slide tertentu
function goToSlide(index) {
    currentSlide = index;

    // Scroll slider ke posisi yang sesuai
    sliderContainer.scrollLeft = sliderContainer.clientWidth * index;

    // Perbarui elemen aktif pada card
    updateActiveCard(index);

    // Perbarui tombol navigasi aktif
    updateActiveButton(index);
}

// Fungsi untuk memperbarui tombol navigasi aktif
function updateActiveButton(activeIndex) {
    navigationButtons.forEach((button, index) => {
        button.classList.toggle('active', index === activeIndex);
    });
}

// Fungsi untuk memperbarui card aktif
function updateActiveCard(activeIndex) {
    cards.forEach((card, index) => {
        card.classList.toggle('active', index === activeIndex);
    });
}

// Fungsi untuk slider otomatis
function autoSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}

// Interval untuk menggerakkan slider otomatis setiap 4 detik
const autoSlideInterval = setInterval(autoSlide, 4000);

// Event listener untuk navigasi manual menggunakan tombol
navigationButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        currentSlide = index;
        goToSlide(index);
        clearInterval(autoSlideInterval); // Hentikan slider otomatis saat navigasi manual digunakan
    });
});

// Inisialisasi card dan tombol navigasi aktif pertama
updateActiveCard(currentSlide);
updateActiveButton(currentSlide);
