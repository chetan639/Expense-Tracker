const amount = document.querySelector('.amount');
const income = document.querySelector('.income p');
const expense = document.querySelector('.expense p');
const historyList = document.querySelector('.history-list');
const text = document.getElementById('text');
const number = document.getElementById('number');
const form = document.getElementById('form');
const closeBtn = document.querySelectorAll('.close-btn');

let totalBalance = 0;
let totalIncome = 0;
let totalExpense = 0;

const addToHistory = (reason, kharcha) => {
    const item = document.createElement('div');
    item.classList.add('hist');
    if (kharcha < 0) {
        sign = '-';
        item.classList.add('red');
    } else if (kharcha > 0) {
        sign = '+';
        item.classList.add('green');
    }

    item.innerHTML = `
    <h2 class="close-btn">&cross;</h2>
    <h2>${reason}</h2>
    <h3 class="amount">${sign}${Math.abs(kharcha)}</h3>
    `
    historyList.appendChild(item);
}

const setValues = () => {
    amount.innerText = '₹' + Number(totalBalance.toString().replace(/^0+/, '')).toFixed(2);
    income.innerText = '₹' + Number(totalIncome.toString().replace(/^0+/, '')).toFixed(2);
    expense.innerText = '₹' + Math.abs(Number(totalExpense.toString().replace(/^0+/, ''))).toFixed(2);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (number.value === '' && text.value === '') {
        alert("Enter the credentials!");
    } else if (number.value === '') {
        alert("Enter the amount!");
    } else if (text.value === '') {
        alert("Enter the reason for transaction!");
    } else {
        totalBalance += parseFloat(number.value);
        if (number.value > 0) {
            totalIncome += parseFloat(number.value);
        } else {
            totalExpense += parseFloat(number.value);
        }

        setValues();
        addToHistory(text.value, number.value);

        text.value = '';
        number.value = '';
    }


})

historyList.addEventListener('click', (event) => {
    if (event.target && event.target.className == 'close-btn') {
        const parent = event.target.parentNode;
        parent.remove();
        histNum = parseFloat(parent.childNodes[5].innerText);
        totalBalance = parseFloat(amount.innerText.slice(1)) - histNum;
        if (histNum < 0) {
            totalExpense = histNum + parseFloat(expense.innerText.slice(1));
        } else if (histNum > 0) {
            totalIncome = parseFloat(income.innerText.slice(1)) - histNum;
        }
        setValues();
    }
})