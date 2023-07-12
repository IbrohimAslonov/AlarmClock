// const currentTime = document.querySelector("h1"),
// content = document.querySelector(".content"),
// selectMenu = document.querySelectorAll("select"),
// setAlarmBtn = document.querySelector("button");

// let alarmTime, isAlarmSet,
// ringtone = new Audio("./files/ringtone.mp3");

// for (let i = 12; i > 0; i--) {
//     i = i < 10 ? `0${i}` : i;
//     let option = `<option value="${i}">${i}</option>`;
//     selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
// }

// for (let i = 59; i >= 0; i--) {
//     i = i < 10 ? `0${i}` : i;
//     let option = `<option value="${i}">${i}</option>`;
//     selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
// }

// for (let i = 2; i > 0; i--) {
//     let ampm = i == 1 ? "AM" : "PM";
//     let option = `<option value="${ampm}">${ampm}</option>`;
//     selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
// }

// setInterval(() => {
//     let date = new Date(),
//     h = date.getHours(),
//     m = date.getMinutes(),
//     s = date.getSeconds(),
//     ampm = "AM";
//     if(h >= 12) {
//         h = h - 12;
//         ampm = "PM";
//     }
//     h = h == 0 ? h = 12 : h;
//     h = h < 10 ? "0" + h : h;
//     m = m < 10 ? "0" + m : m;
//     s = s < 10 ? "0" + s : s;
//     currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

//     if (alarmTime === `${h}:${m} ${ampm}`) {
//         ringtone.play();
//         ringtone.loop = true;
//     }
// });

// function setAlarm() {
//     if (isAlarmSet) {
//         alarmTime = "";
//         ringtone.pause();
//         content.classList.remove("disable");
//         setAlarmBtn.innerText = "Set Alarm";
//         return isAlarmSet = false;
//     }

//     let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
//     if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
//         return alert("Please, select a valid time to set Alarm!");
//     }
//     alarmTime = time;
//     isAlarmSet = true;
//     content.classList.add("disable");
//     setAlarmBtn.innerText = "Clear Alarm";
// }

// setAlarmBtn.addEventListener("click", setAlarm);



//Initial References
let timerRef = document.querySelector(".timer-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector(".activeAlarms");
const setAlarm = document.getElementById("set");
let alarmsArray = [];
let alarmSound = new Audio("https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/2.mp3");

let initialHour = 0,
  initialMinute = 0,
  alarmIndex = 0;

//Append zeroes for single digit
const appendZero = (value) => (value < 10 ? "0" + value : value);

//Search for value in object
const searchObject = (parameter, value) => {
  let alarmObject,
    objIndex,
    exists = false;
  alarmsArray.forEach((alarm, index) => {
    if (alarm[parameter] == value) {
      exists = true;
      alarmObject = alarm;
      objIndex = index;
      return false;
    }
  });
  return [exists, alarmObject, objIndex];
};

//Display Time
function displayTimer() {
  let date = new Date();
  let [hours, minutes, seconds] = [
    appendZero(date.getHours()),
    appendZero(date.getMinutes()),
    appendZero(date.getSeconds()),
  ];

  //Display time
  timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;

  //Alarm
  alarmsArray.forEach((alarm, index) => {
    if (alarm.isActive) {
      if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`) {
        alarmSound.play();
        alarmSound.loop = true;
      }
    }
  });
}

const inputCheck = (inputValue) => {
  inputValue = parseInt(inputValue);
  if (inputValue < 10) {
    inputValue = appendZero(inputValue);
  }
  return inputValue;
};

hourInput.addEventListener("input", () => {
  hourInput.value = inputCheck(hourInput.value);
});

minuteInput.addEventListener("input", () => {
  minuteInput.value = inputCheck(minuteInput.value);
});

//Create alarm div

const createAlarm = (alarmObj) => {
  //Keys from object
  const { id, alarmHour, alarmMinute } = alarmObj;
  //Alarm div
  let alarmDiv = document.createElement("div");
  alarmDiv.classList.add("alarm");
  alarmDiv.setAttribute("data-id", id);
  alarmDiv.innerHTML = `<span>${alarmHour}: ${alarmMinute}</span>`;

  //checkbox
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", (e) => {
    if (e.target.checked) {
      startAlarm(e);
    } else {
      stopAlarm(e);
    }
  });
  alarmDiv.appendChild(checkbox);
  //Delete button
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e));
  alarmDiv.appendChild(deleteButton);
  activeAlarms.appendChild(alarmDiv);
};

//Set Alarm
setAlarm.addEventListener("click", () => {
  alarmIndex += 1;

  //alarmObject
  let alarmObj = {};
  alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
  alarmObj.alarmHour = hourInput.value;
  alarmObj.alarmMinute = minuteInput.value;
  alarmObj.isActive = false;
  console.log(alarmObj);
  alarmsArray.push(alarmObj);
  createAlarm(alarmObj);
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);
});

//Start Alarm
const startAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = true;
  }
};

//Stop alarm
const stopAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = false;
    alarmSound.pause();
  }
};

//delete alarm
const deleteAlarm = (e) => {
  let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    e.target.parentElement.parentElement.remove();
    alarmsArray.splice(index, 1);
  }
};

window.onload = () => {
  setInterval(displayTimer);
  initialHour = 0;
  initialMinute = 0;
  alarmIndex = 0;
  alarmsArray = [];
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);
};