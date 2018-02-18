//packages
const express = require("express"),
    router = express.Router({
        mergeParams: true
    });
const bodyParser = require('body-parser');
const request = require('request');
const rp = require("request-promise");
//Global variables
const apiURL = process.env.API_URL || "https://api.pandascore.co.";
const token = process.env.API_TOKEN || "?token=xVKzGN39CghZCqeRojVpHJ08HnGsgddGS0UUkIjNisp7nF8tktQ";

//Global arrays to be populated
let allLeaguesArr = []; //array containing all leagues
let allTournamentsArr = []; //array containing all tournaments 
let allTeamsArr = []; //array containing all Teams
let allMatchesArr = []; //array containing all matches
let allPlayers = [] //array containing all players

//base route is /api
//Root /api route
router.get("/", (req, res) => {

    res.send("Router route");
});

/*
- /GET /api/leagues
 - Make request to ALl League of legends leagues
    - Only return NA LCS and EU LCS
    - Use array.find(), push both values into an empty array to be returned
 - Make request to all OW leagues
    - Only return 'The Overwatch League'
    -  Use array.find(), push into array to be returned

 - After receiving both arrays and filtering
    - Concatenate both leagues into a single array
        -Return this array, much more managable length
            -Expected length of 3
*/
router.get("/leagues", (req, res) => {

    //variables
    const API_LEAGUE_ID = 1;
    const API_OW_ID = 14;

    const API_REQUEST_LEAGUE = apiURL + "/videogames/" + API_LEAGUE_ID + "/leagues" + token;
    const API_REQUEST_OW = apiURL + "/videogames/" + API_OW_ID + "/leagues" + token;
    //Final array to be returned as json
    //test, see request URLS
    console.log("LEAGUE REQUEST \n\n" + API_REQUEST_LEAGUE);
    console.log("OW REQUEST \n\n" + API_REQUEST_OW);

    var options_LEAGUE = {
        url: API_REQUEST_LEAGUE,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    }
    var options_OW = {
        url: API_REQUEST_OW,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    }
    rp(options_OW)
        .then((data) => {

            const owArr = data.find((element) => {
                return element.name == 'The OW League';
            });

            allLeaguesArr.push(owArr);
            console.log(allLeaguesArr);

        })
        .catch((err) => {
            //error, send error
            console.log("Error fetching data from OW");
            console.log(err);
            res.redirect("/");
        });
    //Crawl webpage
    rp(options_LEAGUE)
        .then((data) => {
            //received league data, return array with NA LCS and EU LCS leagues


            const leagueArr = data.filter((element) => {
                return element.name == "NA LCS" || element.name == "EU LCS" || element.name == "NA Scouting Grounds";
            });
            allLeaguesArr = allLeaguesArr.concat(leagueArr);

            //end /GET leagues
            res.json(allLeaguesArr);
        })
        .catch((err) => {
            //error, send the error 
            console.log("Error fetching data from league");
            console.log(err);
            res.redirect("/");
        });




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
    /*
     - Get ALl tournaments for the associated leagues
         - To do this, Use the global allLeaguesArr
            -Loop through allLeaguesArr, get each league_id
            -Use this leagueId, to make a request to /leagues/:league_id/tournaments
                -after getting all data, push into a single array, to display all tournaments
                -Return this array, send as json
    */
});


module.exports = router;