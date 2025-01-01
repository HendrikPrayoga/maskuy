<?php
header('Content-Type: application/json');

// Koneksi ke database
$host = "localhost";
$user = "maskyid1_maskuy";
$password = "^{(&k#y;IW1@";
$dbname = "maskyid1_maskuy";
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Membuat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);


// Cek koneksi
if ($conn->connect_error) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Koneksi gagal: ' . $conn->connect_error
    ]);
    exit();
}

// Memeriksa apakah data form sudah disubmit
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ambil data dari form
    $nomor_identitas = $_POST['nomor_identitas'];
    $nama_lengkap = $_POST['nama_lengkap'];     // Perbaikan disini
    $nomor_telepon = $_POST['nomor_telepon'];   // Perbaikan disini
    $email = $_POST['email'];

    // Debug: print received data
    error_log("Received data: " . print_r($_POST, true));

    // Query untuk menyimpan data pelanggan
    $sql = "INSERT INTO pesanan (nomor_identitas, nama_lengkap, nomor_telepon, email) 
            VALUES (?, ?, ?, ?)";
            
    // Menggunakan prepared statement untuk keamanan
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Prepare failed: ' . $conn->error
        ]);
        exit();
    }

    $stmt->bind_param("ssss", $nomor_identitas, $nama_lengkap, $nomor_telepon, $email);

    if ($stmt->execute()) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Data berhasil ditambahkan'
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Error: ' . $stmt->error
        ]);
    }

    $stmt->close();
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Method tidak diizinkan'
    ]);
}

$conn->close();
?>