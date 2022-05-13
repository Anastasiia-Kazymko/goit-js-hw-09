import Notiflix from 'notiflix';

const refs = {    
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'), 
  step: document.querySelector('input[name="step"]'), 
  amount: document.querySelector('input[name="amount"]'), 
};

refs.form.addEventListener('submit', onFormInput);

function onFormInput(e) {
  e.preventDefault();
  const values = {
    delay: parseInt(refs.delay.value),
    step: parseInt(refs.step.value),
    amount: parseInt(refs.amount.value), 
  }

  promiseDefine(values);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {           
  setTimeout(() => {
      if (shouldResolve) {        
    resolve({ position: position, delay: delay });
  } 
    reject({ position: position, delay: delay });        
  }, delay) 
  })   
}

function promiseDefine({ delay, step, amount }) {
  let number = delay;
  for (let i = 1; i <= amount; i++) {
    createPromise(i, number)      
      .then(({ position, delay }) => {    
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);        
  })
      .catch(({ position, delay }) => {    
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);        
  });
    number += step;
  }
}


  
