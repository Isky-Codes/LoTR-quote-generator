const express = require("express");
const app = express();
const PORT = 3000;


//READ Functions
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//Sets up the server
app.listen(PORT, function() {
    console.log(`Server has activated on PORT${PORT}`);
});