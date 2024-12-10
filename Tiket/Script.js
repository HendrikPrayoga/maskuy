// Harga tiket per unit
const hargaTiket = 2000;
const jumlahInput = document.querySelector('input[name="jumlah"]');
const orderForm = document.querySelector('form'); // Ambil form

// Fungsi untuk menambah jumlah tiket
function increment() {
    let jumlah = parseInt(jumlahInput.value);
    jumlah++;
    jumlahInput.value = jumlah;
    updateRincianPesanan(jumlah);
}

// Fungsi untuk mengurangi jumlah tiket
function decrement() {
    let jumlah = parseInt(jumlahInput.value);
    if (jumlah > 1) {
        jumlah--;
        jumlahInput.value = jumlah;
        updateRincianPesanan(jumlah);
    }
}

// Fungsi untuk memperbarui rincian pesanan dan total pembayaran
function updateRincianPesanan(jumlah) {
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const jumlahTiketElement = document.getElementById('jumlahTiket');
    const totalPembayaranElement = document.getElementById('totalPembayaran');
    const hiddenJumlahInput = document.getElementById('jumlah-tiket'); // Ambil elemen hidden

    const subtotal = hargaTiket * jumlah;

    // Perbarui jumlah tiket di rincian pesanan
    jumlahTiketElement.textContent = `x${jumlah}`;

    // Perbarui subtotal dan total
    subtotalElement.textContent = `Rp. ${subtotal.toLocaleString('id-ID', { minimumFractionDigits: 2 })}`;
    totalElement.textContent = `Rp. ${subtotal.toLocaleString('id-ID', { minimumFractionDigits: 2 })}`;
    totalPembayaranElement.textContent = `Rp. ${subtotal.toLocaleString('id-ID', { minimumFractionDigits: 2 })}`;

    // Perbarui nilai input hidden dengan jumlah tiket terbaru
    hiddenJumlahInput.value = jumlah; // Update hidden input
    jumlahInput.value = jumlah; // Pastikan nilai input jumlah juga diperbarui
}

// Tambahkan event listener untuk form submit
orderForm.addEventListener('submit', function (event) {
    const jumlahTiket = parseInt(jumlahInput.value);
    console.log(`Jumlah tiket saat submit: ${jumlahTiket}`); // Debugging
    hiddenJumlahInput.value = jumlahTiket; // Pastikan hidden input diperbarui
    jumlahInput.value = jumlahTiket; // Pastikan nilai terbaru di-set
});

