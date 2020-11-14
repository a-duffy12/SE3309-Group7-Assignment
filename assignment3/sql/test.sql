USE se3309; 



UPDATE Review
SET numericalRating = 1
WHERE numericalRating = 0 AND reviewNumber > 0;


/*
SELECT reviewNumber, author, title, numericalRating
FROM Review
ORDER BY numericalRating;*/

