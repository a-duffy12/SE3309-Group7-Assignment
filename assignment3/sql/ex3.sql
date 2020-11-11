INSERT INTO MovieListUser (username, password, firstName, lastName, dateOfBirth, emailAddress)
VALUES ("greatly", "bestpass!!", "John", "Smith", "2000-01-01", "greatly@gmail.com");

INSERT INTO Moive
VALUES ("Interstellar", "2014-11-07", "Christopher Nolan", NULL, 8.6);

INSERT INTO Review
VALUES (1, 9, "2020-11-11",  
	(SELECT username FROM MovieListUser WHERE username="greatly"),
    (SELECT title 
    FROM Movie
    WHERE title="Interstellar" AND releaseDate="2014-11-07" AND director="Christopher Nolan"),
    (SELECT releaseDate 
    FROM Movie
    WHERE title="Interstellar" AND releaseDate="2014-11-07" AND director="Christopher Nolan"),
    (SELECT director
    FROM Movie
    WHERE title="Interstellar" AND releaseDate="2014-11-07" AND director="Christopher Nolan"));
 
 SELECT *
 FROM Review;
 
INSERT INTO MovieGenre
VALUES ("Adventure",
	(SELECT title 
	FROM Movie
	WHERE title="Interstellar" AND releaseDate="2014-11-07" AND director="Christopher Nolan"),
	(SELECT releaseDate 
	FROM Movie
	WHERE title="Interstellar" AND releaseDate="2014-11-07" AND director="Christopher Nolan"),
	(SELECT director
	FROM Movie
	WHERE title="Interstellar" AND releaseDate="2014-11-07" AND director="Christopher Nolan"));
    
INSERT INTO MovieGenre
VALUES ("Science Fiction",
	(SELECT title 
	FROM Movie
	WHERE title="Interstellar" AND releaseDate="2014-11-07" AND director="Christopher Nolan"),
	(SELECT releaseDate 
	FROM Movie
	WHERE title="Interstellar" AND releaseDate="2014-11-07" AND director="Christopher Nolan"),
	(SELECT director
	FROM Movie
	WHERE title="Interstellar" AND releaseDate="2014-11-07" AND director="Christopher Nolan"));

SELECT *
FROM MovieGenre;

INSERT INTO UserComment (commentID, dateCreated, containsSpoilers, author, title, releaseDate, director)
VALUES (1, "2020-11-11", 0, 
	(SELECT username
    FROM MovieListUser
    WHERE username="greatly"),
    (SELECT title 
	FROM Movie
	WHERE title="Interstellar" AND releaseDate="2014-11-07" AND director="Christopher Nolan"),
	(SELECT releaseDate 
	FROM Movie
	WHERE title="Interstellar" AND releaseDate="2014-11-07" AND director="Christopher Nolan"),
	(SELECT director
	FROM Movie
	WHERE title="Interstellar" AND releaseDate="2014-11-07" AND director="Christopher Nolan"));

INSERT INTO MovieListUser (username, password, firstName, lastName, dateOfBirth, emailAddress)
VALUES ("AngryBanana", "hulkenergy", "Jane", "Doe", "2000-10-10", "ab101@gmail.com");

INSERT INTO UserComment (commentId, dateCreated, containsSpoilers, parentCommentId, author, title, releaseDate, director)
VALUES (2, "2020-11-11", 1, 1,
    (SELECT username
    FROM MovieListUser
    WHERE username="AngryBanana"),
    (SELECT title 
	FROM Movie
	WHERE title="Interstellar" AND releaseDate="2014-11-07" AND director="Christopher Nolan"),
	(SELECT releaseDate 
	FROM Movie
	WHERE title="Interstellar" AND releaseDate="2014-11-07" AND director="Christopher Nolan"),
	(SELECT director
	FROM Movie
	WHERE title="Interstellar" AND releaseDate="2014-11-07" AND director="Christopher Nolan"));
    
SELECT *
FROM UserComment;