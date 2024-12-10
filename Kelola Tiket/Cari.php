<?php
// Koneksi ke database
$conn = new mysqli('localhost', 'root', '', 'maskuy');

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Mendapatkan query dari URL
$query = $_GET['query'] ?? '';

$sql = "SELECT * FROM pesanan 
        WHERE id LIKE '%$query%' 
        OR nomor_identitas LIKE '%$query%' 
        OR nama_lengkap LIKE '%$query%'";

$result = $conn->query($sql);
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
