<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Koneksi ke database
$conn = new mysqli('localhost', 'root', '', 'maskuy');

// Cek koneksi
if ($conn->connect_error) {
   error_log("Connection failed: " . $conn->connect_error);
   die(json_encode(['error' => "Koneksi gagal: " . $conn->connect_error]));
}

// Handle GET request untuk mengambil data
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
   $id = filter_var($_GET['id'], FILTER_VALIDATE_INT);
   
   if ($id === false) {
       error_log("Invalid ID format received: " . $_GET['id']);
       die(json_encode(['error' => 'Format ID tidak valid']));
   }
   
   $sql = "SELECT * FROM pesanan WHERE id = ?";
   $stmt = $conn->prepare($sql);
   
   if (!$stmt) {
       error_log("Prepare failed: " . $conn->error);
       die(json_encode(['error' => 'Prepare statement error: ' . $conn->error]));
   }
   
   $stmt->bind_param("i", $id);
   
   if (!$stmt->execute()) {
       error_log("Execute failed: " . $stmt->error);
       die(json_encode(['error' => 'Execute error: ' . $stmt->error]));
   }
   
   $result = $stmt->get_result();
   $row = $result->fetch_assoc();
   
   if (!$row) {
       error_log("No data found for ID: $id");
       echo json_encode(['error' => 'Data tidak ditemukan']);
   } else {
       echo json_encode($row);
   }
   
   $stmt->close();
}

// Handle POST request untuk update data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   // Debug: Log data yang diterima
   error_log("POST Data received: " . print_r($_POST, true));
   
   // Validasi keberadaan input
   if (!isset($_POST['id']) || !isset($_POST['nomor_identitas']) || 
       !isset($_POST['nama_lengkap']) || !isset($_POST['jumlah'])) {
       error_log("Missing required fields");
       die(json_encode(['error' => 'Data tidak lengkap']));
   }

   // Sanitasi dan validasi input
   $id = filter_var($_POST['id'], FILTER_VALIDATE_INT);
   // Ganti FILTER_SANITIZE_STRING dengan htmlspecialchars
   $nomor_identitas = htmlspecialchars(trim($_POST['nomor_identitas']), ENT_QUOTES, 'UTF-8');
   $nama_lengkap = htmlspecialchars(trim($_POST['nama_lengkap']), ENT_QUOTES, 'UTF-8');
   $jumlah = filter_var($_POST['jumlah'], FILTER_VALIDATE_INT);

   // Validasi hasil sanitasi
   if ($id === false || $jumlah === false) {
       error_log("Validation failed: ID=$id, Jumlah=$jumlah");
       die(json_encode(['error' => 'Format data tidak valid']));
   }

   // Validasi tambahan
   if (empty($nomor_identitas) || empty($nama_lengkap)) {
       error_log("Empty required fields after sanitization");
       die(json_encode(['error' => 'Data tidak boleh kosong']));
   }

   // Hitung total
   $harga = 2000.00;
   $total = $jumlah * $harga;

   // Debug: Log data yang akan diupdate
   error_log("Data to update: ID=$id, Nomor=$nomor_identitas, Nama=$nama_lengkap, Jumlah=$jumlah, Total=$total");

   $sql = "UPDATE pesanan SET 
           nomor_identitas = ?, 
           nama_lengkap = ?, 
           jumlah = ?,
           total = ?
           WHERE id = ?";
           
   $stmt = $conn->prepare($sql);
   
   if (!$stmt) {
       error_log("Prepare failed: " . $conn->error);
       die(json_encode(['error' => 'Prepare statement error: ' . $conn->error]));
   }

   $stmt->bind_param("ssidi", 
       $nomor_identitas,
       $nama_lengkap,
       $jumlah,
       $total,
       $id
   );

   if ($stmt->execute()) {
       if ($stmt->affected_rows > 0) {
           $response = [
               'success' => true, 
               'message' => 'Data berhasil diperbarui',
               'data' => [
                   'id' => $id,
                   'nomor_identitas' => $nomor_identitas,
                   'nama_lengkap' => $nama_lengkap,
                   'jumlah' => $jumlah,
                   'total' => $total
               ]
           ];
           echo json_encode($response);
       } else {
           echo json_encode([
               'error' => 'Tidak ada data yang diupdate',
               'debug' => [
                   'id' => $id,
                   'affected_rows' => $stmt->affected_rows
               ]
           ]);
       }
   } else {
       echo json_encode([
           'error' => 'Error updating data: ' . $stmt->error,
           'sqlstate' => $stmt->sqlstate
       ]);
   }
   
   $stmt->close();
}

$conn->close();
?>