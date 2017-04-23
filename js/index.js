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

function runSecondAjax(latitude, longitude) {
  var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=c61f567cd175ce7a781517bc769dab46' + '&units=metric';
  $.ajax({
    url: weatherUrl,
    success: function success(data) {
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
  console.log(lat);
  console.log(position);
  //country = data.country;
  runSecondAjax(latitude, longitude);
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