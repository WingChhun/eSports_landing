   const bodyParser = require('body-parser');
   const request = require('request');
   const rp = require("request-promise");
   //Global variables
   const apiURL = process.env.API_URL || "https://api.pandascore.co.";
   const fullURL = "https://api.pandascore.co./tournaments?token=xVKzGN39CghZCqeRojVpHJ08HnGsgddGS0UUkIjNisp7nF8tktQ";
   const token = process.env.API_TOKEN || "?token=xVKzGN39CghZCqeRojVpHJ08HnGsgddGS0UUkIjNisp7nF8tktQ";
   //variables
   const API_LEAGUE_ID = 1;
   const API_OW_ID = 14;
   var options = {
       url: apiURL,
       headers: {
           'User-Agent': 'Request-Promise'
       },
       json: true
   }
   //Global arrays to be populated
   var allLeaguesArr = []; //array containing all leagues
   let allTournamentsArr = [];
   var baseLeagueArr = []; //All other routes depend on having this array available first
   (function getLeagues() {

       const API_REQUEST_LEAGUE = apiURL + "/videogames/" + API_LEAGUE_ID + "/leagues" + token;
       const API_REQUEST_OW = apiURL + "/videogames/" + API_OW_ID + "/leagues" + token;


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
               baseLeagueArr.push(owArr);
               allLeaguesArr.push(owArr);


           })
           .catch((err) => {
               //error, send error
               console.log("Error fetching data from OW");
               console.log(err);

           });
       //Crawl webpage
       rp(options_LEAGUE)
           .then((data) => {
               //received league data, return array with NA LCS and EU LCS leagues


               const leagueArr = data.filter((element) => {
                   return element.name == "NA LCS" || element.name == "EU LCS";
               });
               allLeaguesArr = allLeaguesArr.concat(leagueArr);
               baseLeagueArr = baseLeagueArr.concat(leagueArr);

           })
           .catch((err) => {
               //error, send the error 
               console.log("Error fetching data from league");
               console.log(err);

           });
   })();
   exports.getLeagues = function (req, res) {
       setTimeout(() => {
           res.json(allLeaguesArr);
       }, 2000);
   };
   // loop through all elements
   //grab leagueId,
   //Make a request and push into tournament array
   exports.getLeagueTournaments = (req, res) => {

       let tournamentArr = [];
       let API_REQUEST_TOURNAMENT = apiURL + "/leagues/" + req.params.id + "/tournaments/" + token;
       options.url = API_REQUEST_TOURNAMENT;
       rp(options)

           .then((data) => {
               //Return JSON of the tournaments with year 2018
               tournamentArr = data.filter((value) => {
                   return value.serie.year == 2018;
               });
               res.json(tournamentArr);

           }).catch((err) => {
               console.log(err);
               res.redirect("/api/leagues");
           });

   };