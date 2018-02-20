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

const leagueHelpers = require("../helpers/league");



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
router.get("/leagues", leagueHelpers.getLeagues);

router.get("/:id/tournaments", leagueHelpers.getLeagueTournaments);
/*
  - Get ALl tournaments for the associated leagues
      - To do this, Use the global allLeaguesArr
         -Loop through allLeaguesArr, get each league_id
         -Use this leagueId, to make a request to /leagues/:league_id/tournaments
             -after getting all data, push into a single array, to display all tournaments
             -Return this array, send as json
 */

//videogame leagues

router.get("/tournaments/:tournament_id/matches", leagueHelpers.getTournamentMatches);
router.get("/leagues/:league_id/series", leagueHelpers.getLeagueSeries);
router.get("/tournaments/:league_id/teams", leagueHelpers.getTournamentTeams);
router.get("/matches/:match_id/players", leagueHelpers.getMatchPlayers);
module.exports = router;