<?php
session_start();
$conn = new mysqli('localhost', 'wish4675_maskuy', 's+]akH]#%)vy', 'wish4675_maskuy');

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Koneksi gagal: ' . $conn->connect_error]);
    exit;
}

header('Content-Type: application/json');

if(isset($_SESSION['admin'])) {
    $username = $_SESSION['admin'];
    
    // Gunakan prepared statement untuk keamanan
    $query = "SELECT username FROM admin WHERE username=?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        $admin = $result->fetch_assoc();
        echo json_encode(['success' => true, 'data' => $admin]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error fetching data']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
}

$conn->close();
?>