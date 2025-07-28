// // Calculator-MS Improved Script with Keyboard Support

const expr = document.querySelector("#expression");
const plus = document.querySelector(".plus");
const sub = document.querySelector(".sub");
const mul = document.querySelector(".mul");
const divss = document.querySelector(".div");
const final = document.querySelector("#final");
const value = document.querySelector("#value");
const sign = document.querySelector(".sign");
const backspace = document.querySelector(".B");
const clearBtn = document.querySelector(".C");
const alertBtn = document.querySelector(".al");
const alertBtn1 = document.querySelector(".al1");

let operand1 = "";
let operator = "";
let operand2 = "";
let inputState = "operand1"; // Tracks current input stage: 'operand1', 'operator', 'operand2'

// Utility functions
function formatResult(result) {
    return Number.isFinite(result)
        ? (Number.isInteger(result) ? result : parseFloat(result.toFixed(2)))
        : "Error";
}

function updateDisplay() {
    if (inputState === "operand1") {
        expr.textContent = operand1 || "0";
    } else if (inputState === "operator") {
        expr.textContent = `${operand1} ${operator}`;
    } else {
        expr.textContent = `${operand1} ${operator} ${operand2}`;
    }
}

function resetCalculator(displayText = "Cleared...") {
    operand1 = "";
    operator = "";
    operand2 = "";
    inputState = "operand1";
    expr.textContent = displayText;
    value.textContent = "";
}

// Main calculation function
function calculate() {
    const a = parseFloat(operand1);
    const b = operator;
    const c = parseFloat(operand2);

    if (isNaN(a) || isNaN(c)) {
        value.textContent = "Invalid Input";
        return;
    }

    let result;
    switch (b) {
        case "+":
            result = a + c;
            break;
        case "-":
            result = a - c;
            break;
        case "*":
            result = a * c;
            break;
        case "/":
            if (c === 0) {
                value.textContent = "Divide by Zero!";
                return;
            }
            result = a / c;
            break;
        default:
            value.textContent = "Unknown Op";
            return;
    }
    value.textContent = formatResult(result);
}

// Number input handling
for (let i = 0; i < 11; i++) {
    const n = document.querySelector(`.num${i}`);
    if (n) {
        n.addEventListener("click", () => {
            if (inputState === "operand1") {
                operand1 += n.textContent;
            } else if (inputState === "operator") {
                inputState = "operand2";
                operand2 += n.textContent;
            } else {
                operand2 += n.textContent;
            }
            updateDisplay();
        });
    }
}

// Sign toggle handling
sign.addEventListener("click", () => {
    if (inputState === "operand1") {
        if (operand1.startsWith("-")) {
            operand1 = operand1.slice(1);
        } else if (operand1.length) {
            operand1 = "-" + operand1;
        }
        updateDisplay();
    } else if (inputState === "operand2") {
        if (operand2.startsWith("-")) {
            operand2 = operand2.slice(1);
        } else if (operand2.length) {
            operand2 = "-" + operand2;
        }
        updateDisplay();
    }
});

// Operator handling
function setOperator(opSymbol, displaySymbol = opSymbol) {
    if (operand1 === "") {
        operand1 = "0";
    }
    if (inputState === "operand2") {
        // Allow chaining: calculate and use result as operand1
        calculate();
        operand1 = value.textContent;
        operand2 = "";
    }
    operator = opSymbol;
    inputState = "operator";
    updateDisplay();
}

plus.addEventListener("click", () => setOperator("+"));
sub.addEventListener("click", () => setOperator("-"));
mul.addEventListener("click", () => setOperator("*", "×"));
divss.addEventListener("click", () => setOperator("/", "÷"));

// Equal/final button
final.addEventListener("click", () => {
    if (operand1 !== "" && operator !== "" && operand2 !== "") {
        calculate();
    } else {
        value.textContent = "Incomplete!";
    }
});

// Backspace handling
backspace.addEventListener("click", () => {
    if (inputState === "operand1") {
        operand1 = operand1.slice(0, -1);
    } else if (inputState === "operator") {
        operator = "";
        inputState = "operand1";
    } else {
        operand2 = operand2.slice(0, -1);
    }
    updateDisplay();
});

// Clear button
clearBtn.addEventListener("click", () => resetCalculator());

// Fancy alert buttons
alertBtn.addEventListener("click", () => {
    alert("🤖: It's just a fancy key 😉");
});
alertBtn1.addEventListener("click", () => {
    alert("🤖: Another fancy key 🥲");
});

// Keyboard support
document.addEventListener("keydown", (e) => {
    // If a modal/alert is open, ignore input
    if (document.querySelector("dialog[open], .modal[open]")) return;

    // Number input (0-9) and dot
    if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
        if (inputState === "operand1") {
            if (e.key !== "." || !operand1.includes(".")) {
                operand1 += e.key;
            }
        } else if (inputState === "operator") {
            inputState = "operand2";
            if (e.key !== "." || !operand2.includes(".")) {
                operand2 += e.key;
            }
        } else {
            if (e.key !== "." || !operand2.includes(".")) {
                operand2 += e.key;
            }
        }
        updateDisplay();
        return;
    }

    // Operators
    if (["+", "-", "*", "/"].includes(e.key)) {
        setOperator(e.key);
        return;
    }

    // Enter or = for equals
    if (e.key === "Enter" || e.key === "=") {
        final.click();
        return;
    }

    // Backspace key
    if (e.key === "Backspace") {
        backspace.click();
        e.preventDefault(); // Prevent browser nav when input is empty
        return;
    }

    // Escape or C or c for clear
    if (e.key === "Escape" || e.key === "c" || e.key === "C") {
        clearBtn.click();
        return;
    }

    // Toggle sign: s or S
    if (e.key === "s" || e.key === "S") {
        sign.click();
        return;
    }

    // Fancy alert keys: a for .al, q for .al1
    if (e.key === "a") {
        alertBtn.click();
        return;
    }
    if (e.key === "q") {
        alertBtn1.click();
        return;
    }
});

// Initialize display on load
resetCalculator("0");
