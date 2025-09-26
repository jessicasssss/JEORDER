-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2025 at 12:54 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jeorder`
--

-- --------------------------------------------------------

--
-- Table structure for table `mscart`
--

CREATE TABLE `mscart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `msorder`
--

CREATE TABLE `msorder` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_price` decimal(12,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `msorder`
--

INSERT INTO `msorder` (`id`, `user_id`, `total_price`, `created_at`) VALUES
(5, 17, 1737000.00, '2025-09-26 08:18:16');

-- --------------------------------------------------------

--
-- Table structure for table `msorderdetail`
--

CREATE TABLE `msorderdetail` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` enum('RECEIVED','SHIPPED','PAID') NOT NULL DEFAULT 'PAID',
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `msorderdetail`
--

INSERT INTO `msorderdetail` (`id`, `order_id`, `product_id`, `quantity`, `status`, `price`) VALUES
(9, 5, 12, 1, 'RECEIVED', 479000),
(10, 5, 13, 2, 'RECEIVED', 629000);

-- --------------------------------------------------------

--
-- Table structure for table `msproduct`
--

CREATE TABLE `msproduct` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `seller` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `msproduct`
--

INSERT INTO `msproduct` (`id`, `name`, `description`, `price`, `stock`, `seller`) VALUES
(11, 'Exsport Take A Trip Foldable Backpack - Lime', '\"Take A Trip Foldable Backpack ini dirancang agar ringan dan praktis dengan tali yang dapat disesuaikan dan dapat dilipat. Tas ini sangat ideal untuk mengisi hari-hari santai, berjalan-jalan di sekitar kota atau perjalanan harian Anda. Cukup masukkan barang-barang penting kamu dan siap untuk pergi.\r\n\r\n\r\n\r\nWarna: Lime\r\n\r\nBahan: Nylon\r\n\r\nUkuran: 40x28x14cm\r\n\r\nKapasitas: 11 L\r\n\r\n\r\n\r\nProduct Key Features:\r\n\r\n1. Foldable, dapat di lipat ke dalam kantong\r\n\r\n2. 1 kompartemen utama\r\n\r\n3. 1 kompartemen depan (dengan resleting)\r\n\r\n4. Terbuat dari Nylon berkualitas tinggi\r\n\r\n5. Water-repellent material\r\n\r\n6. Lifetime warranty\"', 231400, 997, 1),
(12, 'CORKCICLE Canteen 16oz - Dipped Blackout', 'Our Canteens are available in an array of sizes and trend-inspired colors. Plus, they keep drinks ice cold for 25 hours or warm for 12. Made of 18/8 Stainless Steel and completely BPA Free. \r\n\r\nDetails:\r\nTriple-insulated stainless steel\r\nBPA free\r\nLeak-proof cap\r\nSignature easy-grip flat sides\r\nNon-slip bottom\r\nWide mouth for ice cubes\r\n\r\nMeasurements:\r\n16oz (475 ml): 24.5 cm (H) x 8.7 cm (W) x 9 cm (L)\r\n\r\nBotol minum / Tumbler / Gelas stainless steel tahan dingin hingga 25 jam, tahan panas hingga 12 jam. Cocok untuk air mineral, jus, smoothies, kopi, teh dan berbagai minum es / panas lainnya.', 479000, 4, 1),
(13, 'CORKCICLE Canteen 16oz - Walnut Wood', 'Our Canteens are available in an array of sizes and trend-inspired colors. Plus, they keep drinks ice cold for 25 hours or warm for 12. Made of 18/8 Stainless Steel and completely BPA Free. \r\n\r\nDetails:\r\n Triple-insulated stainless steel\r\n BPA free\r\n Leak-proof cap\r\n Signature easy-grip flat sides\r\n Non-slip bottom\r\nWide mouth for ice cubes\r\n\r\nMeasurements:\r\n16oz (475 ml): 24.5 cm (H) x 8.7 cm (W) x 9 cm (L)\r\n\r\nBotol minum / Tumbler / Gelas stainless steel tahan dingin hingga 25 jam, tahan panas hingga 12 jam. Cocok untuk air mineral, jus, smoothies, kopi, teh dan berbagai minum es / panas lainnya.', 629000, 77, 1),
(15, 'CORKCICLE Leakproof Cruiser 22oz - Mauve', 'Let the joyrides commence. Cruiser, now available in 22oz and 40oz. Cruiser keeps 22oz of your favorite beverage cold for up to 20 hours, so you can enjoy all-day adventures without giving your hydration needs a second thought. Featuring a NEW 100% leakproof lid, a comfy soft-grip handle, and a stay-put silicone bottom, Cruiser is always along for the ride.\r\n\r\nDetails:\r\nUp To 20 Hours Cold\r\nUp To 9 Hours Hot\r\n100% Leakproof Lid\r\nFlat Sides & Handle for Easy Grip\r\nComfort-Grip Handle\r\nNon-Slip Silicone Bottom\r\nCupholder Friendly\r\nTriple-Insulated Steel\r\n\r\nUltra-Durable for extreme adventures\r\n\r\nMeasurements:\r\n22oz (650ml) / W 14cm x L 10cm x H 26cm / 0.5kg', 649000, 49, 1),
(16, 'HMNS Perfume - Farhampton 100ml', 'HMNS Perfume - Farhampton 100ml\r\nFragrance Group: Aromatic Fougere Fruity\r\n\r\n“Farhampton is a soulmate. The one that you find along the journey. And the one that sticks with you until the end.”\r\nDengan konsentrasi pure fragrance tinggi (extrait de parfum). HMNS “Farhampton” hadir dengan top notes bergamot dan ripe fruit, middle notes lavender dan bunga orange blossom yang memberikan kesan aromatic dan spicy. Notes labdanum (amber), cedar wood, dan tonka bean memberikan kesan hangat dan membuat parfum ini tahan lama.\r\nMengandung Natural Ingredients: Lavender & Labdanum Amber \r\nLongevity: 6-8 hours\r\nSillage: Moderate to heavy\r\nProjection: 2 meters\r\n\r\n-----Pengiriman------\r\n\r\nDURASI PEMESANAN KE PENGIRIMAN\r\nPengiriman setiap hari kecuali Sabtu, Minggu, dan tanggal merah. Durasi dari pemesanan ke pengiriman paling cepat di hari yang sama jika konfirmasi pembayaran dilakukan sebelum jam 12. Lebih dari itu akan ikut pengiriman di hari berikutnya. Hal ini berlaku untuk item yang statusnya ready stock.\r\n\r\nPengiriman dilakukan dari Jakarta, dan durasi pengiriman disesuaikan dengan kebijakan jarak dan ketepatan waktu masing-masing jasa antar.', 369000, 475, 1),
(17, 'HMNS x Tsana Fragrance Mist - Elea', 'HMNS x Tsana Fragrance Mist-Elea\r\nProudly present,\r\n\r\nHMNS x Tsana\r\nElea - Fragrance Mist / Eau De Toilette 250 ml\r\nIt teams the freshness of uplifting grapefruit & magnolia. With the sweet golden honey & a pleasant ambrette to unfold a new magic.\r\nLongevity: 2 - 3 hours\r\nSillage: medium\r\nProjection: 1 - 2.5 meters\r\n\r\nCara Pakai\r\nSpray dengan jarak 20 cm ke tubuh/rambut dalam keadaan kering/basah.\r\n\r\nPengiriman\r\nDURASI PEMESANAN KE PENGIRIMAN\r\nPengiriman dilakukan dari Jakarta, dan durasi pengiriman disesuaikan dengan kebijakan jarak dan ketepatan waktu masing-masing jasa antar.\r\n\r\n\r\n\r\nApabila ada kendala silahkan langsung menghubungi CR HMNS, dan kami akan langsung membantu.', 185000, 296, 1),
(23, 'POLO - 0341 Cap Little Pony Fashion', 'READY STOCK - UNISEX\r\nLingkar kepala max. 60 cm\r\nTinggi topi 16 cm\r\n\r\nPENJELASAN BAHAN\r\nMenggunakan bahan Twill yang   memiliki kualitas baik. bahan ini memiliki ciri halus namun  padat. \r\nBahan jenis ini sangat cocok digunakan untuk event-event santai.\r\n\r\n\r\nInstruksi cuci:\r\n- Tidak boleh menggunakan pemutih.\r\n- Mengeringkan pakaian pada suhu rendah.\r\n- Cuci pada suhu maksimal 40º C. \r\n- Jangan merendam pakaian terlalu lama di air, pisakan baju perwarna kuat (Hitam,Merah,Biru,Lain-lain).\r\n\r\n- Pastikan menyetrika dalam keadaan kering atur suhu panas tidak lebih dari 110º C.\r\n\r\n\r\n\r\nKebijakan pengembalian :\r\n- Max komplain diterima 2x24 jam dari terima paket\r\n- Mohon sertakan video unboxing saat mengajukan komplain\r\n- Returan hanya bisa diterima dalam kondisi baru (lengkap nota&tag price)', 129000, 200, 1),
(25, 'Bose SoundLink Flex II Flex 2 Portable Bluetooth Speaker with Hi-Fi Audio', '* 100% Original & Garansi Resmi\r\n* Garansi langsung ganti baru jika rusak fungsi selama 2x24 jam sejak barang diterima dan transaksi belum diselesaikan\r\n* Mohon sertakan kemasan asli, kartu garansi & invoice saat klaim\r\n\r\n==================================================\r\nBose SoundLink Flex II Flex 2 Portable Bluetooth Speaker with Hi-Fi Audio\r\n\r\nFitur Utama:\r\n\r\nMUSIC CALLS: The Bose SoundLink Flex Portable Bluetooth Speaker (2nd Gen) packs big, bold sound in a packable size that’s perfect for sharing tunes and good times anywhere on the planet\r\n\r\nSOUND THAT TAKES YOU PLACES: Take advantage of the surprisingly powerful performance of this Bose portable speaker with its clear, balanced, high-fidelity audio and deep bass that is easy to take with you\r\n\r\nPERFECTLY PORTABLE, WITH BATTERY LIFE TO MATCH: This Bose Bluetooth speaker is small enough to fit in your hand or clip onto a bag using the utility loop, plus it has up to 12 hours of battery life* so you can focus on the fun\r\n\r\nTOSS IT, DROP IT, IT’S ALL GOOD: This IP67 rated Bose portable Bluetooth speaker is waterproof and dustproof and is wrapped in a durable, silicone-wrapped body to withstand drops, shocks, and rust\r\n\r\nSTAY CONNECTED WITH ADVANCED BLUETOOTH 5.3: This outdoor speaker uses Bluetooth 5.3 to ensure a continuous connection to your device from up to 30 feet away and can pair to multiple devices at once using multipoint technology\r\n\r\nSpesifikasi:\r\nMicrophones Built-in Microphone\r\nSound Options Shielded Speakers, Speakerphone, SimpleSync, Full Range Speakers, Party Mode (When Enabling Two Speakers), PositionIQ, Stereo Mode (When Enabling Two Speakers)\r\nAudio cable included No\r\nWater Resistant IP67\r\nEntire Product System 2.06\" H x 7.93\" W x 3.56\" D (1.291 lb)\r\nProduct Material Aluminum, Fabric, Nylon, Plastic, Silicone, Steel\r\nBattery Life 12 hours\r\nBattery Charge Time 4 hours\r\nCharging Interface(s) USB C PORT\r\nWireless Connectivity Bluetooth, Wireless Connectivity\r\nBose App Bose App', 3199000, 10, 1),
(26, 'Bose SoundLink Micro Portable Wireless Bluetooth Speaker', '* 100% Original & Garansi Resmi\r\n* Garansi langsung ganti baru jika rusak fungsi selama 2x24 jam sejak barang diterima dan transaksi belum diselesaikan\r\n* Mohon sertakan kemasan asli, kartu garansi & invoice saat klaim\r\n\r\n==================================================\r\nBose SoundLink Micro Portable Wireless Bluetooth Speaker\r\n\r\nLong Battery Life\r\nBaterai tahan sampai 6 jam, siap temani aktivitas seharian tanpa khawatir kehabisan daya.\r\n\r\nSpeakerphone\r\nGunakan Bose SoundLink Micro untuk conference call atau teleponan dengan teman dan keluarga.\r\n\r\nIP67\r\nDengan sertifikasi IP67, speaker ini tahan air, debu, dan kotoran, bahkan aman terendam hingga 1 meter selama 30 menit. Bebas dibawa ke mana saja!\r\n\r\nSilicon Body\r\nMaterial silikon berkualitas yang tahan benturan dan goresan.\r\nEasy Connect\r\nProses pairing mudah, cukup dengan satu sentuhan.\r\nStrap & Go\r\nDilengkapi pengait karet yang bisa digantung di tas sepeda, atau dahan pohon.\r\n\r\nUkuran produk: 9,83 cm (T) x 9,83 cm (L) x 3,48 cm (D)\r\nBerat: 310 gram', 2594000, 20, 1),
(28, 'Eloi Coco Temptation Candy Rush Moisturizing Body Mist 250ml', 'Temptation Candy Rush adalah body mist dengan sentuhan buah buah dicampur dengan bunga bunga dalam aromanya. Top note yang indah adalah sangat eksklusif dan kuat dengan aroma lemon, rumput tumbuk, melon, dan apel merah. Heart notes dari wewangian ini adalah campuran hangat dari violet dan kacang manis. Aromanya seperti bubuk dan bunga menciptakan ilusi hidup yang terhenti sementara di sekitar anda.\r\n\r\n\r\nTemptation Candy Rush is a fruity fragrance with a floral twists with subtle hints of green within the scent. Its beautiful top note is exclusive and punchy with a zest of lemon, crushed grass, melon and red apples. The heart of the fragrance is a warm welcome by violet and sweet pea. The scent is powdery and floral creating the illusion of the city rush in pause around you.\r\n\r\n\r\nTop Note: Lemon, Crushed Grass, Melon and Red Apple\r\nMiddle Note: Sweet Pea, Lily of the Valley and Violet\r\nBottom Note: Sweet Powdery Accords and Musk\r\n\r\n𝐒𝐡𝐢𝐩𝐩𝐢𝐧𝐠 𝐒𝐜𝐡𝐞𝐝𝐮𝐥𝐞 :\r\n\r\nMonday - Saturday\r\n8.00-11.00\r\nSunday & National Holiday\r\nOff\r\n\r\n𝐀𝐭𝐭𝐞𝐧𝐭𝐢𝐨𝐧 :\r\n- 100% Original Product\r\n- Safety Packaging (Included Double Bubble Wrap & Thick Box With Fragile Print)\r\n- We’re Responsible for every product damage caused by shipping. (Attach unboxing video is a must!)\r\n- BPOM Certified :  NA18180601172', 99000, 100, 1);

-- --------------------------------------------------------

--
-- Table structure for table `msuser`
--

CREATE TABLE `msuser` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `date_of_birth` date NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `isVerified` tinyint(1) DEFAULT 0,
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `msuser`
--

INSERT INTO `msuser` (`id`, `username`, `email`, `date_of_birth`, `password`, `role`, `isVerified`, `address`) VALUES
(1, 'nicola', 'bellsjs2005@gmail.com', '2005-05-11', '$2b$10$la9WdCsjboM16fN7VZxCpeKtW6CJyhtEzsNr03sqtwL2JCAnBhVLS', 'admin', 1, 'Binus Anggrek'),
(2, 'vaels', '2005jessicabella@gmail.com', '2000-10-12', '$2b$10$dcfu36fcvg5ryMXqyUEmceRxMCD8MKl.BpkVaYWpQJn9XvQcxqfDi', 'user', 1, 'Kost U44'),
(17, 'jessica', 'jessica.oeij@binus.ac.id', '2000-02-10', '$2b$10$ZO1tLlezl48xB4IBdTujZuX0hqP2e0KlBB9Rw4K1WWWDGfQFEcAc.', 'user', 1, 'Binus University');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_url`) VALUES
(42, 11, '/uploads/1758724605089.png'),
(43, 11, '/uploads/1758724605090.png'),
(44, 11, '/uploads/1758724605093.png'),
(45, 11, '/uploads/1758724605095.png'),
(46, 12, '/uploads/1758805816618.png'),
(47, 12, '/uploads/1758805816653.png'),
(48, 12, '/uploads/1758805816668.png'),
(49, 13, '/uploads/1758805955623.png'),
(50, 13, '/uploads/1758805955627.png'),
(51, 13, '/uploads/1758805955631.png'),
(55, 15, '/uploads/1758806210219.png'),
(56, 15, '/uploads/1758806210223.png'),
(57, 15, '/uploads/1758806210231.png'),
(58, 16, '/uploads/1758806361698.png'),
(59, 16, '/uploads/1758806361700.png'),
(60, 16, '/uploads/1758806361705.png'),
(61, 16, '/uploads/1758806361718.png'),
(62, 17, '/uploads/1758806532722.png'),
(63, 17, '/uploads/1758806532724.png'),
(64, 17, '/uploads/1758806532733.png'),
(65, 17, '/uploads/1758806532746.png'),
(80, 23, '/uploads/1758872885355.png'),
(81, 23, '/uploads/1758872885357.png'),
(82, 23, '/uploads/1758872885358.png'),
(86, 25, '/uploads/1758873146180.png'),
(87, 25, '/uploads/1758873146189.png'),
(88, 26, '/uploads/1758873281727.png'),
(89, 26, '/uploads/1758873281729.png'),
(90, 26, '/uploads/1758873281732.png'),
(94, 28, '/uploads/1758874870965.png'),
(95, 28, '/uploads/1758874870993.png'),
(96, 28, '/uploads/1758874871001.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mscart`
--
ALTER TABLE `mscart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cart_user` (`user_id`),
  ADD KEY `fk_cart_product` (`product_id`);

--
-- Indexes for table `msorder`
--
ALTER TABLE `msorder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `msorderdetail`
--
ALTER TABLE `msorderdetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `msproduct`
--
ALTER TABLE `msproduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seller` (`seller`);

--
-- Indexes for table `msuser`
--
ALTER TABLE `msuser`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mscart`
--
ALTER TABLE `mscart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `msorder`
--
ALTER TABLE `msorder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `msorderdetail`
--
ALTER TABLE `msorderdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `msproduct`
--
ALTER TABLE `msproduct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `msuser`
--
ALTER TABLE `msuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mscart`
--
ALTER TABLE `mscart`
  ADD CONSTRAINT `fk_cart_product` FOREIGN KEY (`product_id`) REFERENCES `msproduct` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_cart_user` FOREIGN KEY (`user_id`) REFERENCES `msuser` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `msorder`
--
ALTER TABLE `msorder`
  ADD CONSTRAINT `msorder_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `msuser` (`id`);

--
-- Constraints for table `msorderdetail`
--
ALTER TABLE `msorderdetail`
  ADD CONSTRAINT `msorderdetail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `msorder` (`id`),
  ADD CONSTRAINT `msorderdetail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `msproduct` (`id`);

--
-- Constraints for table `msproduct`
--
ALTER TABLE `msproduct`
  ADD CONSTRAINT `msproduct_ibfk_1` FOREIGN KEY (`seller`) REFERENCES `msuser` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `msproduct` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
