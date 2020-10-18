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
            var currentImg = $("#currentImg")

            if (response.weather[0].main === "Clouds") {
                currentImg.attr("src", "images/cloudy.png");
            } else if (response.weather[0].main === "Clear") {
                currentImg.attr("src", "images/sun.png")
            } else if (response.weather[0].main === "Rain") {
                currentImg.attr("src", "images/rain.png")
            } else if (response.weather[0].main === "Snow") {
                currentImg.attr("src", "images/snow.png")
            } else {
                currentImg.attr("src", "images/sun.png")
            }

            city.text(response.name + moment().format(' (L)'));
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

            var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=" + APIKey;

            $.ajax({
                url: queryURL2,
                method: "GET"

            }).then(function (response) {

                console.log("5-day response: ", response);

                var day1Img = $("#day1Img");
                var day2Img = $("#day2Img");
                var day3Img = $("#day3Img");
                var day4Img = $("#day4Img");
                var day5Img = $("#day5Img");

                $("#day1Date").text(moment().add(1, 'days').format("L"));
                $("#day1Temp").text(Math.round((response.daily[0].temp.day - 273.15) * 1.80 + 32) + " F");
                $("#day1Humidity").text(response.daily[0].humidity + "%");
                if (response.daily[0].weather[0].main === "Clouds") {
                    day1Img.attr("src", "images/cloudy.png");
                } else if (response.daily[0].weather[0].main === "Clear") {
                    day1Img.attr("src", "images/sun.png")[0]
                } else if (response.daily[0].weather[0].main === "Rain") {
                    day1Img.attr("src", "images/rain.png")
                } else if (response.daily[0].weather[0].main === "Snow") {
                    day1Img.attr("src", "images/snow.png")
                } else {
                    day1Img.attr("src", "images/sun.png")
                }

                $("#day2Date").text(moment().add(2, 'days').format("L"));
                $("#day2Temp").text(Math.round((response.daily[1].temp.day - 273.15) * 1.80 + 32) + " F");
                $("#day2Humidity").text(response.daily[1].humidity + "%");
                if (response.daily[1].weather[0].main === "Clouds") {
                    day2Img.attr("src", "images/cloudy.png");
                } else if (response.daily[1].weather[0].main === "Clear") {
                    day2Img.attr("src", "images/sun.png")
                } else if (response.daily[1].weather[0].main === "Rain") {
                    day2Img.attr("src", "images/rain.png")
                } else if (response.daily[1].weather[0].main === "Snow") {
                    day2Img.attr("src", "images/snow.png")
                } else {
                    day2Img.attr("src", "images/sun.png")
                }

                $("#day3Date").text(moment().add(3, 'days').format("L"));
                $("#day3Temp").text(Math.round((response.daily[2].temp.day - 273.15) * 1.80 + 32) + " F");
                $("#day3Humidity").text(response.daily[2].humidity + "%");
                if (response.daily[2].weather[0].main === "Clouds") {
                    day3Img.attr("src", "images/cloudy.png");
                } else if (response.daily[2].weather[0].main === "Clear") {
                    day3Img.attr("src", "images/sun.png")
                } else if (response.daily[2].weather[0].main === "Rain") {
                    day3Img.attr("src", "images/rain.png")
                } else if (response.daily[2].weather[0].main === "Snow") {
                    day3Img.attr("src", "images/snow.png")
                } else {
                    day3Img.attr("src", "images/sun.png")
                }

                $("#day4Date").text(moment().add(4, 'days').format("L"));
                $("#day4Temp").text(Math.round((response.daily[3].temp.day - 273.15) * 1.80 + 32) + " F");
                $("#day4Humidity").text(response.daily[3].humidity + "%");
                if (response.daily[3].weather[0].main === "Clouds") {
                    day4Img.attr("src", "images/cloudy.png");
                } else if (response.daily[3].weather[0].main === "Clear") {
                    day4Img.attr("src", "images/sun.png")
                } else if (response.daily[3].weather[0].main === "Rain") {
                    day4Img.attr("src", "images/rain.png")
                } else if (response.daily[3].weather[0].main === "Snow") {
                    day4Img.attr("src", "images/snow.png")
                } else {
                    day4Img.attr("src", "images/sun.png")
                }

                $("#day5Date").text(moment().add(5, 'days').format("L"));
                $("#day5Temp").text(Math.round((response.daily[4].temp.day - 273.15) * 1.80 + 32) + " F");
                $("#day5Humidity").text(response.daily[4].humidity + "%");
                if (response.daily[4].weather[0].main === "Clouds") {
                    day5Img.attr("src", "images/cloudy.png");
                } else if (response.daily[4].weather[0].main === "Clear") {
                    day5Img.attr("src", "images/sun.png")
                } else if (response.daily[4].weather[0].main === "Rain") {
                    day5Img.attr("src", "images/rain.png")
                } else if (response.daily[4].weather[0].main === "Snow") {
                    day5Img.attr("src", "images/snow.png")
                } else {
                    day5Img.attr("src", "images/sun.png")
                }

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

            var day1Img = $("#day1Img");
            var day2Img = $("#day2Img");
            var day3Img = $("#day3Img");
            var day4Img = $("#day4Img");
            var day5Img = $("#day5Img");

            console.log("response: ", response);
            city.text(response.name + moment().format(' (L)') + " " + response.weather[0].icon);
            temp.text(Math.round((response.main.temp - 273.15) * 1.80 + 32));
            humidity.text(response.main.humidity);
            wind.text(response.wind.speed);
            // uv.text(response.)

            var lat = response.coord.lat;
            var lon = response.coord.lon;

            var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=" + APIKey;

            $.ajax({
                url: queryURL2,
                method: "GET"

            }).then(function (response) {

                console.log("5-day response: ", response);
                $("#day1Date").text(moment().add(1, 'days').format("L"));
                $("#day1Temp").text(Math.round((response.daily[0].temp.day - 273.15) * 1.80 + 32) + " F");
                $("#day1Humidity").text(response.daily[0].humidity + "%");
                if (response.daily[0].weather[0].main === "Clouds") {
                    day1Img.attr("src", "images/cloudy.png");
                } else if (response.daily[0].weather[0].main === "Clear") {
                    day1Img.attr("src", "images/sun.png")[0]
                } else if (response.daily[0].weather[0].main === "Rain") {
                    day1Img.attr("src", "images/rain.png")
                } else if (response.daily[0].weather[0].main === "Snow") {
                    day1Img.attr("src", "images/snow.png")
                } else {
                    day1Img.attr("src", "images/sun.png")
                }

                $("#day2Date").text(moment().add(2, 'days').format("L"));
                $("#day2Temp").text(Math.round((response.daily[1].temp.day - 273.15) * 1.80 + 32) + " F");
                $("#day2Humidity").text(response.daily[1].humidity + "%");
                if (response.daily[1].weather[0].main === "Clouds") {
                    day2Img.attr("src", "images/cloudy.png");
                } else if (response.daily[1].weather[0].main === "Clear") {
                    day2Img.attr("src", "images/sun.png")
                } else if (response.daily[1].weather[0].main === "Rain") {
                    day2Img.attr("src", "images/rain.png")
                } else if (response.daily[1].weather[0].main === "Snow") {
                    day2Img.attr("src", "images/snow.png")
                } else {
                    day2Img.attr("src", "images/sun.png")
                }

                $("#day3Date").text(moment().add(3, 'days').format("L"));
                $("#day3Temp").text(Math.round((response.daily[2].temp.day - 273.15) * 1.80 + 32) + " F");
                $("#day3Humidity").text(response.daily[2].humidity + "%");
                if (response.daily[2].weather[0].main === "Clouds") {
                    day3Img.attr("src", "images/cloudy.png");
                } else if (response.daily[2].weather[0].main === "Clear") {
                    day3Img.attr("src", "images/sun.png")
                } else if (response.daily[2].weather[0].main === "Rain") {
                    day3Img.attr("src", "images/rain.png")
                } else if (response.daily[2].weather[0].main === "Snow") {
                    day3Img.attr("src", "images/snow.png")
                } else {
                    day3Img.attr("src", "images/sun.png")
                }

                $("#day4Date").text(moment().add(4, 'days').format("L"));
                $("#day4Temp").text(Math.round((response.daily[3].temp.day - 273.15) * 1.80 + 32) + " F");
                $("#day4Humidity").text(response.daily[3].humidity + "%");
                if (response.daily[3].weather[0].main === "Clouds") {
                    day4Img.attr("src", "images/cloudy.png");
                } else if (response.daily[3].weather[0].main === "Clear") {
                    day4Img.attr("src", "images/sun.png")
                } else if (response.daily[3].weather[0].main === "Rain") {
                    day4Img.attr("src", "images/rain.png")
                } else if (response.daily[3].weather[0].main === "Snow") {
                    day4Img.attr("src", "images/snow.png")
                } else {
                    day4Img.attr("src", "images/sun.png")
                }

                $("#day5Date").text(moment().add(5, 'days').format("L"));
                $("#day5Temp").text(Math.round((response.daily[4].temp.day - 273.15) * 1.80 + 32) + " F");
                $("#day5Humidity").text(response.daily[4].humidity + "%");
                if (response.daily[4].weather[0].main === "Clouds") {
                    day5Img.attr("src", "images/cloudy.png");
                } else if (response.daily[4].weather[0].main === "Clear") {
                    day5Img.attr("src", "images/sun.png")
                } else if (response.daily[4].weather[0].main === "Rain") {
                    day5Img.attr("src", "images/rain.png")
                } else if (response.daily[4].weather[0].main === "Snow") {
                    day5Img.attr("src", "images/snow.png")
                } else {
                    day5Img.attr("src", "images/sun.png")
                }

            })

        })


        console.log(searchText)
    })

});