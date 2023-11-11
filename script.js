// let balance = document.querySelector('[data-balance]') // try the same but omit `documentElement`
// const moneyPlus = document.querySelector('[data-money-plus]')
// const moneyMinus = document.querySelector('[data-money-minus]')
// // const list = document.querySelectorAll('[data-list]')
// const list = document.getElementById('list')
// const form = document.querySelector('[data-form]')
// const date = document.querySelector('[data-date]')
// const amount = document.querySelector('[data-amount]')

// const dummyTransactions = [
//   {id: 1, date: 'abc', amount: -20},
//   {id: 2, date: 'def', amount: 10},
//   {id: 3, date: 'ghi', amount: -44},
//   {id: 4, date: 'jkl', amount: 20},
// ]

// // Generate random ID
// function generateId() {
//   return Math.floor(Math.random() * 10000000000)
// }

// const localStorageTransactions = JSON.parse(
//   localStorage.getItem('transactions')
// )

// let transactions = 
//   localStorage.getItem('transactions') !== null ? localStorageTransactions : []

// // Add transaction
// function addTransaction(e) {
//   e.preventDefault()

//   if (date.value.trim() === '' || amount.value.trim() === '') {
//     alert('Please add date and amount')
//     return
//   } else {
//     const transaction = {
//       id: generateId(),
//       date: date.value,
//       amount: amount.value
//     }
//     transactions.push(transaction)
//     addTransactionDOM(transaction)
//     updateValues()
//     updateLocalStorage()

//     date.value = ''
//     amount.value = ''
//   }
// }

// // Add transaction to the DOM list
// function addTransactionDOM(transaction) {
//   // Get sign
//   const sign = transaction.amount < 0 ? '-' : '+'

//   // Create list item
//   const item = document.createElement('li')

//   // Add class based on amount
//   item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

//   item.innerHTML = `
//     ${transaction.date} 
//     <span>
//       ${sign}${Math.abs(transaction.amount)}
//     </span>
//     <button class='delete-btn' onclick='removeTransaction(${transaction.id})'>x</button>
//   `

//   list.appendChild(item)
// }

// // Update the balance, expense and reimbursement values
// function updateValues() {
//   const amounts = transactions.map(transaction => transaction.amount)
//   const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
//   console.log(total)

//   const reimbursement = amounts
//     .filter(item => item > 0)
//     .reduce((acc, item) => (acc += item), 0)
//     .toFixed(2)

//   const expense = (
//     amounts
//       .filter(item => item < 0)
//       .reduce((acc, item) => (acc += item), 0) * -1)
//       .toFixed(2);

//   balance.innerText = `€${total}`
//   moneyPlus.innerText = `€${reimbursement}`
//   moneyMinus.innerText = `€${expense}`
// }

// // Remove transaction by ID
// function removeTransaction(id) {
//   // Fliter out the transactions whose `id` matches the provided `id`
//   transactions = transactions.filter(transaction => transaction.id !== id)

//   updateLocalStorage()
//   init()
// }

// // Update transactions in localStorage
// function updateLocalStorage() {
//   localStorage.setItem('transactions', JSON.stringify(transactions))
// }

// // Init app
// function init() {
//   list.innerHTML = ''

//   transactions.forEach(addTransactionDOM)
//   updateValues()
// }
// init()

// form.addEventListener('submit', addTransaction)
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
