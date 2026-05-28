// ============================================
// ASSIGNMENT 6 - CONSOLE CHALLENGE
// Student  : Manoj Kumar B
// Date     : 24/02/2026
// Desc     : JS Calculator Operations in Console
// ============================================


// ── 1. ADDITION ──────────────────────────────
function add(a, b) {
  var result = a + b;
  console.log("Addition: " + a + " + " + b + " = " + result);
  return result;
}


// ── 2. SUBTRACTION ───────────────────────────
function subtract(a, b) {
  var result = a - b;
  console.log("Subtraction: " + a + " - " + b + " = " + result);
  return result;
}


// ── 3. MULTIPLICATION ────────────────────────
function multiply(a, b) {
  var result = a * b;
  console.log("Multiplication: " + a + " x " + b + " = " + result);
  return result;
}


// ── 4. DIVISION ──────────────────────────────
function divide(a, b) {
  if (b === 0) {
    console.log("Division Error: Cannot divide by zero!");
    return null;
  }
  var result = a / b;
  console.log("Division: " + a + " / " + b + " = " + result);
  return result;
}


// ── 5. MODULUS (Remainder) ───────────────────
function modulus(a, b) {
  var result = a % b;
  console.log("Modulus: " + a + " % " + b + " = " + result);
  return result;
}


// ── 6. POWER (Exponent) ──────────────────────
function power(base, exp) {
  var result = Math.pow(base, exp);
  console.log("Power: " + base + " ^ " + exp + " = " + result);
  return result;
}


// ── 7. SQUARE ROOT ───────────────────────────
function squareRoot(a) {
  if (a < 0) {
    console.log("Error: Cannot find square root of a negative number!");
    return null;
  }
  var result = Math.sqrt(a);
  console.log("Square Root: sqrt(" + a + ") = " + result);
  return result;
}


// ── 8. AVERAGE ───────────────────────────────
function average(a, b, c) {
  var result = (a + b + c) / 3;
  console.log("Average of " + a + ", " + b + ", " + c + " = " + result);
  return result;
}


// ── 9. CALCULATOR using switch-case ──────────
function calculator(a, operator, b) {
  var result;
  switch (operator) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      if (b === 0) {
        console.log("Error: Cannot divide by zero!");
        return;
      }
      result = a / b;
      break;
    case '%':
      result = a % b;
      break;
    default:
      console.log("Error: Unknown operator!");
      return;
  }
  console.log("Calculator: " + a + " " + operator + " " + b + " = " + result);
  return result;
}


// ── 10. EVEN OR ODD ──────────────────────────
function evenOrOdd(n) {
  if (n % 2 === 0) {
    console.log(n + " is Even");
  } else {
    console.log(n + " is Odd");
  }
}


// ── 11. FACTORIAL ────────────────────────────
function factorial(n) {
  if (n < 0) {
    console.log("Error: Negative number not allowed!");
    return;
  }
  var result = 1;
  for (var i = 1; i <= n; i++) {
    result = result * i;
  }
  console.log("Factorial: " + n + "! = " + result);
  return result;
}


// ── 12. MAX AND MIN ──────────────────────────
function findMax(a, b, c) {
  var max = Math.max(a, b, c);
  console.log("Max of (" + a + ", " + b + ", " + c + ") = " + max);
  return max;
}

function findMin(a, b, c) {
  var min = Math.min(a, b, c);
  console.log("Min of (" + a + ", " + b + ", " + c + ") = " + min);
  return min;
}


// ============================================
// RUN ALL - calling all functions below
// ============================================

console.log("============================================");
console.log("   ASSIGNMENT 6 - CONSOLE CHALLENGE");
console.log("   Student : Amith K G | Date: 24/02/2026");
console.log("============================================");
console.log("");

console.log("--- 1. ADDITION ---");
add(10, 5);
add(25, 37);
console.log("");

console.log("--- 2. SUBTRACTION ---");
subtract(20, 8);
subtract(100, 45);
console.log("");

console.log("--- 3. MULTIPLICATION ---");
multiply(6, 7);
multiply(12, 15);
console.log("");

console.log("--- 4. DIVISION ---");
divide(100, 4);
divide(50, 0);
console.log("");

console.log("--- 5. MODULUS ---");
modulus(10, 3);
modulus(25, 6);
console.log("");

console.log("--- 6. POWER ---");
power(2, 8);
power(5, 3);
console.log("");

console.log("--- 7. SQUARE ROOT ---");
squareRoot(144);
squareRoot(81);
squareRoot(-4);
console.log("");

console.log("--- 8. AVERAGE ---");
average(10, 20, 30);
average(5, 15, 25);
console.log("");

console.log("--- 9. CALCULATOR (switch-case) ---");
calculator(20, '+', 10);
calculator(20, '-', 10);
calculator(20, '*', 10);
calculator(20, '/', 10);
calculator(20, '%', 3);
console.log("");

console.log("--- 10. EVEN OR ODD ---");
evenOrOdd(7);
evenOrOdd(12);
evenOrOdd(0);
console.log("");

console.log("--- 11. FACTORIAL ---");
factorial(5);
factorial(7);
factorial(0);
console.log("");

console.log("--- 12. MAX AND MIN ---");
findMax(45, 12, 78);
findMin(45, 12, 78);
console.log("");

console.log("============================================");
console.log("   All Done! ✅");
console.log("============================================");