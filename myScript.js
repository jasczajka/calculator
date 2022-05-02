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
  return String(operator(a,b));
}
let operatorButtons = document.querySelectorAll('.operator-button');
let numberButtons = document.querySelectorAll('.number-button');

//add typing functionality to number buttons
numberButtons.forEach(button => button.addEventListener('click', (e) => {
  document.querySelector('#display').textContent = document.querySelector('#display').textContent + e.target.textContent;
}));

//add clear button functionality
document.querySelector('#clear-button').addEventListener('click', ()=> {
  document.querySelector('#display').textContent = '';
  operatorButtons.forEach(button => button.style.backgroundColor = 'grey');
});

//operator naming
let operators = {
  '+':add,
  '-':subtract,
  'x':multiply,
  '/':divide,
}

//when an operator is clicked, store the first number and wait for the second
// and change color of the operator so user knows which one he is using

operatorButtons.forEach(button => button.addEventListener('click', (e) => {
  let operation = operators[e.target.textContent];
  e.target.style.backgroundColor = "#dcdcdc";
  //1.store the main number as the first number for operation 
  let firstNumber = document.querySelector('#display').textContent;
  //2.clear display
  document.querySelector('#display').textContent = '';
  //3. when = is pressed, operate on the numbers and use the operator
  
  function equalsFunction(){
    let x = Number(firstNumber);
    let y = Number(document.querySelector('#display').textContent);
    document.querySelector('#display').textContent = '';
    document.querySelector('#display').textContent = String(operate(operation, x, y));
    operatorButtons.forEach(button => button.style.backgroundColor = 'grey');
    document.querySelector('#equals-button').removeEventListener('click',equalsFunction);
    };
  document.querySelector('#equals-button').addEventListener('click', equalsFunction)
   

}));

//when operator is clicked, store main number as first, clear main
//when = is pressed, a=first b=main operator = text content of operator button 