// ANIMATED ON SCROLL INITIALIZE
AOS.init();

// HIDES RESET BUTTON AND SKILL LIST 
$(".resetButton, #Complete").hide();
// $(".skillList").hide();
// $("#Complete").hide();
// Hide Known tech reveal

// This handles the Scoll Reveal for the Header and Navigation Bar. 
// window.sr = ScrollReveal({ reset: true });
// sr.reveal('.foo', { duration: 2000 });
// sr.reveal('.foo2', { duration: 5000 });
// sr.reveal('.foo3', { duration: 7000 });

// WORD BANK AND HINT!!
let wordBank = [{
        name: "javascript",
        hint: "The Most Popular programming Language? Hmm..What is it?",

    },
    {
        name: "html",
        hint: "A Markup Language,this string is embedded in it? 🤔",

    },
    {
        name: "CSS",
        hint: "This language shows that I have style..The hint is Style",

    },
    {
        name: "API",
        hint: "Application Programming Interface, Acronym please..😵",

    },
];

// Pick a random word from the array
var randomWord = wordBank[Math.floor(Math.random() * wordBank.length)].name;
var chosenWordInLetters = randomWord.split("");
var wrongGuesses = [];
var arrayOfAllLetters = [];
var wordAsUnderscorers = [];
console.log(randomWord);

// PLAY BUTTON on click function to trigger hangman game
$("#playButton").on('click', function startGame() {

    $("#howTo").empty
    document.getElementById('audio').play();
    // ITERATES THROUGH THE WORD BROKEN INTO LETTER AND CHANGES EACH LETTER TO A LOWERCASE.
    chosenWordInLetters.forEach(function(letter) {
        // HERE THE VARIABLE IS STORING EACH LETTER THAT HAS BEEN CHANGED TO A LOWER CASE 
        var toLowerLetter = letter.toLowerCase()
        arrayOfAllLetters.push(toLowerLetter);
        $("#playButton").hide();

        userInput();
    });

    function wordChange() {
        for (var z = 0; z < wordBank.length; z++) {

            if (randomWord === wordBank[z].name) {
                var newSpace = document.getElementById("hang");
                var pTwo = document.createElement("p");
                console.log(wordBank[z].hint);
                pTwo.classList.add("userHint");
                pTwo.innerHTML = "Here a hint: " + wordBank[z].hint;
                newSpace.appendChild(pTwo);
            }

        }
        // A for loop that is iterating through the chosen word and runs an IF statment
        for (var i = 0; i < chosenWordInLetters.length; i++) {
            // If statement that changes the letters in the chosen word into underscores
            if (chosenWordInLetters[i % 2] === "") {
                console.log(chosenWordInLetters[i % 2]);

                wordAsUnderscorers.push("-");
                document.getElementById('wordToGuess').innerHTML = wordAsUnderscorers.join(" ");
            } else {
                wordAsUnderscorers.push('_');
                document.getElementById('wordToGuess').innerHTML = wordAsUnderscorers.join(" ");
            }
        }
    }
    wordChange();

    $(".resetButton").on("click", function reset() {
        // $("#playButton").show();
        userInput();
        randomWord = wordBank[Math.floor(Math.random() * wordBank.length)].name;
        chosenWordInLetters = randomWord.split("");
        wrongGuesses = [];
        arrayOfAllLetters = [];
        wordAsUnderscorers = [];
        console.log(randomWord);
        $(".resetButton").hide();
        $(".messageToUser, wordToGuess, #howTo").empty();
        // $("#wordToGuess").empty();
        // $("#howTo").empty
        // ITERATES THROUGH THE WORD BROKEN INTO LETTER AND CHANGES EACH LETTER TO A LOWERCASE.
        chosenWordInLetters.forEach(function(letter) {
            // HERE THE VARIABLE IS STORING EACH LETTER THAT HAS BEEN CHANGED TO A LOWER CASE 
            var toLowerLetter = letter.toLowerCase()
            arrayOfAllLetters.push(toLowerLetter);
            $("#playButton").hide();

        });
        wordChange();
    });
});

function checkLetter(e) {
    // PARAMETER IS SET TO "e"
    // A VARIABLE SET TO FALSE. MY GUESS IS THIS WILL BE USED LETTER TO TRIGGER AN EVENT IF IT'S MADE TO BE TRUE.
    var checkIfLetterIsInWord = false;
    // A FOR LOOP ITERATING OVER EVERY LETTER IN THE arrayOfAllLetters array.
    for (var i = 0; i < arrayOfAllLetters.length; i++) {
        // STATING THAT IF "e"(what the user presses) IS EQUAL TO ANYTHING INSIDE THAT ARRAY. MAKE THE VAR TRUE.
        if (e === arrayOfAllLetters[i]) {
            // THIS WILL BE TRUE IF THERE IS A MATCH BETWEEN WHAT THE USER PRESSES AND THE CONTENTS OF THE ARRAY.
            checkIfLetterIsInWord = true;
        }
    }
    console.log(arrayOfAllLetters);
    if (checkIfLetterIsInWord) {
        // display that letter in the DOM and replace the underscore
        // console.log(e);
        // console.log(wordAsUnderscorers);

        for (var j = 0; j < wordAsUnderscorers.length; j++) {

            if (arrayOfAllLetters[j] === e) {
                wordAsUnderscorers[j] = e;
                document.getElementById('wordToGuess').innerHTML = wordAsUnderscorers.join(" ");
            }
        }
    }
    if (wordAsUnderscorers.indexOf("_") == -1) {

        for (var x = 0; x < wordBank.length; x++) {
            if (randomWord === wordBank[x].name) {
                wordBank.splice(x, 1);
            }
        }
        console.log(x);
        console.log(wordBank);

        //Empty Array To Prepare Code for New Word 
        arrayOfAllLetters = [];
        wordAsUnderscorers = [];
        chosenWordInLetters = randomWord.split("");

        var newSpace = document.getElementById("hang");
        var pOne = document.createElement("p");
        pOne.classList.add("messageToUser", "animated", "rotateIn");
        pOne.innerHTML = "Nice!!"
        newSpace.appendChild(pOne);
        document.getElementById('ding').play();
        $(".resetButton").show()
        $(".userHint").empty();
        // Let User know How many Words there are left.
        // When There are no words left show user all answers and additionals technologies known. 
    }
    if (wordBank.length < 1) {
        $(".hangMan").empty();
        var newSpace = document.getElementById("hang");
        var pThree = document.createElement("p");
        pThree.classList.add("userHint");
        pThree.innerHTML = "You've Done it! Easy Huh?"
        newSpace.appendChild(pThree);

        $("#Complete").show();
    }
}

$("#Complete").on("click", function() {
    document.getElementById('audio').pause();
    $(".hangMan, .messageToUser, .userHint, #Complete ").hide();
    $(".skillList").show();
    // $(".hangMan").hide();
    // $(".messageToUser").hide();
    // $(".userHint").hide();
    // $("#Complete").hide();
})
$("#skip").on("click", function() {
    document.getElementById('audio').pause();
    $(".hangMan, .messageToUser, .userHint, #Complete ").hide();
    $(".skillList").show();
    // $(".hangMan").hide();
    // $(".messageToUser").hide();
    // $(".userHint").hide();
    // $(".Complete").hide();
})

function userInput() {
    document.onkeyup = function(e) {
        var userKey = e.key

        // THIS WILL RUN THE CHECK LETTER FUNCTION WHEN THE USER PRESSES A KEY. 
        checkLetter(userKey);

    }
}