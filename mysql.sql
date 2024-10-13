-- MySQL dump 10.13  Distrib 9.0.1, for macos14.4 (arm64)
--
-- Host: localhost    Database: AnveshanSetu
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ADMIN`
--

DROP TABLE IF EXISTS `ADMIN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ADMIN` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(254) NOT NULL,
  `LastName` varchar(254) NOT NULL,
  `Email` varchar(254) NOT NULL,
  `Password` varchar(254) NOT NULL,
  `GoogleScholar` varchar(254) DEFAULT NULL,
  `Affiliation` varchar(2048) DEFAULT NULL,
  `MobileNumber` varchar(254) DEFAULT NULL,
  `Research_Areas` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ADMIN`
--

LOCK TABLES `ADMIN` WRITE;
/*!40000 ALTER TABLE `ADMIN` DISABLE KEYS */;
INSERT INTO `ADMIN` VALUES (2,'Pratham','Mishra','pratham@gmail.com','$2a$10$qh/D24EVSi3yeZCvoxyAwerjhkNt2jf4/7OKfHtYgg.ZrHf.Wp/SG',NULL,'IIITH','9825139860','Electrical');
/*!40000 ALTER TABLE `ADMIN` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Applications`
--

DROP TABLE IF EXISTS `Applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Applications` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Mentee_Id` int NOT NULL,
  `justification` longtext,
  `researchProblem` longtext,
  `coursework` mediumtext,
  `researchExperience` mediumtext,
  `onlineCourses` mediumtext,
  `firstPreference` int DEFAULT NULL,
  `secondPreference` int DEFAULT NULL,
  `references_text` mediumtext,
  `goals` mediumtext,
  `cv` varchar(2048) DEFAULT NULL,
  `statementOfPurpose` varchar(2048) DEFAULT NULL,
  `consentLetter` varchar(2048) DEFAULT NULL,
  `specificActivities` mediumtext,
  `advisorName` varchar(2048) DEFAULT NULL,
  `advisorEmail` varchar(2048) DEFAULT NULL,
  `coAdvisorName` varchar(2048) DEFAULT NULL,
  `coAdvisorEmail` varchar(2048) DEFAULT NULL,
  `agree` varchar(64) DEFAULT NULL,
  `firstPreferenceStatus` varchar(64) DEFAULT 'Pending',
  `secondPreferenceStatus` varchar(64) DEFAULT 'Pending',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Applications`
--

LOCK TABLES `Applications` WRITE;
/*!40000 ALTER TABLE `Applications` DISABLE KEYS */;
INSERT INTO `Applications` VALUES (5,2,'hrth56uj57u','gggg','hrthrujj','grththrh','rhyuhjyuj6',123,124,NULL,'hrytj5yj6ijk','../uploads/2/cv-1728732648863-a6-24 (1).pdf','../uploads/2/statementOfPurpose-1728732648867-a6-24 (1).pdf','../uploads/2/consentLetter-1728732648867-a6-24 (1).pdf','hyrtjtyjujkut','hrtyhjtyjtyujk','grthrhythjyj','thyrhjtyjtyujktu','htrhtyjtyjtyujk','true','Accepted','Pending');
/*!40000 ALTER TABLE `Applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mentor`
--

DROP TABLE IF EXISTS `Mentor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Mentor` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(254) NOT NULL,
  `LastName` varchar(254) NOT NULL,
  `Email` varchar(254) NOT NULL,
  `Gender` varchar(254) DEFAULT NULL,
  `Degree` varchar(254) DEFAULT NULL,
  `MobileNumber` varchar(254) DEFAULT NULL,
  `Linkedin` varchar(254) DEFAULT NULL,
  `GoogleScholar` varchar(254) DEFAULT NULL,
  `PersonalPage` varchar(254) DEFAULT NULL,
  `AddToMailingList` tinyint(1) DEFAULT NULL,
  `ResearchAreas` text,
  `EnrollmentStatus` varchar(254) DEFAULT 'Current',
  `Affiliation` varchar(1024) DEFAULT NULL,
  `Password` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mentor`
--

LOCK TABLES `Mentor` WRITE;
/*!40000 ALTER TABLE `Mentor` DISABLE KEYS */;
INSERT INTO `Mentor` VALUES (123,'Rhythm','Aggrawal','mentor@gmail.com',NULL,NULL,'9825139862',NULL,NULL,NULL,NULL,'Blockchain','Current','MIT','$2a$10$5U4JX5iVwYfnD/Wr7MpsX.VOl/.NAJvoVZJj7sSYaswOE5VniqFES'),(124,'Parth','Maradia','parthmaradia2002@gmail.com',NULL,NULL,'8780583781',NULL,NULL,NULL,NULL,'CogScience, ML/AI, AI Architecture','Current','IIITH','$2a$10$vGKfnXXgLj3pszRTEUxUA.pVqZ3MlByink0mx514jPS92Sphicz26'),(125,'Vyom','Goyal','vyom.goyal@students.iiit.ac.in',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'NeoBase','Current','IIITH','$2a$10$CzvkH8YbQMahmhndW34DOu7zJbJ1yo23DVdZliUhPqMjzV06LPQN6'),(127,'PK','Giri`','pkgiri@iiit.ac.in',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Precog','Current','IIITH','$2a$10$w748tYl3iVkQ94B0oEGqOe2WUHzO4XGDjKl5ZH2NN.LfnXXzvbTlq'),(128,'Kabir','Shamlani','kabir.shamlani@students.iiit.ac.in',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Frontend','Current','IIITH','$2a$10$YKkKwspdLhBVqpmmCwdsPe5bTLRe1wlUMDkd2RDjTbFIklIZvzxWO'),(129,'Bhvya','Kothari','bhvya.kothari@students.iiit.ac.in',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'timepass','Current','IIITH','$2a$10$BbolDRo9HvNf7fUWVpJJkekEUwdIR/Wtbcjmic3WrygvL0gHt6Tru'),(130,'Nipun Tulsian','','nipun.tulsian.nt@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Current',NULL,NULL);
/*!40000 ALTER TABLE `Mentor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(254) NOT NULL,
  `LastName` varchar(254) NOT NULL,
  `Email` varchar(254) NOT NULL,
  `DOB` date DEFAULT NULL,
  `Affiliation` varchar(254) DEFAULT NULL,
  `Gender` varchar(254) DEFAULT NULL,
  `Degree` varchar(254) DEFAULT NULL,
  `MobileNumber` varchar(254) DEFAULT NULL,
  `AcmMember` tinyint(1) DEFAULT NULL,
  `Insta` varchar(254) DEFAULT NULL,
  `Facebook` varchar(254) DEFAULT NULL,
  `Twitter` varchar(254) DEFAULT NULL,
  `Linkedin` varchar(254) DEFAULT NULL,
  `AddToMailingList` varchar(16) DEFAULT NULL,
  `Password` varchar(1024) DEFAULT NULL,
  `PHDRegistration` varchar(256) DEFAULT NULL,
  `PHDYear` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Nipun','Tulsian','nipun.tulsian@students.iiit.ac.in',NULL,'IIIT-Hyderabad','Male',NULL,'9825139860',NULL,NULL,NULL,NULL,NULL,'true','$2a$10$5U4JX5iVwYfnD/Wr7MpsX.VOl/.NAJvoVZJj7sSYaswOE5VniqFES','Full-Time','3rd year'),(4,'Nipun Tulsian','','nipun.tulsian.nt@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
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

-- Dump completed on 2024-10-13 20:58:37
