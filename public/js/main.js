//let moment = require("moment");

const time = document.getElementById("time");
const date = document.getElementById("date");
let currentBackground;
let currentHour = -1;

const welcome = document.getElementById("welcome");
const name = document.getElementById("name");

const goalAnswer = document.getElementById("goal-answer");
const goal = document.getElementById("goal");

const quote = document.getElementById("quote");
const nextQuote = document.getElementById("next-quote");

const weatherContainer = document.getElementById("weather-container");
const weatherIcon = document.getElementById("weather-icon");
const weatherState = document.getElementById("weather-state");
const temperature = document.getElementById("temperature");

const wrapper = document.getElementById("wrapper");
const nextBg = document.getElementById("next-bg");
const prevBg = document.getElementById("prev-bg");
let backgrounds = [];

const language = navigator.language;
let latitude;
let longitude;

document.addEventListener("DOMContentLoaded", DOMLoaded)

function DOMLoaded (){
    const geoSuccess = function (position){
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        weatherContainer.style.visibility = "visible";
        getWeather();
    }
    navigator.geolocation.getCurrentPosition(geoSuccess);

    document.body.style.transition = "background-image ease 1s, color ease-in-out 1s";
    quote.textContent ="\u00a0";
    goalAnswer.textContent = language.slice(0,2) === "ru" ? "Какова ваша цель на сегодня?" : "What is your goal for today?";

    initializeBackgroundsArray();
    getQuote();
    name.addEventListener("focus", clearText);
    name.addEventListener("blur", saveName);
    name.addEventListener("keypress", function (event){
        if (event.key === "Enter") event.target.blur();
    });
    name.addEventListener("input", function (){
        name.textContent = name.textContent.slice(0, 30);
    });

    goal.addEventListener("focus", clearText);
    goal.addEventListener("blur", saveGoal);
    goal.addEventListener("keypress", function (event){
        if (event.key === "Enter") event.target.blur();
    });
    goal.addEventListener("input", function (){
        goal.textContent = goal.textContent.slice(0, 50);
    });
    updateDatetime();
    setInterval(updateDatetime, 1000);

    loadName();
    loadGoal();
}

function updateDatetime(){
    let now = new Date();

    let nowTime = now.toLocaleTimeString(language, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
    let nowDate = now.toLocaleDateString(language, {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });

    time.innerText = `${nowTime}`;

    let hour = now.getHours();
    if (hour !== currentHour) {
        currentHour = hour;
        updateBackground(currentHour);
    }
    if (date.innerText !== `${nowDate}`) {
        date.innerText = `${nowDate}`;
    }
}

function initializeBackgroundsArray(){
    for (let i = 0; i < 4; i++){
        let bgNum = Math.floor(Math.random() * 6);
        for (let j = 0; j < 6; j++){
            backgrounds.push(`${i * 6 + ((j + bgNum) % 6)}.jpg`);
        }
    }
}

function updateBackground(currentHour){
    let bgImage = new Image();
    currentBackground = currentHour;


    if (currentBackground < 6){
        bgImage.src = `./images/${backgrounds[currentBackground]}`;
        bgImage.onload = () => {
            document.body.style.backgroundImage = `url(${bgImage.src})`;
            wrapper.style.backgroundImage = 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))';
        }
        document.body.style.color = "cornsilk";
        nextQuote.style.fill = "cornsilk";
        nextBg.style.fill = "cornsilk";
        prevBg.style.fill = "cornsilk";

        welcome.textContent = language.slice(0, 2) === "ru" ? "Доброй ночи, " : "Good night, ";
    }
    else if (currentBackground < 12){
        bgImage.src = `./images/${backgrounds[currentBackground]}`;
        bgImage.onload = () => {
            document.body.style.backgroundImage = `url(${bgImage.src})`;
            wrapper.style.backgroundImage = 'linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))';
        }
        document.body.style.color = "#101010";
        nextQuote.style.fill = "#101010";
        nextBg.style.fill = "#101010";
        prevBg.style.fill = "#101010";

        welcome.textContent = language.slice(0, 2) === "ru" ? "Доброе утро, " : "Good morning, ";
    }
    else if (currentBackground < 18){
        console.log(backgrounds[currentBackground]);
        bgImage.src = `./images/${backgrounds[currentBackground]}`;
        bgImage.onload = () => {
            document.body.style.backgroundImage = `url(${bgImage.src})`;
            wrapper.style.backgroundImage = 'linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))';
        }
        document.body.style.color = "#101010";
        nextQuote.style.fill = "#101010";
        nextBg.style.fill = "#101010";
        prevBg.style.fill = "#101010";

        welcome.textContent = language.slice(0, 2) === "ru" ? "Добрый день, " : "Good afternoon, ";
    }
    else {
        bgImage.src = `./images/${backgrounds[currentBackground]}`;
        bgImage.onload = () => {
            document.body.style.backgroundImage = `url(${bgImage.src})`;
            wrapper.style.backgroundImage = 'linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))';
        }
        document.body.style.color = "#101010";
        nextQuote.style.fill = "#101010";
        nextBg.style.fill = "#101010";
        prevBg.style.fill = "#101010";

        welcome.textContent = language.slice(0, 2) === "ru" ? "Добрый вечер, " : "Good evening, ";
    }
}

function setNextBackground(){
    if (currentBackground < 23){
        currentBackground++
    }
    else {
        currentBackground = 0;
    }
    setBackground();
}

function setPrevBackground(){

    if (currentBackground > 0){
        currentBackground--;
    }
    else {
        currentBackground = 23;
    }
    setBackground();
}

function setBackground(){
    let bgImage = new Image();

    nextBg.style.pointerEvents = "none";
    prevBg.style.pointerEvents = "none";

    if (currentBackground < 6){
        bgImage.src = `./images/${backgrounds[currentBackground]}`;
        bgImage.onload = () => {
            document.body.style.backgroundImage = `url(${bgImage.src})`;
            wrapper.style.backgroundImage = 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))';
            setTimeout(() => {
                nextBg.style.pointerEvents = "visible";
                prevBg.style.pointerEvents = "visible";
            }, 1000);

            document.body.style.color = "cornsilk";
            nextQuote.style.fill = "cornsilk";
            nextBg.style.fill = "cornsilk";
            prevBg.style.fill = "cornsilk";
        }
    }
    else if (currentBackground < 12){
        bgImage.src = `./images/${backgrounds[currentBackground]}`;
        bgImage.onload = () => {
            document.body.style.backgroundImage = `url(${bgImage.src})`;
            wrapper.style.backgroundImage = 'linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))';
            setTimeout(() => {
                nextBg.style.pointerEvents = "visible";
                prevBg.style.pointerEvents = "visible";
            }, 1000);

            document.body.style.color = "#101010";
            nextQuote.style.fill = "#101010";
            nextBg.style.fill = "#101010";
            prevBg.style.fill = "#101010";
        }
    }
    else if (currentBackground < 18){
        bgImage.src = `./images/${backgrounds[currentBackground]}`;
        bgImage.onload = () => {
            document.body.style.backgroundImage = `url(${bgImage.src}`;
            wrapper.style.backgroundImage = 'linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))';
            setTimeout(() => {
                nextBg.style.pointerEvents = "visible";
                prevBg.style.pointerEvents = "visible";
            }, 1000);

            document.body.style.color = "#101010";
            nextQuote.style.fill = "#101010";
            nextBg.style.fill = "#101010";
            prevBg.style.fill = "#101010";
        }
    }
    else {
        bgImage.src = `./images/${backgrounds[currentBackground]}`;
        bgImage.onload = () => {
            document.body.style.backgroundImage = `url(${bgImage.src})`;
            wrapper.style.backgroundImage = 'linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))';
            setTimeout(() => {
                nextBg.style.pointerEvents = "visible";
                prevBg.style.pointerEvents = "visible";
            }, 1000);

            document.body.style.color = "#101010";
            nextQuote.style.fill = "#101010";
            nextBg.style.fill = "#101010";
            prevBg.style.fill = "#101010";
        }
    }
}

function saveName(){
    name.textContent = name.textContent.trim();
    if (name.textContent.length > 0) {
        localStorage.setItem('name', name.textContent);
    }
    else loadName();
}

function loadName(){
    if ((localStorage.getItem('name')) !== null){
        name.textContent = localStorage.getItem('name');
    }
    else name.textContent = language.slice(0,2) === "ru" ? "[Введите имя]" : "[Enter name]";
}

function saveGoal(){
    goal.textContent = goal.textContent.trim();
    if (goal.textContent.length > 0) {
        localStorage.setItem('goal', goal.textContent);
    }
    else loadGoal();
}

function loadGoal(){
    if ((localStorage.getItem('goal')) !== null){
        goal.textContent = localStorage.getItem('goal');
    }
    else goal.textContent =  language.slice(0,2) === "ru" ? "[Введите цель]" :"[Enter goal]";
}

function clearText(e)
{
    e.target.innerHTML = "\u00a0";
    let s = window.getSelection(),
        r = document.createRange();
    r.selectNodeContents(e.target);
    s.removeAllRanges();
    s.addRange(r);
}

function getWeather()
{
    const weatherPromise = new Promise(resolve => {
        if (latitude && longitude) {
            let weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}` +
                `&appid=cf22bd2bb39e9fac04551e9097c118e0&lang=${language.slice(0,2)}&units=metric`;
            fetch(weatherUrl)
                .then(response => response.json())
                .then(data => {
                    weatherIcon.src = `http://openweathermap.org/img/wn/${data["weather"][0]["icon"]}@2x.png`;
                    weatherState.innerText = data["weather"][0]["description"];
                    temperature.innerText = `${Math.round(data["main"]["temp"]).toString()}℃`;
                    resolve("visible");
                })
                .catch(error => {
                    console.log(error);
                    resolve("hidden")
                });
        }
    });
    weatherPromise.then(resolve => {weatherContainer.style.visibility = resolve.toString()});
}

function getQuote()
{
    let quoteUrl = `https://api.adviceslip.com/advice`;

    fetch(quoteUrl)
        .then(response => response.json())
        .then(data => {
            if (quote.textContent !== data["slip"]["advice"])
                quote.textContent = data["slip"]["advice"];
        })
        .catch(error => {
            console.log(error)
        });
}