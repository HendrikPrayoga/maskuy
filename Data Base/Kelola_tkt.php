<?php
// Membuat koneksi
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'maskuy';

$conn = new mysqli($host, $user, $password, $database);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

$query = "SELECT * FROM pesanan";
$result = $conn->query($query);

$data = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Mengirimkan data sebagai JSON
header('Content-Type: application/json');
echo json_encode($data);

$conn->close();
?>
