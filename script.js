window.onload=function(){
//getting elements from HTML by ID
var timeLeftEl = document.getElementById("timeLeft");
var startBtnEl = document.getElementById("startBtn");
var initialBxEl = document.getElementById("initialBox");
var quizBoxEl = document.getElementById("quizBox");
var questionsEl = document.getElementById("questions");
var answerBtnEl = document.getElementById("answerBtn");
var validAnswerEl = document.getElementById("validAnswer");
var nextBtnEl = document.getElementById("nextBtn");
var saveItnitialBoxEl = document.getElementById("saveItnitialBox");
var yourScoreEl = document.getElementById("yourScore");
var saveInitialsBtnEl = document.getElementById("saveInitialsBtn");
var highscoresboxEl = document.getElementById("highscoresbox");
var highScoresEl = document.getElementById("highScores");
var retakeEl = document.getElementById("retake");
var highscoreLinkEl = document.getElementById("highscoreLink");
var scoreEl = JSON.parse(localStorage.getItem("score")) || [];
var timerLeft = 100;
var timerID;
var shuffleQ;
var questionIndex;


//start button to begin quiz by event listenter
startBtnEl.addEventListener("click", beginGame);

//goes to the next question when the nextBtn is clicked
nextBtnEl.addEventListener("click", () => {
    questionIndex++
    nextQuestion()
});

// timer countdown
function timer(){
    timerLeft--;
    timeLeftEl.textContent = "Time: " + timerLeft;
    if(timerLeft <=0){
        savedScores();
    }
}

//start the quiz
function beginGame() {
    timerID = setInterval(timer,1000);
    initialBxEl.classList.add("hide");
    shuffleQ = questions.sort(() => Math.random() >= 0.5)
    questionIndex = 0
    quizBoxEl.classList.remove("hide");

    console.log(shuffleQ);
    //start timer when start button is pressed
    timer();
    nextQuestion();
}

//moving to the next question
function nextQuestion() {
    resetState();
    showQ(shuffleQ[questionIndex]);
}

//display the questions
function showQ(question) {
    questionsEl.innerText = question.question
    question.posAnswers.forEach(answer => {
        var btn = document.createElement("button")
        btn.innerText = answer.text
        btn.classList.add("btn")
        if(answer.correct) {
            btn.dataset.correct = answer.correct
        }
        btn.addEventListener("click", selectedAnswer)
        answerBtnEl.appendChild(btn)
    })
};

//selecting the answer and validate if right or wrong and display
function selectedAnswer(e) {
    var selectButton = e.target;
    var correct = selectButton.dataset.correct;
    validAnswerEl.classList.remove("hide")
    if (correct) {
        validAnswerEl.innerHTML = "Correct!";
    } else {
        validAnswerEl.innerHTML = "Incorrect";
        if (timerLeft <= 10) {
            timerLeft = 0;
        } else {
            timerLeft -= 10;
        }
    }

    Array.from(answerBtnEl.children).forEach(button => {
        setStatus(button, button.dataset.correct)
    })

    if (shuffleQ.length > questionIndex + 1) {
        nextBtnEl.classList.remove("hide")
        validAnswerEl.classList.remove("hide")
    } else {
        startBtnEl.classList.remove("hide")
        savedScores();
    }
};

//show the whether the answer is correct or wrong  
function setStatus(element, correct) {
    clearStatus(element)
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
};

// Remove all the classes
function clearStatus(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
};


//show the highscores
function viewHighscore(initials) {
    document.getElementById("scoreboard").classList.remove("hide");
    document.getElementById("highscoresbox").classList.add("hide");
    initialBxEl.classList.add("hide");
    quizBoxEl.classList.add("hide");
    if(typeof initials == "string") {
        var score = {initials, timerLeft}
        ScoreEl.push(score)
    }
    var scoreboardEl = document.getElementById("scoreboard");
    scoreboardEl.innterHTML ="";
    console.log(score);
    for (var i=0; i<scoreEl.length; i++) {
        var div1El = document.createElement("div");
        div1El.setAttribute("class", "divName");
        div1El.innerText = scoreEl[i].initials;
        var div2El = document.createElement("div");
        div2El.setAttribute("class", "divScore");
        div2El.innerText = scoreEl[i].timerLeft;

        //appendchild div elements to scoreboardEl
        scoreboardEl.appendChild(div1El);
        scoreboardEl.appendChild(div2El);
    }

    localStorage.setItem("score", JSON.stringify(scoreEl));
}


//high score link
highscoreLinkEl.addEventListener("click", viewHighscore);

//save quiz taker's initials when taker clicks submit button
saveInitialsBtnEl.addEventListener("click", function(event) {
    event.preventDefault();
    var initials = document.querySelector("#initialsBox").nodeValue;
    viewHighscore(initials);
});

// Save scores
function savedScores() {
    clearInterval(timerID);
    timeLeftEl.textContent = "Time: " + timeLeft;
    setTimeout(function () {
        //localStorage.setItem("scores", JSON.stringify(scores));
        quizBoxEl.classList.add("hide");
        saveItnitialBoxEl.classList.remove("hide");
        yourScoreEl.textContent = "Your total score is " + timeLeft;

    }, 2000)
};

var showScores = function () {
    // retreive score from local storage
    if (!savedScores) {
        return false;
    }

    // Convert scores from stringfield into array
    savedScores = JSON.parse(savedScores);
    var initials = document.querySelector("#initialsBox").value;
    var newScore = {
        score: timerLeft,
        initials: initials
    }
    showScores.push(newScore);
    //console.log(showScores)

    showScores.forEach(score => {
        initialsField.innerText = score.initials
        scoreField.innerText = score.score
    })
};

//clear score button
var clearBtnEl=document.getElementById("clearBtn");
clearBtnEl.addEventListener("click",function() {
    localStorage.clear();
    document.getElementById("scoreboard").innerHTML = "";
});
 
// Restart or reload the page
retakeEl.addEventListener("click", function () {
    window.location.reload();
});

function resetState() {
    //clearStatusClass(document.body)
    nextBtnEl.classList.add("hide")
    validAnswerEl.classList.add("hide")
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild
            (answerBtnEl.firstChild)
    }
};
}