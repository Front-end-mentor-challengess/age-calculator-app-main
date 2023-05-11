const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const errorMessages = document.querySelectorAll('.error-msg');
const invalidDate = document.querySelector('.invalid-date');
const labels = document.querySelectorAll('label');
const daysOut = document.getElementById('days-out');
const monthsOut = document.getElementById('months-out');
const yearsOut = document.getElementById('years-out');
const today = new Date();

form.addEventListener("submit", (event)=>{
    resetInputs();
    event.preventDefault();
    let valid = true;
    for(let i=0; i<3; i++){
        if(!hasValue(i)){
            errorMessages[i*2].classList.add('display', 'red');
            labels[i].classList.add('red');
            inputs[i].classList.add('red-border');
            valid = false;
        }
        else{
            if(!isValid(i)){
                errorMessages[(i*2)+1].classList.add('display', 'red');
                labels[i].classList.add('red');
                inputs[i].classList.add('red-border');
                valid = false;
            }  
        }
    }
    if(!valid) return;

    let inputDate = new Date(inputs[2].value, (inputs[1].value)-1, inputs[0].value);
    let totalDaysInput = Math.floor((today - inputDate) / (1000 * 60 * 60 * 24));

    valid = (totalDaysInput >= 0 && isDate(inputs[1].value -1, inputs[0].value)) ? true: false; 

    if(valid){
        const years = Math.floor(totalDaysInput / 365);
        yearsOut.textContent = years;
        totalDaysInput = totalDaysInput - (years * 365);
        const months = Math.floor(totalDaysInput / 30);
        monthsOut.textContent = months;
        totalDaysInput = totalDaysInput - (months * 30);
        daysOut.textContent = totalDaysInput;
    }  
    else{
        for(let i=0; i<3;i++){
            inputs[i].classList.add('red-border');
            labels[i].classList.add('red');
            invalidDate.classList.add('display', 'red');
        }
    }
});

const hasValue = (index)=>{
    if (inputs && inputs[index]) {
        return inputs[index].value !== '' ? true : false;
    }
    return false;  
};
const isValid = (index)=>{
    if(index === 0){
        if(inputs[index].value < 1 || inputs[index].value >31)return false;
    }
    else if(index === 1){
        if(inputs[index].value < 1 || inputs[index].value >12)return false;
    }
    else{
        if(inputs[index].value < 1 || inputs[index].value > 2023)return false;
    }
    return true;
};
const resetInputs = ()=>{
    for(let i=0;i<3;i++){
        if(inputs[i].classList.length !== 0) inputs[i].className = [];
        if(errorMessages[i*2].classList.length !== 1) errorMessages[i*2].className = ['error-msg'];
        if(errorMessages[i*2+1].classList.length !== 1) errorMessages[i*2+1].className = ['error-msg'];
        if(labels[i].classList.length !== 0) labels[i].className = [];
        if(invalidDate.classList.length !== 1) invalidDate.className = ['invalid-date'];
    }
};
const isDate = (month, day)=>{
    const daysPerMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    return day <= daysPerMonth[month];
};