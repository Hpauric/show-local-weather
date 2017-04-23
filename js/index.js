"use strict";

/* global $ */
/* global navigator */

var celcius;
var fahrenheit;
var displayTempCel = true;

function celciusToFahrenheit(celcius) {
  fahrenheit = celcius * 9 / 5 + 32;
  return fahrenheit;
}

function runWeatherAjax(latitude, longitude) {
  var weatherUrl = 'https://api.darksky.net/forecast/4ad85cdfc9b22bcc12afacae1c4234d1/' + 
  latitude + 
  '&lon=' + longitude + 
  '&APPID=c61f567cd175ce7a781517bc769dab46' + '&units=metric';
  $.ajax({
    url: weatherUrl,
    success: function success(data) {
      
      console.log(data);
      
      var summary = data.weather[0].description;
      celcius = Math.round(data.main.temp);
      fahrenheit = Math.round(celciusToFahrenheit(celcius));
      var city = data.name;
      var iconid = data.weather[0].id;
      $(document).ready(function() {

        $("#city").html(city);
        $("#summary").html(summary);
        $("#tempicon").toggleClass("wi-owm-" + iconid, true);
        $("#temp").html("Temperature: " + celcius + "&deg;");
      });
    },
    cache: false,
    error: function error(jqXHR, errorMessage, errorThrown) {
      console.log(jqXHR.status);
      $("#summary").html(jqXHR.responseText);
    }
  });
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
  console.log("hi");
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  console.log(latitude);
  console.log(position);
  //country = data.country;
  runWeatherAjax(latitude, longitude);
  //getWeather(lat, lon);
}

$(document).ready(function() {

  getLocation();

  $("#toggleTemp").on('click', function() {
    if (displayTempCel == true) {
      $("#toggleTemp").html("F");
      $("#temp").html("Temperature: " + fahrenheit + "&deg;");
      displayTempCel = false;
    }
    else {
      $("#toggleTemp").html("C");
      $("#temp").html("Temperature: " + celcius + "&deg;");
      displayTempCel = true;
    }
  });

});