<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ambil data dari form dan pastikan data yang diterima adalah integer
    $namaLengkap = $_POST['nama_lengkap'];
    $nomorIdentitas = $_POST['nomor_identitas'];
    $nomorTelepon = $_POST['nomor_telepon'];
    $email = $_POST['email'];
    $jumlah = isset($_POST['jumlah']) ? (int) $_POST['jumlah'] : 1; // pastikan jumlah di-cast ke integer
    $harga = isset($_POST['harga']) ? (int) $_POST['harga'] : 2000; // pastikan harga di-cast ke integer
    $total = $harga * $jumlah;

    // Debug: Tampilkan jumlah tiket yang diterima untuk memastikan nilai jumlah
    echo "Jumlah Tiket: " . htmlspecialchars($jumlah) . "<br>";
    echo "Total Harga: " . htmlspecialchars($total) . "<br>";

    try {
        // Koneksi ke database
        $pdo = new PDO("mysql:host=localhost;dbname=maskuy", "root", "");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Persiapan query insert
        $stmt = $pdo->prepare("INSERT INTO pesanan (nama_lengkap, nomor_identitas, nomor_telepon, email, jumlah, harga, total) VALUES (?, ?, ?, ?, ?, ?, ?)");

        // Eksekusi query dengan data dari form
        $stmt->execute([$namaLengkap, $nomorIdentitas, $nomorTelepon, $email, $jumlah, $harga, $total]);

        // Pesan sukses
        echo "<script>alert('Pesanan berhasil dibuat!'); window.location.href='Tiket.html';</script>";
    } catch (PDOException $e) {
        // Tampilkan pesan error jika ada
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Form tidak dikirim dengan benar.";
}
