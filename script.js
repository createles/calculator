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
        console.log("Button clicked:", button);
        console.log("Button value:", button.textContent);
        console.log("Display value:", display.textContent);

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
        op = button.textContent;
        number1 = Number(display.textContent);
        // unsure about this, review
        // display.textContent = number1 + op;
        console.log(op);
        console.log(number1);
    })
})