let tabQuestions = ["Combien de choix sont proposer, quand tsun demande qui on est? ", "Comment s'écrit le cri du 'Déferlement'  ? ", "Comment s'appelle le bras droit de Delphine?", "Combien d'artefacts Daedra peut-on avoir ?"]
let question = document.querySelector("#question")
let score = document.querySelector("#score")
let choice = document.querySelectorAll(".choice")
let tabImg = ["assets/img/soven.jpg","assets/img/sky.jpeg","assets/img/mur.jpg","assets/img/daedra.jpg","assets/img/fin.jpg"]
let tabChoices = [
    ["2", "8", "5", "4"],
    ["fus-roh-da","fus-ro-dah","déf-erle-ment","fus-roh-dah"],
    ["Esbern","Ralof","Hadvar","Talos"],
    ["11","19","16","13"],
]
let goodAnswer = [tabChoices[0][2], tabChoices[1][3], tabChoices[2][0], tabChoices[3][1]]
let round = 0;
let scoreNumber = 0;
let rand = 0
let randArray = []
let music = new Audio("assets/audio/musiqueskyrim.mp3")
let isMusicPlaying = false
let time = 30

function playSound(){
    if (isMusicPlaying == false) {
        document.querySelector("#son").innerHTML = '<img src="assets/img/son-on.png" alt="">'
        music.play() 
        isMusicPlaying = true
    }else{
        document.querySelector("#son").innerHTML = ' <img src="assets/img/son-off.png" alt=""></img>'
        music.pause()
        isMusicPlaying = false
    }
}

function displayQuestion() { 
    while (randArray.indexOf(rand) != -1) {
        rand = aleatoire(0, tabQuestions.length - 1)
    }
        document.querySelector('body').style.backgroundImage = "url("+tabImg[rand]+")"
        randArray.push(rand)
        question.innerText = tabQuestions[rand]
}

function displayChoice() {
    for (let i = 0; i < choice.length; i++) {
        choice[i].innerText = tabChoices[rand][i]
    }
}

function checkedAnswer(element) {
    if (element.innerText == goodAnswer[rand]) {
        scoreQuiz()
    }
    nextQuestion()
}

function nextQuestion() {
    time = 30
    displayTIme(time)
    round++
    if (round >= tabQuestions.length) {
        question.innerText = "le quizz est fini"
        document.querySelector('body').style.backgroundImage = 'url("assets/img/fin.jpg")'
    } else {
        displayQuestion()
        displayChoice()
    }
}

function scoreQuiz() {
    scoreNumber++
    score.innerText = "ton score est de : " + scoreNumber
    document.querySelector('#score').style.backgroundColor = " rgb(36, 36, 36)"
}

function displayTIme(rebour) {
    document.querySelector("#chrono").innerText = rebour
}

function updateTime() {
    if (time > 0) {
        setTimeout(function () {
            time--
            displayTIme(time)
            updateTime()
            if (time <= 5 && round <=4) {
                document.getElementById("chrono").style.color = "red";
            } else if (time > 5 && round <=4) {
                document.getElementById("chrono").style.color = "white";
            }
        }, 1000)
        if (round >= 4) {
            document.querySelector("#fini").innerHTML = ""
            document.querySelector("#fin").innerHTML = ""
        }
    } 
    else  {  
         nextQuestion()
        updateTime()  
    }          
}

function aleatoire(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

displayQuestion()
displayChoice()
displayTIme(time)
updateTime()

