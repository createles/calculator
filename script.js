let number1;
let number2;
let op;
let displayValue = 0;


function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x/y;
}


function operate(number1, number2, op) {
    switch(op) {
        case "+":
            return add(number1, number2);
        case "-":
            return subtract(number1, number2);
        case "*":
            return multiply(number1, number2);
        case "/":
            return divide(number1, number2);
        default:
            console.log("No operator provided.")
    }
}

// selects the display element and sets it's value to the base value of 0
const display = document.querySelector("#display");
display.textContent = displayValue;

// updates the display with the appropriate values based on the button pressed
let inputButtons = document.querySelectorAll(".numbButton");
inputButtons.forEach(button => {
    button.addEventListener("click", () => {
        // NOTE: comparison must be with "0" as .textContent is always of type STRING
        if (display.textContent === "0") {
            display.textContent = button.textContent;
            displayValue = Number(button.textContent);
        } else {
            display.textContent += button.textContent;
            displayValue = Number(display.textContent);
        }
    })
})

let operators = document.querySelectorAll(".operator");
operators.forEach(button => {
    button.addEventListener("click", () => {
        if (!op) {
            op = button.textContent;
            number1 = Number(display.textContent);
            display.textContent = number1 + op;
        } else {
            op = button.textContent;
            number1 = Number(display.textContent.slice(0, display.textContent.length - 1));
            display.textContent = number1 + op;
        }
    })
})

let calculate = document.querySelector("#equals");
calculate.addEventListener("click", () => {
    let arr = display.textContent.split(op);
    number2 = Number(arr[1]);
    display.textContent = operate(number1, number2, op);
    op = undefined;
})

// clears all variables and display
let clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    number1 = undefined;
    number2 = undefined;
    op = undefined;
    display.textContent = 0;
})
// allows deletion of one digit at a time
let backspace = document.querySelector("#backspace");
backspace.addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
    // allows for display to revert back to 0 when all digits are deleted
    if (display.textContent === "") {
        display.textContent = 0;
    }
})