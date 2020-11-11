CREATE DATABASE IF NOT EXISTS se3309;

USE se3309;

CREATE TABLE IF NOT EXISTS MovieListUser
	(username VARCHAR(15) NOT NULL,
	password CHAR(10) NOT NULL,
	firstName VARCHAR(15) NOT NULL,
	lastName VARCHAR(15) NOT NULL,
	dateOfBirth DATE NOT NULL,
	likeCount INT NOT NULL DEFAULT 0,
    emailAddress VARCHAR(50) NOT NULL,
	PRIMARY KEY (username) );

CREATE TABLE IF NOT EXISTS Movie
	(title VARCHAR(50) NOT NULL,
    releaseDate DATE NOT NULL,
    director VARCHAR(50) NOT NULL,
    franchise VARCHAR(50) DEFAULT NULL,
    overallRating DECIMAL NOT NULL, 
    PRIMARY KEY (title, releaseDate, director) );

CREATE TABLE IF NOT EXISTS Review
	(reviewNumber INT NOT NULL,
	numericalRating SMALLINT NOT NULL,
    dateCreated DATE NOT NULL,
    author VARCHAR(15) NOT NULL,
    title VARCHAR(50) NOT NULL,
    releaseDate DATE NOT NULL,
    director VARCHAR(50) NOT NULL,
    PRIMARY KEY (reviewNumber),
	FOREIGN KEY (author) REFERENCES MovieListUser (username),
    FOREIGN KEY (title, releaseDate, director) REFERENCES Movie (title, releaseDate, director));
    
CREATE TABLE IF NOT EXISTS MovieGenre
	(genre VARCHAR(50) NOT NULL,
    title VARCHAR(50) NOT NULL,
    releaseDate DATE NOT NULL,
    director VARCHAR(50) NOT NULL,
    PRIMARY KEY (genre, title, releaseDate, director),
    FOREIGN KEY (title, releaseDate, director) REFERENCES Movie (title, releaseDate, director) );
    
CREATE TABLE IF NOT EXISTS MovieCastMember
    (castName VARCHAR(50) NOT NULL,
	title VARCHAR(50) NOT NULL,
    releaseDate DATE NOT NULL,
    director VARCHAR(50) NOT NULL,
    PRIMARY KEY (castName),
    FOREIGN KEY (title, releaseDate, director) REFERENCES Movie (title, releaseDate, director) );
    
CREATE TABLE IF NOT EXISTS WatchListEntry
	(title VARCHAR(50) NOT NULL,
	releaseDate DATE NOT NULL,
	director VARCHAR(50) NOT NULL,
	username VARCHAR(15) NOT NULL,
	dateAdded DATE NOT NULL,
	dateWatched DATE,
	hasSeen BIT NOT NULL DEFAULT 0,
	PRIMARY KEY (title, releaseDate, director, username),
	FOREIGN KEY (title, releaseDate, director) REFERENCES Movie (title, releaseDate, director),
	FOREIGN KEY (username) REFERENCES MovieListUser (username) );
        
CREATE TABLE IF NOT EXISTS Friendship
	(initiator VARCHAR(15),
	friend VARCHAR(15),
	PRIMARY KEY (initiator, friend),
	FOREIGN KEY (initiator) REFERENCES MovieListUser (username),
	FOREIGN KEY (friend) REFERENCES MovieListUser (username) );
        
CREATE TABLE IF NOT EXISTS UserComment
	(commentId INT NOT NULL,
    dateCreated DATE NOT NULL,
    likeCount INT NOT NULL DEFAULT 0,
    containsSpoilers BIT NOT NULL DEFAULT 1,
    parentCommentId INT,
    author VARCHAR(15) NOT NULL,
    title VARCHAR(50) NOT NULL,
	releaseDate DATE NOT NULL,
	director VARCHAR(50) NOT NULL,
    PRIMARY KEY (commentId),
    FOREIGN KEY (parentCommentId) REFERENCES UserComment (commentId),
    FOREIGN KEY (author) REFERENCES MovieListUser (username),
    FOREIGN KEY (title, releaseDate, director) REFERENCES Movie (title, releaseDate, director) );

        