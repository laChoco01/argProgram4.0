
const nkey = "caqMq8SUbTbFmWC7CcX4yxSFFVckaySvF7Vgwe2l";
const ruta = `https://api.nasa.gov/planetary/apod?api_key=${nkey}`;

window.addEventListener('load',obetenerDatos);
window.addEventListener('load',conseguirUrl);
window.addEventListener('load',notificacion);

//config of serviceWorker
window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../sw.js")
    .then(function () {
      console.log("andando");
    })
    .catch(function(err) {
      console.log("error",err);
    });
  }
}); 
//
document.getElementById("st").onclick = function()
{
    mostrarDisplay("studies");
    ocultarDisplay("PersonalInfo");
    ocultarDisplay("qualities");
    ocultarDisplay("workE");
    ocultarDisplay("socialM");
}

document.getElementById("pi").onclick = function()
{
    mostrarDisplay("PersonalInfo");
    ocultarDisplay("studies");
    ocultarDisplay("qualities");
    ocultarDisplay("workE");
    ocultarDisplay("socialM");
}

document.getElementById("q").onclick = function()
{
    mostrarDisplay("qualities");
    ocultarDisplay("studies");
    ocultarDisplay("PersonalInfo");
    ocultarDisplay("workE");
    ocultarDisplay("socialM");
}

document.getElementById("we").onclick = function()
{
    mostrarDisplay("workE");
    ocultarDisplay("studies");
    ocultarDisplay("qualities");
    ocultarDisplay("PersonalInfo");
    ocultarDisplay("socialM");
}

document.getElementById("sm").onclick = function()
{
    mostrarDisplay("socialM");
    ocultarDisplay("studies");
    ocultarDisplay("qualities");
    ocultarDisplay("workE");
    ocultarDisplay("PersonalInfo");
}

function ocultarDisplay(a) {
    let demoo = document.getElementById(a);
    demoo.style.display = "none";
}

function mostrarDisplay(b) {
    let beta = document.getElementById(b);
    beta.style.display = "block";
}

////config of nasa api

function obetenerDatos() {
    fetch(ruta)
    .then(respuesta => respuesta.json())
    .then(resultado => mostrarDatos(resultado));
}

function mostrarDatos({ title, media_type, url , explanation})
{
    const pon = document.getElementById("pon");
    ocultarDisplay(pon.id);
    const vod = document.getElementById("vod");
    const boxif = document.getElementById("boxif");
    ocultarDisplay(boxif.id);
    const ton = document.getElementById("ton");
    ton.innerHTML = title;
    if(media_type == 'image')
    {
        mostrarDisplay(pon.id);
        pon.setAttribute("src",url);
        pon.setAttribute("alt", explanation);
    }
    else
    {
        mostrarDisplay(boxif.id);
        mostrarDisplay(pon.id);
        vod.setAttribute("src", url);
    }
}
function conseguirUrl()
{
    fetch(ruta)
    .then(respuesta => respuesta.json())
    .then(respuesta => sabado(respuesta));
}
function sabado({url})
{
    let a = document.getElementById("ton");
    a.setAttribute("href", url);
}
//
function notificacion() 
{
  Notification.requestPermission().then(function (result) {
    if (result === "granted") {
      randomNotification();
    }
  });
}
function randomNotification() {
  var notifTitle = "hola";
  var notifBody = "Creado por yo";
  var notifImg = "../img/chocoPixel1.png";
  var options = {
    body: notifBody,
    icon: notifImg,
  };
  var notif = new Notification(notifTitle, options);
  setTimeout(randomNotification, 300000000);
}

