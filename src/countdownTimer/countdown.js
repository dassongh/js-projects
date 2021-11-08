import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Timer from './timer';
import "flatpickr/dist/flatpickr.min.css";
require("flatpickr/dist/themes/dark.css");


const refs = {
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}

refs.start.disabled = true;

const timer = new Timer({ onTick: updateClockFace });

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() >= selectedDates[0].getTime()) return Notify.failure('Please choose a date in the future', { width: '400px' });
    refs.start.disabled = false;
    timer.date = selectedDates[0].getTime();
  },
};

const fp = flatpickr("#datetime-picker", options);

refs.start.addEventListener('click', onStartClick);

function onStartClick() {
  refs.start.disabled = true;
  timer.start();
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

