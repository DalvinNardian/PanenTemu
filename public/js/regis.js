// Fungsi untuk membuat userId otomatis
function generateUserId() {
  const huruf = "USR"; // Menambahkan prefiks untuk User
  const today = new Date();
  const dateStr =
    today.getDate().toString().padStart(2, "0") +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    today.getFullYear().toString().slice(-2) +
    today.getSeconds().toString().padStart(2, "0");
  const karakter = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
  const randomChars = Array.from({ length: 5 }, () =>
    karakter.charAt(Math.floor(Math.random() * karakter.length))
  ).join("");

  return huruf + dateStr + randomChars;
}

// Menangani pengiriman form
document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form untuk disubmit secara default

    // Mengambil data dari form
    const profileImage = document.getElementById("profileImage").files[0];
    const nama = document.getElementById("nama").value;
    const password = document.getElementById("password").value;
    const nomorHp = document.getElementById("nomorHp").value;
    const role = document.getElementById("role").value;
    const alamat = document.getElementById("alamat").value;

    // Membuat userId otomatis
    const userId = generateUserId();

    // Membaca gambar sebagai data URL (untuk ditampilkan)
    const reader = new FileReader();
    reader.onloadend = function () {
      // Menyimpan data dalam objek
      const userData = {
        nama: nama,
        password: password,
        nomorHp: nomorHp,
        role: role,
        alamat: alamat,
        profileImage: reader.result, // Menyimpan gambar sebagai data URL
        userId: userId,
      };

      // Mengambil data yang ada dari localStorage atau inisialisasi sebagai objek kosong
      let usersData = JSON.parse(localStorage.getItem("usersData")) || {};

      // Menambahkan data baru dengan userId sebagai key
      usersData[userId] = userData;

      // Menyimpan data ke dalam localStorage
      localStorage.setItem("usersData", JSON.stringify(usersData));

      // Redirect ke halaman view.html
      window.location.href = "view.html"; // Ganti 'view.html' dengan halaman yang diinginkan
    };

    if (profileImage) {
      reader.readAsDataURL(profileImage); // Membaca gambar jika ada
    } else {
      const userData = {
        nama: nama,
        password: password,
        nomorHp: nomorHp,
        role: role,
        alamat: alamat,
        profileImage: null,
        userId: userId,
      };

      // Menyimpan data ke dalam localStorage tanpa gambar
      let usersData = JSON.parse(localStorage.getItem("usersData")) || {};
      usersData[userId] = userData;
      localStorage.setItem("usersData", JSON.stringify(usersData));

      // Redirect ke halaman view.html
      window.location.href = "view.html"; // Ganti 'view.html' dengan halaman yang diinginkan
    }
  });
