USE se3309;

DELETE 
FROM UserComment
WHERE likeCount <= 0 AND parentCommentId > 0;

INSERT INTO Friendship
VALUES ("aglae34", 
	(SELECT author
    FROM Review
    WHERE title = "Interstellar"));
    
UPDATE Review
SET numericalRating = 1
WHERE numericalRating = 0 AND reviewNumber > 0;