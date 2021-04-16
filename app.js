// DOM Elements
const display = document.querySelector('.display')
const operatorBtns = document.querySelectorAll('.operator')
const operandBtns = document.querySelectorAll('.operand')
const equalsBtn = document.querySelector('.equals')
const clearBtn = document.querySelector('.clear')
const signBtn = document.querySelector('.sign')
const trashBtn = document.querySelector('.trash')

// Variables
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let currentCalcResult = null;
let currentInput = '';
display.textContent = 0

// Initialized Calclator


// Basic Math Functions
function add(a,b){
    // return Math.round((a + b) * 100) / 100
    return +(a + b).toFixed(5)
}

function subtract(a,b){
    // return Math.round((a - b) * 100) / 100
    return +(a - b).toFixed(5)
}

function multiply(a,b){
    // return Math.round((a * b) * 100) / 100
    return +(a * b).toFixed(5)
}

function divide(a,b){ 
    // return Math.round((a / b) *100) / 100
    return +(a / b).toFixed(5)
}

function exponentialRounding(num, places) {
    return Number.parseFloat(num).toExponential(places)
}

// Main Operate Function - takes in 2 numbers and calls an operation on them
function operate(a,b,operation){
  switch (operation){
    case 'add':
        return add(a,b);
        break;
    case 'subtract':
        return subtract(a,b);
        break;
    case 'multiply':
        return multiply(a,b);
        break;
    case 'divide':
        return divide(a,b);
        break;
   }
}

// Operand Event Listener
operandBtns.forEach(btn =>{
        btn.addEventListener('click', handleOperandBtn)
    })

function handleOperandBtn(){
    if(currentInput.length <= 10){
        if(this.value === "."){
            if(currentInput.length === 0){
                currentInput = "0."
            } else if (currentInput.indexOf('.') === -1){
                currentInput += this.value
            }
        } else {
            currentInput += this.value
        }
    }
    display.textContent = currentInput
}

// Operator Event Listener
operatorBtns.forEach(btn =>{
    btn.addEventListener('click', handleOperatorBtn)
})

function handleOperatorBtn(){
    if(firstOperand === null && secondOperand === null && currentOperator === null){
    firstOperand = Number(currentInput);
    }
    else if((firstOperand != null && firstOperand != currentCalcResult) && currentOperator != null && currentInput.length > 0){
        performCalculation()
    }
    else if(firstOperand === currentCalcResult && currentInput.length > 0){
        performCalculation()
    }
    currentOperator = this.value
    currentInput = '';
}

// Equals Event Listener
equalsBtn.addEventListener('click', performCalculation)

function performCalculation(){
    if(firstOperand === null || currentOperator === null) return
    if(currentInput === '0' && currentOperator === 'divide'){
        display.textContent = 'lol nice try'
        return reset()
    }
    secondOperand = Number(currentInput)
    currentCalcResult = operate(firstOperand, secondOperand, currentOperator)
    display.textContent = currentCalcResult
    if(currentCalcResult.toString().length > 10){
        display.textContent = exponentialRounding(currentCalcResult, 5)
    }
    firstOperand = currentCalcResult
    secondOperand = null;
    currentInput = '';
}


clearBtn.addEventListener('click', ()=>{
    reset()
    display.textContent = 0
})

signBtn.addEventListener('click', ()=>{
    if(currentCalcResult){
        firstOperand = (firstOperand * -1)
        display.textContent = firstOperand
    } else{
    currentInput = (currentInput * -1).toString()
    display.textContent = currentInput
    }
})

trashBtn.addEventListener('click', ()=>{
    if(currentInput.length > 0){
        currentInput = currentInput.slice(0, -1)
        display.textContent = currentInput
    }
})

function reset(){
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    currentCalcResult = null;
    currentInput = '';
}

