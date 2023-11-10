const balance = document.querySelector('[data-balance]') // try the same but omit `documentElement`
const moneyPlus = document.documentElement.getAttribute('money-plus')
const moneyMinus = document.documentElement.getAttribute('money-minus')
// const list = document.documentElement.getAttribute('[list]')
const list = document.getElementById('list')
const form = document.documentElement.getAttribute('form')
const date = document.documentElement.getAttribute('date')
const amount = document.documentElement.getAttribute('amount')

const dummyTransactions = [
  {id: 1, text: 'abc', amount: -20},
  {id: 2, text: 'def', amount: 10},
  {id: 3, text: 'ghi', amount: -44},
  {id: 4, text: 'jkl', amount: 20},
]

// Generate random ID
function generateId() {
  return Math.floor(Math.random() * 10000000000)
}

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
)

let transactions = 
  localStorage.getItem('transactions') !== null ? localStorageTransactions : []

// Add transaction
function addTransaction(e) {
  e.preventDefault()

  if (date.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add date and amount')
    return
  } else {
    const transaction = {
      id: generateId(),
      date: date.value,
      amount: amount.value
    }
    transactions.push(transaction)
    addTransactionDOM(transaction)
    updateValues()
    updateLocalStorage()

    date.value = ''
    amount.value = ''
  }
}

// Add transaction to the DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+'

  // Create list item
  const item = document.createElement('li')

  // Add class based on amount
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

  item.innerHTML = `
    ${transaction.date} 
    <span>
      ${sign}${Math.abs(transaction.amount)}
    </span>
    <button class='delete-btn' onclick='removeTransaction(${transaction.id})'>x</button>
  `

  list.appendChild(item)
}

// Update the balance, expense and reimbursement values
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount)
  const total = amounts.reduce((acc, amount) => (acc += amount), 0).toFixed(2)

  const reimbursement = amounts
    .filter(amount => amount > 0)
    .reduce((acc, amount) => (acc += amount), 0)
    .toFixed(2)

  const expense = (
    amounts
      .filter(amount => amount < 0)
      .reduce((acc, amount) => (acc += amount), 0) * -1)
      .toFixed(2);

  balance.innerText = `€${total}`
  moneyPlus.innerText = `€${reimbursement}`
  moneyMinus.innerText = `€${expense}`
}

// Remove transaction by ID
function removeTransaction(id) {
  // Fliter out the transactions whose `id` matches the provided `id`
  transactions = transactions.filter(transaction => transaction.id !== id)

  updateLocalStorage()
  init()
}

// Update transactions in localStorage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

// Init app
function init() {
  list.innerHTML = ''

  transactions.forEach(addTransactionDOM)
  updateValues()
}
init()

form.addEventListener('sunbmit', addTransaction)
