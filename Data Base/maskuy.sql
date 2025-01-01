-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 13, 2024 at 03:17 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', '5f4dcc3b5aa765d61d8327deb882cf99'),
(2, 'admin', '202cb962ac59075b964b07152d234b70');

-- --------------------------------------------------------

--
-- Table structure for table `pesanan`
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
-- Dumping data for table `pesanan`
--

INSERT INTO `pesanan` (`id`, `nama_lengkap`, `nomor_identitas`, `nomor_telepon`, `email`, `nama_tiket`, `jumlah`, `harga`) VALUES
(1002, 'aaw', '22222222212', '0852626626', 'arifyeyo6@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 10, 2000.00),
(1010, 'arif', '33333333332', '081323455432', 'sikusiku@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 3, 2000.00),
(1011, 'Arif Pramudia Wardana', '33333333332', '085642288970', 'riskisofi2222@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 6, 2000.00),
(1012, 'arif', '33333333332', '081323455432', 'arifslebew@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 4, 2000.00),
(1013, 'arif', '33333333332', '081323455432', 'arifslebew@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1014, 'ariff', '33333333338', '081323455433', 'arifslebew@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 4, 2000.00),
(1017, 'aad', '22222222222', '0852626626', 'riskisofi2222@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1018, 'ariff', '33333333332', '081323455433', 'arifslebew@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1019, 'ariff', '33333333332', '081323455433', 'arifslebew@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1020, 'ariff', '33333333332', '081323455433', 'arifslebew1@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1023, 'aaraaaa', '22222222211', '086745255254', 'arruri@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 14, 2000.00),
(1024, 'aurururu', '272727378381', '0987765544333', 'riski@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1025, 'aururury', '272727378381', '0987765544333', 'riski@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1026, 'aad', '22222222222', '08526266263', 'arifyeyo5@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1027, 'aade', '22222222222', '08526266263', 'ajhdhhsahd@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1028, 'aade', '22222222222', '08526266263', 'ajhdhhsahd@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1029, 'aade', '22222222223', '0852626626', 'ajhdhhsahd@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1030, 'aad', '22222222223', '0852626626', 'arifyyo6@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 11, 2000.00),
(1031, 'aad', '2323328283', '0852626626', 'arruru@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1032, 'aad', '2323328283', '0852626626', 'arruru@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1033, 'Arif Pramudia Wardana', '222222222222', '085642288970', 'riskisoi2222@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1034, 'Arif Pramudia Wardana', '222222222222', '085642288970', 'riskisoi2222@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1035, 'adadadadad', '2323328283', '0852626626', 'arruru@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1036, 'adadadadad', '22222222211', '0852626626', 'arruri@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1037, 'adadadadad', '2323328283', '0852626626', 'arruru@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1038, 'adadadadad', '2323328283', '0852626626', 'arruru@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1039, 'aade', '22222222223', '08526266263', 'adadaa@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 7, 2000.00),
(1040, 'usus', '22222222223', '0852626626', 'adad1@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 15, 2000.00),
(1041, 'aassyy', '22222222211', '087732662617', 'riski@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1042, 'aassyy', '22222222211', '087732662617', 'riski@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1043, 'aasa', '22222222211', '087732662617', 'riskia@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00),
(1044, 'aasa', '22222222211', '087732662617', 'riskia@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 3, 2000.00),
(1045, 'aaw', '22222222212', '087732662617', 'gegege@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 8, 2000.00),
(1046, 'Muhammad Fikri Fauzi', '2211102139', '0895424002789', 'fikrifauzi227@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 3, 2000.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1047;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
