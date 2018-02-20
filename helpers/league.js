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
   /*
      router.get("/tournaments/:tournament_id/matches", leagueHelpers.getTournamentMatches);
      router.get("/leagues/:league_id/series", leagueHelpers.getLeagueSeries);
      router.get("/tournaments/:tournament_id/teams", leagueHelpers.getTournamentTeams);
      router.get("/matches/:match_id/players", leagueHelpers.getMatchPlayers);
   */
   exports.getTournamentMatches = (req, res) => {
       //req.params.tournament_id
       let tournamentMatches = [];
       let API_REQUEST_TOURNAMENT = apiURL + "/tournaments/" + req.params.tournament_id + "/matches" + token;
       options.url = API_REQUEST_TOURNAMENT;
   };
   exports.getTournamentTeams = (req, res) => {
       let tournamentArr = [];
       let API_REQUEST_TOURNAMENT = apiURL + "/leagues/" + req.params.league_id + "/tournaments/" + token;
       options.url = API_REQUEST_TOURNAMENT;
       rp(options)

           .then((data) => {
               //Return JSON of the tournaments with year 2018
               tournamentArr = data.filter((value) => {
                   return value.serie.year == 2018;
               });
               //Have 2018 tournamens
               //Now need to create a new array and only push the teams
               const teamArr = [];
               for (let tournament of tournamentArr) {

                   teamArr.push(tournament.teams);
               }; //end loop

               res.json(teamArr);



           }).catch((err) => {
               console.log(err);
               res.redirect("/api/leagues");
           });
   };
   exports.getSeries = (req, res) => {
       //Passed in a :id for the series, look it up and send data
       let seriesArr = [];
       let API_REQUEST_SERIES = apiURL + "/series/" + req.params.series_id + token;
       options.url = API_REQUEST_SERIES;
       rp(options)
           .then((data) => {
               res.json(data);
           }).catch((err) => {
               console.log(err);
               res.redirect("/api/leagues");
           });
   }
   exports.getLeagueSeries = (req, res) => {
       //req.params.league_id

   };
   exports.getTournamentMatches = (req, res) => {
       let seriesArr = [];
       let API_REQUEST_tournament = apiURL + "/tournaments/" + req.params.tournament_id + "/matches" + token;
       options.url = API_REQUEST_tournament;
       rp(options)
           .then((matches) => {
               console.log("getTournament matches length +\n" + matches.length);
               res.json(matches);
           })
           .catch((err) => {
               console.log(err);
               res.redirect("/api/leagues");
           })
   }
   exports.getMatchesUpcoming = (req, res) => {
       let seriesArr = [];
       let API_REQUEST_tournament = apiURL + "/matches/" + "upcoming" + token;
       options.url = API_REQUEST_tournament;
       rp(options)
           .then((upcomingMatches) => {
               console.log("getTournament upcomingMatches length +\n" + upcomingMatches.length);
               //I only want array of relevant leagueIds
               //Known league IDS = 289, 290 and 4101
               const upcoming = upcomingMatches.filter((match) => {
                   return match.league_id == 289 || match.league_id == 290 || match.league_id == 4101;
               });
               console.log("getTournament upcomingMatches length +\n" + upcoming.length);
               res.json(upcoming);
           })
           .catch((err) => {
               console.log(err);
               res.redirect("/api/leagues");
           })
   }
   exports.getMatchPlayers = (req, res) => {
       //req.params.match_id
       let API_REQUEST_tournament = apiURL + "/matches/" + req.params.match_id + "/players" + token;
       options.url = API_REQUEST_tournament;
       rp(options)
           .then((players) => {
               res.json(players);
           })
           .catch((err) => {
               console.log(err);
               res.redirect("/api/leagues");
           })
   };