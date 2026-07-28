// CLOCK


let clockFormat = localStorage.getItem("clockFormat") || "12";


function updateClock(){

let now = new Date();

let hours = now.getHours();

let minutes = now.getMinutes();


if(minutes < 10){
minutes = "0" + minutes;
}



if(clockFormat === "12"){

let period = hours >= 12 ? "PM" : "AM";

hours = hours % 12;

if(hours === 0){
hours = 12;
}

document.getElementById("clock").textContent =
hours + ":" + minutes + " " + period;

}

else{

document.getElementById("clock").textContent =
hours + ":" + minutes;

}


}


setInterval(updateClock,1000);

updateClock();




function setClockFormat(format){

clockFormat = format;

localStorage.setItem(
"clockFormat",
format
);

updateClock();

}







// APPS


function openApp(app){

document.getElementById(app).style.display="block";

}


function closeApp(app){

document.getElementById(app).style.display="none";

}








// DRAG WINDOWS


document.querySelectorAll(".window").forEach(win=>{


let offsetX;
let offsetY;


win.addEventListener("mousedown",function(e){


offsetX =
e.clientX - win.offsetLeft;


offsetY =
e.clientY - win.offsetTop;


function move(e){

win.style.left =
(e.clientX-offsetX)+"px";

win.style.top =
(e.clientY-offsetY)+"px";

}


document.addEventListener(
"mousemove",
move
);


document.addEventListener(
"mouseup",
()=>{

document.removeEventListener(
"mousemove",
move
);

},
{once:true}

);


});


});








// CALCULATOR


let currentInput="";


function press(value){

currentInput += value;

document.getElementById("display").value =
currentInput;

}


function calculate(){

try{

currentInput =
eval(currentInput);


document.getElementById("display").value =
currentInput;

}

catch{

currentInput="";

document.getElementById("display").value="Error";

}

}


function clearCalc(){

currentInput="";

document.getElementById("display").value="";

}









function searchVelora(event){


if(event.key === "Enter"){


let query =
document.getElementById("searchBox")
.value
.trim()
.toLowerCase();



if(query.includes("calculator")){

openApp("calculator");

}


else if(query.includes("notes")){

openApp("notes");

}


else if(query.includes("settings")){

openApp("settings");

}


else if(query.includes("weather")){

alert("Weather is already on your desktop 🌤");

}


else if(query !== ""){


window.open(
"https://www.google.com/search?q=" 
+ encodeURIComponent(query),
"_blank"
);


}


}

}










// WEATHER

function updateWeather(){

    const box = document.getElementById("weatherText");

    fetch("https://api.open-meteo.com/v1/forecast?latitude=25.2854&longitude=51.5310&current=temperature_2m,weather_code&timezone=Asia%2FQatar")
    
    .then(response => response.json())

    .then(data => {


        let temp = data.current.temperature_2m;

        let code = data.current.weather_code;


        let condition = "Clear";


let hour = new Date().getHours();


if(code === 0){

    if(hour >= 6 && hour < 18){
        condition = "Sunny";
    }

    else{
        condition = "Clear night";
    }

}


else if(code >= 1 && code <= 3){

    condition = "Partly cloudy";

}


else if(code >= 45 && code <= 48){

    condition = "Fog";

}


else if(code >= 51 && code <= 67){

    condition = "Rain";

}


else if(code >= 80){

    condition = "Storm";

}


        box.innerHTML = `

        <strong>${temp}°C</strong>

        <br>

        Doha, Qatar 🇶🇦

        <br>

        ${condition}

        `;


    })


    .catch(error => {

        console.log(error);

        box.innerHTML =
        "Weather failed ❌";

    });


}


updateWeather();










// THEMES


let themes=[

"#ECE1D5",

"#D9E2F3",

"#E8D9F2",

"#DCE8DC"

];


let themeIndex =
localStorage.getItem("theme") || 0;


document.body.style.background =
themes[themeIndex];



function changeTheme(){


themeIndex++;


if(themeIndex>=themes.length)
themeIndex=0;


document.body.style.background =
themes[themeIndex];


localStorage.setItem(
"theme",
themeIndex
);


}