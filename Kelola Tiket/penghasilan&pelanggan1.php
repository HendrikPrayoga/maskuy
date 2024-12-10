<?php
// penghasilan_pelanggan.php

header('Content-Type: application/json');

try {
    // Database connection
    $host = 'localhost';
    $user = 'root';
    $password = '';
    $database = 'maskuy';

    $conn = new mysqli($host, $user, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Query to get total tickets sold and total income
    $query = "SELECT 
        COALESCE(SUM(jumlah), 0) as total_pelanggan,
        COALESCE(SUM(harga * jumlah), 0) as total_penghasilan 
        FROM pesanan 
        WHERE nama_tiket IS NOT NULL";
    
    $result = $conn->query($query);

    if (!$result) {
        throw new Exception("Query failed: " . $conn->error);
    }

    $data = $result->fetch_assoc();
    
    // Ensure we always return numbers, not null
    $response = [
        'total_pelanggan' => intval($data['total_pelanggan']),
        'total_penghasilan' => floatval($data['total_penghasilan'])
    ];

    echo json_encode($response);

} catch (Exception $e) {
    // Return error response
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage(),
        'total_pelanggan' => 0,
        'total_penghasilan' => 0
    ]);
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}