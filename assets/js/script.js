var searchHistory = [];
var apiUrl = "https://api.openweathermap.org";
// var apiKey = ??

var searchForm = document.querySelector("#search-form");
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
// to do: function render 5 day forecast card 
// to do: function *5 to get 5 cards (start date - end date )
// to do: function api calls - 2 separte api call - city name (lat and long ) - api for the data 
// to do: function to handle the submit of the search form 
// to do: function to handle the click
// to do: function  addeventlistner for submit and clicks 
// to do: call get storage function: history when reload 

