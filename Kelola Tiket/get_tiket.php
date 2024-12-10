<?php
header('Content-Type: application/json');

// Koneksi ke database
$conn = new mysqli('localhost', 'root', '', 'maskuy');

if ($conn->connect_error) {
    die(json_encode(['error' => "Koneksi gagal: " . $conn->connect_error]));
}

if(isset($_GET['id'])) {
    $id = $_GET['id'];
    
    $sql = "SELECT * FROM pesanan WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    
    $result = $stmt->get_result();
    $data = $result->fetch_assoc();
    
    echo json_encode($data);
    
    $stmt->close();
} else {
    echo json_encode(['error' => 'ID tidak ditemukan']);
}

$conn->close();
?>