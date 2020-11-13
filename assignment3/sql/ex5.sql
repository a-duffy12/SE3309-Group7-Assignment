USE se3309; 

SELECT title AS movie, COUNT(title) as reviewCouunt
FROM Review
GROUP BY title ORDER BY COUNT(title) DESC; 

SELECT YEAR(releaseDate) AS releaseYear, COUNT(YEAR(releaseDate)) AS moiveCount,  AVG(overallRating) AS averageRating
FROM Movie
GROUP BY YEAR(releaseDate) ORDER BY YEAR(releaseDate);

SELECT r.title AS movie, AVG(numericalRating) AS reviewRating, AVG(overallRating) AS totalRating
FROM Movie m, Review r
WHERE m.title = r.title
GROUP BY r.title;

SELECT username, u.likeCount
FROM MovieListUser u, UserComment c
WHERE username = author AND c.likeCount > 0 AND containsSpoilers = 1;

SELECT franchise, MIN(YEAR(releaseDate)) AS firstInstallment, MAX(YEAR(releaseDate)) AS lastInstallment
FROM Movie
WHERE franchise != " " OR franchise != NULL
GROUP BY franchise; 

SELECT username, FLOOR(DATEDIFF(CURDATE(), dateOfBirth)/365) AS age, COUNT(author) AS reviewsWritten
FROM MovieListUser u, Review r
WHERE username = author
GROUP BY username;