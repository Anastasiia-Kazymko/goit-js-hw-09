function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const COLOR_DELAY = 1000;
let intervalId = null;
const refs = {
  body: document.body,
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.addEventListener('click', changeColor);
refs.stopBtn.addEventListener('click', stopChangeColor);

function changeColor() {       
        refs.startBtn.disabled = true;
        intervalId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, COLOR_DELAY)    
  };

function stopChangeColor() {
    clearInterval(intervalId);
    refs.startBtn.disabled = false;    
};