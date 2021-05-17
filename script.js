const startBtn = document.querySelector("#startBtn");
const startScreen = document.querySelector("#startScreen");
const gameScreen = document.querySelector("#gameScreen");
const endScreen = document.querySelector("#endScreen");
const choiceContainer = document.querySelector(".choice-container");
const wrongDiv = document.querySelector("#wrongDiv");
const correctDiv = document.querySelector("#correctDiv");
const finalScore = document.querySelector("#finalScore");
const hide = document.querySelector(".hide");


// set the time based on amount of questions to answer 
let time = questions.length * 15;
let timer = document.querySelector("#timer");
let interval = 0;

// If a question is answered incorrectly, additional time is subtracted from the timer.
// The timer stops when all questions have been answered or the timer reaches 0.

// timer function immediately begins countdown when the start button is clicked. 
function countdownTimer() {

    // setting an interval of 1 second
    interval = setInterval(function() {

        // decrease time every second
        time--;

        // display the time in the timer span
        timer.textContent = time;

        // checks if time hits zero - if it does - clear the time
        if (time <= 0){
            clearInterval(interval);
            endQuiz();
        }
    }, 1000);

}

// Clicking the start button displays a series of questions.

// function to get questions from the array
function getQuestions() {

    // question index 
    let questionIndex = 0;

    // setting the index of the questions array to a variable
    let currentQuestion = questions[questionIndex];

    // sets the text of the object.title to an h2 
    const questionText = document.querySelector(".question-text");
    questionText.textContent = currentQuestion.title;

    // looping through the choices in the object
    currentQuestion.choices.forEach(function (choice) {

      // create new button for each choice
      const button = document.createElement("button");
      button.setAttribute("class", "btn btn-primary button-display");

      // add event listener to each button to see which button was clicked
      button.addEventListener("click", function (event) {
        event.preventDefault();

        // if the correct question is picked - display the class "correct"
        // else display the class "wrong" and penalize time
        if(event.target.textContent === currentQuestion.answer){
            correctDiv.setAttribute("class", "correct");
        } else {
            time -= 15;
            wrongDiv.setAttribute("class", "wrong");
        }
      });

      // displays a number next to the possible answer based on the index
      // displays the choices for the question
      button.textContent = choice;

      // display on the page
      choiceContainer.appendChild(button);

    });
}

// The first view of the application displays a button that starts the quiz.
// Once the quiz begins, a timer starts.

// event listener for button click to start the quiz
startBtn.addEventListener("click", function(){

    // add a class of hide to the startScreen
    startScreen.classList.add("hide");

    // removes the class hide from the gameScreen
    gameScreen.classList.remove("hide");

    // call the timer on click
    countdownTimer();

    // get questions on click
    getQuestions();
    
});

function highScores() {

    // hide startScreen
    startScreen.classList.add("hide");

    // hide gameScreen
    gameScreen.classList.add("hide");
    
    // hide endScreen
    endScreen.classList.add("hide");

}

function endQuiz() {

    // hide questions screen
    gameScreen.classList.add("hide");

    // show end of quiz div
    endScreen.classList.remove("hide");

    // show final score
    finalScore.textContent = time;

}