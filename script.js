"use strict"

document.getElementById("buscador").addEventListener("submit", function(event) {
    event.preventDefault();
    consultarAPI();
});

function consultarAPI() {
    let xhr, url, city, apiKey;
    apiKey = "48e4d173d78c59b4ee778b8a494e4815";
    city = document.getElementById("place-input").value;
    url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ apiKey +"&units=metric";
    xhr = new XMLHttpRequest();
    xhr.onload = function() {
        mostrarInformacion(this);
    }
    xhr.open("GET", url);
    xhr.send();
}

function mostrarInformacion(xhr) {
    let obj, city, temp, wheather, pais, tarjeta, icon, mensaje;
    obj = JSON.parse(xhr.responseText);
    if (obj.cod == "404") {
        mensaje = obj.message
        document.getElementById("msg").innerHTML = mensaje
    }
    else {
    city = obj.name;
    temp = String(Math.round(obj.main.temp));
    wheather = obj.weather[0].description;
    pais = obj.sys.country;
    icon = obj.weather[0].icon;
    tarjeta = "<div class='card'><h2 class='city-name'>"+ city + "<sup>"+ pais + "</sup></h2>";
    tarjeta += "<p class='city-temp'>" + temp + "<sup>ºC</sup></p><figure>";
    tarjeta += "<img src='https://openweathermap.org/img/wn/" + icon + ".png' alt=''>";
    tarjeta += "<figcaption>" + wheather + "</figcaption></figure></div>";
    document.getElementById("cards").innerHTML += tarjeta;
    document.getElementById("msg").innerHTML = ""
    }
}
