document.addEventListener("DOMContentLoaded", async function () {
  const urlStart = "http://localhost:3000/api/weather";
  const waterDroplet = "../img/water-drop.svg"
  const currentDateElement = document.getElementById("current-date");
  const currentWeatherElement = document.getElementById("current-weather");
  const currentTime = document.getElementById("current-time");
  const currentWeatherIcon = document.getElementById("current-weather-icon");
  const currentIcon = document.getElementById("current-time-div");
  const dayOrNot = document.getElementById("day-or-not");
  const futureForcastList = document.getElementById("future-forcast")
  const currentDate = new Date();
  
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate).toUpperCase();

  // Set the formatted date to the current date element
  currentDateElement.innerText = formattedDate;

  // Create image and h4 elements for weather
  const imgElement = document.createElement('img');
  const currentH4Element = document.createElement('h4');

  // Set attributes for the image element
  imgElement.alt = 'Weather Condition Image';
  imgElement.style.width = '100px';

  // Append image and h4 elements to the current weather element

  //currentWeatherElement.appendChild(imgElement);

  currentWeatherElement.appendChild(currentH4Element);
  currentIcon.appendChild(imgElement);


  // Function to convert time from a date string
  const convertedTime = (dateString) => {
    const dateObject = new Date(dateString);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };
  const convertDate = (dateString) => {
    // Split the date string into an array of year, month, and day components
    const [year, month, day] = dateString.split("-");
  
    // Return the date in dd/mm format
    return `${day}/${month}`;
  }
  const getDayOfWeek = (date) => {
    // Create a Date object from the provided date
    const dateObject = new Date(date);
  
    // Get the day of the week (0 for Sunday, 1 for Monday, ...)
    const day = dateObject.getDay();
  
    // Convert the numerical day to a textual representation (optional)
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const textualDay = days[day];
  
    // Return either the numerical day (0-6) or the textual representation
    return textualDay || day;
  }

  try {
    // POST request to getLocation endpoint
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const getLocationResponse = await fetch(`${urlStart}/getLocation`, requestOptions);
    const locationData = await getLocationResponse.json();
    console.log("City:", locationData.city);


    // GET request to current/indore endpoint
    const requestOptions2 = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    //fetching for current
    const getWeatherResponse = await fetch(`${urlStart}/current/indore`, requestOptions2);
    const weatherData = await getWeatherResponse.json();
    //fetching for forcast
    const getFutureWeatherResponse = await fetch(`${urlStart}/future/indore`, requestOptions2);
    const futureWeatherData = await getFutureWeatherResponse.json()
    console.log("Weather Data:", weatherData);
    console.log("--",futureWeatherData.forecast)
    for(let futureData of futureWeatherData.forecast.forecastday){
      const list = document.createElement("div")
      list.classList = "list-group-item"
      const highTemp = futureData.day.maxtemp_c; 
  const lowTemp = futureData.day.mintemp_c; 
  const weatherDescription = futureData.day.condition.text; 

  
  const content = `
  <div class="d-flex justify-content-around">
  <div>
  <h6>${getDayOfWeek(futureData.date)}</h6>
   ${convertDate(futureData.date)}  
   </div>
   <div><img src="${futureData.day.condition.icon}"></img></div>
    
     <b>${highTemp}°C</b> ${lowTemp}°C
  
    <div> ${weatherDescription}</div>
    <div> ${futureData.day.daily_chance_of_rain}</div>
    </div>
  `;
  list.innerHTML = content;
  futureForcastList.appendChild(list)
      console.log("Weather Data:", futureData)
    }

    // Set image source, weather condition text, and local time
    currentWeatherIcon.src = weatherData.conditionIcon;
    imgElement.src = weatherData.conditionIcon;
    currentH4Element.innerText = weatherData.conditionText;
    currentTime.innerText = convertedTime(weatherData.localtime);
    dayOrNot.innerText = weatherData.is_day === 1 ? "Today's Weather" : "Tonight's Weather";
  } catch (error) {
    console.error("Error:", error);
  }
});
