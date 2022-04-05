const display = document.getElementById('display')
const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')

var operandOne = ''
var operandTwo = ''
var op = ''
var calculated = false

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => appendOperator(button.textContent))
)

function appendNumber(number) {
    if (calculated === true) return
    if (display.textContent === '0' && number !== '0') {
        reset()
    }

    if (op === '') operandOne += number
    if (op !== '') operandTwo += number

    display.textContent += number
}

function appendOperator(operator) { 
    if (operandOne === '') operandOne = 0
    // if (operandOne === '') operandOne = display.textContent
    // if (operandOne !== '' && op !== '') operandTwo = display.textContent.substring(display.textContent.indexOf(op) + 1)
    if (operandOne !== '' && operandTwo !== '' && op !== '') calculateDisplay()
    if (op !== '' && operandTwo === '') display.textContent = display.textContent.substring(0, display.textContent.length - 1)
    op = operator
    display.textContent += operator
    calculated = false
}

function reset() {
    display.textContent = ''
}

function calculateDisplay() {
    display.textContent = applyOperator()
    operandOne = display.textContent
    operandTwo = ''
    op = ''
    calculated = true
}

function applyOperator() {
    switch (op) {
        case '÷': return Math.round((+operandOne / +operandTwo) * 100) / 100
        case 'x': return Math.round((+operandOne * +operandTwo) * 100) / 100
        case '-': return Math.round((+operandOne - +operandTwo) * 100) / 100
        case '+': return Math.round((+operandOne + +operandTwo) * 100) / 100
    }
}

document.querySelector('[data-equal]').addEventListener('click', function() {
    if (operandOne !== '' && operandTwo !== '' && op !== '') calculateDisplay()
})

document.querySelector('[data-clear]').addEventListener('click', function() {
    display.textContent = '0'
    operandOne = ''
    operandTwo = ''
    op = ''
    calculated = false
})

document.querySelector('[data-delete]').addEventListener('click', function() {
    if (operandOne !== '' && op === '') {
        display.textContent = display.textContent.slice(0, -1)
        operandOne = operandOne.slice(0, -1)
        calculated = false
    }
    if (operandOne !== '' && op !== '' && operandTwo !== '') {
        display.textContent = display.textContent.slice(0, -1)
        operandTwo = operandTwo.slice(0, -1)
    }
})

document.querySelector('[data-period]').addEventListener('click', function() {
    if (operandOne !== '' && op === '' && !operandOne.includes('.') && calculated === false) {
        display.textContent += '.'
        operandOne += '.'
    }
    if (operandOne !== '' && op !== '' && operandTwo !== '' && !operandTwo.includes('.')) {
        display.textContent += '.'
        operandTwo += '.'
    }
})