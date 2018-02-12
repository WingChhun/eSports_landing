const express = require('express'),
    router = express.Router({
        mergeParams: true
    }),
    bodyParser = require("body-parser"),
    HLTV = require("hltv-api"),
    HLTV2 = require('hltv');



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


router.get('/:matchId(*)', function (req, res) {
    const matchId = req.params.matchId;
    HLTV.getMatch(matchId, function (stats) {
        return res.json(stats);
    });
});

//export router 
module.exports = router;