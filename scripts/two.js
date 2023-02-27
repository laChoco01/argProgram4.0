
const nkey = "caqMq8SUbTbFmWC7CcX4yxSFFVckaySvF7Vgwe2l";
const route = `https://api.nasa.gov/planetary/apod?api_key=${nkey}`;

window.addEventListener('load',getInfo);
window.addEventListener('load',getUrl);
window.addEventListener('load',notification);
//config of serviceWorker
window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../sw.js")
    .then(function () {
      console.log("working!");
    })
    .catch(function(err) {
      console.log("error",err);
    });
  }
}); 
//
document.getElementById("st").onclick = function()
{
    showDisplay("studies");
    hideDisplay("PersonalInfo");
    hideDisplay("qualities");
    hideDisplay("workE");
    hideDisplay("socialM");
}

document.getElementById("pi").onclick = function()
{
    showDisplay("PersonalInfo");
    hideDisplay("studies");
    hideDisplay("qualities");
    hideDisplay("workE");
    hideDisplay("socialM");
}

document.getElementById("q").onclick = function()
{
    showDisplay("qualities");
    hideDisplay("studies");
    hideDisplay("PersonalInfo");
    hideDisplay("workE");
    hideDisplay("socialM");
}

document.getElementById("we").onclick = function()
{
    showDisplay("workE");
    hideDisplay("studies");
    hideDisplay("qualities");
    hideDisplay("PersonalInfo");
    hideDisplay("socialM");
}

document.getElementById("sm").onclick = function()
{
    showDisplay("socialM");
    hideDisplay("studies");
    hideDisplay("qualities");
    hideDisplay("workE");
    hideDisplay("PersonalInfo");
}

function hideDisplay(a) {
    let demoo = document.getElementById(a);
    demoo.style.display = "none";
}

function showDisplay(b) {
    let beta = document.getElementById(b);
    beta.style.display = "block";
}

////config of nasa api

function getInfo() {
    fetch(route)
    .then(answer => answer.json())
    .then(answer => showInfo(answer));
}

function showInfo({ title, media_type, url , explanation})
{
    const pon = document.getElementById("pon");
    hideDisplay(pon.id);
    const vod = document.getElementById("vod");
    const boxif = document.getElementById("boxif");
    hideDisplay(boxif.id);
    const ton = document.getElementById("ton");
    ton.innerHTML = title;
    if(media_type == 'image')
    {
        showDisplay(pon.id);
        pon.setAttribute("src",url);
        pon.setAttribute("alt", explanation);
    }
    else
    {
        showDisplay(boxif.id);
        showDisplay(pon.id);
        vod.setAttribute("src", url);
    }
}
function getUrl()
{
    fetch(route)
    .then(answer => answer.json())
    .then(answer => setUrl(answer));
}
function setUrl({url})
{
    let a = document.getElementById("ton");
    a.setAttribute("href", url);
}
//
function notificacion() 
{
  Notification.requestPermission().then(function (result) {
    if (result === "granted") {
      notification();
    }
  });
}
function notification() {
  var status = "still"
  var notifTitle;
  var notifBody;
  var notifImg;
  if(status == "still")
  {
    notifTitle = "¡Welcome!";
    notifBody = "¡i'm" + status + "looking for a job!";
    notifImg = "../img/okPixel1.png";
  }
  else
  {
    notifTitle = "¡ups!";
    notifBody = "¡i'm not lokking for a job!";
    notifImg = "../img/okPixel2.png";
  }
  var options = {
    body: notifBody,
    icon: notifImg,
  };
  var notif = new Notification(notifTitle, options);
}

