# Weather Web App

A web app that shows the current temperature and weather conditions.

![](/Weather-435.png)

## Front End Request

A GET request is made to the `/weather` path with jQuery's `.ajax()` method. The user's coordinates are sent as query string data.

```javascript
function runWeatherAjax(myLatitude, myLongitude) {
  $.ajax({
    url: '/weather',
    data: {
      latitude: myLatitude,
      longitude: myLongitude,
    },
    success: function success(data) {
    //Update Web Page 
    }
```

## Back-End

The NodeJS Express `/weather` route uses the coordinates to make an API request for weather data from Darksky API.

```javascript
const url_prefix = 'https://api.darksky.net/forecast/'+process.env.DARKSKY_SECRET_KEY+'/';
app.get('/weather', function(req, res) {
  try {
    // Retrieves location coordinates (latitude and longitude) from client request query
    var coordinates = req.query.latitude+','+req.query.longitude;
    var url = url_prefix + coordinates + '?units=si';
    console.log('Fetching '+ url);
    
    fetch(url)
      .then(function(response) {
        if (response.status != 200) {
            res.status(response.status).json({'message': 'Bad response from Dark Sky server'});
            console.log((response.status).json({'message': 'Bad response from Dark Sky server'}));
        }
        return response.json();
      })
      .then(function(payload) {
          res.status(200).json(payload);
      });
  ``` 
