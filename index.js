let userInput;
let repeat;
let isValid;

do {
    userInput = prompt("Enter a positive valid integer").trim();
    if (
        userInput.length === 0 ||
        isNaN(Number(userInput)) ||
        Number(userInput) < 0 ||
        !isFinite(Number(userInput)) ||
        userInput.includes(".")
    ) {
        isValid = false;
        console.log("Incorrect input!");
    } else {
        userInput = Number(userInput);
        isValid = true;
    }
} while (isValid === false);

console.log(`Number: ${userInput}
 Factorial: ${factorial(userInput)}
 Square: ${square(userInput)}
 isPrime: ${isPrime(userInput)}
 isEven: ${isEven(userInput)}
 Delimiters: ${delimiters(userInput)}
 `);

function factorial(number) {
    return number > 1 ? number * factorial(number - 1) : 1;
}

function square(number) {
    return number * number;
}

function isPrime(number) {
    if (number <= 1) {
        return false;
    } else {
        for (var i = 2; i < number; i++) {
            if (number % i === 0) {
                return false;
            }
        }
        return true;
    }
}

function isEven(number) {
    return number % 2 === 0;
}

function delimiters(number) {
    if (number === 0) {
        return "none";
    }
    const delimiters = [];
    for (let i = number; i > 0; i--) {
        if (number % i === 0) {
            delimiters.push(i);
        }
    }
    return delimiters.join(", ");
}

const MAX_REPEAT = 10;
const MAX_INPUT = 3;
const validReapeats = Array(MAX_REPEAT).fill().map((_, i) => i + 1);

do {
    userInput = prompt(`Enter 1-${MAX_INPUT} characters`).trim();
    if (userInput.length < 1 || userInput.length > 3 || userInput.includes(" ")) {
        console.log("Incorrect input!");
        isValid = false;
    } else {
        isValid = true;
    }
} while (isValid === false);

do {
    repeat = prompt(`Enter a valid integer from 1 to ${MAX_REPEAT}`).trim();
    if (repeat.length < 1 || !validReapeats.includes(Number(repeat))) {
        console.log("Incorrect input!");
        isValid = false;
    } else {
        isValid = true;
        repeat = Number(repeat);
    }
} while (isValid === false);

const row = Array(repeat).fill(userInput);
console.log(row.join(" ").concat("\n").repeat(repeat));

