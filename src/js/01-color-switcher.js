function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

// Obținem referințe către butoane și corpul documentului
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;

let intervalId;

// Adăugăm ascultători de eveniment pentru butoane
startButton.addEventListener('click', startColorSwitch);
stopButton.addEventListener('click', stopColorSwitch);

// Funcția pentru a genera o culoare aleatorie și seta culoarea de fundal a corpului
function changeBackgroundColor() {
  body.style.backgroundColor = getRandomHexColor();
}

// Funcția pentru a începe schimbarea culorii de fundal la fiecare secundă
function startColorSwitch() {
  startButton.disabled = true; // Dezactivăm butonul "Start"
  stopButton.disabled = false; // Activăm butonul "Stop"

  intervalId = setInterval(changeBackgroundColor, 1000);
}

// Funcția pentru a opri schimbarea culorii de fundal
function stopColorSwitch() {
  startButton.disabled = false; // Activăm din nou butonul "Start"
  stopButton.disabled = true; // Dezactivăm butonul "Stop"

  clearInterval(intervalId);
}
