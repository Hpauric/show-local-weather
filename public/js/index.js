"use strict";

/* global $ */
/* global navigator */
/* global Skycons */


const skycons = new Skycons({"color": "#e3f2fd"});
let celcius;
let fahrenheit;

function celciusToFahrenheit(celcius) {
  fahrenheit = celcius * 9 / 5 + 32;
  return fahrenheit;
}

function runWeatherAjax(myLatitude, myLongitude) {
  
  $.ajax({
    url: '/weather',
    data: {
      latitude: myLatitude,
      longitude: myLongitude,
    },
    success: function success(data) {
      
      console.log(data);
      
      var summary = data.daily.summary;
      celcius = Math.round(data.currently.temperature);
      fahrenheit = Math.round(celciusToFahrenheit(celcius));
      var timezone = data.timezone;
      var iconId = data.currently.icon
      .toUpperCase()
      .replace(/-/g, "_");;
      
      $(document).ready(function() {

        $("#city").html(timezone);
        $("#summary").html(summary);
        skycons.add("icon1", Skycons[iconId]);
        skycons.play();
        $("#temp").html(" Current Temperature: " + celcius + "&deg;");
        $("#toggleTemp").html("C");
      });
      
    },
    cache: false,
    error: function error(jqXHR, errorMessage, errorThrown) {
      $("#summary").html(jqXHR.responseText);
    }
  });
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  runWeatherAjax(latitude, longitude);
}

getLocation();

$(document).ready(function() {

  let displayTempCel = true;

  $("#toggleTemp").on('click', function() {
    if (displayTempCel == true) {
      $("#toggleTemp").html("F");
      $("#temp").html("Current Temperature: " + fahrenheit + "&deg;");
      displayTempCel = false;
    }
    else {
      $("#toggleTemp").html("C");
      $("#temp").html("Current Temperature: " + celcius + "&deg;");
      displayTempCel = true;
    }
  });

});