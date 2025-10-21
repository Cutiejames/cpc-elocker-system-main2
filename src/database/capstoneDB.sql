-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: capstone
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(20) DEFAULT 'student',
  `status` enum('active','disabled') DEFAULT 'active',
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (34,'john1','$2b$10$bxSXgH9aL323xtW2kf8d4e49T6J3QZRP7iQ62t/w3Exxw85hRvhR2','student','active'),(38,'john','$2b$10$hSvax9Ao/tYeVyr8Dabe2eMhvJGxG/5vQUpkqfJVf.TPHRtWDECJC','student','active'),(40,'valiente','$2b$10$rEEEyGpe5/do/1gbfCNwveaNfJOdOJE9PnxxQkCl53wPdx8Xt5T4O','student','active'),(44,'admin','$2b$10$V9qz9NQP9HH0xZLV/SFZIOFgEIUUpzS.ifsNoJmBgCjy7Tl5AyKuC','admin','active'),(45,'jane','$2b$10$XkHWwyeEyJBrjoUhPM0.Cumpdf60IJIiHHNRt1wQhaPg5k4j2ZrQC','student','active'),(46,'Cabiro','$2b$10$aD.7A4UBgJ3fTPcG6hxveentJEZOhXnMxX7Omx3jz5oQG/DcFmue6','admin','active'),(47,'dionne','$2b$10$oftkGIDLLV88M8bd/IoPK.874D2zwxvmN.2GsE227CtRIGR.Tij4W','student','active'),(51,'Cabiro1','$2b$10$/fJ5ixAWKnPB56TXLhv8ZeFJr/Q/PdJuzMJ33qsSBBOZID5nYdyli','admin','active'),(55,'test','$2b$10$xRzM/3jVi6qSM9bUQymJLel1jkhW/YXfkbIuwPDn7lRZIIANqRy2i','student','active'),(57,'test1','$2b$10$fu3U7kFDWM.8b3aFcPT/XupK2eTXTfgr/Q0ubal.tk2KcQ.RZivsm','student','active'),(58,'test2','$2b$10$FoKjQObd8H6oBWb8wpsP1uuFJ2/K5OOaZZxtD1fLLjJnwXsPvnr/e','student','active'),(61,'test3','$2b$10$0bpguejAuZ546/dBakNGfeDUV3z1z4RYym3IBJXZmeeqxzxW6Gnji','student','active'),(64,'test4','$2b$10$CqcX9dxWmoIbbZNfgOycdei0rPbqA1L7ks8L6wqTtdApasMSmfWWm','student','active'),(65,'test5','$2b$10$6Tw8KtctDuLyImbStWUrPe/utoWjE9DqGR/Rwgoi5skFxzcNd/kwK','student','active'),(69,'test6','$2b$10$aIbe4Vo850H0uEe6d35T5.VYYAe8lQNw170e2/zAt6ShHGgtpm316','student','active'),(70,'test7','$2b$10$srb9fR3j0ohDEYWysVMJDeF0.c7JZM9S9Pmm.kupsz0sUIdaDNCei','student','disabled'),(71,'test8','$2b$10$NrFDu9lT1xjeLT5wvrNRs.W/2wjU3dbXBZcw0PCgEVBV5ZWqYKMDS','student','disabled'),(74,'test9','$2b$10$67zQqCQoNhLkwbyTVqYzYeH203pxtuQxK6I3RhnN9.gE0T8.5ORxm','student','active'),(76,'test10','$2b$10$gW3gvcOgFInWCqpk7XvN/.U4OPtDJ9/CFyG64e6Z1vjoqm/.xsE5O','student','active'),(80,'jems','$2b$10$2PuUin2.pxGL5nAq261gaeD2Oxz/I/ka7/NrLU7MlkBo7PrnZwE.m','admin','active'),(81,'test11','$2b$10$oTrE60WCt63.RPRdLgkasuai/K03zaovEoR6GN0mlwqaKcRmyy.Q6','student','active'),(82,'test12','$2b$10$x8e8BadF0j7beyB6nb4fiOeGjRWTXv5nhcJx2jT/fh9IxARNYf/D6','student','active'),(83,'test13','$2b$10$FZX7yrVC4b3cZwWQAAmPpuwWJ2XXHbv0TvKg1R337AN8IBE74lG5q','student','active'),(84,'test14','$2b$10$jADiJp4MrWo/NvUzukKKOuEcUYv.X2w.svBxVRopa2FaNv/cLegh2','student','active'),(85,'test15','$2b$10$hAv/ORlWis1iTBMBIC77j.fnFZO4SQu6pcLDwV41BeXBCNRIeTlay','student','active'),(88,'jam','$2b$10$9546cuf1XYshYYGau6YRkO/acP8j3BqHUsU/o5afPBO4ISksV9LHG','admin','active'),(91,'jamii','$2b$10$oiOqugqpvu43SxuLi9iQ2.5gfMBHT2C1EsgZ./5OhdBokoOc/a6Bu','student','active'),(92,'yan','$2b$10$AF.SbhxScuEWuapsmcwDTObVKhRRe0ktLOp2z27OESHG3bLSWkJTe','student','active'),(93,'test16','$2b$10$mS4rmfCbu2t82LiWWeRWu.TMXbsNObsMm3Ie25G5CVvmKFfBYlxA2','student','active'),(97,'test17','$2b$10$j3dnWwMzxpIg3fdg2a8JFuipbgObU9SeqRmWpj8oDGUYdSPiwnNB.','student','active'),(98,'test18','$2b$10$Xg/h9hsRVqGY0M6CzsEfBeSJ.WEcnd2NAw4i2b/XJUC6xvwYetJ9u','student','active'),(99,'test19','$2b$10$oqg0g8tN5Rb90YYEmRMdWOTrZZKZ0WKKnElNTVKxemCM/Yp2/yEQK','student','active'),(100,'valentine','$2b$10$shDFnsuniDP5dUhNPsWcQuhyCTYLnsRerSb9VW.v9C3oUhFyVdj62','student','active'),(101,'anna','$2b$10$/TiKxupsLA9DZnn0eCC2QeW2uC4W.wpCgvJMwISN36ve21ZBwbkhO','student','active'),(103,'test20','$2b$10$5wHBaeC900I.fRMlX5rcO.QKSoQ.pCI6pP3mGEHTUlK/NzeMH1.Am','student','active');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audit_logs` (
  `audit_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) NOT NULL,
  `admin_username` varchar(100) NOT NULL,
  `activity` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`audit_id`),
  KEY `audit_logs_ibfk_1` (`admin_id`),
  CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` VALUES (3,24,'Cabiro','Disabled user account (user_id: 47)','2025-09-23 17:55:23'),(4,24,'Cabiro','Disabled user account (user_id: 47)','2025-09-23 18:01:19'),(5,24,'Cabiro','Enabled user account (user_id: 47)','2025-09-23 18:19:17'),(6,50,'jems','Approved rental (rental_id: 40, locker_id: 50)','2025-09-24 15:46:49'),(7,50,'jems','Cancelled rental (rental_id: 39, locker_id: 48)','2025-09-24 15:47:55'),(8,50,'jems','Downloaded dashboard report (2025-08-10 to 2025-09-10)','2025-09-24 15:52:40'),(9,50,'jems','Reset password for account_id: 40 (student_id: 20220660)','2025-09-24 15:58:52'),(10,50,'jems','Approved rental for Locker B2','2025-09-24 16:06:37'),(11,50,'jems','Cancelled rental for Locker undefined','2025-09-24 16:09:58'),(12,50,'jems','Cancelled rental for Locker B4','2025-09-24 16:10:49'),(13,50,'jems','Reset password for student: James Ryan Craste Valiente (ID: 20220660)','2025-09-24 16:27:13'),(14,50,'jems','Disabled account of student: test8 test8 test8 (ID: 44)','2025-09-24 16:39:16'),(15,50,'jems','Disabled account of student: 7 7 7 (Student ID: 202201024)','2025-09-24 16:47:04'),(16,50,'jems','Enabled account of student: test9 9 test9 (stud_id: 20250001)','2025-09-24 16:51:34'),(17,50,'jems','Enabled account of student: test10 10 test10 (Student ID: 20250002)','2025-09-24 16:52:49'),(18,50,'jems','Cancelled rental for Locker B6','2025-09-24 17:53:36'),(19,50,'jems','Cancelled rental for Locker C2','2025-09-25 16:04:09'),(20,50,'jems','Cancelled rental for Locker C2','2025-09-25 16:35:12'),(21,50,'jems','Approved rental for Locker C2','2025-09-25 16:37:24'),(22,50,'jems','Approved rental for Locker C1','2025-09-25 16:40:49'),(23,50,'jems','Added new locker: C6 (Location: lobby)','2025-09-25 16:54:16'),(24,50,'jems','Created new user: jems q sy (Student ID: 20220680)','2025-09-25 17:11:24'),(25,50,'jems','Created new user: jems q sy (Student ID: 20220690)','2025-09-25 17:13:48'),(26,50,'jems','Created new user: yan q yan (Student ID: 20220700)','2025-09-25 17:17:03'),(27,50,'jems','Created new user: test16 test 16 (Student ID: 20220701)','2025-09-25 17:21:35'),(28,50,'jems','Added new locker: C7 (Location: lobby)','2025-09-25 17:23:16'),(29,50,'jems','Added new course: Bachelor of Secondary Education (BSED)','2025-09-25 17:32:47'),(30,50,'jems','Added new locker: C8 (Location: lobby)','2025-09-25 17:37:25'),(31,50,'jems','Cancelled rental for Locker C3','2025-09-25 17:47:02'),(32,50,'jems','Assigned locker C3 to student: undefined undefined undefined (Student ID: 20220701)','2025-09-25 17:47:31'),(33,50,'jems','Cancelled rental for Locker C3','2025-09-25 18:00:54'),(34,50,'jems','Assigned locker C3 to student: test16 test 16 (Student ID: 20220701)','2025-09-25 18:01:02'),(35,50,'jems','Assigned locker C3 to student: test16 test 16 (Student ID: 20220701)','2025-09-28 04:00:55'),(36,50,'jems','Assigned locker C3 to student: test16 test 16 (Student ID: 20220701)','2025-09-28 04:19:06'),(37,50,'jems','Downloaded dashboard report (2025-09-30 to 2025-10-30)','2025-10-03 07:45:05'),(38,50,'jems','Downloaded dashboard report (2025-10-03 to 2025-10-03)','2025-10-03 15:09:38'),(39,50,'jems','Downloaded dashboard report (2025-09-30 to 2025-10-30)','2025-10-03 15:11:17'),(40,50,'jems','Downloaded dashboard report (Wed Oct 01 2025 00:00:00 GMT+0800 (Philippine Standard Time) to Fri Oct 31 2025 00:00:00 GMT+0800 (Philippine Standard Time))','2025-10-03 15:11:55'),(41,50,'jems','Downloaded dashboard report (Wed Oct 01 2025 00:00:00 GMT+0800 (Philippine Standard Time) to Fri Oct 31 2025 00:00:00 GMT+0800 (Philippine Standard Time))','2025-10-03 15:14:32'),(42,50,'jems','Downloaded dashboard report (2025-10-01 to 2025-10-31)','2025-10-03 15:16:20'),(43,50,'jems','Downloaded dashboard report (2025-10-01 to 2025-10-31)','2025-10-03 15:22:50'),(44,50,'jems','Downloaded dashboard report (2025-10-01 to 2025-10-31)','2025-10-03 15:25:39'),(45,50,'jems','Downloaded dashboard report (2025-08-10 to 2025-09-10)','2025-10-03 15:27:04'),(46,50,'jems','Downloaded dashboard report (2025-08-10 to 2025-09-13)','2025-10-03 15:27:12'),(47,50,'jems','Downloaded dashboard report (2025-10-01 to 2025-10-31)','2025-10-03 15:27:26'),(48,50,'jems','Approved rental for Locker A6','2025-10-09 16:28:19'),(49,50,'jems','Approved rental for Locker A11 (rental_id: 85)','2025-10-09 16:40:52'),(50,50,'jems','Verified payment ID 3 with amount 120','2025-10-09 17:13:53'),(51,50,'jems','verified payment of test18 18 test18 (amount ₱60), locker 55 now active','2025-10-09 18:20:07'),(52,50,'jems','verified payment of test19 19 test19 (amount ₱120), locker 58 now active','2025-10-10 16:41:46'),(53,50,'jems','Cancelled rental for Locker C3','2025-10-10 16:58:52'),(54,50,'jems','verified payment of test19 19 test19 (amount ₱240), locker 68 now active','2025-10-10 17:23:10'),(55,50,'jems','Added new locker: A6 (Location: lobby)','2025-10-11 18:44:13'),(56,50,'jems','Added new locker: A8 (Location: lobby)','2025-10-11 18:44:20'),(57,50,'jems','Added new locker: A11 (Location: lobby)','2025-10-11 18:44:26'),(58,50,'jems','Cancelled rental for Locker A6','2025-10-14 06:21:56'),(59,50,'jems','Cancelled rental for Locker A6','2025-10-14 06:28:51'),(60,50,'jems','Cancelled rental for Locker A6','2025-10-14 06:37:27'),(61,50,'jems','Cancelled rental for Locker A6','2025-10-14 06:43:31'),(62,50,'jems','Cancelled rental for Locker A6','2025-10-14 06:51:28'),(63,50,'jems','Cancelled rental for Locker A6','2025-10-14 06:54:46'),(64,50,'jems','Cancelled rental for Locker A6','2025-10-14 06:56:06'),(65,50,'jems','Cancelled rental for Locker A6','2025-10-14 07:02:44'),(66,50,'jems','Cancelled rental for Locker A6','2025-10-14 07:03:27'),(67,50,'jems','Cancelled rental for Locker A6','2025-10-14 07:04:14'),(68,50,'jems','Cancelled rental for Locker A6','2025-10-14 07:12:13'),(69,50,'jems','Cancelled rental for Locker A6','2025-10-14 07:13:59'),(70,50,'jems','Cancelled rental for Locker A6','2025-10-14 07:16:57');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancellation_reasons`
--

DROP TABLE IF EXISTS `cancellation_reasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cancellation_reasons` (
  `cancel_id` int(11) NOT NULL AUTO_INCREMENT,
  `rental_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reason` text NOT NULL,
  `cancelled_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`cancel_id`),
  KEY `rental_id` (`rental_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `cancellation_reasons_ibfk_1` FOREIGN KEY (`rental_id`) REFERENCES `locker_rentals` (`rental_id`) ON DELETE CASCADE,
  CONSTRAINT `cancellation_reasons_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancellation_reasons`
--

LOCK TABLES `cancellation_reasons` WRITE;
/*!40000 ALTER TABLE `cancellation_reasons` DISABLE KEYS */;
INSERT INTO `cancellation_reasons` VALUES (6,61,55,'i don’t need it anymore as in','2025-09-25 15:50:54'),(7,62,55,'i don’t need it anymore as in','2025-09-25 16:01:28'),(8,64,55,'i don’t need it anymore as in','2025-09-25 16:03:07'),(9,65,55,'i don’t need it anymore as in','2025-09-25 16:34:43');
/*!40000 ALTER TABLE `cancellation_reasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(255) DEFAULT NULL,
  `acronym` varchar(20) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  UNIQUE KEY `course_name` (`course_name`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (8,'BSHM',NULL,NULL),(9,'BSIT',NULL,NULL),(44,'Bachelor in Elementary Education','BEED','24.jpg'),(48,'Bachelor of Science in Information Technology','BSIT','24.jpg'),(50,'Bachelor of Science in Hospitality Management','BSHM','50.jpg'),(52,'Bachelor of Secondary Education','BSED','50.jpg');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locker_payments`
--

DROP TABLE IF EXISTS `locker_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locker_payments` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `rental_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `amount_paid` decimal(10,2) DEFAULT NULL,
  `confirmed_amount` decimal(10,2) DEFAULT 0.00,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `receipt_path` varchar(255) DEFAULT NULL,
  `verified` tinyint(1) NOT NULL,
  `verified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locker_payments`
--

LOCK TABLES `locker_payments` WRITE;
/*!40000 ALTER TABLE `locker_payments` DISABLE KEYS */;
INSERT INTO `locker_payments` VALUES (1,84,65,120.00,0.00,'qr','2025-10-10 00:23:18','\"payment for month 2 & 3\"','src\\uploads\\receipts\\1760026998120_277188.jpg',0,NULL),(2,85,65,120.00,0.00,'qr','2025-10-10 00:35:41','\"payment for month 2 & 3\"','src\\uploads\\receipts\\1760027741841_284229.jpg',1,NULL),(3,85,65,120.00,120.00,'qr','2025-10-10 01:08:42','\"payment for month 2 & 3\"','src\\uploads\\receipts\\1760029722288_698972.jpg',1,'2025-10-10 01:13:53'),(4,87,NULL,60.00,60.00,'qr',NULL,'\"payment for month 2 & 3\"','65.jpg',1,'2025-10-10 02:20:07'),(5,87,NULL,60.00,0.00,'qr',NULL,'\"payment for month 2 & 3\"','65.jpg',0,'2025-10-10 02:14:56'),(6,87,NULL,60.00,0.00,'qr',NULL,'\"payment for month 2 & 3\"','65.jpg',0,'2025-10-10 02:16:16'),(7,88,66,60.00,120.00,'qr',NULL,'payment for month 2 ','66.jpg',1,'2025-10-11 00:41:46'),(8,89,66,240.00,240.00,'qr','2025-10-11 01:02:29','auto-detected receipt upload','66.jpg',1,'2025-10-11 01:23:10');
/*!40000 ALTER TABLE `locker_payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locker_rentals`
--

DROP TABLE IF EXISTS `locker_rentals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locker_rentals` (
  `rental_id` int(11) NOT NULL AUTO_INCREMENT,
  `locker_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `months` int(11) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `paid_amount` decimal(10,2) DEFAULT NULL,
  `balance` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `cancelled_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `action_type` enum('rent','reserve') NOT NULL DEFAULT 'rent',
  PRIMARY KEY (`rental_id`),
  KEY `locker_rentals_ibfk_1` (`locker_id`),
  KEY `locker_rentals_ibfk_2` (`user_id`),
  CONSTRAINT `locker_rentals_ibfk_1` FOREIGN KEY (`locker_id`) REFERENCES `lockers` (`locker_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `locker_rentals_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locker_rentals`
--

LOCK TABLES `locker_rentals` WRITE;
/*!40000 ALTER TABLE `locker_rentals` DISABLE KEYS */;
INSERT INTO `locker_rentals` VALUES (20,39,20,4,'2025-08-12','2025-12-12',240.00,60.00,180.00,'cash','active',NULL,'2025-08-12 14:02:14','reserve'),(21,40,20,5,'2025-08-12','2026-01-12',300.00,60.00,240.00,'qr','active',NULL,'2025-08-12 14:08:26','rent'),(22,41,31,5,'2025-08-14','2026-01-14',300.00,60.00,240.00,'cash','active',NULL,'2025-08-14 00:28:09','reserve'),(23,42,31,5,'2025-08-14','2026-01-14',300.00,60.00,240.00,'cash','active',NULL,'2025-08-14 01:07:52','reserve'),(24,43,33,5,'2025-08-14','2026-01-14',300.00,60.00,240.00,'cash','active',NULL,'2025-08-14 01:37:19','reserve'),(26,49,33,5,'2025-08-14','2026-01-14',300.00,60.00,240.00,'qr','active',NULL,'2025-08-14 01:45:06','rent'),(28,45,34,5,'2025-08-27','2026-01-27',300.00,60.00,240.00,'qr','active',NULL,'2025-08-27 01:56:01','rent'),(29,46,36,5,'2025-08-28','2026-01-28',300.00,60.00,240.00,'cash','active',NULL,'2025-08-28 00:46:37','reserve'),(30,47,36,5,'2025-08-28','2026-01-28',300.00,60.00,240.00,'cash','active',NULL,'2025-08-28 01:22:29','reserve'),(40,50,36,6,'2025-09-24','2026-03-24',360.00,120.00,240.00,'cash','active',NULL,'2025-09-09 00:19:25','rent'),(41,51,36,6,'2025-09-25','2026-03-25',360.00,120.00,240.00,'cash','active',NULL,'2025-09-09 00:19:55','rent'),(42,52,40,6,'2025-09-09','2026-03-09',360.00,120.00,240.00,'cash','cancelled','2025-09-25 00:09:58','2025-09-09 01:05:13','rent'),(43,53,42,6,'2025-09-09','2026-03-09',360.00,120.00,240.00,'cash','cancelled','2025-09-25 00:10:49','2025-09-09 01:09:46','rent'),(44,54,43,1,'2025-09-12','2025-10-12',60.00,60.00,0.00,'cash','active',NULL,'2025-09-11 23:49:06','reserve'),(45,55,43,1,'2025-09-12','2025-10-12',60.00,60.00,0.00,'cash','cancelled','2025-09-25 01:53:36','2025-09-12 00:22:44','rent'),(46,56,42,2,'2025-09-15','2025-11-15',120.00,60.00,60.00,'cash','active',NULL,'2025-09-12 00:34:43','reserve'),(47,57,44,1,'2025-09-12','2025-10-12',60.00,60.00,0.00,'cash','pending',NULL,'2025-09-12 00:44:00','rent'),(48,53,47,NULL,'2025-09-25',NULL,NULL,NULL,NULL,'cash','expired','2025-09-28 11:35:00','2025-09-25 01:02:15','reserve'),(52,55,51,NULL,'2025-09-25','2025-09-27',0.00,0.00,0.00,'cash','expired','2025-09-28 11:35:00','2025-09-25 01:54:42','reserve'),(53,58,52,NULL,'2025-09-25','2025-09-27',0.00,0.00,0.00,'cash','expired','2025-09-28 11:35:00','2025-09-25 02:09:48','reserve'),(61,66,55,NULL,'2025-09-25',NULL,NULL,NULL,NULL,'cash','cancelled',NULL,'2025-09-25 23:46:24','reserve'),(62,66,55,NULL,'2025-09-25',NULL,NULL,NULL,NULL,'cash','cancelled',NULL,'2025-09-25 23:52:53','reserve'),(63,67,55,1,'2025-09-25','2025-10-25',60.00,60.00,0.00,'cash','cancelled','2025-09-26 00:04:09','2025-09-25 23:53:57','rent'),(64,66,55,NULL,'2025-09-26',NULL,NULL,NULL,NULL,'cash','cancelled',NULL,'2025-09-26 00:02:34','reserve'),(65,66,55,NULL,'2025-09-26',NULL,NULL,NULL,NULL,'cash','cancelled',NULL,'2025-09-26 00:06:05','reserve'),(66,67,55,1,'2025-09-26','2025-10-26',60.00,60.00,0.00,'cash','cancelled','2025-09-26 00:35:12','2025-09-26 00:06:12','rent'),(67,67,55,1,'2025-09-26','2025-10-26',60.00,60.00,0.00,'cash','active',NULL,'2025-09-26 00:36:22','rent'),(68,66,55,5,'2025-09-26','2026-02-26',300.00,120.00,180.00,'cash','active',NULL,'2025-09-26 00:39:01','reserve'),(69,68,60,5,'2025-09-26','2026-02-26',300.00,120.00,180.00,'cash','cancelled','2025-09-26 01:47:02','2025-09-26 01:44:25','rent'),(70,68,60,5,'2025-09-26','2026-02-26',300.00,120.00,180.00,'cash','cancelled','2025-09-26 02:00:54','2025-09-26 01:47:31','rent'),(71,68,60,5,'2025-09-26','2026-02-26',300.00,120.00,180.00,'cash','expired','2025-09-28 11:59:00','2025-09-26 02:01:02','rent'),(72,68,60,3,'2025-09-28','2025-12-28',180.00,120.00,60.00,'cash','expired','2025-09-28 12:18:00','2025-09-28 12:00:55','rent'),(73,69,60,2,'2025-09-28','2025-11-28',120.00,60.00,60.00,'cash','expired','2025-09-28 12:04:00','2025-09-28 12:02:59','rent'),(74,68,60,3,'2025-09-28','2025-12-28',180.00,120.00,60.00,'cash','expired','2025-10-03 00:25:00','2025-09-28 12:19:06','rent'),(75,53,60,2,'2025-10-06','2025-12-06',120.00,60.00,60.00,'qr','active',NULL,'2025-10-06 23:24:09','rent'),(82,71,64,3,'2025-10-07','2026-01-07',180.00,60.00,120.00,'qr','active',NULL,'2025-10-07 00:42:04','rent'),(83,69,64,3,'2025-10-07','2026-01-07',180.00,60.00,120.00,'qr','active',NULL,'2025-10-07 00:46:49','rent'),(86,68,65,5,'2025-10-10','2026-03-10',300.00,0.00,300.00,'qr','cancelled','2025-10-11 00:58:52','2025-10-10 00:50:59','rent'),(87,55,65,5,'2025-10-10','2026-03-10',300.00,60.00,240.00,'qr','active',NULL,'2025-10-10 01:42:52','rent'),(88,58,66,5,'2025-10-11','2026-03-11',300.00,240.00,60.00,'qr','active',NULL,'2025-10-11 00:13:21','rent'),(89,68,66,7,'2025-10-11','2026-05-11',420.00,420.00,0.00,'qr','active',NULL,'2025-10-11 01:00:23','rent'),(90,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','cancelled','2025-10-14 14:21:56','2025-10-14 14:13:44','rent'),(91,76,34,4,'2025-10-14','2026-02-14',240.00,120.00,120.00,'qr','cancelled','2025-10-14 14:28:51','2025-10-14 14:27:29','rent'),(92,76,34,6,'2025-10-14','2026-04-14',360.00,120.00,240.00,'qr','cancelled','2025-10-14 14:37:27','2025-10-14 14:29:43','rent'),(93,76,68,4,'2025-10-14','2026-02-14',240.00,120.00,120.00,'qr','cancelled','2025-10-14 14:43:31','2025-10-14 14:37:44','rent'),(94,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','cancelled','2025-10-14 14:51:28','2025-10-14 14:50:56','rent'),(95,76,68,5,'2025-10-14','2026-03-14',300.00,60.00,240.00,'qr','cancelled','2025-10-14 14:54:46','2025-10-14 14:53:44','rent'),(96,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','cancelled','2025-10-14 14:56:06','2025-10-14 14:54:58','rent'),(97,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','cancelled','2025-10-14 15:02:44','2025-10-14 14:56:20','rent'),(98,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','cancelled','2025-10-14 15:03:27','2025-10-14 15:03:07','rent'),(99,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','cancelled','2025-10-14 15:04:14','2025-10-14 15:03:39','rent'),(100,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','cancelled','2025-10-14 15:12:13','2025-10-14 15:04:27','rent'),(101,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','cancelled','2025-10-14 15:13:59','2025-10-14 15:13:22','rent'),(102,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','cancelled','2025-10-14 15:16:57','2025-10-14 15:16:15','rent'),(103,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','pending',NULL,'2025-10-14 15:18:42','rent'),(104,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','pending',NULL,'2025-10-14 15:20:08','rent'),(105,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','pending',NULL,'2025-10-14 15:20:09','rent'),(106,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','pending',NULL,'2025-10-14 15:20:12','rent'),(107,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','pending',NULL,'2025-10-14 15:20:12','rent'),(108,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','pending',NULL,'2025-10-14 15:20:12','rent'),(109,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','pending',NULL,'2025-10-14 15:20:13','rent'),(110,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','pending',NULL,'2025-10-14 15:20:13','rent'),(111,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','pending',NULL,'2025-10-14 15:20:13','rent'),(112,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','pending',NULL,'2025-10-14 15:20:13','rent'),(113,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','pending',NULL,'2025-10-14 15:20:13','rent'),(114,76,68,5,'2025-10-14','2026-03-14',300.00,120.00,180.00,'qr','pending',NULL,'2025-10-14 15:20:13','rent');
/*!40000 ALTER TABLE `locker_rentals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lockers`
--

DROP TABLE IF EXISTS `lockers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lockers` (
  `locker_id` int(11) NOT NULL AUTO_INCREMENT,
  `locker_number` varchar(10) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `status` enum('available','reserved','pending','rented') NOT NULL DEFAULT 'available',
  `assigned_to` int(11) DEFAULT NULL,
  `reserved_date` datetime DEFAULT NULL,
  `reserve_expiry` datetime DEFAULT NULL,
  `rented_date` datetime DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`locker_id`),
  UNIQUE KEY `locker_number` (`locker_number`),
  KEY `lockers_ibfk_1` (`assigned_to`),
  CONSTRAINT `lockers_ibfk_1` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lockers`
--

LOCK TABLES `lockers` WRITE;
/*!40000 ALTER TABLE `lockers` DISABLE KEYS */;
INSERT INTO `lockers` VALUES (39,'A1','lobby','rented',20,NULL,'0000-00-00 00:00:00','2025-08-12 14:06:59','2025-12-12 14:06:59','test','2025-08-12 05:53:05','2025-08-12 06:06:59'),(40,'A2','lobby','rented',20,NULL,'0000-00-00 00:00:00','2025-08-12 14:08:26','2026-01-12 14:08:26','test','2025-08-12 05:53:11','2025-08-12 06:08:26'),(41,'A3','lobby','rented',31,NULL,'0000-00-00 00:00:00','2025-08-14 01:39:00','2026-01-14 01:39:00','test','2025-08-12 05:53:17','2025-08-13 17:39:00'),(42,'A4','lobby','rented',31,NULL,'0000-00-00 00:00:00','2025-08-14 01:18:50','2026-01-14 01:18:50','test','2025-08-12 05:53:23','2025-08-13 17:18:50'),(43,'A5','lobby','rented',33,NULL,'0000-00-00 00:00:00','2025-08-14 01:39:42','2026-01-14 01:39:42','test','2025-08-12 05:53:29','2025-08-13 17:39:42'),(45,'A7','lobby','rented',34,NULL,'0000-00-00 00:00:00','2025-08-27 01:56:01','2026-01-27 01:56:01','test','2025-08-12 05:53:41','2025-08-26 17:56:01'),(46,'A9','lobby','rented',36,NULL,NULL,'2025-08-28 01:29:14','2026-01-28 01:29:14','test','2025-08-12 05:53:53','2025-08-27 17:29:14'),(47,'A10','lobby','rented',36,NULL,NULL,'2025-08-28 01:42:33','2026-01-28 01:42:33','test','2025-08-12 05:54:04','2025-08-27 17:42:33'),(49,'A12','lobby','rented',33,NULL,NULL,'2025-08-14 01:45:06','2026-01-14 01:45:06','test','2025-08-13 17:43:31','2025-08-13 17:45:06'),(50,'B1','lobby','rented',36,NULL,NULL,'2025-09-24 23:46:49','2026-03-24 23:46:49','test','2025-09-08 15:54:07','2025-09-24 15:46:49'),(51,'B2','lobby','rented',36,NULL,NULL,'2025-09-25 00:06:37','2026-03-25 00:06:37','test','2025-09-08 15:54:13','2025-09-24 16:06:37'),(52,'B3','lobby','pending',40,NULL,NULL,'2025-09-09 01:05:13','2026-03-09 01:05:13','test','2025-09-08 15:54:18','2025-09-08 17:05:13'),(53,'B4','lobby','rented',60,NULL,NULL,'2025-10-06 23:24:09','2025-12-06 23:24:09','test','2025-09-08 15:54:23','2025-10-06 15:24:09'),(54,'B5','lobby','rented',43,NULL,NULL,'2025-09-12 00:25:22','2025-10-12 00:25:22','test','2025-09-08 15:54:28','2025-09-11 16:25:22'),(55,'B6','lobby','rented',65,NULL,NULL,'2025-10-10 01:42:52','2026-03-10 01:42:52','test','2025-09-08 15:54:36','2025-10-09 18:20:07'),(56,'B7','lobby','rented',42,NULL,NULL,'2025-09-15 15:31:07','2025-11-15 15:31:07','test','2025-09-08 15:54:41','2025-09-15 07:31:07'),(57,'B8','lobby','pending',44,NULL,NULL,'2025-09-12 00:44:00','2025-10-12 00:44:00','test','2025-09-08 15:54:47','2025-09-11 16:44:00'),(58,'B9','lobby','rented',66,NULL,NULL,'2025-10-11 00:13:21','2026-03-11 00:13:21','test','2025-09-24 18:08:02','2025-10-10 16:41:46'),(66,'C1','lobby','rented',55,NULL,NULL,'2025-09-26 00:40:49','2026-02-26 00:40:49','test','2025-09-25 15:45:36','2025-09-25 16:40:49'),(67,'C2','lobby','rented',55,NULL,NULL,'2025-09-26 00:37:24','2025-10-26 00:37:24','test','2025-09-25 15:45:40','2025-09-25 16:37:24'),(68,'C3','lobby','rented',66,NULL,NULL,'2025-10-11 01:00:23','2026-05-11 01:00:23','test','2025-09-25 15:45:45','2025-10-10 17:23:10'),(69,'C4','lobby','rented',64,NULL,NULL,'2025-10-07 00:46:49','2026-01-07 00:46:49','test','2025-09-25 15:45:54','2025-10-06 16:46:49'),(71,'C5','lobby','rented',64,NULL,NULL,'2025-10-07 00:42:04','2026-01-07 00:42:04','test','2025-09-25 15:46:03','2025-10-06 16:42:04'),(76,'A6','lobby','pending',68,NULL,NULL,'2025-10-14 15:20:13','2026-03-14 15:20:13','test','2025-10-11 18:44:13','2025-10-14 07:20:13'),(77,'A8','lobby','available',NULL,NULL,NULL,NULL,NULL,'test','2025-10-11 18:44:20','2025-10-11 18:44:20'),(78,'A11','lobby','available',NULL,NULL,NULL,NULL,NULL,'test','2025-10-11 18:44:26','2025-10-11 18:44:26');
/*!40000 ALTER TABLE `lockers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `notif_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `type` enum('info','warning','success','error') DEFAULT 'info',
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`notif_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,33,'Your locker rent request (Locker #48) was cancelled by the admin because payment was not completed.','warning',1,'2025-09-11 18:57:25'),(2,34,'Your locker rent request (Locker #44) was cancelled by the admin because payment was not completed.','warning',0,'2025-09-13 06:01:05'),(3,36,'Your locker rent request (Locker #48) was cancelled by the admin because payment was not completed.','warning',0,'2025-09-24 15:47:55'),(4,40,'Your locker rent request (Locker #B3) was cancelled by the admin because payment was not completed.','warning',0,'2025-09-24 16:09:58'),(5,42,'Your locker rent request (Locker #53) was cancelled by the admin because payment was not completed.','warning',0,'2025-09-24 16:10:49'),(6,43,'Your locker rent request (Locker #55) was cancelled by the admin because payment was not completed.','warning',0,'2025-09-24 17:53:36'),(7,55,'Your locker rent request (Locker #67) was cancelled by the admin because payment was not completed.','warning',0,'2025-09-25 16:04:09'),(8,55,'Your locker rent request (Locker #67) was cancelled by the admin because payment was not completed.','warning',0,'2025-09-25 16:35:12'),(9,60,'Your locker rent request (Locker #68) was cancelled by the admin because payment was not completed.','warning',0,'2025-09-25 17:47:02'),(10,60,'Your locker rent request (Locker #68) was cancelled by the admin because payment was not completed.','warning',0,'2025-09-25 18:00:54'),(11,40,'Your locker rent for Locker A6 has expired due to non-payment within 2 days. The locker is now available for others.','warning',0,'2025-09-28 03:35:00'),(12,51,'Your locker reserve for Locker A6 has expired due to non-payment within 2 days. The locker is now available for others.','warning',0,'2025-09-28 03:35:00'),(13,51,'Your locker reserve for Locker A6 has expired due to non-payment within 2 days. The locker is now available for others.','warning',0,'2025-09-28 03:35:00'),(14,47,'Your locker reserve for Locker A11 has expired due to non-payment within 2 days. The locker is now available for others.','warning',0,'2025-09-28 03:35:00'),(15,47,'Your locker reserve for Locker B4 has expired due to non-payment within 2 days. The locker is now available for others.','warning',0,'2025-09-28 03:35:00'),(16,51,'Your locker reserve for Locker B6 has expired due to non-payment within 2 days. The locker is now available for others.','warning',0,'2025-09-28 03:35:00'),(17,52,'Your locker reserve for Locker B9 has expired due to non-payment within 2 days. The locker is now available for others.','warning',0,'2025-09-28 03:35:00'),(18,52,'Your locker reserve for Locker B10 has expired due to non-payment within 2 days. The locker is now available for others.','warning',0,'2025-09-28 03:35:00'),(19,53,'Your locker reserve for Locker B11 has expired due to non-payment within 2 days. The locker is now available for others.','warning',0,'2025-09-28 03:35:00'),(20,54,'Your locker reserve for Locker B12 has expired due to non-payment within 2 days. The locker is now available for others.','warning',0,'2025-09-28 03:35:00'),(21,60,'Your locker rent for Locker C3 has expired due to non-payment within 2 days. The locker is now available for others.','warning',0,'2025-09-28 03:59:00'),(22,60,'Your locker rent for Locker C4 has expired due to non-payment within 2 days. The locker is now available for others.','warning',0,'2025-09-28 04:04:00'),(23,60,'Your locker rent for Locker C3 has expired due to non-payment within 2 days. The locker is now available for others.','warning',0,'2025-09-28 04:18:00'),(24,60,'Your locker rent for Locker C3 has expired due to non-payment within 2 days. The locker is now available for others.','warning',0,'2025-10-02 16:25:00'),(25,65,'Your locker rent request (Locker #68) was cancelled by the admin because payment was not completed.','warning',0,'2025-10-10 16:58:52'),(26,68,'Your locker rent request (Locker #76) was cancelled by the admin because payment was not completed.','warning',0,'2025-10-14 06:21:56'),(27,34,'Your locker rent request (Locker #76) was cancelled by the admin because payment was not completed.','warning',0,'2025-10-14 06:28:51'),(28,34,'Your locker rent request (Locker #76) was cancelled by the admin because payment was not completed.','warning',0,'2025-10-14 06:37:27'),(29,68,'Your locker rent request (Locker #76) was cancelled by the admin because payment was not completed.','warning',0,'2025-10-14 06:43:31'),(30,68,'Your locker rent request (Locker #76) was cancelled by the admin because payment was not completed.','warning',0,'2025-10-14 06:51:28'),(31,68,'Your locker rent request (Locker #76) was cancelled by the admin because payment was not completed.','warning',0,'2025-10-14 06:54:46'),(32,68,'Your locker rent request (Locker #76) was cancelled by the admin because payment was not completed.','warning',0,'2025-10-14 06:56:06'),(33,68,'Your locker rent request (Locker #76) was cancelled by the admin because payment was not completed.','warning',0,'2025-10-14 07:02:44'),(34,68,'Your locker rent request (Locker #76) was cancelled by the admin because payment was not completed.','warning',0,'2025-10-14 07:03:27'),(35,68,'Your locker rent request (Locker #76) was cancelled by the admin because payment was not completed.','warning',0,'2025-10-14 07:04:14'),(36,68,'Your locker rent request (Locker #76) was cancelled by the admin because payment was not completed.','warning',0,'2025-10-14 07:12:13'),(37,68,'Your locker rent request (Locker #76) was cancelled by the admin because payment was not completed.','warning',0,'2025-10-14 07:13:59'),(38,68,'Your locker rent request (Locker #76) was cancelled by the admin because payment was not completed.','warning',0,'2025-10-14 07:16:57');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_history`
--

DROP TABLE IF EXISTS `payment_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_history` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `rental_id` int(11) NOT NULL,
  `status` enum('ongoing','paid','overdue') NOT NULL DEFAULT 'ongoing',
  `payment_date` date NOT NULL,
  `due_date` date NOT NULL,
  `payment_source` enum('cash','qr') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `balance` decimal(10,2) NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `rental_id` (`rental_id`),
  CONSTRAINT `payment_history_ibfk_1` FOREIGN KEY (`rental_id`) REFERENCES `locker_rentals` (`rental_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_history`
--

LOCK TABLES `payment_history` WRITE;
/*!40000 ALTER TABLE `payment_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_messages`
--

DROP TABLE IF EXISTS `ticket_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket_messages` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`message_id`),
  KEY `ticket_id` (`ticket_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `ticket_messages_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`ticket_id`) ON DELETE CASCADE,
  CONSTRAINT `ticket_messages_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_messages`
--

LOCK TABLES `ticket_messages` WRITE;
/*!40000 ALTER TABLE `ticket_messages` DISABLE KEYS */;
INSERT INTO `ticket_messages` VALUES (1,2,24,'i will check your issue asap','2025-08-31 10:18:45'),(2,2,24,'i will check your issue asap','2025-08-31 10:19:49'),(3,2,34,'okay thank you','2025-08-31 10:30:33'),(4,6,20,'okay thank you','2025-09-02 22:21:42'),(5,6,20,'okay thank you','2025-09-02 22:22:02'),(6,6,20,'okay thank you','2025-09-02 22:29:28'),(7,2,24,'okay thank you1234','2025-09-02 22:45:09'),(8,6,24,'okay thank you0123','2025-09-02 22:45:41'),(9,6,20,'okay thank you9999','2025-09-02 22:47:52'),(10,6,20,'okay thank you888','2025-09-02 22:49:14'),(11,6,24,'okay okay','2025-09-02 22:50:15'),(12,2,24,'okay okay','2025-09-02 23:07:55'),(13,5,24,'okay okay','2025-09-02 23:08:24'),(14,8,60,'I lost my locker key yesterday.','2025-10-06 23:03:52'),(15,9,60,'I lost my locker key yesterday.','2025-10-06 23:05:25'),(16,9,50,'okay','2025-10-07 13:25:35'),(17,9,50,'okay','2025-10-07 13:25:37'),(18,9,50,'okay','2025-10-07 13:25:40'),(19,9,50,'okay','2025-10-07 13:25:40'),(20,9,50,'okay','2025-10-07 13:25:40'),(21,9,50,'okay','2025-10-07 13:25:44'),(22,9,50,'okay','2025-10-07 13:25:44'),(23,9,50,'okay','2025-10-07 13:25:44'),(24,9,50,'okay','2025-10-07 13:25:45'),(25,9,50,'okay','2025-10-07 13:25:45'),(26,8,50,'okay','2025-10-07 13:25:48'),(27,8,50,'okay','2025-10-07 13:25:48'),(28,8,50,'okay','2025-10-07 13:25:49'),(29,8,50,'okay','2025-10-07 13:25:49'),(30,8,50,'okay','2025-10-07 13:25:49'),(31,8,50,'okay','2025-10-07 13:25:50'),(32,8,50,'okay','2025-10-07 13:25:50'),(33,8,50,'okay','2025-10-07 13:25:50'),(34,8,50,'okay','2025-10-07 13:25:50'),(35,8,50,'okay','2025-10-07 13:25:50'),(36,8,50,'okay','2025-10-07 13:25:50'),(37,8,50,'okay','2025-10-07 13:25:50'),(38,8,50,'okay','2025-10-07 13:25:51'),(39,8,50,'okay','2025-10-07 13:25:51'),(40,8,50,'okay','2025-10-07 13:25:51'),(41,8,50,'okay','2025-10-07 13:25:51'),(42,8,50,'okay','2025-10-07 13:25:55'),(43,8,50,'okay','2025-10-07 13:25:55'),(44,8,50,'okay','2025-10-07 13:25:56'),(45,8,50,'okay','2025-10-07 13:25:56'),(46,10,34,'nakalimot asa na butang','2025-10-14 14:10:33'),(47,6,20,'hello','2025-10-16 01:30:46'),(48,11,20,'testing','2025-10-16 01:44:56'),(49,11,20,'what','2025-10-16 01:45:13'),(50,11,20,'hello','2025-10-16 01:48:51'),(51,11,20,'test','2025-10-16 01:52:13'),(52,11,20,'test','2025-10-16 01:58:29'),(53,11,20,'hllo','2025-10-16 01:59:25'),(54,11,50,'okay noted','2025-10-16 02:09:14'),(55,11,20,'okay','2025-10-16 02:18:28'),(56,11,20,'hello','2025-10-16 02:20:42'),(57,11,50,'hi','2025-10-16 02:28:08'),(58,11,20,'cya','2025-10-16 02:46:43'),(59,11,20,'cya','2025-10-16 02:47:01'),(60,11,20,'cya','2025-10-16 02:47:28'),(61,11,20,'hoy','2025-10-16 02:47:52'),(62,11,20,'hadad','2025-10-16 02:49:15'),(63,11,20,'okay?','2025-10-16 02:49:35'),(64,11,20,'hoy','2025-10-16 02:49:40'),(65,6,20,'okay noted','2025-10-16 02:50:11'),(66,11,20,'hahah','2025-10-16 02:51:10'),(67,11,20,'okay','2025-10-16 02:51:35'),(68,6,20,'hello','2025-10-16 02:51:43'),(69,11,20,'ho','2025-10-16 02:51:54');
/*!40000 ALTER TABLE `ticket_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tickets` (
  `ticket_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `request` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Pending','Answered') DEFAULT 'Pending',
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`ticket_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (2,39,'Locker Issue','Lost key','I lost my locker key yesterday.','Answered','2025-08-31 01:17:52'),(3,39,'Locker Issue','Lost key','I lost my locker key yesterday.','Pending','2025-09-01 22:26:02'),(4,39,'Locker Issue','Lost key','I lost my locker key yesterday.','Pending','2025-09-01 23:44:26'),(5,39,'Locker Issue','Lost key','I lost my locker key yesterday.','Answered','2025-09-01 23:47:54'),(6,20,'Locker Issue','Lost key','I lost my locker key yesterday.','Pending','2025-09-02 22:13:25'),(7,60,'Locker Issue','Lost key','I lost my locker key yesterday.','Pending','2025-10-06 22:53:38'),(8,60,'Locker Issue','Lost key','I lost my locker key yesterday.','Answered','2025-10-06 23:03:52'),(9,60,'Locker Issue','Lost key','I lost my locker key yesterday.','Answered','2025-10-06 23:05:25'),(10,34,'lost key','new key','nakalimot asa na butang','Pending','2025-10-14 14:10:33'),(11,20,'test','test','testing','Pending','2025-10-16 01:44:56');
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `stud_id` int(11) DEFAULT NULL,
  `f_name` varchar(255) DEFAULT NULL,
  `m_name` varchar(255) DEFAULT NULL,
  `l_name` varchar(255) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `profile_pic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `stud_id` (`stud_id`),
  UNIQUE KEY `email` (`email`),
  KEY `users_ibfk_1` (`account_id`),
  KEY `users_ibfk_2` (`course_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (15,34,8,20220003,'John','D','Do','Male','johndo1@example.com','2025-07-16 14:48:52',NULL),(19,38,8,20220005,'John','D','Do','Male','johndo5@example.com','2025-07-16 15:02:14',NULL),(20,40,9,20220660,'James Ryan','Craste','Valiente','Male','valiente@example.com','2025-08-26 16:22:02','20.jpg'),(22,44,9,20220770,'Ben Howard','Pareja','Casquejo','Male','casquejo@gmail.com','2025-07-18 07:36:48',NULL),(23,45,9,20220099,'Jane','M','Doe','Female','jane.doe@example.com','2025-07-18 07:42:34',NULL),(24,46,9,20220100,'James Ryan','T','Cabiro','Male','cabiro@example.com','2025-07-18 07:44:03',NULL),(25,47,9,202201001,'Dionne Philip','Tiyok','Valiente','Male','dionnevaliente@example.com','2025-07-18 07:45:22',NULL),(28,51,9,20220102,'James Ryan','T','Cabiro','Male','cabiro1@example.com','2025-07-18 07:53:24',NULL),(31,55,9,202201011,'test','test','test','Male','test@example.com','2025-07-21 08:38:45',NULL),(33,57,9,202201015,'test','test','test','Male','test1@example.com','2025-07-30 07:43:01',NULL),(34,58,9,202201016,'test','test','test','Male','test2@example.com','2025-07-30 08:03:57',NULL),(36,61,9,202201020,'test','test','test','Male','test3@example.com','2025-08-27 16:44:27',NULL),(39,64,9,202201021,'test4','test4','test4','Male','test4@example.com','2025-08-27 17:43:47',NULL),(40,65,8,202201022,'test5','test5','test5','Male','test5@example.com','2025-09-03 15:45:40',NULL),(42,69,9,202201023,'t','T','t','t','cabiro12@example.com','2025-09-08 17:08:07',NULL),(43,70,8,202201024,'7','7','7','7','test7@example.com','2025-09-11 15:47:24',NULL),(44,71,8,202201026,'test8','test8','test8','Male','test8@example.com','2025-09-11 16:43:00',NULL),(45,74,48,20250001,'test9','9','test9','Female','test9@example.com','2025-09-19 17:36:44',NULL),(47,76,44,20250002,'test10','10','test10','Female','test10@example.com','2025-09-23 17:03:13',NULL),(50,80,48,20220670,'jems','c','sy','female','jemssy@example.com','2025-10-03 16:16:41','50.jpg'),(51,81,48,20250003,'test11','11','test11','Female','test11@example.com','2025-09-24 17:25:12',NULL),(52,82,48,20250004,'test12','12','test12','Female','test12@example.com','2025-09-24 18:09:22',NULL),(53,83,48,20250005,'test13','13','test13','Female','test13@example.com','2025-09-24 18:25:16',NULL),(54,84,48,20250006,'test14','13','test13','Female','test14@example.com','2025-09-25 14:46:45',NULL),(55,85,48,20250007,'test14','13','test13','Female','test15@example.com','2025-09-25 15:37:48',NULL),(56,88,48,20220680,'jems','q','sy','female','jamsy@example.com','2025-09-25 17:11:24',NULL),(58,91,48,20220690,'jems','q','sy','female','jamii@example.com','2025-09-25 17:13:48',NULL),(59,92,44,20220700,'yan','q','yan','male','yan@example.com','2025-09-25 17:17:03',NULL),(60,93,44,20220701,'test16','test','16','female','test16@example.com','2025-09-25 17:21:35',NULL),(64,97,48,20250008,'test17','17','test17','Female','test17@example.com','2025-10-06 16:41:42',NULL),(65,98,48,20250009,'test18','18','test18','Male','test18@example.com','2025-10-09 16:12:48',NULL),(66,99,48,20250010,'test19','19','test19','Male','test19@example.com','2025-10-10 16:11:10',NULL),(67,100,52,20220011,'luminous','d','valentine','Female','valentine@gmail.com','2025-10-11 16:45:28',NULL),(68,101,52,20220014,'anna','n','sy','Female','anna@gmail.com','2025-10-14 03:34:01',NULL),(69,103,48,20250017,'test19','19','test19','Male','test20@example.com','2025-10-14 05:39:14',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-16  2:55:25
