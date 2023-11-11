function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;

let intervalId;

startButton.addEventListener('click', startColorSwitch);
stopButton.addEventListener('click', stopColorSwitch);

function changeBackgroundColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function startColorSwitch() {
  startButton.disabled = true;
  stopButton.disabled = false;

  intervalId = setInterval(changeBackgroundColor, 1000);
}

function stopColorSwitch() {
  startButton.disabled = false;
  stopButton.disabled = true;

  clearInterval(intervalId);
}
