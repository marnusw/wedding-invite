-- phpMyAdmin SQL Dump
-- version 4.0.9
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2014 at 10:04 PM
-- Server version: 5.5.34
-- PHP Version: 5.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `troue`
--

-- --------------------------------------------------------

--
-- Table structure for table `guest`
--

CREATE TABLE IF NOT EXISTS `guest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `partner_id` int(11) DEFAULT NULL,
  `name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `surname` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` varchar(6) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `connection` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `inviteMorning` tinyint(1) DEFAULT NULL,
  `inviteEvening` tinyint(1) DEFAULT NULL,
  `viewed_at` datetime DEFAULT NULL,
  `attendMorning` tinyint(1) DEFAULT NULL,
  `attendEvening` tinyint(1) DEFAULT NULL,
  `replied_at` datetime DEFAULT NULL,
  `partnerAllowed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_6D76B5319393F8FE` (`partner_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=195 ;

--
-- Dumping data for table `guest`
--

INSERT INTO `guest` (`id`, `partner_id`, `name`, `surname`, `gender`, `email`, `connection`, `inviteMorning`, `inviteEvening`, `viewed_at`, `attendMorning`, `attendEvening`, `replied_at`, `partnerAllowed`) VALUES
(1, 2, 'Lionel', 'Harris', 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(2, 1, 'Gerda', 'Harris', 'female', 'gerda.harris@icloud.com', 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(3, 4, 'Nevin', 'Harris', 'male', 'nevinwharris@gmail.com', 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(4, 3, 'Elize', NULL, 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(5, 6, 'Thomas', 'Needham', 'male', 'thomas@needham.co.za', 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(6, 5, 'Lene', 'Harris', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(7, 8, 'Oupie Cecil', 'Harris', 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(8, 7, 'Oumie Nora', 'Harris', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(9, 10, 'Neville', 'Harris', 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(10, 9, 'Benitha', 'Harris', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(11, 12, 'Neil', NULL, 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(12, 11, 'Zahre', 'Harris', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(13, NULL, 'Nikha', 'Harris', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, 1),
(14, 15, 'Rohnan', 'Harris', 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(15, 14, 'Lilah', 'Harris', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(18, 19, 'Robbert', 'Best', 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(19, 18, 'Lesley', 'Best', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(20, NULL, 'Lisa', 'Best', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(21, 22, 'Danie', 'Oosthuizen', 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(22, 21, 'Marisa', NULL, 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(23, NULL, 'Jacques', 'Oosthuizen', 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(24, NULL, 'Visser', 'Oosthuizen', 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(26, 27, 'Pieter', NULL, 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(27, 26, 'Nesta', NULL, 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(29, NULL, 'Klein Pieter', NULL, 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(32, NULL, 'Linda', 'van der Westhuizen', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, 1),
(33, 154, 'Andre''', '', 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(35, NULL, 'Lieze', 'van Staden', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(36, NULL, 'Madri', 'Potgieter', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, 1),
(37, 38, 'Johan', 'Engelbrecht', 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(38, 37, 'Jenni-Mari', 'Engelbrecht', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(39, 40, 'Karl', 'van der Merwe', 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(40, 39, 'Marise', 'van der Merwe', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(41, 42, 'Ian', 'Louw', 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(42, 41, 'Renate', 'Louw', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(43, 44, 'Crista', NULL, 'male', NULL, 'Nora-ann', 1, 0, NULL, NULL, NULL, NULL, NULL),
(44, 43, 'Dries', NULL, 'female', NULL, 'Nora-ann', 1, 0, NULL, NULL, NULL, NULL, NULL),
(45, 46, 'Prof Simon', 'Lotz', 'male', NULL, 'Nora-ann', 1, 0, NULL, NULL, NULL, NULL, NULL),
(46, 45, 'Leentjie', 'Lotz', 'female', NULL, 'Nora-ann', 1, 0, NULL, NULL, NULL, NULL, NULL),
(47, 48, 'Dawie', 'Spamer', 'male', NULL, 'Nora-ann', 1, 0, NULL, NULL, NULL, NULL, NULL),
(48, 47, 'Rina', 'Spamer', 'female', NULL, 'Nora-ann', 1, 0, NULL, NULL, NULL, NULL, NULL),
(49, NULL, 'Wesley', 'Harris', 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(50, 51, 'Marnus', 'Weststrate', 'male', 'marnusw@gmail.com', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(51, 50, 'Nora-ann', 'Harris', 'female', 'noraann.harris@gmail.com', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(52, 53, 'Riaan', 'Hollenbach', 'male', 'riaanhollenbach@gmail.com', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(53, 52, 'Charlotte', 'Hollenbach', 'female', 'charlottehollenbach@gmail.com', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(54, 55, 'Hannes', 'Pretorius', 'male', 'pretorius.hannes@gmail.com', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(55, 54, 'Carien', 'Pretorius', 'female', 'carien@crinkle.co.za', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(56, 57, 'Hannes', 'Oberholzer', 'male', 'hannes.ob@gmail.com', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(57, 56, 'Carla', 'Oberholzer', 'female', 'katreintjie@hotmail.com', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(58, NULL, 'Ruan', 'Potgieter', 'male', 'ruanpot@gmail.com', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(59, NULL, 'JD', 'Eksteen', 'male', 'jdeksteen@gmail.com', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(60, 61, 'Ruan', NULL, 'male', NULL, 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(61, 60, 'Teresa', 'Olckers', 'female', 'teresa.olckers@gmail.com', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(62, 63, 'Jan', 'Niemand', 'male', 'jann@doxadeo.co.za', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(63, 62, 'Carla', 'Niemand', 'female', 'janssen.carla@gmail.com', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(64, 65, 'Dawie', 'Roux', 'male', 'roux.dawie@gmail.com', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(65, 64, 'Maryka', 'Potgieter', 'female', 'maryka.potgieter@vodamail.co.za', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(66, NULL, 'Elne', 'Jansen van Rensburg', 'female', 'elnejvr@yahoo.com', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(67, 68, 'Henk', 'Botha', 'male', NULL, 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(68, 67, 'Larraine', NULL, 'female', NULL, 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(69, NULL, 'Monique', 'Ras', 'female', 'ras.monique28@gmail.com', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(70, NULL, 'Karien', 'Louw', 'female', 'kulukind@gmail.com', 'Beide', 0, 1, NULL, NULL, NULL, NULL, NULL),
(71, NULL, 'Ett', 'Venter', 'male', NULL, 'Beide', 1, 1, NULL, NULL, NULL, NULL, 1),
(73, NULL, 'Janie', 'van den Berg', 'female', 'janievdb@gmail.com', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(74, NULL, 'Ouma Pat', 'van den Berg', 'female', NULL, 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(75, 76, 'Gert', 'van den Berg', 'male', NULL, 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(76, 75, 'Joan', 'de Lange', 'female', NULL, 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(77, 78, 'Leo', 'van den Berg', 'male', NULL, 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(78, 77, 'Suzette', 'van den Berg', 'female', NULL, 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(79, 80, 'Hennie', 'van den Berg', 'male', 'hendrik.vandenberg@neosventures.com', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(80, 79, 'Britta', 'van den Berg', 'female', NULL, 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(81, 82, 'Brian', 'Papas', 'male', 'papas@icon.co.za', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(82, 81, 'Rika', 'Papas', 'female', 'rika.p@icon.co.za', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(83, 84, 'Leon', 'de Lange', 'male', NULL, 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(84, 83, 'Tricia', 'de Lange', 'female', 'tricia@lts.co.za', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(85, NULL, 'Divan', 'de Lange', 'male', 'tricia@lts.co.za', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(86, NULL, 'Karin', 'Curtis', 'female', NULL, 'Marnus', 1, 0, NULL, NULL, NULL, NULL, NULL),
(87, NULL, 'Vivienne', 'Jonker', 'female', NULL, 'Marnus', 1, 0, NULL, NULL, NULL, NULL, 1),
(88, NULL, 'Susan', NULL, 'female', NULL, 'Marnus', 1, 0, NULL, NULL, NULL, NULL, NULL),
(89, NULL, 'Gretchen', 'van Wyngaard', 'female', NULL, 'Marnus', 1, 0, NULL, NULL, NULL, NULL, 0),
(90, 91, 'Eduard', 'Beukes', 'male', 'edpbeukes@gmail.com', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(91, 90, 'Amanda', 'Beukes', 'female', 'wessiea@gmail.com', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(92, 93, 'Harold', 'Scholtz', 'male', 'haroldscholtz@vodamail.co.za', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(93, 92, 'Elsabe', 'Scholtz', 'female', 'elsabewest@gmail.com', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(94, 95, 'Nic', 'Klopper', 'male', 'nicklopper@gmail.com', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(95, 94, 'Chane', 'Klopper', 'female', 'chane0804@gmail.com', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(96, 97, 'Ben', 'Fourie', 'male', 'ben@88pockets.com', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(97, 96, 'Mart-Marie', 'Fourie', 'female', NULL, 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(98, 99, 'PG', 'Geldenhuys', 'male', 'pggeldenhuys@gmail.com', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(99, 98, 'Marietjie', 'Nel', 'female', 'marietji@gmail.com', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(100, 101, 'Francois', 'Pachonick', 'male', 'fpachonick@gmail.com', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(101, 100, 'Ilze', 'Pachonick', 'female', 'ilze.cloete@gmail.com', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(102, NULL, 'Dieter', 'Deysel', 'male', 'ddeysel@gmail.com', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(103, NULL, 'AV', 'Strydom', 'male', 'albertusventer@yahoo.com', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, 0),
(104, 105, 'Clifford', 'Louw', 'male', 'cliffjlouw@gmail.com', 'Marnus', 0, 1, NULL, NULL, NULL, NULL, NULL),
(105, 104, 'Hesrie', 'Louw', 'female', 'hesriem@mweb.co.za', 'Marnus', 0, 1, NULL, NULL, NULL, NULL, NULL),
(106, 107, 'Wilhelm', 'Stemmet', 'male', 'dwstemmet@gmail.com', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(107, 106, 'Annelie', 'Stemmet', 'female', NULL, 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(108, 109, 'Herman', 'Myburgh', 'male', 'herman.myburgh@gmail.com', 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(109, 108, 'Clerise', 'Myburgh', 'female', NULL, 'Marnus', 1, 1, NULL, NULL, NULL, NULL, NULL),
(110, NULL, 'Soon', 'Pretorius', 'male', 'soon@karateacademy.co.za', 'Marnus', 1, 0, NULL, NULL, NULL, NULL, NULL),
(111, 112, 'Jean', 'Griesel', 'male', 'jeangriesel@mweb.co.za', 'Marnus', 1, 0, NULL, NULL, NULL, NULL, NULL),
(112, 111, 'Amelia', 'Griesel', 'female', NULL, 'Marnus', 1, 0, NULL, NULL, NULL, NULL, NULL),
(113, NULL, 'Pieter', 'Coetzee', 'male', 'Pieter@selftrack.co.za', 'Marnus', 1, 0, NULL, NULL, NULL, NULL, 1),
(114, NULL, 'Chris', 'Pronk', 'male', 'engelruy@mweb.co.za', 'Marnus', 1, 0, NULL, NULL, NULL, NULL, 1),
(115, 116, 'CD', 'Hechter', 'male', 'chechter@mweb.co.za', 'Marnus', 0, 1, NULL, NULL, NULL, NULL, NULL),
(116, 115, 'Hettie', 'Hechter', 'female', 'hhechter@bdo.co.za', 'Marnus', 0, 1, NULL, NULL, NULL, NULL, NULL),
(117, 118, 'Nico', 'de Klerk', 'male', 'Nico.deKlerk@vcontractor.co.za', 'Marnus', 0, 1, NULL, NULL, NULL, NULL, NULL),
(118, 117, 'Marzanne', 'de Klerk', 'female', 'dKlerkMR@eskom.co.za', 'Marnus', 0, 1, NULL, NULL, NULL, NULL, NULL),
(121, 122, 'Wayne', 'Maclean', 'male', 'wayne.maclean@gmail.com', 'Marnus', 0, 1, NULL, NULL, NULL, NULL, NULL),
(122, 121, 'Rijanda', 'Maclean', 'female', NULL, 'Marnus', 0, 1, NULL, NULL, NULL, NULL, NULL),
(123, 124, 'Marius', 'Goosen', 'male', 'goosen.marius@gmail.com', 'Marnus', 0, 1, NULL, NULL, NULL, NULL, NULL),
(124, 123, 'Karen', 'Goosen', 'female', NULL, 'Marnus', 0, 1, NULL, NULL, NULL, NULL, NULL),
(125, 126, 'Dewaldt', 'du Plooy', 'male', 'dewalddp@gmail.com', 'Beide', 0, 1, NULL, NULL, NULL, NULL, NULL),
(126, 125, 'Maryke', NULL, 'female', NULL, 'Beide', 0, 1, NULL, NULL, NULL, NULL, NULL),
(127, NULL, 'Neels', 'Joubert', 'male', 'neelsjoubert007@gmail.com', 'Beide', 0, 1, NULL, NULL, NULL, NULL, NULL),
(128, 129, 'Ernst', 'Conradie', 'male', 'ernst.conradie@gmail.com', 'Beide', 0, 1, NULL, NULL, NULL, NULL, NULL),
(129, 128, 'Nadia', 'Giliomee', 'female', NULL, 'Beide', 0, 1, NULL, NULL, NULL, NULL, NULL),
(131, 132, 'Burgert', 'De Wet', 'male', 'burgert.de.wet@gmail.com', 'Beide', 0, 1, NULL, NULL, NULL, NULL, NULL),
(132, 131, 'Michelle', 'De Wet', 'female', NULL, 'Beide', 0, 1, NULL, NULL, NULL, NULL, NULL),
(133, NULL, 'Fanie', 'Engelbrecht', 'male', NULL, 'Beide', 0, 1, NULL, NULL, NULL, NULL, NULL),
(135, NULL, 'Ian', 'Cameron', 'male', 'ian@afriforum.co.za', 'Beide', 0, 1, NULL, NULL, NULL, NULL, 1),
(137, 138, 'Dirk', 'Kotze', 'male', 'djjkotze@gmail.com', 'Beide', 0, 1, NULL, NULL, NULL, NULL, NULL),
(138, 137, 'Sheena', 'Steyl', 'female', NULL, 'Beide', 0, 1, NULL, NULL, NULL, NULL, NULL),
(139, 140, 'Hugo', 'Engelbrecht', 'male', 'hugofengelbrecht@gmail.com', 'Beide', 0, 1, NULL, NULL, NULL, NULL, NULL),
(140, 139, 'Schantal', 'Engelbrecth', 'female', 'schantaljp@yahoo.com', 'Beide', 0, 1, NULL, NULL, NULL, NULL, NULL),
(141, 142, 'Zach', 'le Roux', 'male', 'zach.leroux@bmwdealer.co.za', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(142, 141, 'Petra', 'Muller', 'female', 'petramuller85@gmail.com', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(143, NULL, 'Su-Mari', 'Swanepoel', 'female', 'sumari.swanepoel@gmail.com', 'Beide', 0, 1, NULL, NULL, NULL, NULL, NULL),
(144, NULL, 'Henk', 'van Zyl', 'male', NULL, 'Nora-ann', 0, 1, NULL, NULL, NULL, NULL, 1),
(145, NULL, 'Berenice', 'van den Berg', 'female', NULL, 'Beide', 0, 1, NULL, NULL, NULL, NULL, NULL),
(146, 147, 'Chris', NULL, 'male', NULL, 'Nora-ann', 0, 1, NULL, NULL, NULL, NULL, NULL),
(147, 146, 'Jeandri', NULL, 'female', NULL, 'Nora-ann', 0, 1, NULL, NULL, NULL, NULL, NULL),
(150, 151, 'Heinrich', NULL, 'male', NULL, 'Nora-ann', 0, 1, NULL, NULL, NULL, NULL, NULL),
(151, 150, 'Margitte', 'van den Berg', 'female', NULL, 'Nora-ann', 0, 1, NULL, NULL, NULL, NULL, NULL),
(152, 153, 'Willem', NULL, 'male', NULL, 'Beide', 0, 1, NULL, NULL, NULL, NULL, NULL),
(153, 152, 'Marlize', NULL, 'female', NULL, 'Beide', 0, 1, NULL, NULL, NULL, NULL, NULL),
(154, 33, 'Beanca', NULL, 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(172, 173, 'Andreas', 'Horak', 'male', '', 'Marnus', 0, 1, NULL, NULL, NULL, NULL, NULL),
(173, 172, 'Amelia', 'Horak', 'female', NULL, 'Marnus', 0, 1, NULL, NULL, NULL, NULL, NULL),
(176, 185, 'Ansome', 'du Plessis', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, 0),
(177, 178, 'Pieter', 'van der Westhuizen', 'male', 'pietervdw@davidpeter.co.za', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(178, 177, 'Elmari', 'van der Westhuizen', 'female', NULL, 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(179, NULL, 'Anell', 'de Beer', 'female', 'anell@solidariteit.co.za', 'Beide', 1, 1, NULL, NULL, NULL, NULL, NULL),
(180, NULL, 'Janice', 'Whitehead', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(181, 182, 'Ettienne', 'Strydom', 'male', NULL, 'Nora-ann', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(182, 181, 'Hanlie', 'Strydom', 'female', NULL, 'Nora-ann', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(185, 176, 'Jaco', 'du Plessis', 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(186, 187, 'Riekert', 'van Schalkwyk', 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(187, 186, 'Juanita', 'van Schalkwyk', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(188, 189, 'Reinart', 'van Schalkwyk', 'male', NULL, 'Nora-ann', 1, 1, NULL, 0, NULL, NULL, NULL),
(189, 188, 'Tharina', 'van Schalkwyk', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(190, 191, 'Nico', 'Steenkamp', 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(191, 190, 'Martie', 'Steenkamp', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(192, 193, 'Neels', 'Steenkamp', 'male', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(193, 192, 'Nita', 'Steenkamp', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL),
(194, NULL, 'Anja', 'Whitehead', 'female', NULL, 'Nora-ann', 1, 1, NULL, NULL, NULL, NULL, NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `guest`
--
ALTER TABLE `guest`
  ADD CONSTRAINT `FK_6D76B5319393F8FE` FOREIGN KEY (`partner_id`) REFERENCES `guest` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
