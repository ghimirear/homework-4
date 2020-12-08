//getting all html content 
console.log("is app connecting");
var mainContainer = document.getElementById('container');
var startButton = document.getElementById('start-btn');
var controls = document. getElementById('controls')
var nextButton = document.getElementById('next-btn');
var questionContainer = document.getElementById('question-container');
var currentQuestionIndex, shuffledQuestion;
var questionElement = document.getElementById('question');
var answerContent = document.getElementById('answer')
var instructions = document.getElementById('instruction');
var submitButton = document.getElementById('submit');
var timeRemaining = document.getElementById('timer');
var timerDiv = document.getElementById('timer-div')

//setting up games variables.
var score = 0;
var currentQuestionIndex = 0;
var timer = 10;
var players = [];
var allPlayers = [];
// creating form and labels for user inputs.
var form = document.createElement('form');
var label = document.createElement('label');
var input = document.createElement('input');
var line = document.createElement('line');
label.textContent = 'Name: ';

//adding eventlistner to the buttons
startButton.addEventListener('click', startGame)
submitButton.addEventListener('click', submitAnswer);



// function to start the game
function startGame() {
    timerDiv.classList.remove('hide')
    instructions.classList.add('hide')
    console.log("started");
    startButton.classList.add('hide')
    questionContainer.classList.remove('hide')
//creating the function to randomly select the questions.
    shuffledQuestion = questions.sort(() => Math.random() - 0.5)
//ading audio to the start button
    var audio = new Audio();
    audio.src = "sounds/poop.wav";
    audio.play();
    setNextQuestion()
    setTimeout()
}
//setting up timer function to the game


function setTimeout(){
var timeInterval = setInterval(myTime, 1000);
    function myTime(){
        timer--;
        timeRemaining.textContent = timer;
            if ( timer <= 0 || currentQuestionIndex ==  questions.length ){
                clearInterval(timeInterval);
                timeRemaining.textContent = 0;
                endgame();
            }
    }
}


function endgame(){
    $(questionContainer).empty();
    questionContainer.innerText = "you got " + score + " out of " + questions.length + " please enter your: "
    submitButton.classList.remove('hide')
    questionContainer.appendChild(form)
    form.appendChild(label);
    form.appendChild(line);
    form.appendChild(input);

}
//set next questiion function
function setNextQuestion(){
    if(currentQuestionIndex ==  questions.length || timer == 0)
        {   answerContent.classList.add('hide')
            submitButton.classList.remove('hide')
            return false;

            }
            resetStatus();

 showQuestion(shuffledQuestion[currentQuestionIndex])
}
//showQuestion function to set the questions for display.
function showQuestion(question){
    questionElement.innerText = question.question
 //console.log(question.answers);
 //creating button to each answer elemnt and giving class of 'answer-btn'
    question.answers.forEach(answers => {
        var button = document.createElement('button')   
        button.innerText = answers.text 
        answerContent.appendChild(button)
        button.classList.add('answer-btn')
        correct = question.correct;
        // adding eventListneer to the created answer button
        button.addEventListener('click', selectAnswer)
    });
 
}
// function resetStatus to clear the answer-buttons to make space for next question answers. 
function resetStatus(){
    //nextButton.classList.add('hide')
    while(answerContent.firstChild){
        answerContent.removeChild(answerContent.firstChild);
    }
}


//selectAnswer function to identify the correct answer. and it will call the another function setNextQuestion
function selectAnswer(e){
    var answerAudio = new Audio();
    answerAudio.src = "sounds/poop1.wav";
    answerAudio.play();
    var selectedButtonTextContent = e.target.textContent;
    //if statement to check the naswer.
  if(selectedButtonTextContent===correct){
        score++
        console.log(score);
    }  
        currentQuestionIndex++;
        setNextQuestion();
}



function submitAnswer(e){
    e.preventDefault();
    //creating varible as a object to push and get back from json.
        var player = {
            playe: input.value,
            playerScore: score,
        } 
            if (player.playe == ''|| player.playe == null) {
                alert ("your name is required")  
            }
                else{
                     players.push(player);
                        showHighScore();   
                } 
     //creating an list to show scores
     var list = document.createElement('li');
     list.style.listStyle = "none";
     list.innerText =  "player " + player.playe + " =  " + player.playerScore;
     mainContainer.appendChild(list); 
                    
}
function showHighScore(){
    submitButton.classList.add("hide");
    questionContainer.classList.add('hide');
    answerContent.classList.add('hide');
    mainContainer.textContent = ' Scores are: '
}



//seting game questions. questions array containing question, answers and correct answer object.
var questions = [
    {
    question: 'database are useful only when they are....',
    answers: [
            { text: 'random', },
            { text: 'reliable',},
            { text: 'authentic',},
            { text: 'unchangeable',}, 
            ],
    correct:'reliable',
    },
    {
    question: 'HTML stands for....',
    answers: [
            {text: 'Hyper Marking Text Language',},
            {text: 'Hyper Text Markup  Language',},
            {text: 'Hyper Markup Text Length',},
            {text: 'Hyper Markup Texting Language',},
            ],
    correct: 'Hyper Text Markup  Language',
    },
    {
    question: 'CSS stands for....',
    answers: [
            {text: 'Cascading Style Sheet', },
            {text: 'Cascading Style structure', },
            {text: 'Cascade Sheet Style', },
            {text: 'Class Style Sheet',},
            ],
    correct: 'Cascading Style Sheet',
    }
]