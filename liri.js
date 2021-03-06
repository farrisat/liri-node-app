require("dotenv").config();
const axios = require("axios");
var keys = require("./keys.js");
var moment = require('moment');
moment().format();
var Spotify = require('node-spotify-api');

// concertThis function
function concertThis(artist) {
var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
axios.get(URL).then(function (response) {
    response.data.forEach(element => {
        console.log("Venue name: "+element.venue.name)
        console.log("Venue location:"+element.venue.city+", "+element.venue.region)
        console.log(moment(element.datetime).format("MM/DD/YYYY"));
        console.log("\n")
    });

  })
  .catch(function (error) {
    console.log(error);
  });
}


//spotifyThis function
function spotifyThis(songName){
var spotify = new Spotify(keys.spotify)
  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    data.tracks.items[0].artists.forEach(element => {
        console.log(element.name)
    });
  console.log(data.tracks.items[0].name);
  console.log(data.tracks.items[0].external_urls.spotify);
  console.log(data.tracks.items[0].album.name)
  console.log("\n")
});
}

// movie function-needs spacing for rotten tomatoes Rating and and add IMDB and country titles. MAKE IT PRETTY.
function movieThis(movieTitle) {
var movieURL = "http://www.omdbapi.com/"

axios.get(movieURL, {
    params: {
        apikey: "trilogy",
        t: movieTitle,
    
    }
})
.then(function (response) {
console.log(response.data.title);
console.log(response.data.year);
console.log(response.data.imdbRating);
response.data.Ratings.forEach(element => {
    if (element.Source==='Rotten Tomatoes') {
        console.log(element.Source + element.Value)
    }
});
console.log(response.data.Country)
console.log(response.data.Language)
console.log(response.data.Plot)
console.log(response.data.Actors)
})
}

chooseFunction(process.argv[2],process.argv[3])
// spotify this song not ace of bass....we don't care about Harry Styles
function chooseFunction(command, argument) {
    if (command ==="concert-this") {
        if (argument===undefined){
            console.log("Pick a good band");
            process.exit();
        }
        concertThis(argument)
    }

    else if (command === "spotify-this-song") {
        if (argument===undefined) {
            argument="The Sign"
        }
        spotifyThis(argument)
    }

    else if (command === "movie-this") {
        if (argument===undefined) {
            argument = "Mr. Nobody"
        }
        movieThis(argument)
    }

    else if (command === "do-what-it-says") {
        obey()
    }
}

function obey() {
    var fs = require("fs")
    var path = "random.txt"

    fs.readFile(path, {encoding: 'utf-8'}, function(err,data){
            if (!err) {
            var splice = data.split(",")
            chooseFunction(splice[0],splice[1])
     } })
}
