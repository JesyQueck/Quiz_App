//initialize the DOM
const startButton = document.getElementById("start_button");
const initPage = document.querySelector(".init_page")
const questionDIv = document.querySelector(".question_page");

//Click function 
startButton.addEventListener('click', function(){
    if(initPage.style.display === 'flex' &&
         questionDIv.style.display === 'none'){
        initPage.style.display === 'none';
        questionDIv.style.display === 'flex';
    }else{
        initPage.style.display === 'flex';
    };
});