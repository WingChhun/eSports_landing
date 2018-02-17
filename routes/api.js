//packages
const express = require("express"),
    router = express.Router({
        mergeParams: true
    });
const bodyParser = require('body-parser');
const request = require('request');

//Global variables
const apiURL = "https://api.pandascore.co.";
const token = "?token=xVKzGN39CghZCqeRojVpHJ08HnGsgddGS0UUkIjNisp7nF8tktQ";



//base route is /api
//Root /api route
router.get("/", (req, res) => {

    res.send("Router route");
});
router.get("/leagues", (req, res) => {

    const API_REQUEST = apiURL + "/leagues" + token;
    var body2;
    request(API_REQUEST, {
        json: true
    }, (err, response, body) => {
        if (err) {
            return console.log(err);
        }
        //body containers data we want, need to manipulate array for league data
        console.log("Established connection");
        const leagueArr = body.filter((value) => {
            return value.videogame.name = "LoL" && value.videogame.slug == "league-of-legends";
        });
        console.log(leagueArr);
        //res.send(body);
        res.send(leagueArr);
    }); //end request

});
//videogame leagues
router.get("/videogames/:videogame_id/leagues", (req, res) => {

    const API_REQUEST = apiURL + "/videogames/" + req.params.videogame_id + "/leagues" + token;
    console.log(req.params.videogame_id);
    console.log(API_REQUEST);
    request(API_REQUEST, {
        json: true
    }, (err, resp, body) => {
        //handle data here
        if (err) {
            return console.log(err);
        }
        console.log(body.length); //check length of array
        res.json(body);
    });
});
router.get("/tournaments", (req, res) => {
    //api url
    //Video game ids
    //1 = LoL, 4 = Dota2  14 = OW
    const leagueId = 1;
    const dotaId = 4;
    const owId = 14;
    const API_REQUEST = apiURL + "/videogames/" + leagueId + "/tournaments" + token;
    request(API_REQUEST, {
        json: true
    }, (err, resp, body) => {
        if (err) {
            return console.log(err);
        } //else
        //only return 2018 series
        const leagueArr = body.filter((value) => {
            return value.serie.year = 2018;
        });
        res.send(leagueArr);
    });
});
router.get("/lol/games", (req, res) => {
    const API_REQUEST = apiURL + "/lol/spells" + token;
    request(API_REQUEST, {
        json: true
    }, (err, resp, body) => {
        console.log(API_REQUEST);
        res.send(body);
    });
})

//Get NA-LCS
router.get("/league/lol", (req, res) => {
    //get NALCS league
    const API_REQUEST = apiURL + "/leagues/289" + token;
    request(API_REQUEST, {
        json: true
    }, (err, resp, body) => {
        res.send(body); //send na lcs
    });
})
//export all routes

/*
Get league API
*/

router.get("/news", (req, res) => {
    api.getNews()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        })
});; //end get news
module.exports = router;