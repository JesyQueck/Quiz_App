document.addEventListener('DOMContentLoaded', function () {
  // --- DOM Elements ---
  const startButton = document.querySelector('#start_button');
  const initPage = document.querySelector('.init_page');
  const questionDiv = document.querySelector('.question_page'); // Fixed typo: DIv → Div
  const questionTxt = document.querySelector('.question');
  const modalPopup = document.querySelector('.modal_pop-up');
  const optionInputs = document.querySelectorAll(
    '.options input[type="radio"]'
  );
  const optionLabels = document.querySelectorAll('.options .label');
  const totalQuestion = document.querySelector('#total_question');
  const currentQuestion = document.querySelector('#current_question');
  const nextBtn = document.querySelector('.next');
  const secTimer = document.querySelector('.sec');
  const scoreTxt = document.querySelector('.scoreId');
  const percentTxt = document.querySelector('.percentId');
  const restartBtn = document.querySelector('.restart_btn');
  const highScore = document.querySelector('.high-score');

  // --- Quiz Data ---
  const generalKnowledgeQuestions = [
    {
      question: 'What is the largest planet in our solar system?',
      options: ['Jupiter', 'Saturn', 'Mars', 'Earth'],
      correctAnswerIndex: 0,
    },
    {
      question: "Which country is known as the 'Land of the Rising Sun'?",
      options: ['China', 'Japan', 'South Korea', 'Thailand'],
      correctAnswerIndex: 1,
    },
    {
      question: 'What is the chemical symbol for gold?',
      options: ['Ag', 'Au', 'Fe', 'Hg'],
      correctAnswerIndex: 1,
    },
    {
      question: 'Who painted the Mona Lisa?',
      options: [
        'Vincent van Gogh',
        'Leonardo da Vinci',
        'Pablo Picasso',
        'Claude Monet',
      ],
      correctAnswerIndex: 1,
    },
    {
      question: 'What is the capital city of Canada?',
      options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'],
      correctAnswerIndex: 2,
    },
    {
      question: 'In what year did World War II end?',
      options: ['1941', '1943', '1945', '1950'],
      correctAnswerIndex: 2,
    },
    {
      question: "Which famous document begins with the words 'We the People'?",
      options: [
        'The Declaration of Independence',
        'The Magna Carta',
        'The U.S. Constitution',
        'The Bill of Rights',
      ],
      correctAnswerIndex: 2,
    },
    {
      question: 'How many hearts does an octopus have?',
      options: ['One', 'Two', 'Three', 'Four'],
      correctAnswerIndex: 2,
    },
    {
      question: 'What is the longest river in the world?',
      options: [
        'Amazon River',
        'Yangtze River',
        'Nile River',
        'Mississippi River',
      ],
      correctAnswerIndex: 2,
    },
    {
      question:
        'The process by which plants convert sunlight into energy is called:',
      options: ['Respiration', 'Oxidation', 'Photosynthesis', 'Fermentation'],
      correctAnswerIndex: 2,
    },
    {
      question: 'What is the official currency of Japan?',
      options: ['Yuan', 'Won', 'Yen', 'Rupee'],
      correctAnswerIndex: 2,
    },
    {
      question: 'What is the smallest continent by land area?',
      options: ['Europe', 'Antarctica', 'Australia', 'South America'],
      correctAnswerIndex: 2,
    },
    {
      question:
        'Which of the following is NOT a gas giant in our solar system?',
      options: ['Jupiter', 'Saturn', 'Mars', 'Uranus'],
      correctAnswerIndex: 2,
    },
    {
      question: 'What is the largest desert in the world?',
      options: [
        'Gobi Desert',
        'Kalahari Desert',
        'Sahara Desert',
        'Arabian Desert',
      ],
      correctAnswerIndex: 2,
    },
    {
      question: 'What is the hardest natural substance on Earth?',
      options: ['Quartz', 'Topaz', 'Diamond', 'Corundum'],
      correctAnswerIndex: 2,
    },
    {
      question:
        'Which organ in the human body is responsible for pumping blood?',
      options: ['Lungs', 'Brain', 'Heart', 'Liver'],
      correctAnswerIndex: 2,
    },
    {
      question: 'In what city are the Spanish Steps located?',
      options: ['Madrid', 'Paris', 'Rome', 'Athens'],
      correctAnswerIndex: 2,
    },
    {
      question: 'Which country has the largest population (as of 2024)?',
      options: ['China', 'India', 'United States', 'Indonesia'],
      correctAnswerIndex: 1,
    },
    {
      question: "Who is known as the 'Father of Physics'?",
      options: [
        'Albert Einstein',
        'Isaac Newton',
        'Galileo Galilei',
        'Nikola Tesla',
      ],
      correctAnswerIndex: 1,
    },
    {
      question: 'What is the main ingredient in the Greek dip Taramasalata?',
      options: ['Chickpeas', 'Smoked cod roe', 'Yogurt', 'Aubergine'],
      correctAnswerIndex: 1,
    },
  ];

  let availableQuestions = [...generalKnowledgeQuestions];
  const totalQuestions = generalKnowledgeQuestions.length;
  totalQuestion.textContent = totalQuestions;

  let score = 0;
  let history = [];
  let selectedQuestion;
  let timerIntervalId;

  // --- High Score ---
  let highScoreValue = parseInt(localStorage.getItem('highScore')) || 0;
  highScore.textContent = highScoreValue;
  if (highScore > highScoreValue) {
    alert('Congratulations you achieved a new high score');
  }

  function updateHighScore() {
    if (score > highScoreValue) {
      highScoreValue = score;
      localStorage.setItem('highScore', highScoreValue);
      highScore.textContent = highScoreValue;
    }
  }

  // --- Start Quiz ---
  startButton.addEventListener('click', () => {
    initPage.style.display = 'none';
    questionDiv.style.display = 'block';
    currentQuestion.textContent = '1';
    loadQuestion();
    startTimer();
  });

  // --- Load Question ---
  function loadQuestion() {
    if (availableQuestions.length === 0) {
      questionDiv.style.display = 'none';
      modalPopup.style.display = 'flex';
      clearInterval(timerIntervalId);
      updateHighScore();
      return;
    }

    // Reset radio buttons
    optionInputs.forEach((input) => (input.checked = false));

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    selectedQuestion = availableQuestions.splice(randomIndex, 1)[0];
    history.push(selectedQuestion);

    currentQuestion.textContent = history.length;
    questionTxt.textContent = selectedQuestion.question;

    selectedQuestion.options.forEach((option, index) => {
      optionInputs[index].value = index;
      optionLabels[index].textContent = option;
    });
  }

  // --- Timer ---
  function startTimer() {
    clearInterval(timerIntervalId);
    let timeLeft = 10;
    secTimer.textContent = timeLeft;

    timerIntervalId = setInterval(() => {
      timeLeft--;
      secTimer.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timerIntervalId);
        checkAnswer(); // Treat as no answer
        nextQuestion();
      }
    }, 1000);
  }

  // --- Check Answer ---
  function checkAnswer() {
    const selected = document.querySelector('input[name="option"]:checked');
    const userAnswer = selected ? parseInt(selected.value) : null;

    if (userAnswer === selectedQuestion.correctAnswerIndex) {
      score++;
      scoreTxt.textContent = score;
      percentTxt.textContent = `${Math.round((score / totalQuestions) * 100)}%`;
    }
  }

  // --- Go to Next Question ---
  function nextQuestion() {
    clearInterval(timerIntervalId);

    if (availableQuestions.length > 0) {
      loadQuestion();
      startTimer();
    } else {
      questionDiv.style.display = 'none';
      modalPopup.style.display = 'flex';
      updateHighScore();
    }
  }

  nextBtn.addEventListener('click', () => {
    checkAnswer();
    nextQuestion();
  });

  // --- Restart Quiz ---
  restartBtn.addEventListener('click', () => {
    availableQuestions = [...generalKnowledgeQuestions];
    score = 0;
    history = [];
    scoreTxt.textContent = '0';
    percentTxt.textContent = '0%';
    modalPopup.style.display = 'none';
    questionDiv.style.display = 'block';
    currentQuestion.textContent = '1';

    loadQuestion();
    startTimer();
  });
});
