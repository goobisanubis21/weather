$(document).ready(function () {

    var searchButton = $("#search-sidebutton");

    searchButton.on("click", function () {

        var searchText = $("#search-sidebar").val();
        var temp = $("#temp");
        var humidity = $("#humidity");
        var wind = $("#wind");
        var APIKey = "e96804d8841b5f95164ad5a431ddd022";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchText + "&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            temp.text(Math.round((response.main.temp - 273.15) * 1.80 + 32));
            humidity.text(response.main.humidity);
            wind.text(response.wind.speed);
            // uv.text(response.)

        })

    });


});