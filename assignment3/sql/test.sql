USE se3309; 
/*
SELECT DISTINCT u.username, u.likeCount 
FROM MovieListUser u, Review r, UserComment c, WatchListEntry w
WHERE u.likeCount > 1000000 AND u.username != r.author AND u.username != c.author AND u.username != w.username; */

SELECT username, likeCount 
FROM MovieListUser u, Review r 
WHERE likeCount > 100000 AND
	(SELECT COUNT(author) AS reviewCount
    FROM Review
    GROUP BY author) = 0;