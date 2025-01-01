<?php
session_start();
$conn = new mysqli('localhost', 'wish4675_maskuy', 's+]akH]#%)vy', 'wish4675_maskuy');

// Cek koneksi database
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Jika form login disubmit
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['username']);
    $password = md5(trim($_POST['password']));

    // Query untuk memeriksa data di tabel admin
    $query = "SELECT * FROM admin WHERE username=? AND password=?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        // Login berhasil
        $_SESSION['admin'] = $username;
        header('Location: ../Kelola Pelanggan/kelola_pelanggan.html');
        exit;
    } else {
        // Login gagal, redirect dengan parameter error
        header('Location: admin.html?error=1');
        exit;
    }
}

$conn->close();
?>
