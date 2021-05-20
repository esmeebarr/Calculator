// if (clickedButtonValue === "=") {
//   if (display.value === "") {
//     display.value = display.value;
//   } else if (clickedButtonValue === "C") {
//     display.value = "";
//   } else {
//     display.value += clickedButtonValue;
//   }
// }

// if (
//   action === "add" ||
//   action === "subtract" ||
//   action === "multiply" ||
//   action === "subtract"
// ) {
//   console.log("operator button!");
// }

// if (action === "decimal") {
//   console.log("decimal button!");
// }

// if (action === "clear") {
//   console.log("clear button!");
// }

// if (action === "equals") {
//   console.log("equal button!");
// }
// if (action === "percent") {
//   console.log("percent button!");
// }

// if (action === "positive-negative") {
//   console.log("positive-negative button!");
// }

//Create variables that will help us store targeted DOM elements
//Create variables that will store our input
//Add event listeners to all buttons
//Create a function that will update the display value
//Create a function that will perform the mathematical operation
//Create a function that will clear the screen
//Create a function that will insert decimal points

// USING A CLASS TO MAKE MORE SIMPLE
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  //  FUNCTIONS:
  // 1- CLEAR
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  // 2- DELETE
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  // convert to string so numbers are added as 1+2 = 12 on screen instead of 1+2=3
  // ADDING NUMBER TO SCREEN
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    // so only one decimal place can be added
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  // FUNCTION
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  // COMPUTE FUNCTION- CALCULATES END VALUE

  compute() {
    // variable for the result of the calculation
    let computation;
    // string converted to number
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    // SWITCH STATEMENTS (instead of loads of if statements)
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      //break keyword -> breaks out of switch block + execution of code stopped - just follows case
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        // default -> the code that will run if there is no match
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
  // DISPLAY- UPDATES VALUE FOR OUTPUT
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    // NAN is not a number
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString({
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  // DISPLAY UPDATED WHEN BUTTONS CLICKED
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// GIVE EVERY BUTTON AN EVENT LISTENER -> when we click on the button it will do something

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
