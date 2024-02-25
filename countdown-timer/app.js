const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// let futureDate = new Date(2024, 4, 26, 19, 30, 0);

const futureDate = new Date(tempYear, tempMonth, tempDay + 7, 19, 30, 0);
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const mins = futureDate.getMinutes();

const month = months[futureDate.getMonth()];
const date = futureDate.getDate();
const day = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${day}, ${date} ${month} ${year} ${hours}:${mins}am`;

// future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime(){
  const today = new Date().getTime();
  const t = futureTime - today;

  const oneDay = 24*60*60*1e3;
  const oneHour = 3600*1e3;
  const oneMin = 60*1e3;
  const oneSec = 1e3;

  let days = Math.floor(t/oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let mins = Math.floor((t % oneHour) / oneMin);
  let secs = Math.floor((t % oneMin) / oneSec);

  // set velues array
  const values = [days, hours, mins, secs];

  function format(item){
    if(item<10){
      return item = `0${item}`;
    }
    return item;
  }

  items.forEach(function(item, index){
    item.innerHTML = format(values[index]);
  });
  if(t < 0){
    clearInterval(countdouwn);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
}
}
// countdouwn
let countdouwn = setInterval(getRemainingTime,1e3);
getRemainingTime();