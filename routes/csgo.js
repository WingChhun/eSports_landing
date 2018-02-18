const express = require('express'),
    router = express.Router({
        mergeParams: true
    }),
    bodyParser = require("body-parser"),
    HLTV = require("hltv-api"),
    hltv2 = require("hltv"),
    hltvMatch = require("hltv-match"),
    hltvUpcoming = require("hltv-upcoming-games");


/*
 - Plan
 - Fetch data, load into accordian template
*/
router.get('/', (req, res) => {
    HLTV.getNews((news) => {
        res.json(news);
        console.log(news.length); //expected length = 10
        /*
        Returned - 
          {
            "title": "NEO: \"The change brought a lot of freshness and a boost of motivation\"",
            "description": "We interviewed Filip \"NEO\" Kubski after Virtus.pro's hard-fought victory over MVP PK and heard about adding MICHU and the roles in the team.",
            "link": "https://www.hltv.org/news/22820/neo-the-change-brought-a-lot-of-freshness-and-a-boost-of-motivation",
            "date": "Sun, 18 Feb 2018 17:11:00 GMT"
          },
        */
    });
});

/*
Fetch results of matches,
     -  PLAN
      - feed data and load data using pagination
      - Append match ID onto 'http://www.hltv.org' + matchId 
*/
router.get('/results', (req, res) => {
    HLTV.getResults((results) => {
        res.json(results);
        console.log(results.length); //expected length >=100
        /* {
    "event": "StarSeries i-League Season 4",
    "maps": "bo3",
    "team1": {
      "name": "Virtus.pro",
      "crest": "https://static.hltv.org/images/team/logo/5378",
      "result": 2
    },
    "team2": {
      "name": "MVP PK",
      "crest": "https://static.hltv.org/images/team/logo/7354",
      "result": 1
    },
    "matchId": "/matches/2319670/virtuspro-vs-mvp-pk-starseries-i-league-season-4"
  }
        */
    });

}); //end results
//export router 
module.exports = router;