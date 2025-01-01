<?php
header('Content-Type: application/json');

// Koneksi database
$conn = new mysqli('localhost', 'wish4675_maskuy', 's+]akH]#%)vy', 'wish4675_maskuy');
if ($conn->connect_error) {
    echo json_encode([
        'success' => false,
        'message' => "Koneksi database gagal: " . $conn->connect_error
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Ambil data dari form
        $id = $_POST['kode_tiket'];
        $nama_lengkap = $_POST['nama_lengkap'];
        $nomor_identitas = $_POST['no_identitas'];
        $jumlah = isset($_POST['jumlah']) ? (int)$_POST['jumlah'] : 1;
        $total = isset($_POST['total']) ? (float)$_POST['total'] : ($jumlah * 2000.00);
        $nama_tiket = "Tiket Masuk Taman Mas Kemambang";

        // Cek duplikat kode tiket
        $check = $conn->prepare("SELECT id FROM pesanan WHERE id = ?");
        $check->bind_param("s", $id);
        $check->execute();
        
        if ($check->get_result()->num_rows > 0) {
            echo json_encode([
                'success' => false,
                'message' => "Kode tiket $id sudah digunakan. Silakan gunakan kode tiket lain."
            ]);
            $check->close();
            $conn->close();
            exit;
        }
        $check->close();

        // Insert data baru
        $stmt = $conn->prepare("INSERT INTO pesanan (id, nama_lengkap, nomor_identitas, jumlah, total, nama_tiket) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssids", $id, $nama_lengkap, $nomor_identitas, $jumlah, $total, $nama_tiket);
        
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Data berhasil ditambahkan'
            ]);
        } else {
            throw new Exception($stmt->error);
        }
        
        $stmt->close();
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => "Error: " . $e->getMessage()
        ]);
    }
    
    $conn->close();
} else {
    echo json_encode([
        'success' => false,
        'message' => "Method tidak valid"
    ]);
}
?>