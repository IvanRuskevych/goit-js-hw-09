// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Notifications
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedTime = 0;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.startBtn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0].getTime();

    if (Date.now() > selectedTime) {
      return alertWrongDate();
    }
    refs.startBtn.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);

function onStartBtnClick() {
  refs.startBtn.setAttribute('disabled', '');

  setInterval(() => {
    if (selectedTime < Date.now()) {
      // alertEndCountdown();
      return (selectedTime = 0);
    }
    updateCounter(selectedTime - Date.now());
  }, 1000);
}

function alertWrongDate() {
  // alert('Please choose a date in the future');
  Notify.init({ position: 'center-top', distance: '30px' });
  Notify.failure('Please choose a date in the future');
}

// ??? не виходить коррекино застосувати -> рядок 47
function alertEndCountdown() {
  Notify.init({ position: 'center-top' });
  Notify.success('Countdown successfully complete');
}

function updateCounter(countdownTime) {
  const { days, hours, minutes, seconds } = convertMs(countdownTime);
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Функція convertMs для підрахунку значень { days, hours, minutes, seconds },
// де ms - різниця між кінцевою і поточною датою в мілісекундах.
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
