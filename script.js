let number1;
let number2;
let op;
let displayValue = 0;
let operations = ["+", "-", "*", "/"];


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
        if (display.textContent === "0" || display.textContent === "Cannot divide by 0.") {
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
        // Checks if equation already has prior operator included
        if (!(display.textContent.slice(0, -1).split("").find(element => operations.includes(element)))) {
            if (!op) {
                op = button.textContent;
                // If display shows 0 and negative sign is pressed, allows input of negative number as first number
                if (display.textContent === "0" && op === "-") {
                    display.textContent = "-";
                } else {
                    number1 = Number(display.textContent);
                    display.textContent = number1 + op;
                }
            // If the last element of the display is an operator and a new operator is pressed, replace with the new operator
            } else {
                op = button.textContent;
                number1 = Number(display.textContent.slice(0, display.textContent.length - 1));
                display.textContent = number1 + op;
            }
            // Checks if first number is a negative; allows for operations with negative first numbers
        } else if ((display.textContent.slice(0))[0] === "-") {
            op = button.textContent;
            number1 = Number(display.textContent);
            display.textContent = number1 + op;
            // If equation already has a prior operator and a second number after it
        } else {
            let arr = display.textContent.split(op);
            number2 = Number(arr[1]);
            let prevResult = operate(number1, number2, op);
            op = button.textContent;
            display.textContent = prevResult + op;
            number1 = prevResult;
        }
    })
})

let calculate = document.querySelector("#equals");
calculate.addEventListener("click", () => {
    // *NOTE*: The condition here explicitly checks if number1 exists and IS NOT undefined. If number1 = 0, it is evaluated as falsy by Javascript.
    if (number1 !== undefined && op && !operations.includes(display.textContent[display.textContent.length - 1])) {
        let arr = display.textContent.split(op);
        number2 = Number(arr[1]);
        if (number2 === 0 && op === "/") {
            let errorMsg = "Cannot divide by 0."
            display.textContent = errorMsg;
            number1 = undefined;
            number2 = undefined;
            op = undefined;
            console.log(number1);
            console.log(number2);
            console.log(op);
        } else {
        display.textContent = operate(number1, number2, op);
        op = undefined;
        }
    }
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

let decimal = document.querySelector("#dot");
decimal.addEventListener("click", () => {
    if (!display.textContent.includes(".")) {
    display.textContent += ".";
    }
})