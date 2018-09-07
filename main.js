const ID_LETTER = 'letter';
const ID_WORD = 'word';

let text = '';
let words = [];
let textarea = document.getElementById('textarea');
let textBox = document.getElementById('type-box')
let textBoxValueOld = '';
let wordsBox = document.getElementById('wordsBox');

let currentWordIndex = -1;
let currentWordElement;
let currentLetterIndex = -1;
let currentLetterElement;
let currentWrongWordIndex = -1;
let currentWrongWordElement;
let currentWrongLetterIndex = -1;
let currentWrongLetterElement;

let wordSelected = 'wordSelected';
let wordNotSelected = 'wordNotSelected';
let typeError = 'typeError';
let typeCorrect = 'typeCorrect';
let typeSelected = 'typeSelected';
let typeNotSelected = 'typeNotSlected';

let wordLength = 'data-word-length';

let range = 100;
let rangeStart = 0;
let rangeEnd = 0;

function rangeSet(start) {
    if (start != null)
        rangeStart = start;

    rangeEnd = range+rangeStart > words.length ? words.length : range+rangeStart;
}

function subText() {
    text = textarea.value;
    text = text.replace(/[^a-zA-z0-9 ,.'";:()]/gm,'');
    words = text.split(/\s+/gm);

    rangeSet(rangeEnd);

    let frag = document.createDocumentFragment();

    for (let i = rangeStart; i < rangeEnd; i++) {
        let newWord = document.createElement('span');
        newWord.id = idGen(ID_WORD, i);
        newWord.className = wordNotSelected;

        let letters = (words[i] + ' ').split('');
        newWord.setAttribute(wordLength, letters.length);

        for (let j = 0; j < letters.length; j++) {
            let newLetter = document.createElement('span');
            newLetter.id = idGen(ID_LETTER, i, j);
            newLetter.className = typeNotSelected;

            newLetter.innerHTML = letters[j];
            newWord.appendChild(newLetter);
        }

        frag.appendChild(newWord);
    }

    
    wordsBox.appendChild(frag);
    start();
};

function start() {
    incrementWord();
    incrementLetter(true);
    incrementWrongLetter(true);
}

function incrementWord() {

    if (currentWordIndex+1 >= rangeEnd) {
        wordsBox.innerHTML = '';
        subText();
        return;
    }

    if (currentWordElement !== null && currentWordElement !== undefined)
        currentWordElement.className = wordNotSelected;
    currentWordIndex++;

    currentWordElement = document.getElementById(idGen(ID_WORD, currentWordIndex));
    currentWordElement.className = wordSelected;
}

function incrementLetter(reset) {

    if (reset)
        currentLetterIndex = -1;

    if (currentLetterElement !== null && currentLetterElement !== undefined) {
        currentLetterElement.className = typeCorrect;
    }
    currentLetterIndex++;

    currentLetterElement = document.getElementById(idGen(ID_LETTER, currentWordIndex, currentLetterIndex));
    currentLetterElement.className = typeSelected;
}

function incrementWrongLetter(reset, backwards) {
    if (reset) {
        currentWrongWordIndex = currentWordIndex;
        currentWrongLetterIndex = currentLetterIndex;

        currentWrongWordElement = document.getElementById(idGen(ID_WORD, currentWrongWordIndex));
        currentWrongLetterElement = document.getElementById(idGen(ID_LETTER, currentWrongWordIndex, currentWrongLetterIndex));
        return;
    }

    let letterNotNull = currentWrongLetterElement !== null && currentWrongLetterElement !== undefined;

    if (!backwards) {

        if (letterNotNull && currentWrongLetterElement.innerHTML === ' ') {
            currentWrongWordIndex++;
            currentWrongWordElement = document.getElementById(idGen(ID_WORD, currentWrongWordIndex));
            currentWrongLetterIndex = -1;
        }

        currentWrongLetterElement.classList.add(typeError);
        currentWrongLetterIndex++;
        currentWrongLetterElement = document.getElementById(idGen(ID_LETTER, currentWrongWordIndex, currentWrongLetterIndex));
    } else {
        if (letterNotNull && currentWrongLetterIndex === 0) {
            currentWrongWordIndex--;
            currentWrongWordElement = document.getElementById(idGen(ID_WORD, currentWrongWordIndex));
            currentWrongWordElement.getAttribute(wordLength);
            currentWrongLetterIndex = currentWrongWordElement.getAttribute(wordLength);;
        }
        currentWrongLetterIndex--;
        currentWrongLetterElement = document.getElementById(idGen(ID_LETTER, currentWrongWordIndex, currentWrongLetterIndex));
        currentWrongLetterElement.classList.remove(typeError);
    }
}

function idGen(type, wordIndex, letterIndex) {
    if (type === 'word') {
        return 'w-' + wordIndex;
    } else if (type === 'letter') {
        return 'w-' + wordIndex + ' l-' + letterIndex;
    }
}

textBox.addEventListener('input', e => {
    let textBoxValue = textBox.value;
    let delta = textBoxValue.length - textBoxValueOld.length;

    if (delta > 0) {
        let newInput = textBoxValue.substring(textBoxValue.length-delta);
        newInput = newInput.split('');
        for (let i = 0; i < newInput.length; i++) {
            input(newInput[i]);
        }
    } else if (delta < 0) {

        for (let i = Math.abs(delta); i > 0; i--) {

            // if current wrong letter index is the same or smaller than current letter, replace text box with the text before modificatoin
            if (currentWrongWordIndex <= currentWordIndex &&
                currentWrongLetterIndex <= currentLetterIndex) {
                
                textBox.value = textBoxValueOld;
                textBoxValue = textBoxValueOld;
                break;
            }
            input('Backspace');
        }
    }

    textBoxValueOld = textBoxValue;
});



function input(key) {

    if (key.length === 1) {
        if (key === currentLetterElement.innerHTML &&
            currentWrongWordIndex === currentWordIndex &&
            currentWrongLetterIndex === currentLetterIndex) {



            if (key === ' ') {
                incrementWord();
                incrementLetter(true);
            } else {

                incrementLetter(false);
            }

            incrementWrongLetter(true);
        } else {
            incrementWrongLetter(false, false);
        }
    } else if (key === 'Backspace') {
        if (currentWrongWordIndex > currentWordIndex ||
            currentWrongLetterIndex > currentLetterIndex)

            incrementWrongLetter(false, true);
    }
}



