const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set(express.static(__dirname + '/views'));

app.set(express.static(__dirname + '/src'));

//include routes here


//root route
app.get("/", (req, res) => {
    res.render("index.html");


});

app.get("*", (req, res) => {
    res.redirect("/");
})

//start servver
app.listen(port, () => {
    console.log("Server has started, listening on port... " + port);
});