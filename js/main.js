const timeNow = document.getElementById('time');
const mainTimeFirst = document.getElementById('timeFirst');
const mainTimeSecond = document.getElementById('timeSecond');


  let a;
  let time;

  setInterval(() => {
    a = new Date();
    time = a.getHours() + ':' + a.getMinutes();
    timeNow.innerHTML = time;
  }, 1000);
  

  let b;
  let timeFirst;

  setInterval(() => {
    b = new Date();
    timeFirst = b.getHours() + ':' + b.getMinutes();
    mainTimeFirst.innerHTML = timeFirst;
    if(getMinutes().value < 10) {
        getMinutes().value += "0";
    } else {
        getMinutes(); 
    }
  }, 1000);


  let c;
  let timeSecond;

  setInterval(() => {
    c = new Date();
    // timeSecond = c.getDate()  + '.' + c.getMonth() + '.' + c.getFullYear();
    timeSecond = c.toDateString();
    mainTimeSecond.innerHTML = timeSecond;
  }, 1000);

  const locationBtn = document.querySelector(".alarm");

  locationBtn.addEventListener("click", () => {
  
    location.assign("alarm.html");
  
    location.replace("alarm.html");
  
    location.reload();
  });


  