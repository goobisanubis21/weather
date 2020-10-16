$(document).ready(function () {

    var searchButton = $("#search-sidebutton");

    searchButton.on("click", function () {

        var searchText = $("#search-sidebar").val();
        var city = $("#city")
        var temp = $("#temp");
        var humidity = $("#humidity");
        var wind = $("#wind");
        var APIKey = "e96804d8841b5f95164ad5a431ddd022";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchText + "&appid=" + APIKey;

        display();

        function display() {

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

                console.log(response);
                city.text(response.name + moment().format(' (L)') + " " + response.weather[0].icon);
                temp.text(Math.round((response.main.temp - 273.15) * 1.80 + 32));
                humidity.text(response.main.humidity);
                wind.text(response.wind.speed);
                // uv.text(response.)

                function addLi() {
                    var listEl = $("<li>");
                    listEl.addClass("list-group-item");
                    listEl.text(response.name);
                    $("#city-list").prepend(listEl);
                } addLi();

                var listEl = $(this);
                listEl.on("click", function (e) {
                    e.preventDefault();
                    display();
                })

                var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + response.name +"&appid=" + APIKey
                
            })
        }
    });


});