// when document is loaded, run the function
$(document).ready(function () {

    // getting the search button
    var searchButton = $("#search-sidebutton");

    // funtion to display the current weather
    function display() {
        // setting variables for elements being used in the display function and within its nested functions
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
        //ajax call to get the apis data
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
            // if statements to set the current weather image
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
            //setting the data to the correct elements to be displayed to user
            city.text(response.name + moment().format(' (L)'));
            temp.text(Math.round((response.main.temp - 273.15) * 1.80 + 32));
            humidity.text(response.main.humidity);
            wind.text(response.wind.speed);

            // function to add the search history and add local storage
            function addLi() {
                var listEl = $("<li>");
                listEl.addClass("list-group-item");
                listEl.text(response.name);
                listEl.attr("id", response.name);
                $("#city-list").prepend(listEl);

                var store = JSON.parse(localStorage.getItem("store"));
                if (store == null) {
                    store = [];
                }

                var cityStorage = listEl.text();
                store.push(cityStorage);
                localStorage.setItem("store", JSON.stringify(store));

            } addLi();
            // setting variables for coords for api to get 5 day forcast
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            // url for 5 day forcast
            var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=" + APIKey;

            $.ajax({
                url: queryURL2,
                method: "GET"

            }).then(function (response) {

                console.log("5-day response: ", response);
                // setting variables for the 5 day forcast images
                var day1Img = $("#day1Img");
                var day2Img = $("#day2Img");
                var day3Img = $("#day3Img");
                var day4Img = $("#day4Img");
                var day5Img = $("#day5Img");
                // setting the text and attributes for the 5 day elements
                // day 1 search value data
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
                // day 2 search value data
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
                // day 3 search value data
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
                // day 4 search value data
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
                // day 5 search value data
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
                // url to get the data for the uv index
                queryURL3 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey
                $.ajax({
                    url: queryURL3,
                    method: "GET",

                }).then(function (response) {
                    // setting the elements and classes for the uv index to get the correct data and styling
                    var uv = $("#uv");
                    uvValue = response.value;
                    if (uvValue < 5) {
                        uv.text(uvValue);
                        uv.removeClass("uvHigh");
                        uv.removeClass("uvMed");
                        uv.addClass("uvCold");
                    } else if ((uvValue >= 5) && (uvValue < 8)) {
                        uv.text(uvValue);
                        uv.removeClass("uvCold");
                        uv.removeClass("uvHigh");
                        uv.addClass("uvMed");
                    }
                    else if (uvValue >= 8) {
                        uv.text(uvValue);
                        uv.removeClass("uvCold");
                        uv.removeClass("uvMed");
                        uv.addClass("uvHigh");
                    }
                })

            })
        })
    }
    // on click call to run display function when search button is clicked
    searchButton.on("click", display);
    //on click funtion for when a list item in the search history is clicked
    $("#city-list").on("click", "li", function () {
        var searchText = this.id;
        var city = $("#city")
        var temp = $("#temp");
        var humidity = $("#humidity");
        var wind = $("#wind");
        // calling the url for the list items to display the correct data when clicked upon for the current day
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
            city.text(response.name + moment().format(' (L)'));
            temp.text(Math.round((response.main.temp - 273.15) * 1.80 + 32));
            humidity.text(response.main.humidity);
            wind.text(response.wind.speed);

            var lat = response.coord.lat;
            var lon = response.coord.lon;
            // calling the url for the list items data for the uv index
            queryURL3 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey
            $.ajax({
                url: queryURL3,
                method: "GET",

            }).then(function (response) {

                var uv = $("#uv");
                uvValue = response.value;
                if (uvValue < 5) {
                    uv.text(uvValue);
                    uv.removeClass("uvHigh");
                    uv.removeClass("uvMed");
                    uv.addClass("uvCold");
                } else if ((uvValue >= 5) && (uvValue < 8)) {
                    uv.text(uvValue);
                    uv.removeClass("uvCold");
                    uv.removeClass("uvHigh");
                    uv.addClass("uvMed");
                }
                else if (uvValue >= 8) {
                    uv.text(uvValue);
                    uv.removeClass("uvCold");
                    uv.removeClass("uvMed");
                    uv.addClass("uvHigh");
                }
            })
            // calling the url for the list items 5 day forecast response
            var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=" + APIKey;

            $.ajax({
                url: queryURL2,
                method: "GET"

            }).then(function (response) {
                // day 1 list items
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
                // day 2 list items
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
                // day 3 list items
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
                // day 4 list items
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
                // day 5 list items
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
    })

    // getting items from local storage and set them to the list items when page first loads
    var store = JSON.parse(localStorage.getItem("store"));
    if (store == null) {
        store = [];
    }
    for (var i = 0; i < store.length; i++) {
        var listEl = $("<li>");
        listEl.addClass("list-group-item");
        listEl.text(store[i]);
        listEl.attr("id", store[i]);
        $("#city-list").prepend(listEl);
    }
});