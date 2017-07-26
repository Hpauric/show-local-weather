# Weather Web App

A web app that shows the current temperature and weather conditions.

![](/Weather-435.png)

## API Backend Integration

Uses Darksky API

## Front End Request

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
