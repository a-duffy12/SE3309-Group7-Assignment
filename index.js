const express = require("express"); // get express module
const mysql = require("mysql"); // get mysql module 

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "se3309"
});

var est = false; // track if server is connected to the database

const app = express(); // create app constant
const router = express.Router(); // create rotuer

router.use(express.json()); // allows express to parse json objects (middleware)

app.use("/", express.static("static")); // folder where client-side code is stored

app.use((req, res, next) => { // middleware function to do console logs
    console.log(`${req.method} request for ${req.url}`); // print to console
    next(); // continue processeing
});

// establish a connection to the database
router.get("/connect", (req, res) => {

    con.connect((err) => {
        if (err)
        {
            res.status(400).send('Error connecting: ' + err.stack);
            est = false; // connection not established
        }
        else 
        {
            res.send('Connected as id ' + con.threadId);
            est = true; // connection established
        }        
    });
})

// get all movies GET
router.get("/movies", (req, res) => {
    
    if (est)
    {
        con.query('SELECT franchise, MIN(YEAR(releaseDate)) AS firstInstallment, MAX(YEAR(releaseDate)) AS lastInstallment FROM Movie WHERE franchise != " " OR franchise != NULL GROUP BY franchise ', (error, rows, fields) => {
            if (error) throw error;
            res.send(rows);
        });
    }
    else 
    {
        res.status(404).send("No database connection established!");
    }
})

// terminate a connection to the database
router.get("/disconnect", (req, res) => {
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

