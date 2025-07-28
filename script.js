// Error-free and improved calculator logic with additional functions and navigation (< >) buttons

const display = document.getElementById('display');
let currentInput = '';
let lastResult = '';
let cursorPos = 0;

// Utility: Insert character at cursor
function insertAtCursor(val) {
    currentInput =
        currentInput.slice(0, cursorPos) +
        val +
        currentInput.slice(cursorPos);
    cursorPos += val.length;
    updateDisplay();
}

// Utility: Move cursor
function moveCursor(dir) {
    if (dir === 'left' && cursorPos > 0) cursorPos--;
    if (dir === 'right' && cursorPos < currentInput.length) cursorPos++;
    updateDisplay();
}

// Utility: Update display with cursor indication
function updateDisplay() {
    // Show cursor as a vertical bar
    let disp = currentInput.slice(0, cursorPos) + '|' + currentInput.slice(cursorPos);
    display.value = disp;
}

// Utility: Clear all
function clearAll() {
    currentInput = '';
    lastResult = '';
    cursorPos = 0;
    updateDisplay();
}

// Utility: Remove character at cursor (backspace)
function backspace() {
    if (cursorPos > 0) {
        currentInput = currentInput.slice(0, cursorPos - 1) + currentInput.slice(cursorPos);
        cursorPos--;
        updateDisplay();
    }
}

// Utility: Delete character after cursor (delete)
function deleteChar() {
    if (cursorPos < currentInput.length) {
        currentInput = currentInput.slice(0, cursorPos) + currentInput.slice(cursorPos + 1);
        updateDisplay();
    }
}

// Evaluate expression safely
function calculate() {
    try {
        // Only allow digits, operators, decimal, and parenthesis
        if (!/^[\d+\-*/.()% ]+$/.test(currentInput)) {
            display.value = "Error";
            return;
        }
        // eslint-disable-next-line no-eval
        let result = eval(currentInput.replace('%', '/100'));
        if (result === undefined) result = '';
        display.value = result;
        lastResult = result;
        currentInput = String(result);
        cursorPos = currentInput.length;
    } catch {
        display.value = "Error";
    }
}

// Button click handler
function buttonClick(val) {
    if (val === '=') {
        calculate();
    } else if (val === 'C') {
        clearAll();
    } else if (val === '←') {
        backspace();
    } else if (val === 'Del') {
        deleteChar();
    } else if (val === '<') {
        moveCursor('left');
    } else if (val === '>') {
        moveCursor('right');
    } else if (val === 'Ans') {
        insertAtCursor(lastResult);
    } else {
        insertAtCursor(val);
    }
}

// Keyboard support
display.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        calculate();
        e.preventDefault();
    } else if (e.key === "Backspace") {
        backspace();
        e.preventDefault();
    } else if (e.key === "Delete") {
        deleteChar();
        e.preventDefault();
    } else if (e.key === "ArrowLeft") {
        moveCursor('left');
        e.preventDefault();
    } else if (e.key === "ArrowRight") {
        moveCursor('right');
        e.preventDefault();
    }
});

// Initialize
clearAll();
