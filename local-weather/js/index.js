"use strict";

var celcius;
var fahrenheit;
var displayTempCel = true;

function celciusToFahrenheit(celcius) {
  fahrenheit = celcius * 9 / 5 + 32;
  return fahrenheit;
}

function runSecondAjax(latitude, longitude, country) {
  var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=c61f567cd175ce7a781517bc769dab46' + '&units=metric';
  $.ajax({
    url: weatherUrl,
    success: function success(data) {
      var summary = data.weather[0].description;
      celcius = Math.round(data.main.temp);
      fahrenheit = Math.round(celciusToFahrenheit(celcius));
      var city = data.name;
      var iconid = data.weather[0].id;
      $(document).ready(function () {

        $("#city").html(city + ", " + country);
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

$(document).ready(function () {

  getLocation();

  function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
    console.log("hi");
  }

  function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    //console.log(lat);
    //getWeather(lat, lon);
    //console.log(position);
  }

  $("#toggleTemp").on('click', function () {
    if (displayTempCel == true) {
      $("#toggleTemp").html("F");
      $("#temp").html("Temperature: " + fahrenheit + "&deg;");
      displayTempCel = false;
    } else {
      $("#toggleTemp").html("C");
      $("#temp").html("Temperature: " + celcius + "&deg;");
      displayTempCel = true;
    }
  });
});

$(document).ready(function () {

  //Get Co-ordinates
  var longitude;
  var latitude;
  var myUrl = "http://ip-api.com/json/?callback=";
  var country;
  $.ajax({
    url: myUrl,
    success: function success(data) {
      longitude = data.lon;
      latitude = data.lat;
      country = data.country;
      console.log(data);
      console.log(longitude);
      console.log(latitude);
      runSecondAjax(latitude, longitude, country);
    },
    error: function error(jqXHR, errorMessage, errorThrown) {
      //console.log("error");
      //console.log(errorMessage);
      //console.log(errorThrown);
      //console.log(jqXHR);
      //$("#summary").html(jqXHR.responseText);
    }
  });
});