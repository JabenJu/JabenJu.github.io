let problem = ""
let display = document.getElementById("displayBox")
function button(input){
    problem+=input
    console.log(problem)
    display.value = problem
}
function calc(){
    let result = ""+eval(problem)
    console.log(result)
    display.value = result
    //problem = result
    problem = ""
}
function clearProblem(){
    problem = ""
    display.value = problem
}
function backspace(){
    let temp = problem.split("")
    temp.pop()
    problem = temp.join("")
    display.value = problem
}