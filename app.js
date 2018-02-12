const express = require('express'),
    app = express(),

    bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const apiRoutes = require("./routes/api.js");
const csRoutes = require("./routes/csgo.js");
//APP SETTINGS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//app.set('view engine', 'ejs'); //default template ejs
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/src'));
//api routes

app.use("/api", apiRoutes);
app.use("/csgo", csRoutes);
//ROUTES
app.get('/', (req, res) => {
    res.render("src/index.html");
});






app.listen(port, () => {
    console.log("Server has started on port " + port);
});