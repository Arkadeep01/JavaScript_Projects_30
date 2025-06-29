const questionElement = document.getElementById("question");
const answersElement = document.getElementById("ans-button");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

async function fetchQuestions() {
    try {
        const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
        const data = await response.json();

        questions = data.results.map((q) => {
            const answers = [...q.incorrect_answers.map((ans) => ({
                text: decodeHTML(ans),
                correct: false
            }))];

            // Insert the correct answer randomly
            const correctIndex = Math.floor(Math.random() * (answers.length + 1));
            answers.splice(correctIndex, 0, {
                text: decodeHTML(q.correct_answer),
                correct: true
            });

            return {
                questions: decodeHTML(q.question),
                answers: answers
            };
        });

        startQuiz();
    } catch (error) {
        questionElement.innerText = "Failed to load questions. Please try again.";
        console.error("Error fetching questions:", error);
    }
}

function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    submitButton.classList.add("hide");
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = `${questionNo}. ${currentQuestion.questions}`;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn", "w-100", "mb-2", "text-dark");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answersElement.appendChild(button);
    });
}

function resetState() {
    while (answersElement.firstChild) {
        answersElement.removeChild(answersElement.firstChild);
    }
    nextButton.classList.add("hide");
    submitButton.classList.add("hide");
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    if (correct) {
        score++;
    }

    Array.from(answersElement.children).forEach((button) => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
    });

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.innerHTML = "Finish";
        submitButton.classList.remove("hide");
    } else {
        nextButton.classList.remove("hide");
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}`;
    const scoreButton = document.createElement("button");
    scoreButton.innerText = "Restart Quiz";
    scoreButton.classList.add("btn", "btn-primary", "mt-3");
    scoreButton.addEventListener("click", fetchQuestions); // restart with new set
    answersElement.appendChild(scoreButton);
    nextButton.classList.add("hide");
    submitButton.classList.add("hide");
}

function submitQuiz() {
    alert(`Thank you for participating! Your score is ${score} out of ${questions.length}`);
    showScore();
}

submitButton.addEventListener("click", submitQuiz);
nextButton.addEventListener("click", nextQuestion);

// 🚀 Start the quiz by fetching questions from internet
fetchQuestions();
