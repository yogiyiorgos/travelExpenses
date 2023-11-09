const balance = document.documentElement.getAttribute('balance') // try the same but omit `documentElement`
const moneyPlus = document.documentElement.getAttribute('money-plus')
const moneyMinus = document.documentElement.getAttribute('money-minus')
const list = document.documentElement.getAttribute('list')
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
  
}
