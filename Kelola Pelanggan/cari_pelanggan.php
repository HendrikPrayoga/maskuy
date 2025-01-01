<?php
$host = "localhost";
$user = "wish4675_maskuy";
$password = "s+]akH]#%)vy";
$database = "wish4675_maskuy";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

$query = isset($_GET['query']) ? $_GET['query'] : '';
$sql = "SELECT * FROM pesanan WHERE nomor_identitas LIKE '%$query%' OR nama_lengkap LIKE '%$query%'";
$result = $conn->query($sql);

$data = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($data);

$conn->close();
?>
