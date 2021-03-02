// defining constants
const buttons = document.body.querySelectorAll("button");
const numbers = document.body.querySelectorAll(".number");
const operators = document.body.querySelectorAll(".operator");
const display = document.body.querySelector(".display2"); //display 2
const display1 = document.body.querySelector(".display1"); //display 1
const reset = document.body.querySelector(".reset");
const backspace = document.body.querySelector(".delete");
const equal = document.body.querySelector(".equal");
const decimal = document.body.querySelector(".dot");

function disable() {
  buttons.forEach((button) => {
    if (!button.classList.contains("reset")) {
      button.disabled = true;
    }
  });
  display1.textContent=""
  display1.style.fontSize="20px"
}

function enable() {
  buttons.forEach((button) => {
    button.disabled = false;
  });
  display1.style.fontSize="20px"

}

// trying out calculator without arrays
let currentNumber = "";
let previousNumber = "";
let currentOperator = "";
let previousOperator = "";
let engaged = false;
let bugged = false;

//populate display function

function populateDisplay() {
  display1.textContent = `${previousNumber}  ${previousOperator}  ${currentNumber}  ${currentOperator} `;
}

//reset function
function resetter() {
  display.textContent = "";
  currentNumber = "";
  previousNumber = "";
  currentOperator = "";
  previousOperator = "";
  engaged = false;
  display1.textContent = "";
  enable();
}

//operate function
function operate(a, b, o) {
  switch (o) {
    case "+":
      return +(parseFloat(a) + parseFloat(b)).toFixed(10);
      break;
    case "-":
      return +(a - b).toFixed(10);
      break;
    case "*":
      return +(a * b).toFixed(10);
      break;
    case "/":
      if (a == 0 || b == 0) {
        disable();
        return (display.textContent = "error:cannot divide by zero");
      } else return +(a / b).toFixed(10);
      break;
  }
}
// populating display when number is pressed(using event listener for button)
// BUGFIX:1 .
numbers.forEach((number) => {
  number.addEventListener("click", function (e) {
    if (engaged == true) {
      display.textContent = "";
      engaged = false;
    }
    display.textContent += Number(e.target.dataset.key);
  });
});

//equal button
equal.addEventListener("click", function (e) {
  if (display.textContent.match(".*\\d.*") && currentNumber != "") {
    previousNumber = currentNumber;
    currentNumber = display.textContent;
    currentNumber = operate(currentNumber, previousNumber, currentOperator);
    display.textContent = currentNumber;
    previousNumber = "";
    currentNumber = "";
    currentOperator = "";
    previousOperator = "";
    populateDisplay();
  } else {
    display.textContent = "error:no number inputted";
    disable();
  }
});

// Operator button
operators.forEach((operator) => {
  operator.addEventListener("click", function (e) {
    if (display.textContent.match(".*\\d.*")) {
      if (currentNumber != "") {
        previousNumber = currentNumber;
        currentNumber = display.textContent;
        currentNumber = operate(previousNumber, currentNumber, currentOperator);
        display1.textContent = currentNumber;
        currentOperator = e.target.dataset.key;
        display.textContent = "";
        engaged = true;
        previousNumber = "";
        populateDisplay();
      } else {
        currentNumber = display.textContent;
        currentOperator = e.target.dataset.key;
        display.textContent = "";
        populateDisplay();
      }
    } else {
      disable();
      display.textContent =
        "error: invalid operator";
    }
  });
});

// Reset button - need to complete other functionality
reset.addEventListener("click", function (e) {
  resetter();
});

//backspace button functionality
backspace.addEventListener("click", function (e) {
  display.textContent = display.textContent.substring(
    0,
    display.textContent.length - 1
  );
});

//decimal button
decimal.addEventListener("click", function (e) {
  if (!display.textContent.includes(".")) {
    display.textContent += e.target.dataset.key;
  }
});

//keyboard functionality
buttons.forEach((button) => {
  addEventListener("keydown", function (e) {
    console.log(e);
    if (e.key == button.dataset.key) {
      button.click();
    }
  });
});
