$(document).ready(function () {

    var APIKey = "e96804d8841b5f95164ad5a431ddd022";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + APIKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {


    });

});