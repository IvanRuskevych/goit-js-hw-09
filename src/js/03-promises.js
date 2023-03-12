// Notifications
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

let inputData = {
  delay: null,
  step: null,
  amount: null,
};

formRef.addEventListener('input', getInputData);
formRef.addEventListener('submit', onFormBtnSubmit);

function getInputData(e) {
  inputData[e.target.name] = e.target.value;
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

function onFormBtnSubmit(e) {
  e.preventDefault();

  for (let i = 1; i <= inputData.amount; i += 1) {
    let position = i;
    let delay = Number(inputData.delay) + Number(inputData.step) * i;
    console.log(delay);

    createPromise(position, delay)
      .then(({ position, delay }) => {
        alertResolve(position, delay);
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        alertReject(position, delay);
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function alertResolve(paramP, paramD) {
  // console.log(`✅ Fulfilled promise ${paramP} in ${paramD}ms`);
  Notify.init({ useIcon: false });
  Notify.success(`✅ Fulfilled promise ${paramP} in ${paramD}ms`);
}

function alertReject(paramP, paramD) {
  // console.log(`❌ Rejected promise ${paramP} in ${paramD}ms`);
  Notify.init({ useIcon: false });
  Notify.failure(`❌ Rejected promise ${paramP} in ${paramD}ms`);
}
