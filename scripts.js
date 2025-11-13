//initialize the DOM
document.addEventListener('DOMContentLoaded', function(){

const startButton = document.querySelector('#start_button');
const initPage = document.querySelector('.init_page')
const questionDIv = document.querySelector('.question_page');
const questionTxt = document.querySelector('.question');
const modalPopup = document.querySelector('.modal_pop-up')

console.log(questionDIv.style.display)

//Start click function 
startButton.addEventListener('click', function(){
    initPage.style.display ='none';
    questionDIv.style.display = 'block';
});

//Question Array
const generalKnowledgeQuestions = [
  {
    question: "What is the largest planet in our solar system?",
    options: ["Jupiter", "Saturn", "Mars", "Earth"],
    correctAnswerIndex: 0,
  },
  {
    question: "Which country is known as the 'Land of the Rising Sun'?",
    options: ["China", "Japan", "South Korea", "Thailand"],
    correctAnswerIndex: 1,
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Fe", "Hg"],
    correctAnswerIndex: 1,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
    correctAnswerIndex: 1,
  },
  {
    question: "What is the capital city of Canada?",
    options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    correctAnswerIndex: 2,
  },
  {
    question: "In what year did World War II end?",
    options: ["1941", "1943", "1945", "1950"],
    correctAnswerIndex: 2,
  },
  {
    question: "Which famous document begins with the words 'We the People'?",
    options: ["The Declaration of Independence", "The Magna Carta", "The U.S. Constitution", "The Bill of Rights"],
    correctAnswerIndex: 2,
  },
  {
    question: "How many hearts does an octopus have?",
    options: ["One", "Two", "Three", "Four"],
    correctAnswerIndex: 2,
  },
  {
    question: "What is the longest river in the world?",
    options: ["Amazon River", "Yangtze River", "Nile River", "Mississippi River"],
    correctAnswerIndex: 2,
  },
  {
    question: "The process by which plants convert sunlight into energy is called:",
    options: ["Respiration", "Oxidation", "Photosynthesis", "Fermentation"],
    correctAnswerIndex: 2,
  },
  {
    question: "What is the official currency of Japan?",
    options: ["Yuan", "Won", "Yen", "Rupee"],
    correctAnswerIndex: 2,
  },
  {
    question: "What is the smallest continent by land area?",
    options: ["Europe", "Antarctica", "Australia", "South America"],
    correctAnswerIndex: 2,
  },
  {
    question: "Which of the following is NOT a gas giant in our solar system?",
    options: ["Jupiter", "Saturn", "Mars", "Uranus"],
    correctAnswerIndex: 2,
  },
  {
    question: "What is the largest desert in the world?",
    options: ["Gobi Desert", "Kalahari Desert", "Sahara Desert", "Arabian Desert"],
    correctAnswerIndex: 2,
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Quartz", "Topaz", "Diamond", "Corundum"],
    correctAnswerIndex: 2,
  },
  {
    question: "Which organ in the human body is responsible for pumping blood?",
    options: ["Lungs", "Brain", "Heart", "Liver"],
    correctAnswerIndex: 2,
  },
  {
    question: "In what city are the Spanish Steps located?",
    options: ["Madrid", "Paris", "Rome", "Athens"],
    correctAnswerIndex: 2,
  },
  {
    question: "Which country has the largest population (as of 2024)?",
    options: ["China", "India", "United States", "Indonesia"],
    correctAnswerIndex: 1,
  },
  {
    question: "Who is known as the 'Father of Physics'?",
    options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
    correctAnswerIndex: 1,
  },
  {
    question: "What is the main ingredient in the Greek dip Taramasalata?",
    options: ["Chickpeas", "Smoked cod roe", "Yogurt", "Aubergine"],
    correctAnswerIndex: 1,
  },
];

// Create a pool array where random questions will be retrieved
let availableQuestion = [generalKnowledgeQuestions];

//function to check for completed 
function loadQuestion(){
    if(availableQuestion.length === 0){
        questionDIv.style.display = 'none'   
        modalPopup.style.display = 'flex'
    } return null;
}  
//Rndomize question number  
const randonIndex = math.floor(math.random * availableQuestion.length)
const selectedQuestion = availableQuestion.splice(randonIndex, 1)[0];

if(questionTxt){
    questionTxt.textContent = selectedQuestion.question
}return selectedQuestion

});

