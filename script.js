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

const history = document.querySelector("#history");
history.textContent = "";

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

// Allows for keyboard input
document.addEventListener("keydown", (event) => {
    // for numbers
    if (event.key >= '0' && event.key <= "9") {
        let button = [...inputButtons].find(b => b.textContent === event.key);
        if (button) {
            button.click();
        }
    }
    // for operator keys
    if (operations.includes(event.key)) {
        let button = [...operators].find(b => b.textContent === event.key);
        if (button) {
            button.click();
        }
    }
    // for equals/enter key
    if (event.key === "Enter") {
        // prevents default behavior of enter key triggering last focused button brought about by a previous mouseclick
        event.preventDefault();
        calculate.click();
    }
    // for decimal key
    if (event.key === ".") {
        decimal.click();
    }
    // for clear key
    if (event.key === "c") {
        clear.click();
    }
    // for backspace/delete
    if (event.key === "Backspace" || event.key === "Delete") {
        backspace.click();
    }
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
                // properly handles cases when multiplying/dividing by a negative second number
                if ((op === "*" || op === "/") && button.textContent === "-") {
                    op = display.textContent.split("")[display.textContent.length - 1];
                    number1 = Number(display.textContent.slice(0, display.textContent.length - 1));
                    display.textContent = number1 + op + "-";
                } else {
                op = button.textContent;
                number1 = Number(display.textContent.slice(0, display.textContent.length - 1));
                display.textContent = number1 + op;
                }
            }
            // Checks if first number is a negative; allows for operations with negative first numbers
        } else if ((display.textContent.split(""))[0] === "-") {
            // if last element is an operator and a new operator is pressed, replace with new one
            if (operations.includes(display.textContent.split("")[display.textContent.length - 1])) {
                // properly handles cases when multiplying/dividing by a negative second number
                if ((op === "*" || op === "/") && button.textContent === "-") {
                    op = display.textContent.split("")[display.textContent.length - 1];
                    number1 = Number(display.textContent.slice(0, display.textContent.length - 1));
                    display.textContent = number1 + op + "-";
                } else {
                op = button.textContent;
                number1 = Number(display.textContent.slice(0, display.textContent.length - 1));
                display.textContent = number1 + op;
                }
            // if the last element is not an operator, add operator to the end
            } else if (display.textContent.slice(1).split("").find(element => operations.includes(element))) {
                let removeNeg = display.textContent.slice(1);
                let arr = removeNeg.split(op);
                number2 = Number(arr[1]);
                history.textContent = number1 + op + number2;
                let prevResult = operate(number1, number2, op);
                // // Round result to 9 decimal places if necessary; keep answer if not
                let resultString = prevResult.toString();
                if (resultString.includes(".") && resultString.split(".")[1].length > 9) {
                    prevResult = parseFloat(prevResult.toFixed(9));
                } else {
                    prevResult = parseFloat(prevResult.toString())
                }
                op = button.textContent;
                display.textContent = prevResult + op;
                number1 = prevResult;
            } else {
                op = button.textContent;
                number1 = Number(display.textContent);
                display.textContent = number1 + op;
            }
            
            // If the last two elements on the display are an operator and a negative sign, disable the other operator buttons until a second number is input
        } else if (display.textContent.split("")[display.textContent.length - 1] === "-") {
            return;
            
            // If equation already has a prior operator and a second number after it
        } else {
            let arr = display.textContent.split(op);
            number2 = Number(arr[1]);
            history.textContent = number1 + op + number2;
            let prevResult = operate(number1, number2, op);
            // // Round result to 9 decimal places if necessary; keep answer if not
            let resultString = prevResult.toString();
            if (resultString.includes(".") && resultString.split(".")[1].length > 9) {
                prevResult = parseFloat(prevResult.toFixed(9));
            } else {
                prevResult = parseFloat(prevResult.toString())
            }
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
        // Handles the case of whether the first number is a negative to set the appropriate values for number1 and number2
        if (display.textContent.split("")[0] === "-") {
            let removeNeg = display.textContent.slice(1);
            let arr = removeNeg.split(op);
            number2 = Number(arr[1]);
        } else {
            let arr = display.textContent.split(op);
            number2 = Number(arr[1]);
        }

        if (number2 === 0 && op === "/") {
            history.textContent = number1 + op + number2;
            let errorMsg = "Cannot divide by 0."
            display.textContent = errorMsg;
            number1 = undefined;
            number2 = undefined;
            op = undefined;
        } else {
            history.textContent = number1 + op + number2;
            let result = operate(number1, number2, op);
            // Round result to 9 decimal places if necessary; keep answer if not
            let resultString = result.toString();
            if (resultString.includes(".") && resultString.split(".")[1].length > 9) {
                result = parseFloat(result.toFixed(9));
            } else {
                result = parseFloat(result.toString())
            }
            display.textContent = result;
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
    history.textContent = "";
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
    // Handles cases of the first and second number having decimals
    } else if (display.textContent.includes(".") && (display.textContent.split("").find(element => operations.includes(element))) && display.textContent.split("").filter(char => char === ".").length < 2 ) {
        display.textContent += ".";
    } 
})