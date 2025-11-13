//initialize the DOM
document.addEventListener('DOMContentLoaded', function(){

const startButton = document.querySelector('#start_button');
const initPage = document.querySelector('.init_page')
const questionDIv = document.querySelector('.question_page');

console.log(questionDIv.style.display)

//Click function 
startButton.addEventListener('click', function(){
    initPage.style.display ='none';
    questionDIv.style.display = 'block';
});
});if(initPage.style.display == 'flex' &&
         questionDIv.style.display == 'none'){
        initPage.style.display == 'none';
        questionDIv.style.display == 'flex';
    }else{
        initPage.style.display == 'flex';
    };