function add(a, b){
  return (a+b); 
}

function subtract(a, b){
  return (a-b); 
}

function multiply(a, b){
  return (a*b); 
}

function divide(a, b){
  return (a/b); 
}

function operate(operator, a, b){
  return operator(a,b);
}

//add typing functionality to number buttons
let numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach(button => button.addEventListener('click', (e) => {
  document.querySelector('#display').textContent = document.querySelector('#display').textContent + e.target.textContent;
  //store the display value in a separate variable
  let displayValue = document.querySelector('#display').textContent;
}));