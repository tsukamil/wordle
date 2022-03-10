var currentRow = 0;
var secret = "sznur";

function init() {

    console.log('hello!');

    rows = document.querySelectorAll(".row");
    
    rows.forEach(element => {
        for(let i=0;i<5;i++) {
            span = document.createElement("span");
            element.appendChild(span);
        }
    });
};

function checkIfLetterExist(letter) {
    let check=false;
    for(let j=0;j<5;j++) {
        if (letter == secret[j]) {
            check=true;
        }
    }
    return check;
}

function checkWord() {
    let row = document.querySelectorAll(`#row${currentRow} span`);
    for(let i=0;i<5;i++) {
        let letter = row[i].textContent;
        if (checkIfLetterExist(letter) && secret[i] != letter) {
            row[i].classList.add('exist');
        } else if (secret[i] == letter) {
            row[i].classList.add('confirmed');
        } else {
            row[i].classList.add('declined');
        }
    }
    currentRow+=1;
}

function keyPressed(e) {
    if (currentRow<6) {
        console.log(e.key);
        let row = document.querySelectorAll(`#row${currentRow} span`);
        if (e.key=="Backspace") {
            for(let i=4;i>=0;i--) {
                element=row[i];
                if (element.textContent != "") {
                    element.textContent = "";
                    return true;    
                }
            
            };
        } else if (e.key=="Enter") {
            checkWord();
        } else {
            for(let i=0;i<5;i++) {
                element=row[i];
                if (element.textContent == "") {
                    element.textContent = e.key;
                    return true;    
                }
            
            };
        }
    }
}

init();
document.addEventListener('keydown', keyPressed);

