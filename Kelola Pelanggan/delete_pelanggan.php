<?php
$host = "localhost";
$user = "wish4675_maskuy";
$password = "s+]akH]#%)vy";
$database = "wish4675_maskuy";

$conn = new mysqli($host, $user, $password, $database);

// Mengecek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Mendapatkan ID dari query string
$id = isset($_GET['id']) ? $_GET['id'] : '';

if ($id) {
    // Menggunakan prepared statement untuk menghindari SQL Injection
    $stmt = $conn->prepare("DELETE FROM pesanan WHERE id = ?");
    $stmt->bind_param("i", $id); // "i" berarti integer (jenis data id)

    // Eksekusi query
    if ($stmt->execute()) {
        echo "Data berhasil dihapus.";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close(); // Menutup statement
}

$conn->close(); // Menutup koneksi database
?>
