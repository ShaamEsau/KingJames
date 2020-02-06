/* Calls modules as variables */
var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(express.json());
app.use(bodyParser.json());
/* Calls custom JSON file */
var userInfo = require("./users.json");
/* Sets the port value as a variable */
var port = process.env.PORT || 8080;

/* GETs the request to the specified path */
app.get("/", (req, res) => {
    /* Responds with a string value when the path is requested */
    res.send("Welcome!");
    /* Stops response execution */
    res.end();
});

/* GETs the request to the specified path */
app.get("/api", (req, res) => {
    /* Retrieves specified file and reads it's data */
    fs.readFile("users.json", (err, data) => {
        /* If an error occurs, responds with the string value */
        if (err) {
            res.send("File Not Found");
            /* If no error occurs, execute the JSON files data */
        } else {
            res.send(userInfo);
        }
    })
})

/* Retrieves the file path for a HTTP Post request */
app.post("/api", (req, res) => {
    /* Appends the array with the requested information entered into the URL */
    userInfo.push(req.body)
    /* Writes data requested to the specified JSON file and converts data to a readable format for the file */
    fs.writeFile("users.json", JSON.stringify(userInfo), (err) => {
        /* If an error occurs, responds with this string value */
        if (err) {
            res.send("File did not append")
            /* If an does not error occur, responds with this string value */
        } else {
            res.send("File appended")
        }
    })
})

/* Looks for the requested port to display information */
app.listen(port, () => {
    /* Outputs a console text to make us aware that the server is running and on which port it's running */
    console.log(`Server is running on Port ${port}`)
});