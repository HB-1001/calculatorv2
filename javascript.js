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
}

function enable() {
  buttons.forEach((button) => {
    button.disabled = false;
  });
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
    populateDisplay();
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
        display.textContent = currentNumber;
        currentOperator = e.target.dataset.key;
        engaged = true;
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
        "error: need to input number after pressing operator";
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

// focus();
// // selecting all buttons for tracking
// let allButtons = document.body.querySelectorAll("button");
// allButtons.forEach((button) =>
//   addEventListener("click", function (e) {
//     console.log(arr);
//   })
// );
// // trying to create operator function
// function operate(number1, op, number2) {
//   if (op == "+") {
//     return parseFloat(number1) + parseFloat(number2);
//   } else if (op == "-") {
//     return number1 - number2;
//   } else if (op == "/") {
//     if (number1 == 0 || number2 == 0) {
//       return (input.value = "Syntax Error");
//     } else return number1 / number2;
//   } else if (op == "*") {
//     return number1 * number2;
//   }
// }

// // making sure input is empty on refresh
// let input = document.body.querySelector("#input");
// console.log(input);
// input.value = "";

// // array that stores users commands
// let arr = [];

// // Number button command.(adds number to the display when button is pressed)
// // when arr.length==5. We have one pair already calculated and displayed.
// // When a number button gets pressed (arr.length==5).
// // we want the display to show that button combination and remove the paired displayed
// // we also want to re-adjust the array using splice to make the first array value the initial pair

// let numberBtn = document.body.querySelectorAll(".number");
// numberBtn.forEach((button) =>
//   button.addEventListener("click", function (e) {
//     if (input.value != "Syntax Error") {
//       if (arr.length == 5) {
//         input.value = "";
//         arr.splice(0, 3);
//       }
//       input.value += e.target.dataset.key;
//       if (arr.length > 5) {
//         input.value = "Syntax Error";
//       }
//     }
//   })
// );

// // operators , storing current input value and refreshing input
// // arr.length==3 signifies a pairing possibility.
// // We calculate a pair directly once we hit length 3 and display the pair (arr.length==4)
// // we then add the operator. we get arr.length==5. Then after a button gets pressed; (the NumberBtn if length.arr=5 gets initiated)
// // That if function makes sure the next button pressed is shown as a number
// let operatorBtn = document.body.querySelectorAll(".operator");
// operatorBtn.forEach((button) => {
//   button.addEventListener("click", function (e) {
//     if (input.value != "Syntax Error") {
//       arr.push(input.value);
//       input.value = "";
//       if (arr[2] == "") {
//         input.value = "Syntax Error";
//         arr[0] = "Syntax Error";
//       }
//       if (arr.length == 3 && arr[0] != "Syntax Error") {
//         let operateValue = operate(arr[0], arr[1], arr[2]);
//         arr.push(operateValue);
//         input.value = operateValue;
//       }
//       arr.push(button.dataset.key);
//       console.log(arr);
//       if (arr.length > 5) {
//         input.value = "Syntax Error";
//       }
//     }
//   });
//   console.log(arr);
// });

// // equal button. pushes input.value and shows result of pair.
// let equalBtn = document.body.querySelector(".equal");
// equalBtn.addEventListener("click", function (e) {
//   if (arr[0] == "") {
//     input.value = "Syntax Error";
//   }
//   if (arr.length == 1) {
//     input.value = arr[0];
//   }
//   if (input.value != "Syntax Error" && arr.length != 1) {
//     console.log(arr);
//     arr.push(input.value);
//     if (arr.length == 3) {
//       let operateValue = operate(arr[0], arr[1], arr[2]);
//       arr.splice(0, 3);
//       input.value = operateValue;
//       console.log(input.value);
//     }
//   }
// });

// let resetBtn = document.body.querySelector(".reset");
// resetBtn.addEventListener("click", function (e) {
//   arr = [];
//   input.value = "";
// });

// let delBtn = document.body.querySelector(".delete");
// delBtn.addEventListener("click", function (e) {
//   if (input.value != "Syntax Error") {
//     input.value = input.value.substring(0, input.value.length - 1);
//   } else {
//   }
// });

// let decimalBtn = document.body.querySelector(".dot");
// decimalBtn.addEventListener("click", function (e) {
//   if (input.value != "Syntax Error" && !input.value.includes(".")) {
//     input.value += ".";
//   }
// });

// // basically when key is pressed down. it returns e.key which has a bunch of properties

// allButtons.forEach((button) => {
//   window.addEventListener("keydown", function (e) {
//     if (e.key == button.dataset.key) {
//       console.log(e);
//       button.click();
//     }
//   });
// });
