-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 17 Nov 2024 pada 15.32
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `maskuy`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', '5f4dcc3b5aa765d61d8327deb882cf99'),
(2, 'admin', '202cb962ac59075b964b07152d234b70');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pesanan`
--

CREATE TABLE `pesanan` (
  `id` int(11) NOT NULL,
  `nama_lengkap` varchar(100) NOT NULL,
  `nomor_identitas` varchar(50) NOT NULL,
  `nomor_telepon` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nama_tiket` varchar(100) DEFAULT 'Tiket Masuk Taman Mas Kemambang',
  `jumlah` int(11) DEFAULT 1,
  `harga` decimal(10,2) DEFAULT 2000.00,
  `total` decimal(10,2) GENERATED ALWAYS AS (`harga` * `jumlah`) VIRTUAL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pesanan`
--

INSERT INTO `pesanan` (`id`, `nama_lengkap`, `nomor_identitas`, `nomor_telepon`, `email`, `nama_tiket`, `jumlah`, `harga`) VALUES
(1002, 'aad', '22222222222', '0852626626', 'arifyeyo5@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 6, 2000.00),
(1010, 'arif', '33333333332', '081323455432', 'sikusiku@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 3, 2000.00),
(1011, 'Arif Pramudia Wardana', '33333333332', '085642288970', 'riskisofi2222@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 7, 2000.00),
(1012, 'arif', '33333333332', '081323455432', 'arifslebew@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 4, 2000.00),
(1013, 'arif', '33333333332', '081323455432', 'arifslebew@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1014, 'ariff', '33333333338', '081323455433', 'arifslebew@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 4, 2000.00),
(1015, 'arif', '33333333332', '08564228865', 'riskisofi2222@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 4, 2000.00),
(1016, 'arif', '33333333382', '', '', 'Tiket Masuk Taman Mas Kemambang', 7, 2000.00);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1017;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
