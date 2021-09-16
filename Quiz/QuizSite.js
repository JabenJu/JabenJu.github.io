// set counters
let quizCount = 0;
let questionCount = 10;
let correctScore = 0;
// get all q&a elements from page
let question = document.body.getElementsByTagName("p")[1];
let answer_1 = document.getElementById("answer_1");
let answer_2 = document.getElementById("answer_2");
let answer_3 = document.getElementById("answer_3");
let answer_4 = document.getElementById("answer_4");
let result = document.getElementById("result")

// hide the result
result.style.visibility = "hidden"

let radio = document.querySelectorAll("input[type='radio']");
let score = document.getElementById("score");
let questionNum = document.getElementById("remaining");
let radioValue;
let correct = document.getElementById("result")

// Jaben Jury 9/16/2021. Declare audio to be used in checkCorrect
var goodJob = new Audio('ding.mp3');
var badJob = new Audio('fail.mp3')
//

var quizData = [
    {
        question: "What year was Javascript created?",
        a: "2003",
        b: "1995",
        c: "2001",
        d: "1987",
        correct: "b"
    },
    {
        question: "Which popular company designed the first CPU?",
        a: "Apple Inc",
        b: "Arm Ltd",
        c: "Intel Corp",
        d: "AMD",
        correct: "c"
    },
    {
        question: "What was the first computer system that used color display?",
        a: "IBM 5150",
        b: "Apple I",
        c: "Altair 8800",
        d: "The Kenbak-I",
        correct: "b"
    },
    {
        question: "How many bits make a byte?",
        a: "16 bits",
        b: "24 bits",
        c: "8 bits",
        d: "12 bits",
        correct: "c"
    },
    {
        question: "Mozilla Firefox originally launched under what name?",
        a: "Mozilla Phoenix",
        b: "Mozilla Red Panda",
        c: "Mozilla Firefly",
        d: "Mozilla Firebird",
        correct: "a"
    },
    {
        question: "Which company invented the hard disk drive?",
        a: "Xerox",
        b: "Hitachi",
        c: "Microsoft",
        d: "IBM",
        correct: "d"
    },
    {
        question: "Which one is the first web browser invented in 1990?",
        a: "Internet Explorer",
        b: "Mosaic",
        c: "Mozilla",
        d: "Nexus",
        correct: "d"
    },
    {
        question: "Which one programming language is exclusively used for artificial intelligence?",
        a: "C",
        b: "Java",
        c: "J2EE",
        d: "Prolog",
        correct: "d"
    },
    {
        question: "What is firewall in computers used for?",
        a: "Security",
        b: "Data Transmission",
        c: "Authentication",
        d: "Monitoring",
        correct: "a"
    },
    {
        question: "Which of the following is not a database management software?",
        a: "MySQL",
        b: "Oracle",
        c: "Sybase",
        d: "COBOL",
        correct: "d"
    },
]



startQuiz()

// start quiz
function startQuiz(){
let currentQuiz = quizData[quizCount]
// populate quiz form
question.innerHTML = currentQuiz.question
answer_1.innerHTML = currentQuiz.a
answer_2.innerHTML = currentQuiz.b
answer_3.innerHTML = currentQuiz.c
answer_4.innerHTML = currentQuiz.d

score.innerHTML = correctScore + "/10"

questionNum.innerHTML = questionCount
}

// submit
document.getElementById("submit").addEventListener("click", () => {
    --questionCount
    if(questionCount > 0){ // check if theres more questions
        checkCorrect()
        ++quizCount
        uncheckBtn() // refresh radio btns

        startQuiz()
    } else if(questionCount == 0){ // if all questions answered
        checkCorrect()
        questionNum.innerHTML = questionCount
        window.alert(`The Quiz has ended! You answered ${correctScore}/10 questions correctly.`)
    }
})

function uncheckBtn(){
    for(let r of radio){
        if(r.checked){
            r.checked = null;
        }
    }
}

function checkCorrect(){
    for(let r of radio){
        if(r.checked){ //compare btn to correct answer
            if(r.id == quizData[quizCount].correct){
                result.innerHTML = "Correct!"
                result.style.visibility = "visible"
                result.style.color = "rgb(172, 255, 47)"
                result.style.textShadow = "0 0 15px rgb(152, 226, 42), 0 0 30px rgb(152, 226, 42), 0 0 50px rgb(152, 226, 42)"
                    setTimeout(function(){
                        result.style.visibility = "hidden"
                    }, 1000)
                correctScore++
                goodJob.play()
            } else {
                result.innerHTML = "Wrong!"
                result.style.visibility = "visible"
                result.style.color = "rgb(177, 21, 7)"
                result.style.textShadow = "0 0 15px rgb(194, 24, 7), 0 0 30px rgb(194, 24, 7), 0 0 50px rgb(194, 24, 7)"
                    setTimeout(function(){
                        result.style.visibility = "hidden"
                    }, 1000)
                badJob.play()
            }
        }
    }
}
