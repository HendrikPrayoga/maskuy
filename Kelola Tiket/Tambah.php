<?php
// Aktifkan error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Koneksi ke database
$conn = new mysqli('localhost', 'root', '', 'maskuy');

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

if (isset($_POST['submit'])) {
    $nomor_identitas = $_POST['nomor_identitas'];
    $nama_lengkap = $_POST['nama_lengkap'];
    $jumlah = $_POST['jumlah'];
    $harga = $_POST['harga'];
    $total = $jumlah * $harga;

    $sql = "INSERT INTO pesanan (nomor_identitas, nama_lengkap, jumlah, total)
            VALUES ('$nomor_identitas', '$nama_lengkap', $jumlah, $total)";
    
    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Data berhasil ditambahkan'); window.location.href='Kelola_tiket1.html';</script>";
    } else {
        echo "Error: " . $conn->error;
    }
}

$conn->close();
?>
