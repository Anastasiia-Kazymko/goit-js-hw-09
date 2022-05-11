import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    input: document.querySelector('input'),
    startBtn: document.querySelector('[data-start]'),
    seconds: document.querySelector('[data-seconds]'),
    minutes: document.querySelector('[data-minutes]'),
    hours: document.querySelector('[data-hours]'),
    days: document.querySelector('[data-days]'),  
};
const TIMER_DELAY = 1000;
let intervalId = null;

btnOff ()

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {          
        if (options.defaultDate.getTime() > selectedDates[0].getTime() ) {
            refs.startBtn.disabled = true; 
            Notiflix.Notify.failure(`Please choose a date in the future`);
            return
        } else {
            refs.startBtn.disabled = false;
      }
  },
};

flatpickr("#datetime-picker", options);

const timer = {
    start() {
        const deadLine = new Date(refs.input.value)
        intervalId = setInterval(() => {
            const currentTime = new Date();
            const delfaTime = deadLine - currentTime;
            if (delfaTime <= 0) {
                clearInterval(intervalId);
                return
            };            
            const { days, hours, minutes, seconds } = convertMs(delfaTime);
            refs.days.textContent = days;
            refs.hours.textContent = hours;
            refs.minutes.textContent = minutes;
            refs.seconds.textContent = seconds;
            
        }, TIMER_DELAY);
    }
}
refs.startBtn.addEventListener('click', timer.start);

function pad(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
 
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour)); 
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));  
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
}
function btnOff () {
refs.startBtn.disabled = true;
}

