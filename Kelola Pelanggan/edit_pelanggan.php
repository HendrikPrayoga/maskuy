<?php
header('Content-Type: application/json'); // Untuk memastikan response dalam format JSON

// Koneksi database
$conn = new mysqli('localhost', 'root', '', 'maskuy');

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => "Koneksi gagal: " . $conn->connect_error]));
}

// Proses update data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validasi input
    if (!isset($_POST['id']) || !isset($_POST['nomor_identitas']) || 
        !isset($_POST['nama_lengkap']) || !isset($_POST['nomor_telepon']) || 
        !isset($_POST['email_pelanggan'])) {
        die(json_encode(['status' => 'error', 'message' => 'Data tidak lengkap']));
    }

    $id = $_POST['id'];
    $nomor_identitas = $_POST['nomor_identitas'];
    $nama_lengkap = $_POST['nama_lengkap'];
    $nomor_telepon = $_POST['nomor_telepon'];
    $email = $_POST['email_pelanggan'];

    // Prepared statement untuk update
    $sql = "UPDATE pesanan SET 
            nomor_identitas = ?, 
            nama_lengkap = ?, 
            nomor_telepon = ?, 
            email = ? 
            WHERE id = ?";
            
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        die(json_encode(['status' => 'error', 'message' => 'Gagal mempersiapkan query: ' . $conn->error]));
    }

    $stmt->bind_param("ssssi", 
        $nomor_identitas, 
        $nama_lengkap, 
        $nomor_telepon, 
        $email, 
        $id
    );
    
    if ($stmt->execute()) {
        $response = [
            'status' => 'success',
            'message' => 'Data berhasil diperbarui',
            'data' => [
                'id' => $id,
                'nomor_identitas' => $nomor_identitas,
                'nama_lengkap' => $nama_lengkap,
                'nomor_telepon' => $nomor_telepon,
                'email' => $email
            ]
        ];
        echo json_encode($response);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Gagal memperbarui data: ' . $stmt->error
        ]);
    }
    
    $stmt->close();
}
// Jika method bukan POST
else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    // Ambil data untuk ditampilkan di form
    $id = $_GET['id'];
    
    $sql = "SELECT * FROM pesanan WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    
    $result = $stmt->get_result();
    $data = $result->fetch_assoc();
    
    if ($data) {
        echo json_encode([
            'status' => 'success',
            'data' => $data
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Data tidak ditemukan'
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