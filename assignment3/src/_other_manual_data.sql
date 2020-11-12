INSERT INTO MovieGenre
VALUES ("Thriller", "Inception", "2010-07-16", "Christopher Nolan");
INSERT INTO MovieGenre
VALUES ("Action", "The Dark Knight", "2008-07-18", "Christopher Nolan");
INSERT INTO MovieGenre
VALUES ("Action", "The Dark Knight Rises", "2012-07-20", "Christopher Nolan");

INSERT INTO MovieCastMember
VALUES ("Christian Bale", "The Dark Knight", "2008-07-18", "Christopher Nolan");
INSERT INTO MovieCastMember
VALUES ("Christian Bale", "The Dark Knight Rises", "2012-07-20", "Christopher Nolan");
INSERT INTO MovieCastMember
VALUES ("Leonardo DiCaprio", "Inception", "2010-07-16", "Christopher Nolan");
INSERT INTO MovieCastMember
VALUES ("Joseph Gordon-Levitt", "Inception", "2010-07-16", "Christopher Nolan");
INSERT INTO MovieCastMember
VALUES ("Ellen Page", "Inception", "2010-07-16", "Christopher Nolan");
INSERT INTO MovieCastMember
VALUES ("Tom Hardy", "Inception", "2010-07-16", "Christopher Nolan");
INSERT INTO MovieCastMember
VALUES ("Matt Damon", "Interstellar", "2014-11-07", "Christopher Nolan");

INSERT INTO WatchListEntry
VALUES ("Inception", "2010-07-16", "Christopher Nolan", "AngryBanana", "2020-11-11", "2020-11-11", 1);
INSERT INTO WatchListEntry
VALUES ("Inception", "2010-07-16", "Christopher Nolan", "greatly", "2020-11-11", NULL, 0);
INSERT INTO WatchListEntry
VALUES ("The Dark Knight", "2008-07-18", "Christopher Nolan", "greatly", "2020-11-11", "2020-11-12", 1);
INSERT INTO WatchListEntry
VALUES ("The Dark Knight", "2008-07-18", "Christopher Nolan", "AngryBanana", "2020-11-12", "2020-11-12", 1);

INSERT INTO Friendship
VALUES ("AngryBanana", "greatly");
INSERT INTO Friendship
VALUES ("greatly", "AngryBanana");
INSERT INTO Friendship
VALUES ("AngryBanana", "aglae34");
INSERT INTO Friendship
VALUES ("aglae34", "AngryBanana");

INSERT INTO UserComment
VALUES ("3", "2020-11-12", "14", 1, NULL, "ulockman", "The Dark Knight", "2008-07-18", "Christopher Nolan");
INSERT INTO UserComment
VALUES ("4", "2020-11-12", "4", 1, "3", "AngryBanana", "The Dark Knight", "2008-07-18", "Christopher Nolan");
INSERT INTO UserComment
VALUES ("5", "2020-11-12", "3", 0, "3", "zreilly", "The Dark Knight", "2008-07-18", "Christopher Nolan");
