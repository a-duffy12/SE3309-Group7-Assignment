-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: se3309
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `watchlistentry`
--

DROP TABLE IF EXISTS `watchlistentry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watchlistentry` (
  `title` varchar(50) NOT NULL,
  `releaseDate` date NOT NULL,
  `director` varchar(50) NOT NULL,
  `username` varchar(15) NOT NULL,
  `dateAdded` date NOT NULL,
  `dateWatched` date DEFAULT NULL,
  `hasSeen` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`title`,`releaseDate`,`director`,`username`),
  KEY `username` (`username`),
  CONSTRAINT `watchlistentry_ibfk_1` FOREIGN KEY (`title`, `releaseDate`, `director`) REFERENCES `movie` (`title`, `releaseDate`, `director`),
  CONSTRAINT `watchlistentry_ibfk_2` FOREIGN KEY (`username`) REFERENCES `movielistuser` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchlistentry`
--

LOCK TABLES `watchlistentry` WRITE;
/*!40000 ALTER TABLE `watchlistentry` DISABLE KEYS */;
INSERT INTO `watchlistentry` VALUES ('Inception','2010-07-16','Christopher Nolan','AngryBanana','2020-11-11','2020-11-11',_binary ''),('Inception','2010-07-16','Christopher Nolan','greatly','2020-11-11',NULL,_binary '\0'),('The Dark Knight','2008-07-18','Christopher Nolan','AngryBanana','2020-11-12','2020-11-12',_binary ''),('The Dark Knight','2008-07-18','Christopher Nolan','greatly','2020-11-11','2020-11-12',_binary '');
/*!40000 ALTER TABLE `watchlistentry` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-13 13:18:01
