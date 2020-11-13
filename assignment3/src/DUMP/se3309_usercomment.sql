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
-- Table structure for table `usercomment`
--

DROP TABLE IF EXISTS `usercomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usercomment` (
  `commentId` int NOT NULL,
  `dateCreated` date NOT NULL,
  `likeCount` int NOT NULL DEFAULT '0',
  `containsSpoilers` bit(1) NOT NULL DEFAULT b'1',
  `parentCommentId` int DEFAULT NULL,
  `author` varchar(15) NOT NULL,
  `title` varchar(50) NOT NULL,
  `releaseDate` date NOT NULL,
  `director` varchar(50) NOT NULL,
  PRIMARY KEY (`commentId`),
  KEY `parentCommentId` (`parentCommentId`),
  KEY `author` (`author`),
  KEY `title` (`title`,`releaseDate`,`director`),
  CONSTRAINT `usercomment_ibfk_1` FOREIGN KEY (`parentCommentId`) REFERENCES `usercomment` (`commentId`),
  CONSTRAINT `usercomment_ibfk_2` FOREIGN KEY (`author`) REFERENCES `movielistuser` (`username`),
  CONSTRAINT `usercomment_ibfk_3` FOREIGN KEY (`title`, `releaseDate`, `director`) REFERENCES `movie` (`title`, `releaseDate`, `director`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usercomment`
--

LOCK TABLES `usercomment` WRITE;
/*!40000 ALTER TABLE `usercomment` DISABLE KEYS */;
INSERT INTO `usercomment` VALUES (1,'2020-11-11',0,_binary '\0',NULL,'greatly','Interstellar','2014-11-07','Christopher Nolan'),(2,'2020-11-11',0,_binary '',1,'AngryBanana','Interstellar','2014-11-07','Christopher Nolan'),(3,'2020-11-12',14,_binary '',NULL,'ulockman','The Dark Knight','2008-07-18','Christopher Nolan'),(4,'2020-11-12',4,_binary '',3,'AngryBanana','The Dark Knight','2008-07-18','Christopher Nolan'),(5,'2020-11-12',3,_binary '\0',3,'zreilly','The Dark Knight','2008-07-18','Christopher Nolan');
/*!40000 ALTER TABLE `usercomment` ENABLE KEYS */;
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
