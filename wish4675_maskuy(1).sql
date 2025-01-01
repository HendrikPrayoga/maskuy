-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 24, 2024 at 05:53 PM
-- Server version: 10.5.27-MariaDB-cll-lve
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wish4675_maskuy`
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
  `total` decimal(10,2) GENERATED ALWAYS AS (`harga` * `jumlah`) VIRTUAL,
  `status_payment` varchar(50) NOT NULL DEFAULT 'unpaid',
  `midtrans_order_id` varchar(100) DEFAULT NULL,
  `payment_token` text NOT NULL,
  `payment_url` text NOT NULL,
  `webhook_data` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pesanan`
--

INSERT INTO `pesanan` (`id`, `nama_lengkap`, `nomor_identitas`, `nomor_telepon`, `email`, `nama_tiket`, `jumlah`, `harga`, `status_payment`, `midtrans_order_id`, `payment_token`, `payment_url`, `webhook_data`) VALUES
(1046, 'Cupidatat in porro c', '33333333332', '+1 (787) 543-68', 'megocu@mailinator.com', 'Tiket Masuk Taman Mas Kemambang', 5, 2000.00, 'paid', 'ORDER-1046', '3a4ec1d0-037f-48e3-a152-940b9449fb4b', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/3a4ec1d0-037f-48e3-a152-940b9449fb4b', '{\"transaction_type\":\"on-us\",\"transaction_time\":\"2024-12-16 22:27:10\",\"transaction_status\":\"settlement\",\"transaction_id\":\"01663169-881b-4666-a2aa-798d8ed8badb\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"200\",\"signature_key\":\"0ccdd1850b21fa3b35b3e979f153861a5d9fa66b5fdb755c333c339e265003383477347429dd6831ee18944502d12433e50ff1862f25746924de5889d14fa64e\",\"settlement_time\":\"2024-12-16 22:27:18\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1046\",\"merchant_id\":\"G272242473\",\"issuer\":\"gopay\",\"gross_amount\":\"10000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-16 22:42:10\",\"currency\":\"IDR\",\"acquirer\":\"gopay\"}'),
(1047, 'Rerum in fugit eos', 'Vel nihil non ration', '+1 (444) 684-40', 'dydafus@mailinator.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00, 'paid', 'ORDER-1047', '3f187969-dac7-460e-9802-84e94b93291c', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/3f187969-dac7-460e-9802-84e94b93291c', '{\"transaction_type\":\"on-us\",\"transaction_time\":\"2024-12-16 22:30:25\",\"transaction_status\":\"settlement\",\"transaction_id\":\"820f6df7-d369-4e8c-8f9a-48d0be685fed\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"200\",\"signature_key\":\"3b1fd42fd0c059b4059c0b8063e8a4d76bf9a5a53f4c06b166356fb67de490300af2450d64feb4f4ce53f0e8a1ff3559932f8c5a106f5aa0b89a95779856257f\",\"settlement_time\":\"2024-12-16 22:30:34\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1047\",\"merchant_id\":\"G272242473\",\"issuer\":\"gopay\",\"gross_amount\":\"2000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-16 22:45:25\",\"currency\":\"IDR\",\"acquirer\":\"gopay\"}'),
(1048, 'Consequatur Dolore ', 'Neque est consectet', '+1 (894) 932-80', 'mufupama@mailinator.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00, 'paid', 'ORDER-1048', 'f03c0643-6a43-4c5d-a3ce-f88cd8d8b32c', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/f03c0643-6a43-4c5d-a3ce-f88cd8d8b32c', '{\"transaction_type\":\"on-us\",\"transaction_time\":\"2024-12-16 22:35:39\",\"transaction_status\":\"settlement\",\"transaction_id\":\"b183c307-67f5-4be9-8d97-1e1d72fef32a\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"200\",\"signature_key\":\"f9defe43f34f3c241588850e93ed518d74e69771f66aa2de9d4fb9b1d3fba0533971c8a98c37072ca14aece689fcd4f12281d4fdc4e223dedbca81b07f639f9d\",\"settlement_time\":\"2024-12-16 22:35:48\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1048\",\"merchant_id\":\"G272242473\",\"issuer\":\"gopay\",\"gross_amount\":\"2000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-16 22:50:39\",\"currency\":\"IDR\",\"acquirer\":\"gopay\"}'),
(1049, 'Laboriosam quidem p', 'Modi eos iure pariat', '+1 (993) 701-37', 'likyvez@mailinator.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00, 'paid', 'ORDER-1049', '4d99ab15-5271-4b9f-bef0-7bb9b8b3cb4c', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/4d99ab15-5271-4b9f-bef0-7bb9b8b3cb4c', '{\"transaction_type\":\"on-us\",\"transaction_time\":\"2024-12-16 22:46:51\",\"transaction_status\":\"settlement\",\"transaction_id\":\"b7f0f128-eaaf-4ba7-b558-bd27e5b79c44\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"200\",\"signature_key\":\"ee7be6dc414d10d24216c2c3461148a1a9b2d73da1656e1a3c5d8604ed0975b898783c670e76c90a171780b6336da58ec937dd071bc22f05cc20c92a0562a392\",\"settlement_time\":\"2024-12-16 22:46:58\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1049\",\"merchant_id\":\"G272242473\",\"issuer\":\"gopay\",\"gross_amount\":\"2000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-16 23:01:51\",\"currency\":\"IDR\",\"acquirer\":\"gopay\"}'),
(1050, 'Fendhi', '28229', '08523456984651', 'fendimaulam9@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00, 'expired', 'ORDER-1050', 'e129948a-e8fb-476d-be04-54bce283a33a', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/e129948a-e8fb-476d-be04-54bce283a33a', '{\"transaction_type\":\"off-us\",\"transaction_time\":\"2024-12-17 09:33:17\",\"transaction_status\":\"expire\",\"transaction_id\":\"f519bd90-9eda-47d1-a414-d26bde97f057\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"202\",\"signature_key\":\"755208527de917e291acba1fdad38305ffad4d696b3004a190f5aa4b32af224de797a6290c10ace3dcac873b25736adc12487d01bf127943ed2043fcb0f8001c\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1050\",\"merchant_id\":\"G272242473\",\"gross_amount\":\"2000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-17 09:48:17\",\"currency\":\"IDR\"}'),
(1051, 'Arif Pramudia Wardana', '222222222222', '085642288970', 'riskisofi2222@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 4, 2000.00, 'expired', 'ORDER-1051', '8cd870da-630e-4ffe-baa9-2c69599af2ab', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/8cd870da-630e-4ffe-baa9-2c69599af2ab', '{\"transaction_type\":\"off-us\",\"transaction_time\":\"2024-12-17 10:18:08\",\"transaction_status\":\"expire\",\"transaction_id\":\"6877f202-4493-4125-9171-308ce50bc666\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"202\",\"signature_key\":\"2aeb8238dca91483dfe6cfbc3cf8a520fc95881c9eaa81299b14ad49d80d1550a30af2c883a1834c8a47ad579ce40597aa6de2f093b42ded7c2cc1b01590c133\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1051\",\"merchant_id\":\"G272242473\",\"gross_amount\":\"8000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-17 10:33:08\",\"currency\":\"IDR\"}'),
(1052, 'Arif Pramudia Wardana', '222222222222', '085642288970', 'riskisofi2222@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00, 'expired', 'ORDER-1052', 'dc835034-ad3a-4a35-9aed-c8e1415a2f43', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/dc835034-ad3a-4a35-9aed-c8e1415a2f43', '{\"transaction_type\":\"off-us\",\"transaction_time\":\"2024-12-17 10:18:27\",\"transaction_status\":\"expire\",\"transaction_id\":\"2efa6318-4ed1-41f4-a22a-044a3134981d\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"202\",\"signature_key\":\"d4b91c3032d8c790660a6ad5cc7a6d8995531a460484eac017fe21b1c571aa6f3b920a88e8c84b5439e1ae9b730fc6c41a8548ca7b136bf2ba380b5ad621d870\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1052\",\"merchant_id\":\"G272242473\",\"gross_amount\":\"2000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-17 10:33:27\",\"currency\":\"IDR\"}'),
(1053, 'Arif Pramudia Wardana', '222222222222', '085642288970', 'riskisofi2222@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00, 'expired', 'ORDER-1053', '8b71269d-79b2-4314-9e1b-ffac51fe8864', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/8b71269d-79b2-4314-9e1b-ffac51fe8864', '{\"transaction_type\":\"off-us\",\"transaction_time\":\"2024-12-17 10:18:40\",\"transaction_status\":\"expire\",\"transaction_id\":\"e9c5cda7-9470-4d1f-88ee-79f8ee95de58\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"202\",\"signature_key\":\"a8c495f9260055a0e23b9dbdce44761f771c3d7218b5fb549d2be253be4eff7544f332e994932118de1f14cfd696f07dce62acbdd863352d20539055803ba4d0\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1053\",\"merchant_id\":\"G272242473\",\"gross_amount\":\"2000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-17 10:33:40\",\"currency\":\"IDR\"}'),
(1054, 'Arif Pramudia Wardana', '222222222222', '085642288970', 'riskisofi2222@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 2, 2000.00, 'expired', 'ORDER-1054', '21079ad8-7462-4311-bca5-e0621ee802fa', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/21079ad8-7462-4311-bca5-e0621ee802fa', '{\"transaction_type\":\"off-us\",\"transaction_time\":\"2024-12-17 10:22:42\",\"transaction_status\":\"expire\",\"transaction_id\":\"5316c774-9b24-4ae2-b15c-0f97566ca884\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"202\",\"signature_key\":\"13a229658d2cb6094b8512ac6dad22c9be04767e406bc9dc7911ea79e340e1c849415d6d54d5281c99f97b99009a5a757bb9fc47698eacff8b313932ed307f78\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1054\",\"merchant_id\":\"G272242473\",\"gross_amount\":\"4000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-17 10:37:42\",\"currency\":\"IDR\"}'),
(1055, 'Hatta Rajasa', '22222222232', '085421635721', 'haraja682@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 5, 2000.00, 'expired', 'ORDER-1055', 'eb6e34fd-9af9-4e5c-bcdf-169728220e92', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/eb6e34fd-9af9-4e5c-bcdf-169728220e92', '{\"transaction_type\":\"off-us\",\"transaction_time\":\"2024-12-17 10:33:11\",\"transaction_status\":\"expire\",\"transaction_id\":\"e2e63df8-fabd-40f2-890a-184160699a5f\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"202\",\"signature_key\":\"0dad28a010aa0548561339d38140a908bcef83db4e297cf096a2244479f11722dba56deea823a687fa96eef743e871b84364653667ae30f2e075ee6c1ccb654d\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1055\",\"merchant_id\":\"G272242473\",\"gross_amount\":\"10000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-17 10:48:11\",\"currency\":\"IDR\"}'),
(1056, 'Hatta Rajasa', '22222222232', '085421635721', 'haraja682@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00, 'expired', 'ORDER-1056', '1067f2a7-e6a0-4a1e-b5eb-99cdcd931eca', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/1067f2a7-e6a0-4a1e-b5eb-99cdcd931eca', '{\"transaction_type\":\"off-us\",\"transaction_time\":\"2024-12-17 10:33:45\",\"transaction_status\":\"expire\",\"transaction_id\":\"d13a120e-d6c8-4874-8069-849c2df6ef76\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"202\",\"signature_key\":\"6ecfd0d1d591ee28ab985220379401e09e8dbe5aaf7c12fe58b669557af1e73dcb9329cfa3f60ab8fd6e6485ad9a59a29942c75701bdf2516aab3044393b9345\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1056\",\"merchant_id\":\"G272242473\",\"gross_amount\":\"2000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-17 10:48:45\",\"currency\":\"IDR\"}'),
(1057, 'Asep asir mangkualam', '8274821481248142', '09282313142', 'asepmangkualam@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 50, 2000.00, 'expired', 'ORDER-1057', '6499ceff-6db9-4b4d-8e97-89e744147e99', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/6499ceff-6db9-4b4d-8e97-89e744147e99', '{\"transaction_type\":\"off-us\",\"transaction_time\":\"2024-12-17 11:19:42\",\"transaction_status\":\"expire\",\"transaction_id\":\"15ef1609-8077-4c10-9787-5d3705e969cb\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"202\",\"signature_key\":\"3d7eed7f92c232be5a6c65533cacaf1293a5ccdf4ac8b37e3e2fbd820c6cecb3151024bda1e9a590191301b870198520febda2e3e704e51553a0855cb4c60119\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1057\",\"merchant_id\":\"G272242473\",\"gross_amount\":\"100000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-17 11:34:42\",\"currency\":\"IDR\"}'),
(1058, 'affafs', '22222222222', '085642177161', 'nama@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 3, 2000.00, 'expired', 'ORDER-1058', 'ad154628-ab01-4531-9669-578752b56eca', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/ad154628-ab01-4531-9669-578752b56eca', '{\"transaction_type\":\"off-us\",\"transaction_time\":\"2024-12-17 11:50:46\",\"transaction_status\":\"expire\",\"transaction_id\":\"7413b248-7ca1-48c3-b756-d133afc03987\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"202\",\"signature_key\":\"512d8d4923a86b10fff34b846458f0cbb6ca587f30c87cda228bdd6770a81acf9e738d0a38f1facf1cefc0a1810073dc196ca4f28a977efef3db2d5703860609\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1058\",\"merchant_id\":\"G272242473\",\"gross_amount\":\"6000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-17 12:05:46\",\"currency\":\"IDR\"}'),
(1059, 'affafs', '22222222222', '085642177161', 'nama@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 3, 2000.00, 'paid', 'ORDER-1059', 'dfec1c72-e863-40e5-932d-ef1bfcd18398', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/dfec1c72-e863-40e5-932d-ef1bfcd18398', '{\"transaction_type\":\"on-us\",\"transaction_time\":\"2024-12-17 11:51:12\",\"transaction_status\":\"settlement\",\"transaction_id\":\"0e75a823-c975-4581-86b4-585d9e3c8049\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"200\",\"signature_key\":\"9680445c50fc32d39a08fe68f4fdb2208e2ddfcbd45743c712ac8bb322ef8055695f3ceff25bffc3ef143f13c62bcc8d249fc512daff851d75c7618cf89d10be\",\"settlement_time\":\"2024-12-17 11:51:55\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1059\",\"merchant_id\":\"G272242473\",\"issuer\":\"gopay\",\"gross_amount\":\"6000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-17 12:06:12\",\"currency\":\"IDR\",\"acquirer\":\"gopay\"}'),
(1060, 'Arif Pramudia', '22222222222', '085642313316', 'ajhdhhsahd@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 2, 2000.00, 'expired', 'ORDER-1060', '5e952855-6a25-44ce-bbd1-713f758a5ce0', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/5e952855-6a25-44ce-bbd1-713f758a5ce0', '{\"transaction_type\":\"off-us\",\"transaction_time\":\"2024-12-17 11:56:04\",\"transaction_status\":\"expire\",\"transaction_id\":\"ee333b19-8849-4948-b084-9c4987fdfd9f\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"202\",\"signature_key\":\"56016368bbb56b9489c6418b2e0d9f6774eecbd871a491f5e36c7b4752ab8c3e40fc12fcdf71f3b5fa3cd9bd83c030e80283384d07d436e00acff5b4a7805aa3\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1060\",\"merchant_id\":\"G272242473\",\"gross_amount\":\"4000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-17 12:11:04\",\"currency\":\"IDR\"}'),
(1061, 'Arif Pramudiaa', '22222222222', '08526266263', 'dede@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 2, 2000.00, 'paid', 'ORDER-1061', '56944cee-e288-445f-93d8-758c6d7d2d5e', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/56944cee-e288-445f-93d8-758c6d7d2d5e', '{\"transaction_type\":\"on-us\",\"transaction_time\":\"2024-12-17 14:04:49\",\"transaction_status\":\"settlement\",\"transaction_id\":\"69d0ba66-7802-447a-957c-be5b07b70820\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"200\",\"signature_key\":\"451e3400774e5b1c3f5e9e18bd100da67d86e56a60e3e0c299e2cb6634d78699b7d04a8860903c6e02904e45914137735506c3bb6ddb78a0e87f31c6800a8334\",\"settlement_time\":\"2024-12-17 14:05:03\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1061\",\"merchant_id\":\"G272242473\",\"issuer\":\"gopay\",\"gross_amount\":\"4000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-17 14:19:49\",\"currency\":\"IDR\",\"acquirer\":\"gopay\"}'),
(1062, 'Suwiwi', '1234567', '088214910467', 'riftiandimas27@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 4, 2000.00, 'paid', 'ORDER-1062', '7cc3cf03-9a9d-4266-a398-f1523cb84cdb', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/7cc3cf03-9a9d-4266-a398-f1523cb84cdb', '{\"transaction_type\":\"off-us\",\"transaction_time\":\"2024-12-17 17:20:54\",\"transaction_status\":\"settlement\",\"transaction_id\":\"bff519e8-773e-4d19-9c14-baeaf920211e\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"200\",\"signature_key\":\"e11da4bab417ef49f888a937309637763470a925258766ad95fae2eab978be1b0978d3e2ef4c9dedf3988296bb32d4bec85cb626b2d3ca7d371baa574fefe19e\",\"settlement_time\":\"2024-12-17 17:24:25\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1062\",\"merchant_id\":\"G272242473\",\"issuer\":\"dana\",\"gross_amount\":\"8000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-17 17:35:54\",\"currency\":\"IDR\",\"acquirer\":\"gopay\"}'),
(1063, 'Atta', '63839264834846', '08821635813', 'ddddd@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 10, 2000.00, 'paid', 'ORDER-1063', 'b7b47a13-1f07-41d3-9a65-075f9ee10527', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/b7b47a13-1f07-41d3-9a65-075f9ee10527', '{\"transaction_type\":\"off-us\",\"transaction_time\":\"2024-12-17 17:31:05\",\"transaction_status\":\"settlement\",\"transaction_id\":\"e18e083d-64c4-472b-a3ec-2dab9e6641ea\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"200\",\"signature_key\":\"871ad4b4456d4d338632a812b16841a2319d7e6b27586d75aff469858282f83b79ccaf5309731036660deff2769580c3857a8d0f9de100889edcdd8a0dfe151c\",\"settlement_time\":\"2024-12-17 17:31:24\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1063\",\"merchant_id\":\"G272242473\",\"issuer\":\"ovo\",\"gross_amount\":\"20000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-17 17:46:05\",\"currency\":\"IDR\",\"acquirer\":\"gopay\"}'),
(1064, 'arip', '12345678', '088214910467', 'riftiandimas27@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00, 'expired', 'ORDER-1064', 'a2d9b077-ec69-4c29-aa21-f8d124051dec', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/a2d9b077-ec69-4c29-aa21-f8d124051dec', '{\"transaction_type\":\"off-us\",\"transaction_time\":\"2024-12-17 17:32:55\",\"transaction_status\":\"expire\",\"transaction_id\":\"bba9d58b-2166-4935-8482-2a1803b91868\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"202\",\"signature_key\":\"8cd4f1eaea9063e1cab71c11849b0fbb1ee1a4404eae98ca269233ba76759e5abd80985e9a4dc6a2c4f69c088bccc0f5a4ec074f05c971139048b9df073e866f\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1064\",\"merchant_id\":\"G272242473\",\"gross_amount\":\"2000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-17 17:47:55\",\"currency\":\"IDR\"}'),
(1065, 'Kyla Azzahra Kinan', '2211102225', '089512120643', 'kylakawai22@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 1, 2000.00, 'paid', 'ORDER-1065', 'd274b3ec-15d1-4927-81f7-8a69e6719736', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/d274b3ec-15d1-4927-81f7-8a69e6719736', '{\"transaction_type\":\"off-us\",\"transaction_time\":\"2024-12-17 21:31:46\",\"transaction_status\":\"settlement\",\"transaction_id\":\"eb71dcb3-eaf4-48bf-a240-493a60e9c02a\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"200\",\"signature_key\":\"e87f59742442ad417693bed1900511d7d43ec99dc2380ed1bb31e582def0abb998f46930d54f7471d4c942552464c81997949164246b8c78ec81a0092f1353f7\",\"settlement_time\":\"2024-12-17 21:32:23\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1065\",\"merchant_id\":\"G272242473\",\"issuer\":\"airpay shopee\",\"gross_amount\":\"2000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-17 21:46:46\",\"currency\":\"IDR\",\"acquirer\":\"gopay\"}'),
(1066, 'riyon', '098789', '09876789', 'riyonaryono12@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 5, 2000.00, 'paid', 'ORDER-1066', 'ba3b27eb-06c9-4ab1-b097-5e4a7760032e', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/ba3b27eb-06c9-4ab1-b097-5e4a7760032e', '{\"transaction_type\":\"on-us\",\"transaction_time\":\"2024-12-22 01:49:30\",\"transaction_status\":\"settlement\",\"transaction_id\":\"1e671281-f09d-4783-a1c8-eb2ec90d8f7f\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"200\",\"signature_key\":\"1ac839efafc31e98bf23639f4ee5f6f7b07a2e502b0f231b179a2b5f6f84b6e8b5fa78bbb1d929fd2a6bab513893e0c766b6caa95b6cff8a5b9cbb48d817b654\",\"settlement_time\":\"2024-12-22 01:49:37\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1066\",\"merchant_id\":\"G272242473\",\"issuer\":\"gopay\",\"gross_amount\":\"10000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-22 02:04:30\",\"currency\":\"IDR\",\"acquirer\":\"gopay\"}'),
(1067, 'kuwagapat', '1234567', '08814572553', 'riftiandimas2005@gmail.com', 'Tiket Masuk Taman Mas Kemambang', 2, 2000.00, 'paid', 'ORDER-1067', 'f09190a1-737c-43c1-908b-7ead554eba90', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/f09190a1-737c-43c1-908b-7ead554eba90', '{\"transaction_type\":\"on-us\",\"transaction_time\":\"2024-12-22 01:59:32\",\"transaction_status\":\"settlement\",\"transaction_id\":\"be7c6f0e-98aa-45d3-8075-8ed7c4d1d4f8\",\"status_message\":\"midtrans payment notification\",\"status_code\":\"200\",\"signature_key\":\"b06f175f7e71eb7874aa357adb4fc251eafe42b0ea708ea217484dea1e71e916fcbb07ddad34aa05c2343622e0fd3dd90bd11887469f98d70c2cb89d86b16b51\",\"settlement_time\":\"2024-12-22 02:02:00\",\"payment_type\":\"qris\",\"order_id\":\"ORDER-1067\",\"merchant_id\":\"G272242473\",\"issuer\":\"gopay\",\"gross_amount\":\"4000.00\",\"fraud_status\":\"accept\",\"expiry_time\":\"2024-12-22 02:14:32\",\"currency\":\"IDR\",\"acquirer\":\"gopay\"}');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1068;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
