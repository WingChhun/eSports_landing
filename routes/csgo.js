const express = require('express'),
    router = express.Router({
        mergeParams: true
    }),
    bodyParser = require("body-parser"),
    HLTV = require("hltv-api"),
    hltv2 = require("hltv"),
    hltvMatch = require("hltv-match"),
    hltvUpcoming = require("hltv-upcoming-games");



router.get('/', (req, res) => {
    HLTV.getNews((news) => {
        res.json(news);
console.log(news.length);
    });
});
router.get('/results', (req, res) => {
    HLTV.getResults((results) => {
        res.json(results);
    console.log(results.length);
    })
}); //end results
//export router 
module.exports = router;