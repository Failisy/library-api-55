const apiUrl = "https://script.google.com/macros/s/AKfycbz4AVoxyS9o_0QrpQCS0Fprda47MHQpGc4vBRsFR3qNqEih0zpdUbTICwtQIoNkDrAuHQ/exec";
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

fetch(proxyUrl + apiUrl)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("CORS 오류 발생:", error));
