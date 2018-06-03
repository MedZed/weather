navigator.geolocation.getCurrentPosition(
  function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    // pass coordinates to weather API
    var url = 'https://fcc-weather-api.glitch.me/api/current?lat=' + latitude + '&lon=' + longitude;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        //Success!
        var data = JSON.parse(request.responseText);
        console.log(data)
        
        //format and print the temperature, location and description to the page
        document.querySelector(".weather").innerHTML = '<span>' + data.main.temp +'</span>' + '<span> °C </span>';
        document.querySelector(".location").innerHTML = data.name + ', ' + data.sys.country;
        document.querySelector(".description").innerHTML = data.weather[0].description;
        
        //change image and background
        var background = {
          Clouds: 'https://imgur.com/KM8R8Dx.gif',
          Rain: 'https://imgur.com/qMDGHgQ.gif',
          Clear: 'https://imgur.com/w0fmIiU.gif',
          Snow: 'https://imgur.com/LUbqb20.gif'
};
        var weatherMain = data.weather[0].main;
        // update card's image
        document.querySelector(".img-bg").src = background[weatherMain];
        // update background image
        document.querySelector(".page-bg").style.background = "url(" + background[weatherMain] + ")" + "no-repeat center fixed";
        document.querySelector(".page-bg").style.backgroundSize = "cover";
        
        // show Icon according to the weather
        var icons = {
          Clouds: 'https://imgur.com/qMDGHgQ.png',
          Rain: 'https://imgur.com/L4PAfGI.png',
          Clear: 'https://imgur.com/Zlilkt5.png',
          Snow: 'https://imgur.com/wcqKp9R.png'
        };
        document.querySelector(".icon-png").src = icons[weatherMain];
        
          
     
        elements[1].addEventListener('click', function(e) {
          elements[0].innerHTML = C;
          elements[2].classList.add("convert");
          elements[1].classList.remove("convert");
        });
        
      }
      else {
        // We reached our target server, but it returned an error
        document.querySelector(".data").innerHTML = "Server returned an error"
      }
    };
    request.onerror = function() {
      // There was a connection error of some sort
      document.querySelector(".data").innerHTML = "Weather API returned Connection Error"
    };
    request.send();
  },
  function(error) {
    document.querySelector(".data").innerHTML = "Failed to get location data. " + error
  }
);