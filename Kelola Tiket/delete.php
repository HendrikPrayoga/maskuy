<?php
// Aktifkan error reporting untuk debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Koneksi ke database
$conn = new mysqli('localhost', 'root', '', 'maskuy');

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Pastikan parameter 'id' tersedia di URL
if (isset($_GET['id']) && !empty($_GET['id'])) {
    $id = intval($_GET['id']); // Konversi menjadi integer untuk keamanan

    // Query untuk menghapus data
    $sql = "DELETE FROM pesanan WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo "Data berhasil dihapus";
    } else {
        echo "Error: " . $conn->error;
    }
} else {
    echo "ID tidak ditemukan.";
}

$conn->close();
?>
