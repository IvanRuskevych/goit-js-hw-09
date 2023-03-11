```js
import flatpickr from 'flatpickr';
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let choosenDate = 0;
let dateFromFuture = false;
let diffTime = 0;
let intervalId = null;

const options = {
  dateFormat: 'd-m-Y H:i',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 5,
  locale: Ukrainian,
  onClose(selectedDates) {
    choosenDate = selectedDates[0];
    diffTime = choosenDate - new Date();
    dateFromFuture = diffTime > 0;
    if (!dateFromFuture) {
      refs.btnStart.disabled = true;
      showWarning();
      repaintTimerVal(0);
      return;
    }

    repaintTimerVal(diffTime);
    refs.btnStart.disabled = false;
  },
};

refs.btnStart.disabled = true;
const fp = flatpickr('#datetime-picker', options);

refs.btnStart.addEventListener('click', onBtnStartHandler);

function onBtnStartHandler(e) {
  if (refs.choosenDate < new Date()) {
    showWarning();
    repaintTimerVal(0);
    return;
  }

  intervalId = setInterval(timerCount, 1000);
  // В условиях сказано, что "Если таймер запущен, для того чтобы выбрать новую дату и перезапустить его - необходимо перезагрузить страницу".
  // Пошел по простому пути и просто удаляю календарь и отключаю кнопку
  // хотя можно было просто выключать кнопку, но за одно поэксперементировал с календарем :)
  fp.destroy();
  refs.btnStart.disabled = true;
}

function timerCount() {
  const difference = choosenDate - new Date();

  if (difference <= 1000) {
    clearInterval(intervalId);
  }
  repaintTimerVal(difference);
}

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

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

function repaintTimerVal(time) {
  const { days, hours, minutes, seconds } = convertMs(time);

  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function showWarning() {
  Notify.failure('Please choose a date in the future', {
    timeout: 3000,
  });
}
```
