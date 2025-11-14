// --- Grammar Content Functions ---
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function collapseAll() {
    var details = document.querySelectorAll('details');
    details.forEach(function(detail) {
        detail.removeAttribute('open');
    });
    updateProgress();
}

function expandAll() {
    var details = document.querySelectorAll('details');
    details.forEach(function(detail) {
        detail.setAttribute('open', '');
    });
    updateProgress();
}

function updateProgress() {
    var details = document.querySelectorAll('details');
    var openDetails = document.querySelectorAll('details[open]');
    var progress = (openDetails.length / details.length) * 100;
    
    // Update desktop circle
    const desktopText = document.getElementById('desktopProgressText');
    if (desktopText) {
        desktopText.textContent = Math.round(progress) + '%';
    }
    const progressRing = document.getElementById('progressRing');
    if (progressRing) {
        const circumference = 2 * Math.PI * 54;
        const offset = circumference - (progress / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;
    }
    
    // Update mobile bar
    const mobileText = document.getElementById('mobileProgressText');
    if (mobileText) {
        mobileText.textContent = Math.round(progress) + '%';
    }
    const barFill = document.getElementById('progressBarFill');
    if (barFill) {
        barFill.style.width = progress + '%';
    }
}

// Add event listeners to all details elements
document.addEventListener('DOMContentLoaded', function() {
    var details = document.querySelectorAll('details');
    details.forEach(function(detail) {
        detail.addEventListener('toggle', updateProgress);
    });
    
    // Add reset progress button functionality
    document.getElementById('reset-progress').addEventListener('click', function() {
        collapseAll();
    });
    
    updateProgress();
});

// Add smooth scroll animation
document.querySelectorAll('details').forEach(function(detail) {
    detail.addEventListener('toggle', function() {
        if (this.open) {
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    });
});

// --- Practice Mode Functions ---

const allQuestions = [
    // Multiple Choice Questions (20 questions)
    {
        type: "multiple-choice",
        question: "Choose the correct pronoun: ______ am a sailor.",
        options: ["You", "He", "I", "She"],
        answer: "I"
    },
    {
        type: "multiple-choice",
        question: "Which form of 'to be' goes with 'He'?",
        options: ["am", "are", "is"],
        answer: "is"
    },
    {
        type: "multiple-choice",
        question: "Complete the sentence: They ______ on the ship.",
        options: ["is", "am", "are"],
        answer: "are"
    },
    {
        type: "multiple-choice",
        question: "Choose the correct negative form: I ______ not tired.",
        options: ["is", "am", "are"],
        answer: "am"
    },
    {
        type: "multiple-choice",
        question: "The captain ______ brave. (Choose 'to be' form)",
        options: ["am", "are", "is"],
        answer: "is"
    },
    {
        type: "multiple-choice",
        question: "______ you ready for duty? (Choose 'to be' form)",
        options: ["Am", "Is", "Are"],
        answer: "Are"
    },
    {
        type: "multiple-choice",
        question: "Which pronoun refers to a female person?",
        options: ["He", "It", "She", "They"],
        answer: "She"
    },
    {
        type: "multiple-choice",
        question: "What is the short form of 'is not'?",
        options: ["amn't", "aren't", "isn't"],
        answer: "isn't"
    },
    {
        type: "multiple-choice",
        question: "We ______ a team. (Choose 'to be' form)",
        options: ["is", "am", "are"],
        answer: "are"
    },
    {
        type: "multiple-choice",
        question: "The ship ______ big. (Choose 'to be' form)",
        options: ["am", "are", "is"],
        answer: "is"
    },
    {
        type: "multiple-choice",
        question: "Which sentence is correct?",
        options: ["She am a doctor.", "She is a doctor.", "She are a doctor."],
        answer: "She is a doctor."
    },
    {
        type: "multiple-choice",
        question: "Fill in the blank: ______ are my friends.",
        options: ["I", "He", "They", "It"],
        answer: "They"
    },
    {
        type: "multiple-choice",
        question: "The word 'It' refers to:",
        options: ["a male person", "a female person", "a thing/animal"],
        answer: "a thing/animal"
    },
    {
        type: "multiple-choice",
        question: "Complete the negative sentence: You ______ not happy.",
        options: ["is", "am", "are"],
        answer: "are"
    },
    {
        type: "multiple-choice",
        question: "Which question is correct?",
        options: ["Is I ready?", "Am I ready?", "Are I ready?"],
        answer: "Am I ready?"
    },
    {
        type: "multiple-choice",
        question: "We ______ in the Navy. (Choose 'to be' form)",
        options: ["is", "am", "are"],
        answer: "are"
    },
    {
        type: "multiple-choice",
        question: "Which pronoun is used for 'usted' or 'tú'?",
        options: ["I", "You", "He", "We"],
        answer: "You"
    },
    {
        type: "multiple-choice",
        question: "The dog ______ hungry. (Choose 'to be' form)",
        options: ["am", "are", "is"],
        answer: "is"
    },
    {
        type: "multiple-choice",
        question: "Choose the correct negative short form: We ______ ready.",
        options: ["isn't", "aren't", "am not"],
        answer: "aren't"
    },
    {
        type: "multiple-choice",
        question: "______ the engine broken? (Choose 'to be' form)",
        options: ["Am", "Are", "Is"],
        answer: "Is"
    },
    // True/False Questions (20 questions)
    {
        type: "true-false",
        question: "The pronoun 'I' means 'yo'.",
        answer: true
    },
    {
        type: "true-false",
        question: "'He is' is correct for a male person.",
        answer: true
    },
    {
        type: "true-false",
        question: "The verb 'to be' only means 'ser'.",
        answer: false
    },
    {
        type: "true-false",
        question: "You use 'am' with 'You'.",
        answer: false
    },
    {
        type: "true-false",
        question: "The short form of 'are not' is 'aren't'.",
        answer: true
    },
    {
        type: "true-false",
        question: "In a question, 'is' comes after the pronoun (e.g., 'He is?').",
        answer: false
    },
    {
        type: "true-false",
        question: "'She' is for a female person.",
        answer: true
    },
    {
        type: "true-false",
        question: "'It' is used for people.",
        answer: false
    },
    {
        type: "true-false",
        question: "To make a sentence negative, add 'not' after the 'to be' verb.",
        answer: true
    },
    {
        type: "true-false",
        question: "'We are' is correct.",
        answer: true
    },
    {
        type: "true-false",
        question: "The sentence 'They is sailors' is grammatically correct.",
        answer: false
    },
    {
        type: "true-false",
        question: "'Am I late?' is a correct question.",
        answer: true
    },
    {
        type: "true-false",
        question: "Pronouns help to avoid repeating names.",
        answer: true
    },
    {
        type: "true-false",
        question: "The ship is small. 'Is' is the correct form of 'to be'.",
        answer: true
    },
    {
        type: "true-false",
        question: "'You' can mean 'tú' or 'usted'.",
        answer: true
    },
    {
        type: "true-false",
        question: "The negative short form for 'I am not' is 'I amn't'.",
        answer: false
    },
    {
        type: "true-false",
        question: "In 'Are they ready?', 'Are' comes before 'they'.",
        answer: true
    },
    {
        type: "true-false",
        question: "The current lesson focuses on the past simple of 'to be'.",
        answer: false
    },
    {
        type: "true-false",
        question: "Affirmative sentences state something as true.",
        answer: true
    },
    {
        type: "true-false",
        question: "'He' refers to a group of people.",
        answer: false
    }
];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
const NUMBER_OF_QUESTIONS = 20;

const grammarContent = document.getElementById('grammarContent');
const practiceModeDiv = document.getElementById('practiceMode');
const quizContainer = document.getElementById('quizContainer');
const quizResultsDiv = document.getElementById('quizResults');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const feedbackDiv = document.getElementById('feedback');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const scoreDisplay = document.getElementById('scoreDisplay');
const totalQuestionsDisplay = document.getElementById('totalQuestionsDisplay');
const practiceModeBtn = document.getElementById('practiceModeBtn');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function selectRandomQuestions() {
    const mcQuestions = allQuestions.filter(q => q.type === "multiple-choice");
    const tfQuestions = allQuestions.filter(q => q.type === "true-false");

    const shuffledMc = shuffleArray(mcQuestions);
    const shuffledTf = shuffleArray(tfQuestions);

    const numMc = Math.min(NUMBER_OF_QUESTIONS / 2, shuffledMc.length);
    const numTf = Math.min(NUMBER_OF_QUESTIONS - numMc, shuffledTf.length);

    let chosenQuestions = [];
    chosenQuestions.push(...shuffledMc.slice(0, numMc));
    chosenQuestions.push(...shuffledTf.slice(0, numTf));

    if (chosenQuestions.length < NUMBER_OF_QUESTIONS) {
        const remainingNeeded = NUMBER_OF_QUESTIONS - chosenQuestions.length;
        const remainingMc = shuffledMc.slice(numMc);
        const remainingTf = shuffledTf.slice(numTf);
        
        chosenQuestions.push(...shuffleArray([...remainingMc, ...remainingTf]).slice(0, remainingNeeded));
    }

    selectedQuestions = shuffleArray(chosenQuestions);
}

function displayQuestion() {
    nextQuestionBtn.style.display = 'none';
    feedbackDiv.textContent = '';
    optionsContainer.innerHTML = '';

    if (currentQuestionIndex < selectedQuestions.length) {
        const questionData = selectedQuestions[currentQuestionIndex];
        questionText.textContent = `Question ${currentQuestionIndex + 1}/${selectedQuestions.length}: ${questionData.question}`;

        if (questionData.type === "multiple-choice") {
            shuffleArray(questionData.options).forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('option-btn');
                button.onclick = () => checkAnswer(option, questionData.answer, button);
                optionsContainer.appendChild(button);
            });
        } else if (questionData.type === "true-false") {
            const trueButton = document.createElement('button');
            trueButton.textContent = "True";
            trueButton.classList.add('option-btn');
            trueButton.onclick = () => checkAnswer(true, questionData.answer, trueButton);
            optionsContainer.appendChild(trueButton);

            const falseButton = document.createElement('button');
            falseButton.textContent = "False";
            falseButton.classList.add('option-btn');
            falseButton.onclick = () => checkAnswer(false, questionData.answer, falseButton);
            optionsContainer.appendChild(falseButton);
        }
    } else {
        showResults();
    }
}

function checkAnswer(selectedOption, correctAnswer, clickedButton) {
    Array.from(optionsContainer.children).forEach(button => {
        button.disabled = true;
        button.style.cursor = 'not-allowed';
        if (button.textContent === String(correctAnswer)) {
            button.classList.add('correct-answer-highlight');
        }
    });

    if (String(selectedOption) === String(correctAnswer)) {
        feedbackDiv.textContent = "Correct! ¡Correcto!";
        feedbackDiv.style.color = '#28a745';
        score++;
        clickedButton.classList.add('correct-answer');
    } else {
        feedbackDiv.textContent = "Incorrect. ¡Incorrecto!";
        feedbackDiv.style.color = '#dc3545';
        clickedButton.classList.add('wrong-answer');
        if (selectedQuestions[currentQuestionIndex].type === "true-false") {
            Array.from(optionsContainer.children).forEach(button => {
                if (String(button.textContent) === String(correctAnswer)) {
                    button.classList.add('correct-answer-highlight');
                }
            });
        }
    }
    nextQuestionBtn.style.display = 'block';
}

function showResults() {
    quizContainer.style.display = 'none';
    quizResultsDiv.style.display = 'block';
    scoreDisplay.textContent = score;
    totalQuestionsDisplay.textContent = selectedQuestions.length;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizResultsDiv.style.display = 'none';
    quizContainer.style.display = 'block';
    selectRandomQuestions();
    displayQuestion();
}

nextQuestionBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    displayQuestion();
});

function togglePracticeStudyMode() {
    if (grammarContent.style.display === 'none') {
        hidePracticeMode();
    } else {
        showPracticeMode();
    }
}

function showPracticeMode() {
    grammarContent.style.display = 'none';
    practiceModeDiv.classList.remove('practice-mode-hidden');
    practiceModeDiv.classList.add('practice-mode-visible');
    
    practiceModeBtn.innerHTML = '<i class="fas fa-book-open"></i> Study Mode';
    practiceModeBtn.classList.add('study-mode-btn');

    selectRandomQuestions();
    restartQuiz();
}

function hidePracticeMode() {
    practiceModeDiv.classList.remove('practice-mode-visible');
    practiceModeDiv.classList.add('practice-mode-hidden');
    grammarContent.style.display = 'block';

    practiceModeBtn.innerHTML = '<i class="fas fa-ship"></i> Practice Mode';
    practiceModeBtn.classList.remove('study-mode-btn');
}

// Initialize quiz when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    practiceModeDiv.classList.add('practice-mode-hidden');
    quizResultsDiv.style.display = 'none';
});