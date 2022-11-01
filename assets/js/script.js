var searchHistory = [];
var apiUrl = "https://api.openweathermap.org";
var apiKey = "0a4ec138381a2dd46c384597d3f1044f";

var searchForm = document.querySelector("#search-form");
var searchBtn = document.getElementById ("search-button");
var searchInput = document.querySelector("#search-input");
var todayContainer = document.querySelector("#today");
var forecastContainer = document.querySelector("#forecast");
var searchHistoryContainer = document.querySelector("#history");

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
getStorage();


//function render current weather 
function currentWeather (e){
    e.preventDefault()
    //clear previous search 
    todayContainer.innerHTML = ""
    let cityName = document.getElementById("cityName").value;
    let url= `${apiUrl}/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
    fetch(url)
    .then ((repsonse) => repsonse.json())
    .then((data) => {
        console.log(data)
    

        let date = document.createElement("p")
        date.innerHTML = moment().format("MM/DD/YYYY")
   

        let icon_para = document.createElement("img")
        icon_para.setAttribute( "src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

        let temp_para = document.createElement("p")
        temp_para.innerHTML = `Temp: ${data.main.temp} F`

        let wind_para = document.createElement("p")
        wind_para.innerHTML = `wind: ${data.wind.speed} MPH`

        let humidity_para = document.createElement("p")
        humidity_para.innerHTML = `humidity: ${data.main.humidity} %`

        todayContainer.append(date, icon_para, temp_para, wind_para, humidity_para);
        forecastWeather(cityName);
    });
    updateStorage(cityName);
} 

// function to handle the click
searchBtn.addEventListener("click", currentWeather );


// to do: function render 5 day forecast card 
function forecastWeather (cityName){
    let forecastUrl = `${apiUrl}/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`
    forecastContainer.innerHTML = ""
    fetch(forecastUrl)
    .then ((repsonse) => repsonse.json())
    .then((data) => {
        console.log(data)
        let forecastList = data.list
        let parentDiv = document.createElement("div")
        parentDiv.style.display = "flex"
        let day = 0;

        for (let i= 0; i< forecastList.length; i+=8){
        let forecastDiv = document.createElement("div")
        forecastDiv.style.border = "1px solid black"
            
        // date ?? 
        let date = document.createElement("p")
        day++
        date.textContent = moment().add(day, "days").format("MM/DD/YYYY")


        let icon_para = document.createElement("img")
        icon_para.setAttribute( "src", `https://openweathermap.org/img/wn/${forecastList[i].weather[0].icon}.png`);

        let temp_para = document.createElement("p")
        temp_para.innerHTML = `Temp: ${forecastList[i].main.temp} F`

        let wind_para = document.createElement("p")
        wind_para.innerHTML = `wind: ${forecastList[i].wind.speed} MPH`

        let humidity_para = document.createElement("p")
        humidity_para.innerHTML = `humidity: ${forecastList[i].main.humidity} %`

        forecastDiv.append(date, icon_para, temp_para, wind_para, humidity_para);
        parentDiv.append(forecastDiv)
        } 
        document.getElementById("forecast").append(parentDiv)
        }); 
       
    }


var historyBtn = document.querySelector(".history-btn")
// function to handle the click
historyBtn.addEventListener("click", currentWeather );

// create function that click of the search history button 
// jquery (this.)








