// # 1. Напиши скрипт який після натискання кнопки «Start»,
//      раз на секунду змінює колір фону < body >
//      на випадкове значення, використовуючи інлайн стиль.
//      Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
// # 2. УВАГА: Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів.
// # 3. Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).
// # 4. Для генерування випадкового кольору використовуй функцію getRandomHexColor.

const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
// console.log(refs.body);
// console.log(refs.startBtn);
// console.log(refs.stopBtn);

let intervalId = null;

refs.startBtn.addEventListener('click', onstartBtnClick);
refs.stopBtn.addEventListener('click', onstopBtnClick);

function onstartBtnClick() {
  //   if (intervalId !== null) {
  //     return;
  //   }
  refs.startBtn.setAttribute('disabled', '');

  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();

    console.log('rendom color: ', refs.body.style.backgroundColor);
  }, 1000);

  console.log('intervalId:', intervalId);
}

function onstopBtnClick() {
  //   intervalId = null;
  refs.startBtn.removeAttribute('disabled');

  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
