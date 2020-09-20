const screen = document.querySelector('.screen');
let runningtotal = 0;
let previousOperator;
let buffer = '0';

const buttonClick = (value) => {
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    }else{
      handleNumber(value);  
    }
    rerender();
}

const handleNumber = (value) => {
    if(buffer === '0'){
        buffer = value;
    } else {
        buffer += value;
    }
}

const doMath = (value) => {
    if (buffer === '0'){
        return
    }
    const intBuffer = parseInt(buffer);
    if (runningtotal === 0){
        runningtotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = '0';
}

const flushOperation = (intBuffer) => {
    if (previousOperator === '+'){
        runningtotal += intBuffer;
    } else if (previousOperator === '-'){
        runningtotal -= intBuffer;
    } else if (previousOperator === 'x'){
        runningtotal *= intBuffer;
    } else {
        runningtotal /= intBuffer;
    }
}

  
const handleSymbol = (value) => {
    switch(value){
        case "C":
            buffer = '0';
        break;
        case "=":
            if(previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = +runningtotal;
            runningtotal = 0;
        break;
        case "+":
        case "-":
        case "x":
        case "/":
            doMath(value);
        break;
        case "←":
            deleteNumber();
        break;
    }
}

const deleteNumber = () => {
    if (buffer.length === 1){
        buffer = '0'; 
    } else {
        buffer = buffer.slice(0, -1);
    }
}



const rerender = () => {
    screen.innerText = buffer;
    console.log(buffer);
    console.log(buffer)
}

const init = () => {
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    });
}

init();