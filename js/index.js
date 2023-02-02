let today = document.getElementById("today"),
    todayDate = document.getElementById("today-date"),
    cityLocation = document.getElementById("location"),
    todayDegree = document.getElementById("today-degree"),
    todayIcon = document.getElementById("today-icon"),
    description = document.getElementById("today-description"),
    humidty = document.getElementById("humidty"),
    wind = document.getElementById("wind"),
    compass = document.getElementById("compass"),
    searchInput = document.getElementById("search-bar")



    // next day //

    let nextDay = document.getElementsByClassName("nextDay"),
    afterNextDay = document.getElementsByClassName("afterNextDay"),
    nextDate = document.getElementsByClassName("nextDate"),
    nextDayIcon = document.getElementsByClassName("nextDay-icon"),
    maxDegree = document.getElementsByClassName("max-degree"),
    minDegree = document.getElementsByClassName("min-degree"),
    nextDayDescription = document.getElementsByClassName("nextDay-description"),
    
    currnetSerch = 'cairo',
    apiResponse,
    responseDate,

    month = ['Jan', 'Feb','March','April', 'May', 'June', 'July', 'Aug','Spet', 'Oct', 'Nov', 'Dec'],
    days = ['Sunday' , 'Monday', 'Tuesday' , 'Wednesday','Thursday', 'Friday' , 'Saturday'];
 

async function getWeatherDate () {
     apiResponse =  await fetch(`http://api.weatherapi.com/v1/forecast.json?key=5fc67ed988e34b5d9d2121343230202&q=${currnetSerch}&days=3&aqi=no&alerts=no`)
     responseDate = await apiResponse.json()
    console.log(responseDate);
    displayToday ()
    disPlayNextDate ()
}
getWeatherDate ()

function displayToday () {
    let date = new Date () 
    today.innerHTML=days[date.getDay()]
    todayDate.innerHTML = `${date.getDate()} ${month[date.getMonth()]}`
    cityLocation.innerHTML=responseDate.location.name;
    console.log(responseDate.location);
    todayDegree.innerHTML= responseDate.current.temp_c;
    todayIcon.setAttribute('src' ,`https:${responseDate.current.condition.icon}`)
    description.innerHTML=responseDate.current.condition.text;
    humidty.innerHTML = responseDate.current.humidity;
    wind.innerHTML = responseDate.current.wind_kph;
    compass.innerHTML = responseDate.current.wind_dir;

}

function disPlayNextDate () {
    for (let i = 0; i < nextDay.length; i++) {
        nextDay[i].innerHTML= days[new Date(responseDate.forecast.forecastday[i+1].date).getDay()];
        nextDayIcon[i].setAttribute('src' ,`https:${responseDate.forecast.forecastday[i+1].day.condition.icon}`)
        maxDegree[i].innerHTML= responseDate.forecast.forecastday[i+1].day.maxtemp_c;
        minDegree[i].innerHTML= responseDate.forecast.forecastday[i+1].day.mintemp_c;
        nextDayDescription[i].innerHTML = responseDate.forecast.forecastday[i+1].day.condition.text;

    }
}

searchInput.addEventListener('keyup' , function () {
     currnetSerch = searchInput.value;
    console.log(currnetSerch);
    getWeatherDate ();
})