const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const PORT = 3000;
const connectionString = "mongodb+srv://isky-codes:FTLmiSZjZ93sS8ds@lotr-quotes.r8tir.mongodb.net/?retryWrites=true&w=majority";



MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log("Connected to Database");
        const db = client.db("LotR-Quotes");
        const quotesCollection = db.collection("quotes");

        app.set("view engine", "ejs");
        app.use(bodyParser.urlencoded({ extended: true }));

        //READ Functions
        app.get("/", (req, res) => {
            db.collection("quotes").find().toArray()
                .then(results => {
                    res.render("index.ejs", {quotes: results});
                })
                .catch(error => console.error(error));
            
        });


        //CREATE Functions
        app.post("/quotes", (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect("/");
                })
                .catch(error => console.error(error));
        });

        //Sets up the server
        app.listen(PORT, function() {
            console.log(`Server has activated on PORT${PORT}`);
        });

    })
    .catch(error => console.error(error));


