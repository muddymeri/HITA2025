const display = document.getElementById("display");
const lapsContainer = document.getElementById("laps");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let lapCounter = 1;

function start() {
    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}

function stop() {
    if(isRunning){
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function reset() {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    lapCounter = 1;
    display.textContent = "00:00:00:00";
    lapsContainer.innerHTML = "";
}

function update() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let miliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    miliseconds = String(miliseconds).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}:${miliseconds}`;
}

function lap() {
    if(isRunning){
        const lapTime = display.textContent;
        const lapElement = document.createElement("div");
        lapElement.className = "lap-time";
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsContainer.insertBefore(lapElement, lapsContainer.firstChild);
        lapCounter++;
    }
}

// Event listeneri za gumbe
document.querySelector('.start').addEventListener('click', start);
document.querySelector('.stop').addEventListener('click', stop);
document.querySelector('.reset').addEventListener('click', reset);
document.querySelector('.lap').addEventListener('click', lap);