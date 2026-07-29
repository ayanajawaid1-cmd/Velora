
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

else if(query.includes("space")){

    openApp("space");

}

else if(query.includes("mystery")){

    openApp("mystery");

}

else if(query.includes("arcade")){

    openApp("arcade");

}

else if(query !== ""){

    window.open(
        "https://www.google.com/search?q=" + encodeURIComponent(query),
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
// ===============================
// SPACE EXPLORER
// ===============================

const planets = [
{
name:"🌎 Earth",
info:"Distance from Sun: 149.6 million km<br>Gravity: 9.8 m/s²<br>Moons: 1<br><br>Fact: Earth is the only known planet with life."
},
{
name:"🔴 Mars",
info:"Distance from Sun: 227.9 million km<br>Gravity: 3.7 m/s²<br>Moons: 2<br><br>Fact: Mars has the largest volcano in the solar system."
},
{
name:"🪐 Saturn",
info:"Distance from Sun: 1.43 billion km<br>Gravity: 10.4 m/s²<br>Moons: 146<br><br>Fact: Saturn's rings are made mostly of ice."
},
{
name:"🟠 Jupiter",
info:"Distance from Sun: 778 million km<br>Gravity: 24.8 m/s²<br>Moons: 95<br><br>Fact: Jupiter is the largest planet."
},
{
name:"☿ Mercury",
info:"Distance from Sun: 57.9 million km<br>Gravity: 3.7 m/s²<br>Moons: 0<br><br>Fact: Mercury is the closest planet to the Sun."
}
];


function loadSpace(){

let box=document.getElementById("planetList");

if(!box) return;


box.innerHTML="";


planets.forEach(planet=>{

let button=document.createElement("button");

button.innerHTML=planet.name;


button.onclick=()=>{

box.innerHTML =
"<h3>"+planet.name+"</h3>"+
"<p>"+planet.info+"</p>"+
"<button onclick='loadSpace()'>⬅ Back</button>";

};


box.appendChild(button);


});


}


loadSpace();





// ===============================
// MYSTERY FILES
// ===============================


const cases=[

{
title:"🚢 Mary Celeste",
text:"Year: 1872<br><br>A ship was found abandoned in the Atlantic Ocean. The cargo and supplies were still onboard. The crew was never found."
},

{
title:"📜 Voynich Manuscript",
text:"A mysterious book written in an unknown language. Researchers still debate its origin."
},

{
title:"🏔️ Dyatlov Pass Incident",
text:"Year: 1959<br><br>Nine hikers died in the Ural Mountains. The exact events remain debated."
},

{
title:"🏝️ Roanoke Colony",
text:"A colony disappeared in 1590. The reason remains one of history's famous mysteries."
}

];


function loadMystery(){

let box=document.getElementById("caseList");

if(!box) return;


box.innerHTML="";


cases.forEach(item=>{


let button=document.createElement("button");


button.innerHTML=item.title;


button.onclick=()=>{

box.innerHTML=
box.innerHTML=
"<h3>"+item.title+"</h3>"+
"<p>"+item.text+"</p>"+
"<button onclick='loadMystery()'>⬅ Back</button>";
};


box.appendChild(button);


});


}


loadMystery();





// ===============================
// MINI ARCADE
// ===============================

function backArcade(){

    document.getElementById("gameArea").innerHTML = "";

}


// Reaction Test

let reactionStart;


function reactionGame(){

let area = document.getElementById("gameArea");

area.innerHTML = `
<h3>Wait for green...</h3>
<button onclick="backArcade()">⬅ Back</button>
`;


setTimeout(()=>{

reactionStart = Date.now();

area.innerHTML = `
<div id="reactionBox">
<h2>CLICK NOW!</h2>
</div>

<button onclick="backArcade()">⬅ Back</button>
`;


document.getElementById("reactionBox").onclick=function(){

let time = Date.now() - reactionStart;


area.innerHTML = `
<h3>Your reaction: ${time} ms</h3>
<button onclick="backArcade()">⬅ Back</button>
`;

};


},2000);

}





// Memory Match

function memoryGame(){

let area=document.getElementById("gameArea");


let cards=[
"🐱","🐱",
"🚀","🚀",
"🌎","🌎"
];


cards.sort(()=>Math.random()-0.5);


area.innerHTML="";


let first=null;


cards.forEach(icon=>{


let card=document.createElement("button");

card.innerHTML="❓";


card.onclick=function(){


card.innerHTML=icon;


if(!first){

first=card;

}

else{


if(first.innerHTML===card.innerHTML){

first=null;

}

else{


setTimeout(()=>{

first.innerHTML="❓";
card.innerHTML="❓";

},700);


first=null;

}


}


};


area.appendChild(card);


});


let back=document.createElement("button");

back.innerHTML="⬅ Back";

back.onclick=backArcade;

area.appendChild(back);


}





// Puzzle

function puzzleGame(){

let area=document.getElementById("gameArea");


area.innerHTML=`

<h3>🧩 Number Puzzle</h3>

<p>Complete the puzzle:</p>

<div id="puzzle">
3 1 6<br>
7 5 2<br>
9 4 8
</div>

<button onclick="backArcade()">
⬅ Back
</button>

`;

// USER NAME

let username = localStorage.getItem("veloraUser");


if (!username) {

    username = prompt("Welcome to Velora! What is your name?");

    if (username && username.trim() !== "") {

        localStorage.setItem(
            "veloraUser",
            username
        );

    }

}


if (username) {

    document.getElementById("welcomeText").textContent =
    "Welcome back, " + username;

}
}