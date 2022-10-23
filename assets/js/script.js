var searchHistory = [];
var apiUrl = "https://api.openweathermap.org";
var apiKey = "0a4ec138381a2dd46c384597d3f1044f";

var searchForm = document.querySelector("#search-form");
var searchBtn = document.getElementById ("search-button");
var searchInput = document.querySelector("#search-input");
var todayContainer = document.querySelector("#today");
var forecastContainer = document.querySelector("#forecast");
var searchHistoryContainer = document.querySelector("#history");


// access to the library 
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);


// items in the seach history and render into the search history container
function renderSearchHistory (){
    searchHistoryContainer.innerHTML= "";
    for (var i = searchHistory.length-1; i>= 0; i--){
        var btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.setAttribute("class", "history-btn btn-history");
        btn.setAttribute("data-search", searchHistory[i]);
        btn.textContent= searchHistory[i];
        searchHistoryContainer.append(btn);
    }
}


//update local storage 
//index of - finds the index location 
function updateStorage (search){
    if (searchHistory.indexOf(search)!== -1){
        return;
    }
    searchHistory.push(search);
    localStorage.setItem("history", JSON.stringify(searchHistory));
    renderSearchHistory();
} 


//bring history out of local storage 
function getStorage (){
    var storedHistory = localStorage.getItem("history");
    if (storedHistory) {
        searchHistory = JSON.parse(storedHistory);
    }
    renderSearchHistory();
}

//to do: function render current weather 
function currentWeather (e){
    e.preventDefault()
    let cityName = document.getElementById("cityName").value;
    let url= `${apiUrl}/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    fetch(url)
    .then ((repsonse) => repsonse.json())
    .then((data) => {
        console.log(data)
        let today_div = document.getElementById("today")

        let temp_para = document.createElement("p")
        temp_para.innerHTML = `Temp is: ${data.main.temp}.`

        let wind_para = document.createElement("p")
        wind_para.innerHTML = `wind is: ${data.wind.speed}.`
        today_div.append(temp_para, wind_para);
        


        forecastWeather(cityName);
    });
} 

searchBtn.addEventListener("click", currentWeather );


// to do: function render 5 day forecast card 
function forecastWeather (cityName){
    let forecastUrl = `${apiUrl}/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
    fetch(forecastUrl)
    .then ((repsonse) => repsonse.json())
    .then((data) => {
        console.log(data)
        let forecastList = data.list
        let parentDiv = document.createElement("div")
        parentDiv.style.display = "flex"



        for (let i= 0; i< forecastList.length; i+=8){
            let forecastDiv = document.createElement("div")
            forecastDiv.style.border = "1px solid black"
            
        let temp_para = document.createElement("p")
        temp_para.innerHTML = `Temp is: ${forecastList[i].main.temp}.`

        let wind_para = document.createElement("p")
        wind_para.innerHTML = `wind is: ${forecastList[i].wind.speed}.`
        forecastDiv.append(temp_para, wind_para);
        parentDiv.append(forecastDiv)
   
        }
document.getElementById("forecast").append(parentDiv)

    } );

}

// to do: function *5 to get 5 cards (start date - end date )


// to do: function api calls - 2 separte api call - city name (lat and long ) - api for the data 
// to do: function to handle the submit of the search form 
// to do: function to handle the click
// to do: function  addeventlistner for submit and clicks 
// to do: call get storage function: history when reload 

