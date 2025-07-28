const exprDisplay = document.querySelector("#expression");
const valueDisplay = document.querySelector("#value");
const keys = document.querySelector("#keys");
const equalsBtn = document.getElementById("equals");
const clearBtn = document.getElementById("clear");
const backspaceBtn = document.getElementById("backspace");
const dotBtn = document.getElementById("dot");
const negateBtn = document.getElementById("negate");
const fancyLeft = document.getElementById("fancy-left");
const fancyRight = document.getElementById("fancy-right");

let expression = "";
let result = "";
let justEvaluated = false;

// Utility functions
function updateDisplay() {
    exprDisplay.textContent = expression;
    valueDisplay.textContent = result ? result : "";
}

function appendToExpression(char) {
    if (justEvaluated) {
        // Start new calculation after result
        expression = "";
        result = "";
        justEvaluated = false;
    }
    expression += char;
    updateDisplay();
}

function isOperator(char) {
    return ["+", "-", "×", "÷"].includes(char);
}

function safeEval(expr) {
    // Replace × and ÷ with * and /
    const safeExpr = expr.replace(/×/g, "*").replace(/÷/g, "/");
    try {
        let val = Function(`"use strict";return (${safeExpr})`)();
        // Handle rounding for floats
        if (typeof val === "number" && !Number.isInteger(val)) {
            val = parseFloat(val.toFixed(8));
        }
        return val;
    } catch {
        return "Error";
    }
}

// Input handling
keys.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn");
    if (!btn) return;

    const val = btn.textContent;
    if (btn.classList.contains("num")) {
        // Prevent leading zeros unless after a decimal
        if (
            (expression.endsWith("0") && 
            (expression.length === 1 || isOperator(expression.at(-2))) &&
            val === "0" &&
            !expression.endsWith("."))
        ) {
            return;
        }
        appendToExpression(val);
    } else if (btn.classList.contains("operator")) {
        if (!expression) return;
        // Prevent two operators in a row
        if (isOperator(expression.at(-1))) {
            expression = expression.slice(0, -1);
        }
        appendToExpression(val);
    } else if (btn.id === "dot") {
        // Don't allow two dots in a number
        const parts = expression.split(/[\+\-\×\÷]/);
        if (parts.length && parts.at(-1).includes(".")) return;
        if (!expression || isOperator(expression.at(-1))) {
            appendToExpression("0.");
        } else {
            appendToExpression(".");
        }
    } else if (btn.id === "backspace") {
        if (justEvaluated) {
            expression = "";
            result = "";
            justEvaluated = false;
        } else {
            expression = expression.slice(0, -1);
        }
        updateDisplay();
    }
});

equalsBtn.addEventListener("click", () => {
    if (!expression) return;
    // Replace trailing operator
    let exprTrimmed = expression;
    if (isOperator(exprTrimmed.at(-1))) {
        exprTrimmed = exprTrimmed.slice(0, -1);
    }
    const evalResult = safeEval(exprTrimmed);
    result = evalResult;
    updateDisplay();
    justEvaluated = true;
});

clearBtn.addEventListener("click", () => {
    expression = "";
    result = "";
    updateDisplay();
    justEvaluated = false;
});

// Negate the last number
negateBtn.addEventListener("click", () => {
    if (!expression) return;
    // Find last number in the expression
    const match = expression.match(/([^\+\-\×\÷]+)$/);
    if (match) {
        const num = match[1];
        let start = expression.lastIndexOf(num);
        let negated = "";
        if (num.startsWith("-")) {
            negated = num.slice(1);
        } else {
            negated = "-" + num;
        }
        expression = expression.slice(0, start) + negated;
        updateDisplay();
    }
});

// Fancy keys
fancyLeft.addEventListener("click", () => {
    alert("🤖: It's just a fancy key 😉");
});
fancyRight.addEventListener("click", () => {
    alert("🤖: Another fancy key 🥲");
});

// Allow keyboard input
document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
        appendToExpression(e.key);
    } else if (["+", "-", "*", "/", "Enter", "=", ".", "Backspace"].includes(e.key)) {
        if (e.key === "+") appendToExpression("+");
        else if (e.key === "-") appendToExpression("-");
        else if (e.key === "*") appendToExpression("×");
        else if (e.key === "/") appendToExpression("÷");
        else if (e.key === ".") {
            const parts = expression.split(/[\+\-\×\÷]/);
            if (parts.length && parts.at(-1).includes(".")) return;
            if (!expression || isOperator(expression.at(-1))) {
                appendToExpression("0.");
            } else {
                appendToExpression(".");
            }
        }
        else if (e.key === "Backspace") {
            if (justEvaluated) {
                expression = "";
                result = "";
                justEvaluated = false;
            } else {
                expression = expression.slice(0, -1);
            }
            updateDisplay();
        }
        else if (e.key === "Enter" || e.key === "=") {
            equalsBtn.click();
        }
    }
});

updateDisplay();
