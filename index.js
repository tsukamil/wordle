var currentRow = 0;
var secret = "";
let db = [];
let dbText = "";

function init() {
  console.log("hello!");
  setDb();
  rows = document.querySelectorAll(".row");

  rows.forEach((element) => {
    for (let i = 0; i < 5; i++) {
      span = document.createElement("span");
      element.appendChild(span);
    }
  });
}

function checkIfLetterExist(letter) {
  let check = false;
  for (let j = 0; j < 5; j++) {
    if (letter == secret[j]) {
      check = true;
    }
  }
  return check;
}

function checkWord() {
    let correctLetters = 0;
  let word = "";
  let row = document.querySelectorAll(`#row${currentRow} span`);
  row.forEach((item) => {
    word += item.textContent;
  });
  if (word.trim().length == 5 && dbText.includes(word)) {
    for (let i = 0; i < 5; i++) {
      let letter = row[i].textContent;
      if (checkIfLetterExist(letter) && secret[i] != letter) {
        row[i].classList.add("exist");
      } else if (secret[i] == letter) {
        row[i].classList.add("confirmed");
        correctLetters++;
      } else {
        row[i].classList.add("declined");
      }
    }
    if (correctLetters<5) {
        currentRow += 1;
    } else {
        alert("Gratulacje odgadles slowo!");
        addSolution();
    }
  } else {
    alert("Brak slowa w bazie");
  }
}

function keyPressed(e) {
  if (currentRow < 6) {
    console.log(e.key);
    let row = document.querySelectorAll(`#row${currentRow} span`);
    if (e.key == "Backspace") {
      for (let i = 4; i >= 0; i--) {
        element = row[i];
        if (element.textContent != "") {
          element.textContent = "";
          return true;
        }
      }
    } else if (e.key == "Enter") {
      checkWord();
    } else {
      for (let i = 0; i < 5; i++) {
        element = row[i];
        if (element.textContent == "") {
          element.textContent = e.key;
          return true;
        }
      }
    }
  }
}

async function setDb() {
  fetch("db5.txt")
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      dbText = text.toLowerCase();
      text = text.toLowerCase().split(/\r\n|\n/);
      for (var line = 0; line < text.length - 1; line++) {
        db.push(text[line]);
      }
    })
    .then(() => {
      setSecret();
    });
}

function setSecret() {
  if (db.length > 0) {
    secret = db[Math.floor(Math.random() * db.length - 1)];
    console.log(secret);
  }
}

function addSolution() {
    const solution = document.getElementById("solution");
    solution.textContent="";
    let link = document.createElement("a");
    link.textContent="Sprawdz odganiete slowo!";
    link.href=`https://sjp.pl/${secret}`;
    link.target="_blank";
    solution.appendChild(link);
}

init();
document.addEventListener("keydown", keyPressed);
