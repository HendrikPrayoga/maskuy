// Fungsi untuk membuka modal
function showModal() {
    document.getElementById('modalForm').style.display = 'flex';
}

// Fungsi untuk menutup modal
function closeModal() {
    document.getElementById('modalForm').style.display = 'none';
}

// Fungsi untuk menghitung total harga berdasarkan jumlah tiket
function hitungTotal() {
    const hargaPerTiket = 2000; // Tentukan harga per tiket
    const jumlahTiket = document.getElementById('jumlah').value;

    // Validasi input agar tidak terjadi NaN
    const totalHarga = jumlahTiket ? jumlahTiket * hargaPerTiket : 0;

    // Tampilkan hasil di input Total Harga
    document.getElementById('total_harga').value = totalHarga.toLocaleString('id-ID');
}

// Tambahkan event listener agar perhitungan berjalan secara real-time
document.getElementById('jumlah').addEventListener('input', hitungTotal);
