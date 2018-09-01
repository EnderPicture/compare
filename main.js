let text = '';
let words = [];
let textarea = document.getElementById('textarea');
let textBox = document.getElementById('type-box')
let wordsBox = document.getElementById('wordsBox');

let currentWordIndex = -1;
let currentWordElement;
let currentLetterIndex = -1;
let currentLetterElement;

let wordSelected = 'wordSelected';
let wordNotSelected = 'wordNotSelected';
let typeError = 'typeError';
let typeCorrect = 'typeCorrect';
let typeSelected = 'typeSelected';
let typeNotSelected = 'typeNotSlected';


function subText() {
    text = textarea.value;
    words = text.split(new RegExp('\\s+'));

    let frag = document.createDocumentFragment();

    for (let i = 0; i < words.length; i++) {
        let newWord = document.createElement('span');
        newWord.id = 'w-' + i ;
        newWord.className = wordNotSelected;
        
        let letters = (words[i]+' ').split('');
        for (let j = 0; j < letters.length; j++) {
            let newLetter = document.createElement('span');
            newLetter.id = 'w-' + i+' l-' + j;
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
    incrementLetter();
    
}

function incrementWord() {
    currentWordIndex++;
    currentWordElement = document.getElementById('w-' + currentWordIndex);
}

function incrementLetter(reset) {
    
    if (reset) 
        currentLetterIndex = -1;
        
    if (currentLetterElement !== null && currentLetterElement !== undefined) {
        currentLetterElement.className = typeCorrect;
    }
    currentLetterIndex++;
    
    currentLetterElement = document.getElementById('w-' + currentWordIndex +' l-' + currentLetterIndex);
    currentLetterElement.className = typeSelected;
}



textBox.addEventListener('keydown', KeyboardEvent => {
    let key = KeyboardEvent.key;


    if (key === currentLetterElement.innerHTML) {
        if (key === ' ') {
            incrementWord()
            incrementLetter(true)
        } else {

            incrementLetter(false);
        }
    }
});




