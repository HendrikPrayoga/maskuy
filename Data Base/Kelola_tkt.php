<?php
// Membuat koneksi
$host = 'localhost';
$user = "wish4675_maskuy";
$password = "s+]akH]#%)vy";
$database = "wish4675_maskuy";

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
