// Importăm bibliotecile
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

startButton.addEventListener('click', startCountdown);

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerDisplay(timeLeft) {
  daysElement.textContent = addLeadingZero(timeLeft.days);
  hoursElement.textContent = addLeadingZero(timeLeft.hours);
  minutesElement.textContent = addLeadingZero(timeLeft.minutes);
  secondsElement.textContent = addLeadingZero(timeLeft.seconds);
}

function startCountdown() {
  const selectedDate = new Date(dateTimePicker.value).getTime();
  const currentDate = new Date().getTime();
  const timeDifference = selectedDate - currentDate;

  if (timeDifference <= 0) {
    Notiflix.Notify.warning('Please choose a date in the future');
    return;
  }

  startButton.disabled = true;

  countdownInterval = setInterval(() => {
    const timeLeft = convertMs(selectedDate - new Date().getTime());

    updateTimerDisplay(timeLeft);

    if (
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      clearInterval(countdownInterval);
      Notiflix.Notify.success('Countdown has ended!');
      startButton.disabled = false;
    }
  }, 1000);
}
