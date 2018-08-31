let text = '';
let words = [];
let textarea = document.getElementById("textarea");
let wordsBox = document.getElementById('wordsBox');
let currentWordIndex = 0;


let subText = function() {
    text = textarea.value;
    words = text.split(new RegExp('\\s+'));

    let frag = document.createDocumentFragment();

    for (let i = 0; i < words.length; i++) {
        let newWord = document.createElement('span');
        newWord.setAttribute('id','w-'+i);
        
        let letters = words[i].split('');
        for (let j = 0; j < letters.length; j++) {
            let newLetter = document.createElement('span');
            newLetter.setAttribute('id','w-'+i+' l-'+j);
            newLetter.innerHTML = letters[j];
            newWord.appendChild(newLetter);
        }
        frag.appendChild(newWord);
    }

    wordsBox.appendChild(frag);
};




