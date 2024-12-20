let number1;
let number2;
let op;


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

console.log(add(10,5));
console.log(subtract(10,5));
console.log(multiply(10,5));
console.log(divide(10,5));

op = "/";
number1 = 8;
number2 = 4;
console.log(operate(number1, number2, op));