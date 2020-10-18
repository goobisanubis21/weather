$(document).ready(function () {

    var searchButton = $("#search-sidebutton");

    function display() {

        var searchText = $("#search-sidebar").val();
        var city = $("#city")
        var temp = $("#temp");
        var humidity = $("#humidity");
        var wind = $("#wind");

        var APIKey = "e96804d8841b5f95164ad5a431ddd022";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchText + "&appid=" + APIKey;

        if (searchText === "") {
            alert("Please Enter a City");
            return;
        }

        $.ajax({
            url: queryURL,
            method: "GET",
            error: function (jqXHR) {
                if (jqXHR.status == 404) {
                    alert('City does not exsit');
                    return;
                }
            }
        }).then(function (response) {

            console.log("current forcast response: ", response);
            city.text(response.name + moment().format(' (L)') + " " + response.weather[0].icon);
            temp.text(Math.round((response.main.temp - 273.15) * 1.80 + 32));
            humidity.text(response.main.humidity);
            wind.text(response.wind.speed);
            // uv.text(response.)

            function addLi() {
                var listEl = $("<li>");
                listEl.addClass("list-group-item");
                listEl.text(response.name);
                listEl.attr("id", response.name);
                $("#city-list").prepend(listEl);
            } addLi();

            var lat = response.coord.lat;
            var lon = response.coord.lon;

            var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon="+ lon + "&exclude={part}&appid=" + APIKey;

            $.ajax({
                url: queryURL2,
                method: "GET"

            }).then(function (response) {

                console.log("5-day response: ", response);
                $("#day1Date").text(moment().add(1, 'days').format("L"));
                $("#day1Temp").text(Math.round((response.daily[0].temp.day -273.15) * 1.80 + 32) + " F");
                $("#day1Humidity").text(response.daily[0].humidity + "%");

                $("#day2Date").text(moment().add(2, 'days').format("L"));
                $("#day2Temp").text(Math.round((response.daily[1].temp.day -273.15) * 1.80 + 32) + " F");
                $("#day2Humidity").text(response.daily[1].humidity + "%");

                $("#day3Date").text(moment().add(3, 'days').format("L"));
                $("#day3Temp").text(Math.round((response.daily[2].temp.day -273.15) * 1.80 + 32) + " F");
                $("#day3Humidity").text(response.daily[2].humidity + "%");

                $("#day4Date").text(moment().add(4, 'days').format("L"));
                $("#day4Temp").text(Math.round((response.daily[3].temp.day -273.15) * 1.80 + 32) + " F");
                $("#day4Humidity").text(response.daily[3].humidity + "%");

                $("#day5Date").text(moment().add(5, 'days').format("L"));
                $("#day5Temp").text(Math.round((response.daily[4].temp.day -273.15) * 1.80 + 32) + " F");
                $("#day5Humidity").text(response.daily[4].humidity + "%");

            })


        })
    }

    searchButton.on("click", display);

    $("#city-list").on("click", "li", function () {
        var searchText = this.id;
        var city = $("#city")
        var temp = $("#temp");
        var humidity = $("#humidity");
        var wind = $("#wind");

        var APIKey = "e96804d8841b5f95164ad5a431ddd022";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchText + "&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET",

        }).then(function (response) {

            console.log("response: ", response);
            city.text(response.name + moment().format(' (L)') + " " + response.weather[0].icon);
            temp.text(Math.round((response.main.temp - 273.15) * 1.80 + 32));
            humidity.text(response.main.humidity);
            wind.text(response.wind.speed);
            // uv.text(response.)

        })


        console.log(searchText)
    })

});