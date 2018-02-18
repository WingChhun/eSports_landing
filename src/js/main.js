/*
Variables
*/

const apiURL = "https://api.pandascore.co.";
const token = "?token=xVKzGN39CghZCqeRojVpHJ08HnGsgddGS0UUkIjNisp7nF8tktQ";
$(document).ready(() => {

    console.log("Document ready...");

    start();
});

function start() {
    //variables to be used among all functions
    const $sectionFeed = document.querySelector("#feed__data");
    this.init = function () {
        //run itself function
       // this.getAllLeagues();
        //this.getLoLLeagues();
    }

    this.getLoLLeagues = function () {
        //make ajax request to populate with leagues
        var API_URL = apiURL + "/videogames/1/leagues" + token;
        $.get(API_URL)
            .then((data) => {

                console.log("getLeagued, response for data");
                let template = "";
                const filteredData = data.filter((value) => {
                    return value.name == "NA LCS" || value.name == "EU LCS" ||
                        value.name == "NA Scouting Grounds" && value.url != null;
                })

                filteredData.forEach((value) => {
                    template += createTemplate(value);

                }); //end for each , create a template
                $sectionFeed.insertAdjacentHTML("afterbegin", template);

            })
            .catch((err) => {
                console.log("Error at getLeagues function!");
            })
    }
    this.getAllLeagues = function () {
        //get all leagues and filter data
        var API_URL = apiURL + "/leagues" + token;
        let template = "";
        $.get(API_URL)
            .then((data) => {
                console.log("fetching all league data");
                //create new array, I only want specific leagues
                //Leagues include NA LCS , EU LCS, The OW League
                const filteredArr = data.filter((value) => {
                    return (value.name == "NA LCS") || (value.name == "EU LCS") ||
                        (value.name == "The OW League");
                }); //end filter
                filteredArr.forEach((element) => {
                    template += createTemplate(element);
                })
                $sectionFeed.insertAdjacentHTML('afterbegin', template);
            })
            .catch((err) => {
                console.log("Error fetching all League data...");
                console.log(err);
            })
    }
    this.createTemplate = function (value) {
        //receive data, return a string to add to template
        const strTemplate = `  <div class="col-xs-6 col-sm-6  col-md-4 my-3">
    <div class="card p-2">
        <img class="card-img-top img-fluid card__img" src="${value.image_url}" alt="" data-leagueID="${value.id}">
        <div class="card-block">
            <h4 class="card-title pt-1">${value.name}</h4>
            <br>
            <a target = "_blank"href ="${value.url} "class  = "btn btn-info">Visit Official Site</a>
            
                
        </div>
    </div>
    </div><!-- end container -->`;
        return strTemplate;
    }
    this.init();
}