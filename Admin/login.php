<?php
session_start();
$conn = new mysqli('localhost', 'root', '', 'maskuy');

// Cek koneksi database
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Jika form login disubmit
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['username']); // Menghilangkan spasi tambahan
    $password = md5(trim($_POST['password'])); // Mengenkripsi password dengan MD5

    // Query untuk memeriksa data di tabel admin
    $query = "SELECT * FROM admin WHERE username='$username' AND password='$password'";
    $result = $conn->query($query);

    if ($result->num_rows == 1) {
        // Login berhasil, simpan sesi
        $_SESSION['admin'] = $username;
        header('Location: /Code Maskuy/Kelola Pelanggan/kelola_pelanggan1.html'); // Arahkan ke halaman dashboard
        exit;
    } else {
        // Jika login gagal
        $error_message = "Username atau password salah!";
    }
}

