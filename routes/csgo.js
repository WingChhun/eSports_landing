const express = require('express'),
    router = express.Router({
        mergeParams: true
    }),
    bodyParser = require("body-parser"),
    HLTV = require("hltv-api"),
    hltvMatch = require("hltv-match"),
    hltvUpcoming = require("hltv-upcoming-games");



router.get('/', (req, res) => {
    HLTV.getNews((news) => {
        res.json(news);
    });
});
router.get('/results', (req, res) => {
    HLTV.getResults((results) => {
        res.json(results);
    })
}) //end results



router.get("/:matchId(*)", (req, res) => {
    console.log(req.params.matchId);
    let url = "https://www.hltv.org/" + req.params.matchId;
    console.log("Url being opened... " + url);
    //parse match info from hltv
    hltvMatch(url, function (err, data) {

        if (err) {
            throw err;
            console.log(err);
        }
        res.send(data);
    });
});
router.get("/upcoming", (req, res) => {
    hltvUpcoming.getUpcoming((gamesAttr) => {
        res.json(gamesAttr);
    });
});
//export router 
module.exports = router;