// Initialize the DOM
document.addEventListener('DOMContentLoaded', function () {
  // --- DOM Element Selection ---
  // Select key elements from the HTML for interaction
  const startButton = document.querySelector('#start_button');
  const initPage = document.querySelector('.init_page');
  const questionDIv = document.querySelector('.question_page');
  const questionTxt = document.querySelector('.question');
  const modalPopup = document.querySelector('.modal_pop-up');
  const optionInput = document.querySelectorAll('.options input[type="radio"]');
  const optionLabels = document.querySelectorAll('.options .label');
  const totalQuestion = document.querySelector('#total_question');
  const currentQuestion = document.querySelector('#current_question');
  const nextBtn = document.querySelector('.next');
  const secTimer = document.querySelector('.sec');
  const scoreTxt = document.querySelector('.scoreId');
  const percentTxt = document.querySelector('.percentId');
  const restartBtn = document.querySelector('.restart_btn');

  let selectedQuestion;
  let currentQuestionObject = 0;
  let selectedAnswer;
  let userAnswer;

  // Array containing all general knowledge questions, options, and the correct answer index
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

  let availableQuestion = [...generalKnowledgeQuestions];
  // Total questions
  const totalQuestions = generalKnowledgeQuestions.length;
  totalQuestion.textContent = totalQuestions;

  //initialize score
  let score = 0;
  let history = [];
  // Create a pool array where random questions will be retrieved
  // using the spread operator to open the copied array

  // Start click function
  startButton.addEventListener('click', function () {
    initPage.style.display = 'none';
    questionDIv.style.display = 'block';

    currentQuestion.textContent = 0;

    loadQuestion(); // Load the first question
    startTimer();
  });

  // Selects a random question, displays it, and removes it from the pool
  function loadQuestion() {
    // Check if all questions have been used
    if (availableQuestion.length === 0) {
      // If the quiz is complete, display the modal and exit the function
      if (questionDIv && modalPopup) {
        questionDIv.style.display = 'none';
        modalPopup.style.display = 'flex';
      }
      return null; // Return null to indicate no question was loaded
    }

    // Reset radio: Uncheck all radio buttons before loading the new question
    optionInput.forEach((input) => (input.checked = false));

    // Rndomize question selection: Pick a random index from the available questions
    const randomIndex = Math.floor(Math.random() * availableQuestion.length);
    // Select the question at the random index and remove it from the available pool
    selectedQuestion = availableQuestion.splice(randomIndex, 1)[0];

    history.push(selectedQuestion);
    currentQuestionObject = selectedQuestion;
    if (currentQuestionObject) {
      currentQuestion.textContent = history.length;
    }

    // Get the question from array and display it in the designated element
    if (questionTxt) {
      questionTxt.textContent = selectedQuestion.question;
    }

    // Option integration: Loop through the options and update the radio button values and labels
    const optionArray = selectedQuestion.options;
    optionArray.forEach((optionsList, index) => {
      if (optionInput[index] && optionLabels[index]) {
        // Set the radio input's value to its index (useful for answer checking later)
        optionInput[index].value = index;
        // Set the label text to the actual option text
        optionLabels[index].textContent = optionsList;
      }
    });
    return selectedQuestion; // Return the question object that was loaded
  }

  //initialize score
  score = 0;
  //initialize timer
  let timerIntervalId;

  function startTimer() {
    //clear running interval
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
    }

    let countDownTimer = 10;
    if (secTimer) {
      secTimer.textContent = countDownTimer;
    }

    timerIntervalId = setInterval(() => {
      countDownTimer--;

      secTimer.textContent = countDownTimer;

      if (countDownTimer <= 0) {
        clearInterval(timerIntervalId);

        loadQuestion();

        startTimer();
      }
    }, 1000);
  }

  //check answer
  function checkAnswer() {
    const selectedAnswer = document.querySelector(
      'input[name = "option"]:checked'
    );
    if (selectedAnswer) {
      userAnswer = parseInt(selectedAnswer.value);
    } else {
      userAnswer = null;
      return null;
    }

    const correctAnswer = selectedQuestion.correctAnswerIndex;

    if (userAnswer === correctAnswer) {
      score++;
      scoreTxt.textContent = score;

      percentTxt.textContent = `${((score / totalQuestions) * 100).toFixed(
        1
      )}%`;
    }
    return userAnswer;
  }
  nextBtn.addEventListener('click', function () {
    const answerResult = checkAnswer();

    clearInterval(timerIntervalId);
    startTimer();
    loadQuestion();
  });
  restartBtn.addEventListener('click', function () {
    availableQuestion = [...generalKnowledgeQuestions];
    score = 0;
    history = [];
    scoreTxt.textContent = '0';
    percentTxt.textContent = '0.0%';
    modalPopup.style.display = 'none';
    questionDIv.style.display = 'block';
    currentQuestion.textContent = '0';
    loadQuestion();
    startTimer();
  });
  console.log(restartBtn);
});
