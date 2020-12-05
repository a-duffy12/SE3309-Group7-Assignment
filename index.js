const express = require("express"); // get express module
const mysql = require("mysql"); // get mysql module
const cors = require("cors"); // get cors module

const con = mysql.createConnection({
    host: "34.71.89.24",
    user: "root",
    password: "password",
    database: "se3309"    
});

var est = false; // track if server is connected to the database

const app = express(); // create app constant
const router = express.Router(); // create rotuer

const corsOptions = {  // options for cors
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200
}

router.use(express.json()); // allows express to parse json objects (middleware)

app.use("/", express.static("static")); // folder where client-side code is stored

app.use(cors(corsOptions)); // middleware to allow CORS

app.use((req, res, next) => { // middleware function to do console logs
    console.log(`${req.method} request for ${req.url}`); // print to console
    next(); // continue processeing
});

con.connect((err) => { // establish a database connection
    if (err)
    {
        console.log('Error connecting: ' + err.stack);
        est = false; // connection not established
    }
    else 
    {
        console.log('Connected as id ' + con.threadId);
        
        // set session to allow non-full group by
        con.query("SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))", (error, rows, fields) => {
            if (error) throw error;
        });
        
        est = true; // connection established
    }        
});

process.on("exit", () => { // right before closing, sever database connection
    con.end((err) => {
        if (err)
        {
            res.status(400).send("Error disconnecting!");
        }
        else
        {
            est = false;
            res.send("Disconnected from database");
        }
    });
})

// get all movies GET
router.get("/movies", (req, res) => {
    
    if (est)
    {
        con.query("SELECT * FROM movie", (error, rows, fields) => {
            if (error) throw error;
            res.send(rows);
        });
    }
    else 
    {
        res.status(404).send("No database connection established!");
    }
});

// register a new account POST
router.post("/users/:username", (req, res) => {
    
    if (est) // if connected to a database
    {
        if (sanitizeInput(req.params.username) && sanitizePass(req.body)) // sanitize input
        {
            con.query("SELECT * FROM movielistuser", (error, rows, fields) => { // get all users
                if (error) throw error;
                
                const index = rows.findIndex(u => u.username == req.params.username); // check for index of the specified user

                if (index >= 0) // user exists
                {
                    res.status(400).send("User already exists!");
                }
                else if (index < 0) // user does not exist
                {
                    con.query(`INSERT INTO movielistuser (username, password, firstName, lastName, dateOfBirth, emailAddress, likeCount) VALUES ("${req.params.username}", "${req.body.password}", "${req.body.firstName}", "${req.body.lastName}", "${req.body.dateOfBirth}", "${req.body.emailAddress}", 0);`, (err, result) => { // insert new user account
                        if (err) throw err;

                        res.send(`Created user`);
                    })
                } 
            });
        }
        else
        {
            res.status(400).send("Invalid input!");
        }
    }
    else 
    {
        res.status(404).send("No database connection established!");
    }
})

// log in to account PUT
router.put("/users/:username", (req, res) => {
    
    if (est) // if connected to a database
    {
        if (sanitizeInput(req.params.username) && sanitizePass(req.body)) // sanitize input
        {
            con.query("SELECT * FROM movielistuser", (error, rows, fields) => { // get all users
                if (error) throw error;
                
                const index = rows.findIndex(u => u.username == req.params.username); // check for index of the specified user

                if (index >= 0) // user exists
                {
                    if (req.body.password == rows[index].password) // passwords match
                    {
                        res.send(true);
                    }
                    else // passwords do not match
                    {
                        res.status(400).send("Invalid password!");
                    }
                }
                else if (index < 0) // user does not exist
                {
                    res.status(400).send("User does not exist!");
                } 
            });
        }
        else 
        {
            res.status(400).send("Invalid input!");
        }
    }
    else 
    {
        res.status(404).send("No database connection established!");
    }
})

// change account password PUT
router.put("/users/pass/:username", (req, res) => {

    if (est) // if connected to a database
    {
        if (sanitizeInput(req.params.username) && sanitizePass(req.body)) // sanitize input
        {
            con.query("SELECT * FROM movielistuser", (error, rows, fields) => { // get all users
                if (error) throw error;
                
                const index = rows.findIndex(u => u.username == req.params.username); // check for index of the specified user

                if (index >= 0) // user exists
                {
                    if (req.body.old_password == rows[index].password && req.body.old_password != req.body.password) // user entered their password correctly
                    {
                        con.query(`UPDATE movielistuser SET password = "${req.body.password}" WHERE username = "${req.params.username}"`, (err, result) => { // insert new user account
                            if (err) throw err;
    
                            res.send(`Updated user`);
                        }) 
                    }
                    else if (req.body.old_password != req.body.password)
                    {
                        res.status(400).send("Incorrect password!");
                    }
                    else if (req.body.old_password == rows[index].password)
                    {
                        res.status(400).send("New password cannot match existing password!");
                    }
                    else
                    {
                        res.status(400).send("Incorrect password, and new password cannot match existing password!");
                    }
                }
                else if (index < 0) // user does not exist
                {
                    res.status(400).send("User does not exist!");
                } 
            });
        }
        else
        {
            res.status(400).send("Invalid input!");
        }
    }
    else 
    {
        res.status(404).send("No database connection established!");
    }
})

// get all watchListEntries for a user GET
router.get("/wle/:username", (req, res) => {

    if (est) // if connected to a database
    {
        if (sanitizeInput(req.params.username))
        {
            con.query(`SELECT * FROM watchlistentry WHERE username = "${req.params.username}"`, (error, rows, fields) => {
                if (error) throw error;

                res.send(rows); // send table to front end
            });
        }
        else
        {
            res.status(400).send("Invalid input!");
        }
    }
    else
    {
        res.status(404).send("No database connection established!");
    }
})

// submit a review POST
router.post("/reviews/:username", (req, res) => {

    if (est) // if connected to a database
    {
        if (sanitizeInput(req.params.username) && sanitizePass(req.body))
        {
            con.query("SELECT * FROM watchlistentry", (error, rows, fields) => { // get all watch list entries
                if (error) throw error;
                
                const index = rows.findIndex(u => u.username == req.params.username && u.title == req.body.title && u.director == req.body.director); // check for index of the specified user
               
                if (index >= 0) // movie is on their watchlist
                {
                    con.query(`SELECT * FROM review`, (err, result) => { // insert new user account
                        if (err) throw err;

                        let revNum = result.length + 1; // set number of review
                        
                        con.query(`INSERT INTO review VALUES ("${revNum}", "${req.body.numericalRating}", "${req.body.dateCreated}", "${req.params.username}", "${req.body.title}", "${req.body.releaseDate}", "${req.body.director}")`, (er, back) => {
                            if (er) throw er;

                            res.send("Created review");
                        })
                    })
                }
                else if (index < 0) // moive is not on their watchlist
                {   
                    res.status(400).send("Movie is not in user's WatchList!");
                } 
            });
        }
        else
        {
            res.status(400).send("Invalid input!");
        }
    }
    else
    {
        res.status(404).send("No database connection established!");
    }
})

// get review counts per movie GET
router.get("/reviews/count", (req, res) => {

    if (est) // if connected to a database
    {
        con.query("SELECT title AS movie, COUNT(title) AS reviewCount FROM review GROUP BY title ORDER BY COUNT(title) DESC", (error, rows, fields) => {
            if (error) throw error;
            res.send(rows);
        });
    }
    else
    {
        res.status(404).send("No database connection established!");
    }
})

// get recommended movies (movies on friend's watch list they have seen) GET
router.get("/recommended/:username", (req, res) => {

    if (est) // if connected to a database
    {
        if (sanitizeInput(req.params.username))
        {
            con.query(`SELECT DISTINCT * FROM movie m
                WHERE EXISTS
                    (SELECT * FROM watchlistentry w
                    WHERE m.title = w.title AND m.director = w.director AND m.releaseDate = w.releaseDate AND hasSeen = 1 AND EXISTS
                        (SELECT * FROM friendship f
                        WHERE f.initiator = "${req.params.username}" AND f.friend = w.username))`, (error, rows, fields) => {
                if (error) throw error;
                res.send(rows);
            });
        }
        else
        {
            res.status(400).send("Invalid input!");
        }
    }
    else
    {
        res.status(404).send("No database connection established!");
    }
})

// get the average overall rating, average review rating, and number of reviews for a given movie GET
router.get("/rating/:title/:director", (req, res) => {

    if (est) // if connected to a database
    {
        if (sanitizeInput(req.params.title) && sanitizeInput(req.params.director))
        {
            con.query(`SELECT m.title, m.director, overallRating AS avgOverallRating, AVG(numericalRating) AS avgReviewRating, COUNT(numericalRating) AS reviewCount
                FROM movie m, review r
                WHERE m.title = "${req.params.title}" AND r.title = "${req.params.title}" AND m.director = "${req.params.director}" AND r.director = "${req.params.director}"
                GROUP BY r.title`, (error, rows, fields) => {
                if (error) throw error;
                res.send(rows);
            })
        }
        else
        {
            res.status(400).send("Invalid input!");
        }
    }
    else 
    {
        res.status(404).send("No database connection established!");
    }
})

// get all movies from a franchise
router.get("/movies/franchise/all/:franchise", (req, res) => {

    if (est) // if connected to a database
    {
        if (sanitizeInput(req.params.title) && sanitizeInput(req.params.director))
        {
            con.query(`SELECT title, director, releaseDate, overallRating FROM movie
                WHERE franchise = "${req.params.franchise}"`, (error, rows, fields) => {
                if (error) throw error;
                res.send(rows);
            })
        }
        else
        {
            res.status(400).send("Invalid input!");
        }
    }
    else 
    {
        res.status(404).send("No database connection established!");
    }
})

// get the best movie from a franchise
router.get("/movies/franchise/best/:franchise", (req, res) => {

    if (est) // if connected to a database
    {
        if (sanitizeInput(req.params.title) && sanitizeInput(req.params.director))
        {
            con.query(`SELECT title, director, releaseDate, overallRating FROM movie
                WHERE franchise = "${req.params.franchise}" AND overallRating = 
                    (SELECT MAX(overallRating) FROM movie
                    WHERE franchise = "${req.params.franchise}")`, (error, rows, fields) => {
                if (error) throw error;
                res.send(rows);
            })
        }
        else
        {
            res.status(400).send("Invalid input!");
        }
    }
    else 
    {
        res.status(404).send("No database connection established!");
    }
})

app.use("/api", router); // install router object path

// get PORT environment variable, or use 3000 if not available
const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Listening on port ${port}`)}); // choose which port to listen on

// function for alphanumeric input
function sanitizeInput(input, l) 
{ 
    // variable character limit
    if (String(input).includes("<") || String(input).includes(">") || String(input).includes("^") || String(input).includes(".") || String(input).includes("/") || String(input).includes("(") || String(input).includes(")") || String(input).includes("*") || String(input).includes("'") || String(input).includes("_") || String(input).includes("=") || String(input).includes("$") || String(input).includes("?") || String(input).includes("!") || String(input).includes("%") || String(input).includes("\"") || String(input).includes("`") || String(input).includes("+") || String(input).includes("|") || String(input).includes("&") || String(input).length > l || String(input).length < 1)
    {
        return false;
    }
    else
    {
        return true;
    }
};

// function for email addresses
function sanitizeEmail(add)
{
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(add)) // email must match this pattern
    {
        return true;
    }
    else
    {
        return false;
    }
}

// function for passwords
function sanitizePass(input, l) 
{ 
    // variable character limit
    if (String(input).includes("<") || String(input).includes(">") || String(input).includes("^") || String(input).includes(".") || String(input).includes("/") || String(input).includes("(") || String(input).includes(")") || String(input).includes("*") || String(input).includes("'") || String(input).includes("_") || String(input).includes("=") || String(input).includes("\"") || String(input).includes("`") || String(input).includes("+") || String(input).includes("|") || String(input).length > l || String(input).length < 1)
    {
        return false;
    }
    else
    {
        return true;
    }
};

