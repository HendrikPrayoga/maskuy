<?php
require_once 'midtrans-config.php';
require_once 'db.php';
require_once 'vendor/autoload.php'
;use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$json = file_get_contents('php://input');
$data = json_decode($json, true);

file_put_contents('webhook-log.txt', date('Y-m-d H:i:s') . " - " . $json . PHP_EOL, FILE_APPEND);

if ($data) {
    $order_id = $data['order_id'] ?? null;
    $status = $data['transaction_status'] ?? null;

    if ($status == 'settlement') {
        $status_payment = 'paid';

        $sql_select = "SELECT * FROM pesanan WHERE midtrans_order_id = ?";
        $stmt_select = $conn->prepare($sql_select);
        $stmt_select->bind_param("s", $order_id);
        $stmt_select->execute();
        $result = $stmt_select->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $buyer_email = $row['email'];
            $buyer_name = $row['nama_lengkap'];
            $telp = $row['nomor_telepon'];
            $no_identitas = $row['nomor_identitas'];
            $jumlah = $row['jumlah'];
            $total = number_format($row['total'], 0, ',', '.');

            $mail = new PHPMailer(true);

            try {
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->Username = 'maskuyy2@gmail.com';
                $mail->Password = 'xydwlggmezbewxpd ';
                $mail->SMTPSecure = 'tls';
                $mail->Port = 587;

                $mail->setFrom('maskuyy2@gmail.com', 'MASKUY');
                $mail->addAddress($buyer_email, $buyer_name);

                $mail->isHTML(true);
                $mail->Subject = 'Pembayaran Berhasil #' . $order_id;
                $mail->Body = "
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f7f7f7;
                        }
                        .email-container {
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: #ffffff;
                            border-radius: 10px;
                            overflow: hidden;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background-color: #007bff;
                            color: #ffffff;
                            text-align: center;
                            padding: 20px;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 24px;
                        }
                        .content {
                            padding: 20px;
                        }
                        .content h2 {
                            margin-top: 0;
                            color: #333333;
                        }
                        .content p {
                            color: #555555;
                        }
                        .table {
                            width: 100%;
                            border-collapse: collapse;
                            margin: 20px 0;
                        }
                        .table th, .table td {
                            text-align: left;
                            padding: 10px;
                            border-bottom: 1px solid #dddddd;
                        }
                        .table th {
                            background-color: #f2f2f2;
                        }
                        .footer {
                            background-color: #f2f2f2;
                            text-align: center;
                            padding: 10px;
                            font-size: 12px;
                            color: #666666;
                        }
                        .btn {
                            display: inline-block;
                            margin-top: 10px;
                            padding: 10px 20px;
                            background-color: #007bff;
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                        .btn:hover {
                            background-color: #0056b3;
                        }
                    </style>
                </head>
                <body>
                    <div class='email-container'>
                        <div class='header'>
                            <h1>Ringkasan Pesanan</h1>
                        </div>
                        <div class='content'>
                            <h2>Invoice #{$order_id}</h2>
                            <p>Halo, <strong>{$buyer_name}</strong>,</p>
                            <table class='table'>
                                <tr>
                                    <th>Nama Lengkap</th>
                                    <th>{$buyer_name}</th>
                                </tr>
                                <tr>
                                    <td>Nomor Identitas</td>
                                    <td>{$no_identitas}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{$buyer_email}</td>
                                </tr>
                                <tr>
                                    <td>Jumlah Tiket</td>
                                    <td>{$jumlah}</td>
                                </tr>
                                <tr>
                                    <td>Subtotal</td>
                                    <td>Rp. 2.000,00</td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td>Rp. {$total},00</td>
                                </tr>
                                <tr>
                                    <td>Metode Pembayaran</td>
                                    <td>QRIS</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td><strong>LUNAS</strong></td>
                                </tr>

                            </table>
                            <H2>Syarat dan Ketentuan</H2>
                            <ul>
                                <li>Tiket ini berlaku hanya pada tanggal yang tertera.</li>
                                <li>Tidak dapat dibatalkan atau ditukar kecuali ada penutupan sementara oleh Taman MasKemambang.</li>
                                <li>Harap simpan tiket ini dengan baik dan tunjukkan saat memasuki area taman</li>
                            </ul>
                        </div>
                        <div class='footer'>
                            &copy; 2024 MASKUY. All rights reserved.
                        </div>
                    </div>
                </body>
                </html>";
                $mail->AltBody = "Thank you for your payment! Your order with ID {$order_id} has been successfully paid.";

                $mail->send();
                file_put_contents('email-log.txt', date('Y-m-d H:i:s') . " - Email sent to {$buyer_email}" . PHP_EOL, FILE_APPEND);
            } catch (Exception $e) {
                file_put_contents('email-error-log.txt', date('Y-m-d H:i:s') . " - Email error: {$mail->ErrorInfo}" . PHP_EOL, FILE_APPEND);
            }
    }
    } elseif ($status == 'expire') {
        $status_payment = 'expired';
    } else {
        $status_payment = $status;
    }

    if ($order_id) {
        $sql = "UPDATE pesanan SET status_payment = ?, webhook_data = ? WHERE midtrans_order_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $status_payment, $json, $order_id);
        $stmt->execute();
    }
}
http_response_code(200);
echo "OK";
?>
