// DOM Elements
const display = document.querySelector('.display')
const operatorBtns = document.querySelectorAll('.operator')
const operandBtns = document.querySelectorAll('.operand')
const equalsBtn = document.querySelector('.equals')
const clearBtn = document.querySelector('.clear')

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
        console.log(`(from handleOperatorBtn() 1st else if) Before Calculation: currentCalcResult = ${currentCalcResult}. firstOperand = ${firstOperand}. secondOperand = ${secondOperand}. currentOperator = ${currentOperator}`)
        performCalculation()
    }
    else if(firstOperand === currentCalcResult && currentInput.length > 0){
        console.log(`(from handleOperatorBtn() 2nd else if) Before Calculation: currentCalcResult = ${currentCalcResult}. firstOperand = ${firstOperand}. secondOperand = ${secondOperand}. currentOperator = ${currentOperator}`)
        performCalculation()
    }
    currentOperator = this.value
    currentInput = '';
    console.log(firstOperand, currentInput, currentOperator)
}

// Equals Event Listener
equalsBtn.addEventListener('click', performCalculation)

function performCalculation(){
    if(firstOperand === null || currentOperator === null) return
    secondOperand = Number(currentInput)
    console.log(`(from performCalculation) Before Calculation: currentCalcResult = ${currentCalcResult}. firstOperand = ${firstOperand}. secondOperand = ${secondOperand}. currentOperator = ${currentOperator}`)
    currentCalcResult = operate(firstOperand, secondOperand, currentOperator)
    display.textContent = currentCalcResult
    if(currentCalcResult.toString().length > 10){
        display.textContent = exponentialRounding(currentCalcResult, 5)
    }
    firstOperand = currentCalcResult
    secondOperand = null;
    currentInput = '';
    console.log(`(from performCalculation) After Calculation: currentCalcResult = ${currentCalcResult}. firstOperand = ${firstOperand}. secondOperand = ${secondOperand}. currentOperator = ${currentOperator}`)
}


clearBtn.addEventListener('click', ()=>{
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    currentCalcResult = null;
    currentInput = '';
    display.textContent = 0
})