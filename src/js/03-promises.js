// Notifications
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
const { delay, step, amount } = document.querySelector('.form').elements;

formRef.addEventListener('submit', onFormBtnSubmit);

function onFormBtnSubmit(e) {
  e.preventDefault();
  let calculatedDelay = Number(delay.value);

  for (let i = 1; i <= Number(amount.value); i += 1) {
    console.log(calculatedDelay);

    createPromise(i, calculatedDelay)
      .then(({ position, delay }) => {
        alertResolve(position, delay);
      })
      .catch(({ position, delay }) => {
        alertReject(position, delay);
      });
    calculatedDelay += Number(step.value);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function alertResolve(paramP, paramD) {
  Notify.init({ useIcon: false });
  Notify.success(`✅ Fulfilled promise ${paramP} in ${paramD}ms`);
}

function alertReject(paramP, paramD) {
  Notify.init({ useIcon: false });
  Notify.failure(`❌ Rejected promise ${paramP} in ${paramD}ms`);
}
