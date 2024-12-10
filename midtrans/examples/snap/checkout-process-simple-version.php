<?php
namespace Midtrans;

require_once dirname(__FILE__) . '/../../Midtrans.php';

// Backend: Process Midtrans Transaction
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Konfigurasi Midtrans
    Config::$serverKey = 'SB-Mid-server-4mCREk3T9j61S92xxfBDhCjX';
    Config::$isProduction = false;
    Config::$isSanitized = true;
    Config::$is3ds = true;

    // Ambil data dari request
    $nama = $_POST['nama_lengkap'];
    $email = $_POST['email'];
    $telepon = $_POST['nomor_telepon'];
    $jumlah = (int)$_POST['jumlah'];
    $harga = (int)$_POST['harga'];

    $transaction_details = [
        'order_id' => 'ORDER-' . rand(),
        'gross_amount' => $jumlah * $harga, // Total harga
    ];

    $item_details = [
        [
            'id' => 'TIKET01',
            'price' => $harga,
            'quantity' => $jumlah,
            'name' => "Tiket Masuk Taman Mas Kemambang"
        ]
    ];

    $customer_details = [
        'first_name' => $nama,
        'email' => $email,
        'phone' => $telepon,
    ];

    $transaction = [
        'transaction_details' => $transaction_details,
        'item_details' => $item_details,
        'customer_details' => $customer_details,
    ];

    try {
        $snap_token = Snap::getSnapToken($transaction);
        echo json_encode(['snap_token' => $snap_token]);
        exit;
    } catch (Exception $e) {
        error_log('Error Midtrans: ' . $e->getMessage()); // Tulis ke log server
        echo json_encode(['error' => $e->getMessage()]);
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beli Tiket Masuk - Maskuy</title>
    <link rel="stylesheet" href="Tiket.css">
</head>

<body>
    <nav>
        <div>
            <img src="/Code Maskuy/MASKUYBlue.png" alt="MASKUY" />
        </div>
        <ul>
            <li><a href="/Code Maskuy/Beranda/Beranda.html">Beranda</a></li>
            <li><a href="/Code Maskuy/Acara/Acara.html">Acara</a></li>
            <li><a href="/Code Maskuy/Jelajah/Jelajah.html">Jelajah</a></li>
            <li><a href="/Code Maskuy/Blog/Blog.html">Blog</a></li>
            <li><a href="/Code Maskuy/Tiket/Tiket.html" class="btn">Beli Sekarang</a></li>
        </ul>
    </nav>

    <main>
        <section class="ticket-section">
            <h2>Beli Tiket Masuk</h2>
            <div class="container">
                <div class="ticket-details">
                    <h3>Tiket Masuk</h3>
                    <p>Harga</p>
                    <p class="price">Rp. 2.000,00</p>
                    <div class="quantity">
                        <button class="btn" onclick="decrement()">-</button>
                        <input type="number" id="jumlah" name="jumlah" value="1" min="1" readonly>
                        <button class="btn" onclick="increment()">+</button>
                    </div>
                </div>

                <div class="order-details">
                    <h3>Rincian Pesanan</h3>
                    <table>
                        <tr>
                            <td>Tiket Masuk Taman Mas Kemambang</td>
                            <td id="jumlahTiket">x1</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td id="total">Rp. 2.000,00</td>
                        </tr>
                    </table>
                </div>

                <div class="order-form">
                    <h3>Data Pemesan</h3>
                    <form id="payment-form" method="POST">
                        <label for="nama">Nama Lengkap *</label>
                        <input type="text" id="nama" name="nama_lengkap" required>

                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required>

                        <label for="telepon">Nomor Telepon *</label>
                        <input type="tel" id="telepon" name="nomor_telepon" required>

                        <input type="hidden" id="jumlah-hidden" name="jumlah" value="1">
                        <input type="hidden" name="harga" value="2000">

                        <button type="button" id="pay-button" class="btn-primary">Bayar</button>
                    </form>
                </div>
            </div>
        </section>
    </main>

    <!-- Midtrans Snap -->
    <script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="SB-Mid-client-drlNHhJOsrZGDQsF"></script>
    <script>
        function updateTotal() {
            const jumlah = document.getElementById('jumlah').value;
            const harga = 2000; // Harga tiket
            const total = jumlah * harga;
            document.getElementById('total').textContent = 'Rp. ' + total.toLocaleString('id-ID');
            document.getElementById('jumlah-hidden').value = jumlah;
            document.getElementById('jumlahTiket').textContent = 'x' + jumlah;
        }

        function increment() {
            const jumlahInput = document.getElementById('jumlah');
            jumlahInput.value = parseInt(jumlahInput.value) + 1;
            updateTotal();
        }

        function decrement() {
            const jumlahInput = document.getElementById('jumlah');
            if (parseInt(jumlahInput.value) > 1) {
                jumlahInput.value = parseInt(jumlahInput.value) - 1;
                updateTotal();
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            updateTotal();
        });

        document.getElementById('pay-button').addEventListener('click', function () {
            const form = document.getElementById('payment-form');
            const formData = new FormData(form);

            fetch('', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.snap_token) {
                        snap.pay(data.snap_token);
                    } else {
                        alert('Terjadi kesalahan: ' + (data.error || 'Unknown error'));
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    </script>
</body>

</html>
