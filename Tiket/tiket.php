<?php
require_once '../midtrans-config.php';
require_once '../db.php';

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nama_lengkap = $_POST['nama_lengkap'];
    $nomor_identitas = $_POST['nomor_identitas'];
    $nomor_telepon = $_POST['nomor_telepon'];
    $email = $_POST['email'];
    $jumlah = intval($_POST['jumlah']);
    $harga = intval($_POST['harga']);
    $total = $jumlah * $harga;

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format");
    }

    if ($jumlah <= 0 || $harga <= 0) {
        die("Jumlah dan harga harus lebih besar dari nol");
    }

    $sql = "INSERT INTO pesanan (nama_lengkap, nomor_identitas, nomor_telepon, email, jumlah, harga, total, status_payment, midtrans_order_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'unpaid', ?)";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        die("Error preparing statement: " . $conn->error);
    }
    $order_id = null;
    $stmt->bind_param("ssssiiis", $nama_lengkap, $nomor_identitas, $nomor_telepon, $email, $jumlah, $harga, $total, $order_id);
    if (!$stmt->execute()) {
        die("Error executing statement: " . $stmt->error);
    }
    $order_id = $conn->insert_id;

    $transaction_details = [
        'order_id' => "ORDER-$order_id",
        'gross_amount' => $total,
    ];

    $customer_details = [
        'first_name' => $nama_lengkap,
        'email' => $email,
        'phone' => $nomor_telepon,
    ];

    $transaction = [
        'transaction_details' => $transaction_details,
        'customer_details' => $customer_details,
    ];

    $snapToken = \Midtrans\Snap::getSnapToken($transaction);
    if (!$snapToken) {
        die("Failed to generate Snap Token");
    }

    $sql_update = "UPDATE pesanan SET payment_token = ?, payment_url = ?, midtrans_order_id = ? WHERE id = ?";
    $stmt_update = $conn->prepare($sql_update);
    if ($stmt_update === false) {
        die("Error preparing update statement: " . $conn->error);
    }

    $payment_url = "https://app.sandbox.midtrans.com/snap/v2/vtweb/$snapToken";
    $stmt_update->bind_param("sssi", $snapToken, $payment_url, $transaction_details['order_id'], $order_id);
    if (!$stmt_update->execute()) {
        die("Error executing update statement: " . $stmt_update->error);
    }

    header("Location: $payment_url");
    exit();
}
?>
