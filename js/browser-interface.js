// 1. glyphicon still not working without seperate bootstrap.css file / do this later
// 2. move arrays and functions to seperate folder
// 3. remove local style array (maybe)
// 4. remove track zoom function if not being used
// 5. go through global variables and remove any that aren't being used
// 6. refactor click handlers somehow, maybe create seperate interface functions or possibly write a function to run in each click event handler and write them in a for loop
// 7. maybe add guess and new round click handlers to their own folders
// 8. instead of usng set timeout, wrap all code in a promise
// 9. wrap everything inside main set interval loop in its own function, if that's not too clunky
// 10. if possible, hide api key

var apiKey = require("./../.env").apiKey;
var getLocation = require('./../js/location.js').getLocation;
var Location = require('./../js/location.js').Location;
var Map = require('./../js/map.js').Map;
var Game = require('./../js/game.js').Game;


function findCities(city) {
  return city.featureType === "administrative.locality";
}

function findWater(water) {
  return water.featureType === "water";
}

function findAttractions(attraction) {
  return attraction.featureType === "poi";
}

function findRoads(road) {
  return road.featureType === "road";
}

$(function() {

  var newMap;
  var myLocation;
  var currentGame;

  $.getJSON('./../cities.json', function(data) {
    var index = Math.floor(Math.random() * 15);
    var newLocation = new Location(data[index].cityName, data[index].lat, data[index].lng);
    newMap = new Map(newLocation);
    currentGame = new Game(newMap);
    myLocation = newLocation;
  }).then(function() {
    // GENERATE SCRIPT TAG IN DOM
    var s = document.createElement("script");
    s.type="text/javascript";
    s.src="http://maps.googleapis.com/maps/api/js?key=" + apiKey;
    $("head").prepend(s);



  });



  // // INITIALIZE GLOBAL VARIABLES
  // var map;
  // var centerLatitude;
  // var centerLongitude;
  // var currentLatitude;
  // var currentLongitude;
  // var index = Math.floor(Math.random() * 15);
  // var city;
  // var playedCities = [];
  // var maxDistance = 4000;
  // var minZoomLevel = 12;
  // var zoom = 14;
  // var maxZoom = 14;
  // var points = 1000;
  // var totalScore = 0;
  // var localStyleArray = [];
  // var decrimentTimer = 1000;
  // var localTimer;
  // var changeTimer = false;
  // var scoreTimer;

  setTimeout(function() {
    google.maps.event.addDomListener(window, 'load', newMap.initialize());
    newMap.limitZoom();
    newMap.createCircle();
  }, 300);

  setInterval(function() {
    if (currentGame !== undefined) {
      currentGame.gameLoop();
    }
  }, 20);

  $('#guess').show();

  // CALCULATE DISTANCE FROM MAP-LOAD CENTER TO DECRIMENT GAME SCORE


  // JQUERY TO SHOW MAP LABELS
  $('#cityLabels').click(function() {
    currentGame.showLabels(1000, 5);
  });

  $('#waterLabels').click(function() {
    currentGame.showLabels(300, 3);
  });
  $('#attractionLabels').click(function() {
    currentGame.showLabels(750, 4);
  });
  $('#roadLabels').click(function() {
    currentGame.showLabels(200, 2);
  });

  // GAME FUNCTIONALITY

  setInterval(function() {
    $("#points").text(points);
  }, 5);

  $("#guess").submit(function(event) {
    event.preventDefault();
    // debugger;
    var guess = $("#guessInput").val().toLowerCase();
    $('#result').show();
    console.log(city.cityName);
    if (guess === city.cityName.toLowerCase()) {
      totalScore += points;
      $("#result").text("Right! Good Job!");
      playedCities.push(city);
      $("#totalScore").text(totalScore);
      $('#newRound').show();
      $('#guess').hide();
    } else {
      $("#result").text("wrong answer");
      points -= 100;
    }
    setTimeout(function() {
      $("#result").hide();
    }, 2000);
    $("#guessInput").val("");
  });

  $('#newRound').click(function() {
    points = 1000;
    maxZoom = 14;
    $('#guess').show();
    var newCity = false;
    var counter = 0;
    while(!newCity) {
      index = Math.floor(Math.random() * 15);
      city = cityArray[index];
      if (playedCities.indexOf(city) < 0) {
        console.log(city.cityName);
        newCity = true;
      }
      counter++;
      if(counter > 1000) {
        break;
      }
    }
    for(var i = 2; i<6; i++) {
      if(localStyleArray[i].stylers[0].visibility !== "off") {
        localStyleArray[i].stylers[0].visibility = "off";
      }
    }
    centerLatitude = city.lat;
    centerLongitude = city.lng;
    google.maps.event.addDomListener(window, 'load', initialize(localStyleArray, centerLatitude, centerLongitude, zoom));
    map = initialize(localStyleArray, centerLatitude, centerLongitude, zoom);
    limitZoom(map, minZoomLevel);
    createCircle(map, centerLatitude, centerLongitude);
    $('#newRound').hide();
  });
});
