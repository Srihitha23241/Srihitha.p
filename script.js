function appendToDisplay(value) {
  const display = document.getElementById('display');
  
  // Preventing multiple consecutive operators or decimals
  if (['+', '-', '*', '/', '**', '%'].includes(value)) {
    const lastChar = display.value.slice(-1);
    if (['+', '-', '*', '/', '**', '%'].includes(lastChar)) {
      return; // Do nothing if the last character is already an operator
    }
  }
  
  // Prevent multiple decimal points in the same number
  if (value === '.' && display.value.includes('.')) {
    return;
  }
  
  // Appending the value to the display
  display.value += value;
}

// Function to clear the display when "C" is clicked
function clearDisplay() {
  document.getElementById('display').value = ''; // Clear the input
}

// Function to calculate the result of the expression on the display
function calculateResult() {
  const display = document.getElementById('display');
  let expression = display.value;
  
  try {
    // Handling square root expressions (e.g., sqrt(16))
    expression = expression.replace(/sqrt\((.*?)\)/g, (match, p1) => {
      return `Math.sqrt(${p1})`;
    });

    // Handling exponentiation (e.g., 2^3 becomes Math.pow(2, 3))
    expression = expression.replace(/\*\*(\d+)/g, (match, p1) => {
      return `Math.pow(${p1})`;
    });

    // Handling percentage (e.g., 50% of 100 becomes (50/100)*100)
    expression = expression.replace(/(\d+)%/g, (match, p1) => {
      return `(${p1}/100) * 100`;
    });

    // Evaluating the final mathematical expression
    const result = eval(expression); // Evaluate the expression in JavaScript

    // Displaying the result in the input box
    display.value = result;
  } catch (error) {
    // If there is any error (invalid input), show "Error" in the display
    display.value = 'Error';
  }
}

// Handle keyboard input for calculator
document.addEventListener('keydown', function(event) {
  const key = event.key;
  
  // Handle the key inputs for numbers and operators
  if ('0123456789'.includes(key)) {
    appendToDisplay(key);
  } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
    appendToDisplay(key);
  } else if (key === '.') {
    appendToDisplay('.');
  } else if (key === 'Enter') {
    calculateResult();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});