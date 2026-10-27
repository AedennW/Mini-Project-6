
const welcomeDiv = document.getElementById("welcome-div");
const questionDiv = document.getElementById("question-div");
const resultDiv = document.getElementById("result-div");

const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");

const questionText = document.getElementById("question-text");
const questionNumber = document.getElementById("question-number");
const answersDiv = document.getElementById("answers-div");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const answerMessage = document.getElementById("answer-message");
const timer = document.getElementById("timer");

// All five quiz questions
const questions = [
    {
        question: "Which language is used to structure a webpage?",
        answers: ["HTML", "CSS", "JavaScript", "Python"],
        correct: 0
    },
    {
        question: "Which language is used to style a webpage?",
        answers: ["Python", "CSS", "Java", "HTML"],
        correct: 1
    },
    {
        question: "Which language adds interactivity to a webpage?",
        answers: ["HTML", "CSS", "JavaScript", "SQL"],
        correct: 2
    },
    {
        question: "What does HTML stand for?",
        answers: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "Hyper Transfer Main Link",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which symbol is used for an ID selector in CSS?",
        answers: [".", "#", "*", "&"],
        correct: 1
    }
];

let questionIndex = 0;
let score = 0;
let selectedAnswer = -1;
let seconds = 0;
let timerInterval;

// Starts the quiz
function startQuiz() {
    questionIndex = 0;
    score = 0;
    seconds = 0;

    clearInterval(timerInterval);
    timer.textContent = "Timer: 00:00";

    welcomeDiv.hidden = true;
    resultDiv.hidden = true;
    questionDiv.hidden = false;

    showQuestion();

    // Update the timer every second
    timerInterval = setInterval(function() {
        seconds++;

        let minutes = Math.floor(seconds / 60);
        let secs = seconds % 60;

        timer.textContent = "Timer: " +
            String(minutes).padStart(2, "0") + ":" +
            String(secs).padStart(2, "0");
    }, 1000);
}

// Displays the current question and its answers
function showQuestion() {
    selectedAnswer = -1;
    nextButton.disabled = true;
    answerMessage.textContent = "";

    let question = questions[questionIndex];

    questionNumber.textContent = "Question " + (questionIndex + 1);
    questionText.textContent = question.question;

    progressText.textContent = "Question " +
        (questionIndex + 1) + " of " + questions.length;

    progressFill.style.width =
        ((questionIndex + 1) / questions.length * 100) + "%";

    answersDiv.innerHTML = "";

    // Create each multiple-choice answer
    for (let i = 0; i < question.answers.length; i++) {
        let label = document.createElement("label");
        let radio = document.createElement("input");
        let text = document.createElement("span");

        label.className = "answer-option";

        radio.type = "radio";
        radio.name = "answer";
        radio.value = i;

        text.textContent = question.answers[i];

        // Allow the user to select an answer
        radio.addEventListener("change", function() {
            selectedAnswer = i;
            nextButton.disabled = false;
            answerMessage.textContent = "";
        });

        label.appendChild(radio);
        label.appendChild(text);
        answersDiv.appendChild(label);
    }

    // Change the button on the last question
    if (questionIndex === questions.length - 1) {
        nextButton.textContent = "Submit Quiz";
    } else {
        nextButton.textContent = "Next Question";
    }
}

// Checks the answer and moves to the next question
function nextQuestion() {
    if (selectedAnswer === -1) {
        answerMessage.textContent = "Please select an answer!";
        return;
    }

    if (selectedAnswer === questions[questionIndex].correct) {
        score++;
    }

    questionIndex++;

    if (questionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Displays the final score
function showResults() {
    clearInterval(timerInterval);

    questionDiv.hidden = true;
    resultDiv.hidden = false;

    let percentage = Math.round((score / questions.length) * 100);

    document.getElementById("final-score").textContent =
        "You scored " + score + " out of " + questions.length + "!";

    document.getElementById("final-time").textContent =
        "Your time: " + timer.textContent.replace("Timer: ", "");

    if (score === 5) {
        answerMessage.textContent = "Perfect Score!";
    }

    let message = "";

    if (score === 5) {
        message = "Perfect Score! Amazing job!";
    } else if (score >= 4) {
        message = "Great job!";
    } else if (score >= 3) {
        message = "Good effort!";
    } else {
        message = "Keep practicing and try again!";
    }

    document.getElementById("final-message").textContent =
        message + " You got " + percentage + "%.";
}

// Button event listeners
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", startQuiz);
