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

//add typing numbers functionality
numberButtons.forEach(button => button.addEventListener('click', (e) => {
  document.querySelector('#display').textContent = document.querySelector('#display').textContent + e.target.textContent;
}));
document.addEventListener('keydown', logKey);

function logKey(e) {
  if (e.keyCode >= 48 && e.keyCode <= 57){
  document.querySelector('#display').textContent += String(e.key);
}};

//add decimal button functionality, check if there's already a decimal point 
document.querySelector('#decimal-button').addEventListener('click', (e) => {
  if(document.querySelector('#display').textContent.includes('.')){
    return;
  }
  else{
    document.querySelector('#display').textContent = document.querySelector('#display').textContent + e.target.textContent;
  }
});

//add backspace functionality
document.querySelector('#backspace-button').addEventListener('click', () =>{
  document.querySelector('#display').textContent = document.querySelector('#display').textContent.slice(0, -1);
  
});

//operator naming
let operators = {
  '+':add,
  '-':subtract,
  'x':multiply,
  '/':divide,
}

operatorButtons.forEach(button => button.addEventListener('click', makeOperation));
function makeOperation(e){

  
  
  //get the first number for operation
  let firstNumber = document.querySelector('#display').textContent;
  //empty display so the second number can be entered
  document.querySelector('#display').textContent = '';
  //which operation to make
  let operation = operators[e.target.textContent];
  //temporarily remove functionality so the operation can be finished before next one
  operatorButtons.forEach(button => button.removeEventListener('click',makeOperation));
  //highlight which operation is currently being made
  e.target.style.backgroundColor = "#dcdcdc";
  //function triggers if operator or equals is clicked after clicking an operator
  function equalsFunction(){
    //get first number from before clicking the operator first time
    let x = Number(firstNumber);
    //get the second number from display
    let y = Number(document.querySelector('#display').textContent);
    console.log(operation);
    console.log(x);
    console.log(y);
    let result = String(Math.round(operate(operation,x,y)*10000)/10000)
    console.log(result);
    //display is now the result of operator
    //division by 0 is not possible
    if (operation == divide && y == 0){
      document.querySelector('#display').textContent = "Naaah man";
    }
    else{
      document.querySelector('#display').textContent = String(Math.round(operate(operation,x,y)*10000)/10000);
    }
    //reset operator button color
    e.target.style.backgroundColor = '#EDEAE5';
    //remove the listeners so we can wait for another operation
    document.querySelector('#equals-button').removeEventListener('click',equalsFunction);
    operatorButtons.forEach(button => button.removeEventListener('click',equalsFunction));
  };
  //add functionality of finishing an operation back
  document.querySelector('#equals-button').addEventListener('click', equalsFunction);
  operatorButtons.forEach(button => button.addEventListener('click', equalsFunction));
  //add functionality of beginning an operation back
  operatorButtons.forEach(button => button.addEventListener('click', makeOperation));
  //if makeOperation already triggered and we want to use the clear button, we need to remove the equalsFunction operator, it will be added again when new operator is clicked
  document.querySelector('#clear-button').addEventListener('click', () =>{
    document.querySelector('#equals-button').removeEventListener('click', equalsFunction);
    operatorButtons.forEach(button => button.removeEventListener('click', equalsFunction));
  });  
};

function clearCalculator(){
  //if an operation has not yet begun, just clear display and reset color of buttons
  document.querySelector('#display').textContent = '';
  document.querySelectorAll('#operator-button').forEach(button => button.style.backgroundColor = '#EDEAE5');
  document.querySelectorAll('#clear-button').forEach(button => button.style.backgroundColor = '#957DAD');
  document.querySelectorAll('#backspace-button').forEach(button => button.style.backgroundColor = '#957DAD');
  document.querySelectorAll('#equals-button').forEach(button => button.style.backgroundColor = '#BFAEA1');
};
document.querySelector('#clear-button').addEventListener('click',clearCalculator);
