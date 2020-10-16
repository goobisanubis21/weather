$(document).ready(function () {

    var searchText = $("#search-sidebar").val();
    var searchButton = $("#search-sidebutton");
    var APIKey = "e96804d8841b5f95164ad5a431ddd022";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchText + "&appid=" + APIKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        searchButton.on("click", function() {
            console.log(response);
        })
        
    });

});