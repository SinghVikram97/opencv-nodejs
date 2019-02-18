const text = document.getElementById("text");
let string = "";
let array = ["a", "p", "p", "l", "f"];
let i = 0;
var timesRun = 0;
var interval = setInterval(function() {
  string += array[timesRun];
  text.innerHTML = string;
  let msg = new SpeechSynthesisUtterance(array[timesRun]);
  window.speechSynthesis.speak(msg);
  timesRun += 1;
  if (timesRun === 5) {
    let msg = new SpeechSynthesisUtterance(string);
    window.speechSynthesis.speak(msg);
    let newMsq = new SpeechSynthesisUtterance("Did you mean apple");
    window.speechSynthesis.speak(newMsq);
    clearInterval(interval);
  }
}, 2500);
