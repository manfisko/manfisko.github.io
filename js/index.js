// ========================== //
// 2017 Countdown JS
// ========================== //

var countdown = new Date("March 8, 2018");

function getRemainingTime(endtime) {
  var milliseconds = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor(milliseconds / 1000 % 60);
  var minutes = Math.floor(milliseconds / 1000 / 60 % 60);
  var hours = Math.floor(milliseconds / (1000 * 60 * 60) % 24);
  var days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

  return {
    'total': milliseconds,
    'seconds': seconds,
    'minutes': minutes,
    'hours': hours,
    'days': days
  };
}

function initClock(id, endtime) {
  var counter = document.getElementById(id);
  var daysItem = counter.querySelector('.js-countdown-days');
  var hoursItem = counter.querySelector('.js-countdown-hours');
  var minutesItem = counter.querySelector('.js-countdown-minutes');
  var secondsItem = counter.querySelector('.js-countdown-seconds');

  function updateClock() {
    var time = getRemainingTime(endtime);

    daysItem.innerHTML = time.days;
    hoursItem.innerHTML = ('0' + time.hours).slice(-2);
    minutesItem.innerHTML = ('0' + time.minutes).slice(-2);
    secondsItem.innerHTML = ('0' + time.seconds).slice(-2);

    if (time.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

initClock('js-countdown', countdown);

// ========================== //
// 2013 Countdown JS
// ========================== //

// function counter() {
//   var today = new Date(); //variable contains current date and time

//   var days = calcDays(today); //calculate the time left until set date below
//   document.countDown.daysLeft.value = Math.floor(days); // displays days rounded to the next lowest integer

//   var hours = (days - Math.floor(days)) * 24; //calculate the hours left in the current day
//   document.countDown.hrLeft.value = Math.floor(hours); // display hours rounded to the next lowest integer

//   var minutes = (hours - Math.floor(hours)) * 60; // calculate the minutes left in the current hour
//   document.countDown.minLeft.value = Math.floor(minutes); // display minutes rounded to the next lowest integer

//   var seconds = (minutes - Math.floor(minutes)) * 60; //calculate the seconds left in the current minute
//   document.countDown.secLeft.value = Math.floor(seconds); // display seconds rounded to the next lowest integer
// }

// function calcDays(currentDate) {
//   //create a date object for date of graduation
//   //calculate the difference between currentDate and set date
//   setDate = new Date("May 6, 2013");
//   currentTime = currentDate.getFullYear() + 1;
//   setDate.setFullYear(currentTime);

//   days = (setDate - currentDate) / (1000 * 60 * 60 * 24);
//   return days;
// }

// setInterval('counter()', 1000)