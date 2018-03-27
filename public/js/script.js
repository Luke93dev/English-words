window.onload = function () {
    hideAll.style.display = "none";
}

const words5 = document.getElementById("words5");
const words10 = document.getElementById("words10");
const words15 = document.getElementById("words15");
const polishWords = document.getElementById("polish-words");
const promptButton = document.getElementById("prompt-button");
const submitButton = document.getElementById("submit_button");
const anim_button = document.querySelector('.anim-button');
const overlay = document.querySelector('.overlay');

let wordsArray = [];
let usedIndexes = [];
let iterator = 0;
let randomIndex = 0;

document.getElementById("again_button").addEventListener('click', () => location.reload());

words5.addEventListener('click', start);
words10.addEventListener('click', start);
words15.addEventListener('click', start);
promptButton.addEventListener('click', displayPrompt);
submitButton.addEventListener('click', checkIfCorrect);
anim_button.addEventListener('click', toggleOverlay);



class Word {
    constructor(eng, pol) {
        this.eng = eng;
        this.pol = pol;
        this.rank = 1;
    }
}

function start() {
    generateWordSet(this.value);
    generateWord();
    document.querySelector('.words-amount').style = "display:none";
    document.querySelector(".main-wrapper").style = "visibility:visible";
    promptButton.style = "display:block";
}


function randomNumberGenerator(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
}


function generateWordSet(wordsAmount) {
    if (iterator < wordsAmount) {
        const random = randomNumberGenerator(arr.length);
        if (usedIndexes.some((el) => el == random)) {
            generateWordSet(wordsAmount)
        } else {
            usedIndexes.push(random)
            wordsArray.push(new Word(arr[random].eng, arr[random].pol));
            iterator++;
            generateWordSet(wordsAmount);
        }
    }
}


function generateWord() {
    randomIndex = randomNumberGenerator(wordsArray.length);
    polishWords.innerHTML = wordsArray[randomIndex].pol;
}


function displayPrompt() {
    console.log(wordsArray[randomIndex].eng.charAt(0));
    const englishWord = document.getElementById("english-word");
    englishWord.value = wordsArray[randomIndex].eng.charAt(0);
}


function checkIfCorrect() {
    event.preventDefault();
    const englishWord = document.getElementById("english-word");
    const incorrect = document.querySelector(".incorrect-answer");
    const correct = wordsArray[randomIndex].eng == (englishWord.value).toLowerCase();

    if (correct) {
        englishWord.value = "";
        incorrect.style = "display:none";
        if (wordsArray[randomIndex].rank > 1) {
            wordsArray[randomIndex].rank--;
        }
        wordsArray.splice(randomIndex, 1);
        if (!wordsArray.length) {
            document.querySelector(".finished").style = "display:block";
            document.querySelector(".main-wrapper").style = "display:none;";
            submitButton.style = "display:none;";
            promptButton.style = "display:none;";
            return 0;
        }
        return generateWord();
    } else {
        multipleWrongWord();
        document.getElementById("correct-answer").innerHTML = wordsArray[randomIndex].eng;
        incorrect.style = "display:block;";
    }
}


function multipleWrongWord() {
    const wrongWord = wordsArray[randomIndex];
    let rank = wrongWord.rank;
    if (rank <= 3) {
        wordsArray[randomIndex].rank += 2;
        wordsArray.push(wrongWord, wrongWord);
    } else if (rank == 4) {
        wordsArray[randomIndex].rank += 1;
        wordsArray.push(wrongWord);
    } else {
        return 0;
    }
}


function toggleOverlay() {
    this.classList.toggle('anim-button__bar--click');
    overlay.classList.toggle('overlay__slide');
}
