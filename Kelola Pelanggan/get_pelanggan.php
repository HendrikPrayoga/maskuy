<?php
header('Content-Type: application/json');

// Koneksi database
ini_set('display_errors', 1);
error_reporting(E_ALL);
$conn = new mysqli('localhost', 'wish4675_maskuy', 's+]akH]#%)vy', 'wish4675_maskuy');

if ($conn->connect_error) {
    die(json_encode(['error' => "Koneksi gagal: " . $conn->connect_error]));
}

if(isset($_GET['id'])) {
    $id = $_GET['id'];
    
    // Prepared statement untuk keamanan
    $sql = "SELECT * FROM pesanan WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    
    $result = $stmt->get_result();
    $data = $result->fetch_assoc();
    
    if($data) {
        echo json_encode($data);
    } else {
        echo json_encode(['error' => 'Data tidak ditemukan']);
    }
    
    $stmt->close();
} else {
    echo json_encode(['error' => 'ID tidak ditemukan']);
}

$conn->close();
?>