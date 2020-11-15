CREATE VIEW ActiveCommenters
AS SELECT username, firstName, lastName, likeCount
FROM MovieListUser
WHERE EXISTS 
	(SELECT author
    FROM UserComment
    WHERE username = author);
    
INSERT INTO ActiveCommenters
VALUES ("aglae34", "Ladarius", "Hoeger", 7489);

CREATE VIEW ChristopherNolanMovies
AS SELECT title, releaseDate, franchise, overallRating
FROM Movie
WHERE director = "Christopher Nolan";

INSERT INTO ChristopherNolanMovies
VALUES ("The Prestige", "2006-10-20", NULL, "9");

CREATE VIEW ReviewersOfDarkKnightAndTenet
AS SELECT author
FROM 
	(SELECT author, COUNT(author) AS revCount
	FROM Review
	WHERE title = "The Dark Knight" OR title = "Tenet"
    GROUP BY author) sub
WHERE revCount > 1; 

INSERT INTO ReviewersOfDarkKnightAndTenet
VALUES ("celestino33");