-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Jun 05, 2019 at 05:43 PM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs361_burrisl`
--

-- --------------------------------------------------------

--
-- Table structure for table `dog`
--

CREATE TABLE `dog` (
  `dog_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `sex` varchar(255) NOT NULL,
  `breed` varchar(255) NOT NULL,
  `weight` int(11) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dog`
--

INSERT INTO `dog` (`dog_id`, `name`, `birthday`, `sex`, `breed`, `weight`, `status`) VALUES
(1, 'Duncan', '2013-05-17', 'M', 'Springer Spaniel', 60, 'Healthy'),
(2, 'Ace', '2014-06-23', 'M', 'Chihuahua', 96, 'Healthy'),
(3, 'Apollo', '2010-11-10', 'M', 'Poodle', 45, 'Healthy'),
(4, 'Bailey', '2009-04-28', 'M', 'Maltese', 76, 'Not Healthy'),
(5, 'Bandit', '2005-09-12', 'M', 'Greyhound', 82, 'Healthy'),
(6, 'Baxter', '2010-01-12', 'M', 'Bloodhound', 547, 'Not Healthy'),
(7, 'Bear', '2016-02-17', 'M', 'Pitbull', 85, 'Healthy'),
(8, 'Beau', '2018-05-17', 'M', 'Bulldog', 86, 'Healthy'),
(9, 'Benji', '2017-08-04', 'M', 'Mountain Dog', 45, 'Healthy'),
(10, 'Benny', '2014-10-30', 'M', 'Retriever', 87, 'Healthy'),
(11, 'Bentley', '2012-03-12', 'M', 'Golden Doodle', 56, 'Not Healthy'),
(12, 'Blue', '2011-09-19', 'M', 'Pug', 45, 'Healthy'),
(13, 'Bo', '2010-04-14', 'M', 'Rottweiler', 88, 'Not Healthy'),
(14, 'Boomer', '2008-08-22', 'M', 'German Shepherd', 54, 'Healthy'),
(15, 'Brady', '2007-10-17', 'M', 'Dotson', 75, 'Healthy'),
(16, 'Brody', '2014-11-19', 'M', 'Cocker Spaniel', 24, 'Healthy'),
(17, 'Bruno', '2015-12-25', 'M', 'Terrier', 75, 'Not Healthy'),
(18, 'Brutus', '2006-01-13', 'M', 'Bulldog', 34, 'Healthy'),
(19, 'Bubba', '2008-06-08', 'M', 'Mountain Dog', 86, 'Not Healthy'),
(20, 'Buddy', '2011-07-29', 'M', 'Retriever', 45, 'Healthy'),
(21, 'Buster', '2012-03-30', 'M', 'Golden Doodle', 34, 'Healthy'),
(22, 'Cash', '2009-01-01', 'M', 'German Shepherd', 65, 'Healthy'),
(23, 'Champ', '2010-02-10', 'M', 'Dotson', 23, 'Not Healthy'),
(24, 'Chance', '2015-03-19', 'M', 'Poodle', 76, 'Healthy'),
(25, 'Charlie', '2013-05-10', 'M', 'Maltese', 54, 'Not Healthy'),
(26, 'Chase', '2018-08-24', 'M', 'Mountain Dog', 34, 'Healthy'),
(27, 'Chester', '2014-07-26', 'M', 'Retriever', 76, 'Healthy'),
(28, 'Chico', '2008-06-10', 'M', 'Golden Doodle', 34, 'Healthy'),
(29, 'Coco', '2009-01-25', 'M', 'Pug', 77, 'Not Healthy'),
(30, 'Bella', '2013-05-17', 'F', 'Springer Spaniel', 64, 'Healthy'),
(31, 'Lucy', '2014-06-23', 'F', 'Chihuahua', 86, 'Not Healthy'),
(32, 'Daisy', '2010-11-10', 'F', 'Poodle', 35, 'Healthy'),
(33, 'Luna', '2009-04-28', 'F', 'Maltese', 45, 'Healthy'),
(34, 'Lola', '2005-09-12', 'F', 'Greyhound', 62, 'Healthy'),
(35, 'Sadie', '2010-01-12', 'F', 'Golden Doodle', 66, 'Not Healthy'),
(36, 'Molly', '2016-02-17', 'F', 'German Shepherd', 24, 'Healthy'),
(37, 'Bailey', '2018-05-17', 'F', 'Dotson', 66, 'Not Healthy'),
(38, 'Maggie', '2017-08-04', 'F', 'Maltese', 24, 'Healthy'),
(39, 'Sophie', '2014-10-30', 'F', 'Mountain Dog', 76, 'Healthy'),
(40, 'Chloe', '2012-03-12', 'F', 'Retriever', 34, 'Healthy'),
(41, 'Stella', '2011-09-19', 'F', 'Poodle', 76, 'Healthy'),
(42, 'Lily', '2010-04-14', 'F', 'Maltese', 34, 'Not Healthy'),
(43, 'Penny', '2008-08-22', 'F', 'Greyhound', 24, 'Healthy'),
(44, 'Zoey', '2007-10-17', 'F', 'Golden Doodle', 76, 'Not Healthy'),
(45, 'Coco', '2014-11-19', 'F', 'German Shepherd', 46, 'Healthy'),
(46, 'Roxy', '2015-12-25', 'F', 'Dotson', 87, 'Healthy'),
(47, 'Gracie', '2006-01-13', 'F', 'Poodle', 45, 'Healthy'),
(48, 'Mia', '2008-06-08', 'F', 'Maltese', 87, 'Healthy'),
(49, 'Nala', '2011-07-29', 'F', 'Greyhound', 45, 'Not Healthy'),
(50, 'Ruby', '2012-03-30', 'F', 'Maltese', 75, 'Healthy'),
(51, 'Rosie', '2009-01-01', 'F', 'Mountain Dog', 45, 'Not Healthy'),
(52, 'Ellie', '2010-02-10', 'F', 'Retriever', 77, 'Healthy'),
(53, 'Abby', '2015-03-19', 'F', 'Golden Doodle', 56, 'Healthy'),
(54, 'Zoe', '2013-05-10', 'F', 'Retriever', 34, 'Healthy'),
(55, 'Piper', '2018-08-24', 'F', 'Poodle', 25, 'Healthy'),
(56, 'Ginger', '2014-07-26', 'F', 'Poodle', 76, 'Not Healthy'),
(57, 'Lilly', '2008-06-10', 'F', 'Maltese', 45, 'Healthy'),
(58, 'Lulu', '2009-01-25', 'F', 'Greyhound', 75, 'Not Healthy'),
(59, 'Riley', '2009-01-01', 'F', 'Golden Doodle', 65, 'Healthy');

-- --------------------------------------------------------

--
-- Table structure for table `dogs_at_events`
--

CREATE TABLE `dogs_at_events` (
  `dog_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dogs_at_events`
--

INSERT INTO `dogs_at_events` (`dog_id`, `event_id`) VALUES
(1, 3),
(2, 3),
(3, 3),
(4, 3),
(5, 3),
(6, 3),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 2),
(14, 2),
(15, 2),
(16, 2),
(17, 4),
(18, 4),
(19, 4),
(20, 4),
(21, 4),
(22, 4),
(23, 5),
(24, 5),
(25, 5),
(26, 5),
(27, 6),
(28, 6),
(29, 6),
(30, 6),
(31, 7),
(32, 7),
(33, 7),
(34, 7),
(35, 8),
(36, 8),
(37, 8),
(38, 8),
(39, 8),
(40, 8),
(41, 9),
(42, 9),
(43, 9),
(44, 9),
(45, 9),
(46, 9),
(47, 10),
(48, 10),
(49, 10),
(50, 10),
(51, 10),
(52, 10),
(53, 11),
(54, 11),
(55, 11),
(56, 11),
(57, 11),
(58, 11),
(59, 11);

-- --------------------------------------------------------

--
-- Table structure for table `dog_locations`
--

CREATE TABLE `dog_locations` (
  `dog_id` int(11) NOT NULL,
  `shelter_id` int(11) DEFAULT NULL,
  `rescue_group_id` int(11) DEFAULT NULL,
  `admission_date` date NOT NULL,
  `discharge_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dog_locations`
--

INSERT INTO `dog_locations` (`dog_id`, `shelter_id`, `rescue_group_id`, `admission_date`, `discharge_date`) VALUES
(1, 1, NULL, '2018-05-17', NULL),
(2, 2, NULL, '2019-05-23', NULL),
(3, 3, NULL, '2018-07-22', NULL),
(4, 4, NULL, '2019-04-07', NULL),
(5, 5, NULL, '2018-10-01', NULL),
(6, 1, NULL, '2018-09-04', NULL),
(7, 2, NULL, '2018-08-19', NULL),
(8, 3, NULL, '2018-04-13', NULL),
(9, 4, NULL, '2019-05-29', NULL),
(10, 5, NULL, '2019-02-28', NULL),
(11, 1, NULL, '2019-01-27', NULL),
(12, 2, NULL, '2018-05-03', NULL),
(13, 3, NULL, '2018-06-19', NULL),
(14, 1, NULL, '2019-02-24', NULL),
(15, 2, NULL, '2018-05-17', NULL),
(16, 3, NULL, '2019-05-23', NULL),
(17, 4, NULL, '2018-07-22', NULL),
(18, 1, NULL, '2019-04-07', NULL),
(19, 2, NULL, '2018-10-01', NULL),
(20, 3, NULL, '2018-09-04', NULL),
(21, 4, NULL, '2018-08-19', NULL),
(22, 5, NULL, '2018-04-13', NULL),
(23, 1, NULL, '2019-05-29', NULL),
(24, 2, NULL, '2019-02-28', NULL),
(25, 3, NULL, '2019-01-27', NULL),
(26, 4, NULL, '2018-05-03', NULL),
(27, 5, NULL, '2018-06-19', NULL),
(28, 1, NULL, '2019-02-24', NULL),
(29, 2, NULL, '2018-05-17', NULL),
(30, 3, NULL, '2019-05-23', NULL),
(31, 4, NULL, '2018-07-22', NULL),
(32, 5, NULL, '2019-04-07', NULL),
(33, NULL, 1, '2018-10-01', NULL),
(34, NULL, 2, '2018-09-04', NULL),
(35, NULL, 3, '2018-08-19', NULL),
(36, NULL, 1, '2018-04-13', NULL),
(37, NULL, 2, '2019-05-29', NULL),
(38, NULL, 3, '2019-02-28', NULL),
(39, NULL, 1, '2019-01-27', NULL),
(40, NULL, 2, '2018-05-03', NULL),
(41, NULL, 3, '2018-06-19', NULL),
(42, NULL, 4, '2019-02-24', NULL),
(43, NULL, 5, '2018-05-17', NULL),
(44, NULL, 1, '2019-05-23', NULL),
(45, NULL, 2, '2018-07-22', NULL),
(46, NULL, 3, '2019-04-07', NULL),
(47, NULL, 4, '2018-10-01', NULL),
(48, NULL, 5, '2018-09-04', NULL),
(49, 1, NULL, '2018-08-19', NULL),
(50, 2, NULL, '2018-04-13', NULL),
(51, 3, NULL, '2019-05-29', NULL),
(52, 4, NULL, '2019-02-28', NULL),
(53, 5, NULL, '2019-01-27', NULL),
(54, 1, NULL, '2018-05-03', NULL),
(55, 2, NULL, '2018-06-19', NULL),
(56, 1, NULL, '2019-02-24', NULL),
(57, 2, NULL, '2018-05-03', NULL),
(58, 3, NULL, '2018-06-19', NULL),
(59, 4, NULL, '2019-02-24', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `event_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `date_time` datetime NOT NULL,
  `description` varchar(255) NOT NULL,
  `rescue_group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`event_id`, `name`, `address`, `date_time`, `description`, `rescue_group_id`) VALUES
(1, 'Dogfest 2019', '1727 E Platte Ave, Colorado Springs, CO 80909', '2019-08-31 10:00:00', 'A fun event sponsored by  4 Paws 4 Life Rescue and Boarding', 2),
(2, 'Adopt-A-Dog', '375 S Academy Blvd, Colorado Springs, CO 80910', '2019-07-24 12:00:00', 'A fun event sponsored by  4 Paws 4 Life Rescue and Boarding', 2),
(3, 'Dog Adoption Event', '2720 S Academy Blvd, Colorado Springs, CO 80916', '2019-06-30 09:00:00', 'A fun event sponsored by  All Breed Rescue & Training', 1),
(4, 'Adoption of Animals', '3705 E Woodmen Rd, Colorado Springs, CO 80920', '2019-09-30 13:00:00', 'A fun event sponsored by  Paws N Hooves', 3),
(5, 'Dog Fun and Adoption', ' 2990 N Powers Blvd, Colorado Springs, CO 80922', '2019-10-31 10:00:00', 'A fun event sponsored by  No Hound Unhomed', 4),
(6, 'Local Dog Adoption 2019', '6110 Martinez St, Colorado Springs, CO 80913', '2019-09-22 11:00:00', 'A fun event sponsored by  Colorado Animal Rescue Express', 5),
(7, 'Colorado Spring Dog Adoption', '357 E Fillmore St, Colorado Springs, CO 80907', '2019-11-30 14:00:00', 'A fun event sponsored by  No Hound Unhomed', 4),
(8, 'New Haven Dog Adoption', '6365 Source Center Point, Colorado Springs, CO 80923', '2019-12-10 10:00:00', 'A fun event sponsored by  4 Paws 4 Life Rescue and Boarding', 2),
(9, 'Paws N Hooves Adoption Event', '7808 N Academy Blvd, Colorado Springs, CO 80920', '2019-06-08 10:00:00', 'A fun event sponsored by  Paws N Hooves', 3),
(10, 'Dog Rescue Adoption Event', '5115 Chiles Ave Bldg 510, Colorado Springs, CO 80913', '2019-06-12 10:00:00', 'A fun event sponsored by  Paws N Hooves', 3),
(11, 'Dogapalooza 2019', '4241 Austin Bluffs Pkwy, Colorado Springs, CO 80918', '2019-06-28 10:00:00', 'A fun event sponsored by  No Hound Unhomed', 4);

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `dog_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`dog_id`) VALUES
(35),
(36);

-- --------------------------------------------------------

--
-- Table structure for table `foster_home`
--

CREATE TABLE `foster_home` (
  `foster_home_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `max_capacity` int(11) NOT NULL,
  `rescue_group_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `foster_home`
--

INSERT INTO `foster_home` (`foster_home_id`, `address`, `phone_number`, `max_capacity`, `rescue_group_id`) VALUES
(1, '2911 Colorado Blvd, Idaho Springs, CO 80452', '(303) 567-1410', 3, 1),
(2, '1195 S Colorado Blvd, Denver, CO 80246', '(303) 756-8430', 5, 2),
(3, '3021 W Colorado Ave, Colorado Springs, CO 80904', '(719) 444-0132', 7, 3),
(4, '3350 Colorado Blvd, Denver, CO 80205', '(303) 394-1541', 4, 4),
(5, '1035 N Colorado Ave, Brush, CO 80723', '(970) 842-2717', 3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `rescue_group`
--

CREATE TABLE `rescue_group` (
  `rescue_group_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rescue_group`
--

INSERT INTO `rescue_group` (`rescue_group_id`, `name`, `address`, `phone_number`) VALUES
(1, 'All Breed Rescue & Training', '410 1/2 E Fillmore St, Colorado Springs, CO 80907', '(719) 264-6460'),
(2, '4 Paws 4 Life Rescue and Boarding', '3648 N Perry Park Rd, Sedalia, CO 80135', '(303) 688-8569'),
(3, 'Paws N Hooves', '16750 Thompson Rd, Colorado Springs, CO 80908', '(719) 494-0158'),
(4, 'No Hound Unhomed', '4295 Northpark Dr, Colorado Springs, CO 80907', '(719) 244-2208'),
(5, 'Colorado Animal Rescue Express', '5276 S Hanover Way, Englewood, CO 80111', '(719) 510-2113');

-- --------------------------------------------------------

--
-- Table structure for table `shelter`
--

CREATE TABLE `shelter` (
  `shelter_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `policy` varchar(255) NOT NULL,
  `max_capacity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `shelter`
--

INSERT INTO `shelter` (`shelter_id`, `name`, `address`, `policy`, `max_capacity`) VALUES
(1, 'Denver Animal Shelter', '1241 W Bayaud Ave, Denver, CO 80223', 'Kill', 100),
(2, 'Humane Society of Peaks Region', '610 Abbot Ln, Colorado Springs, CO 80905', 'Kill', 230),
(3, 'Adams County Animal Shelter/Adoption', '10705 Fulton St, Brighton, CO 80601', 'Kill', 200),
(4, 'Foothills Animal Shelter', '580 McIntyre St, Golden, CO 80401', 'Kill', 150),
(5, 'Aurora Animal Shelter', '15750 E 32nd Ave, Aurora, CO 80011', 'Kill', 120);

-- --------------------------------------------------------

--
-- Table structure for table `transport`
--

CREATE TABLE `transport` (
  `transport_id` int(11) NOT NULL,
  `shelter_id` int(11) DEFAULT NULL,
  `rescue_group_id` int(11) DEFAULT NULL,
  `foster_home_id` int(11) DEFAULT NULL,
  `dog_id` int(11) DEFAULT NULL,
  `date_time` datetime NOT NULL,
  `capacity` int(11) NOT NULL,
  `instructions` varchar(255) DEFAULT NULL,
  `request_sent_date` datetime NOT NULL,
  `acceptance_date` datetime DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'PENDING',
  `vehicle` varchar(255) NOT NULL,
  `license_plate` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `transport`
--

INSERT INTO `transport` (`transport_id`, `shelter_id`, `rescue_group_id`, `foster_home_id`, `dog_id`, `date_time`, `capacity`, `instructions`, `request_sent_date`, `acceptance_date`, `status`, `vehicle`, `license_plate`) VALUES
(1, 1, 1, 1, 1, '2019-06-13 10:00:00', 2, NULL, '2019-05-15 00:00:00', '2019-06-04 00:00:00', 'ACCEPTED', 'Honda Civic', 'LAB111'),
(2, 1, 1, 1, 1, '2018-07-13 15:00:00', 4, NULL, '2018-04-06 00:00:00', '2019-06-04 00:00:00', 'ACCEPTED', 'Lamborghini Gallardo', 'COOLGUY');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dog`
--
ALTER TABLE `dog`
  ADD PRIMARY KEY (`dog_id`);

--
-- Indexes for table `dogs_at_events`
--
ALTER TABLE `dogs_at_events`
  ADD PRIMARY KEY (`dog_id`,`event_id`),
  ADD UNIQUE KEY `dog_id` (`dog_id`,`event_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `dog_locations`
--
ALTER TABLE `dog_locations`
  ADD KEY `dogs_locations_ibfk_1` (`dog_id`),
  ADD KEY `dogs_locations_ibfk_2` (`shelter_id`),
  ADD KEY `dogs_locations_ibfk_3` (`rescue_group_id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `event_ibfk_1` (`rescue_group_id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD KEY `favorites_ibfk_1` (`dog_id`);

--
-- Indexes for table `foster_home`
--
ALTER TABLE `foster_home`
  ADD PRIMARY KEY (`foster_home_id`),
  ADD KEY `foster_home_ibfk_1` (`rescue_group_id`);

--
-- Indexes for table `rescue_group`
--
ALTER TABLE `rescue_group`
  ADD PRIMARY KEY (`rescue_group_id`);

--
-- Indexes for table `shelter`
--
ALTER TABLE `shelter`
  ADD PRIMARY KEY (`shelter_id`);

--
-- Indexes for table `transport`
--
ALTER TABLE `transport`
  ADD PRIMARY KEY (`transport_id`),
  ADD KEY `transport_ibfk_1` (`shelter_id`),
  ADD KEY `transport_ibfk_2` (`rescue_group_id`),
  ADD KEY `transport_ibfk_3` (`foster_home_id`),
  ADD KEY `transport_ibfk_4` (`dog_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dog`
--
ALTER TABLE `dog`
  MODIFY `dog_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `foster_home`
--
ALTER TABLE `foster_home`
  MODIFY `foster_home_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `rescue_group`
--
ALTER TABLE `rescue_group`
  MODIFY `rescue_group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `shelter`
--
ALTER TABLE `shelter`
  MODIFY `shelter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transport`
--
ALTER TABLE `transport`
  MODIFY `transport_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dogs_at_events`
--
ALTER TABLE `dogs_at_events`
  ADD CONSTRAINT `dogs_at_events_ibfk_1` FOREIGN KEY (`dog_id`) REFERENCES `dog` (`dog_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dogs_at_events_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dog_locations`
--
ALTER TABLE `dog_locations`
  ADD CONSTRAINT `dogs_locations_ibfk_1` FOREIGN KEY (`dog_id`) REFERENCES `dog` (`dog_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dogs_locations_ibfk_2` FOREIGN KEY (`shelter_id`) REFERENCES `shelter` (`shelter_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `dogs_locations_ibfk_3` FOREIGN KEY (`rescue_group_id`) REFERENCES `rescue_group` (`rescue_group_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`rescue_group_id`) REFERENCES `rescue_group` (`rescue_group_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`dog_id`) REFERENCES `dog` (`dog_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `foster_home`
--
ALTER TABLE `foster_home`
  ADD CONSTRAINT `foster_home_ibfk_1` FOREIGN KEY (`rescue_group_id`) REFERENCES `rescue_group` (`rescue_group_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `transport`
--
ALTER TABLE `transport`
  ADD CONSTRAINT `transport_ibfk_1` FOREIGN KEY (`shelter_id`) REFERENCES `shelter` (`shelter_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transport_ibfk_2` FOREIGN KEY (`rescue_group_id`) REFERENCES `rescue_group` (`rescue_group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transport_ibfk_3` FOREIGN KEY (`foster_home_id`) REFERENCES `foster_home` (`foster_home_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transport_ibfk_4` FOREIGN KEY (`dog_id`) REFERENCES `dog` (`dog_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
