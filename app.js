const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const form = document.getElementById("form");

const localsStorageTransaction = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null
    ? localsStorageTransactions
    : [];

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please and a Text and Amount");
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateLocalStorage();

    updateValue();

    text.value = "";
    amount.value = "";
  }
}
// Generate Random iD

function generateId() {
  return Math.floor(Math.random() * 10000000);
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">x</button>
    `;

  list.appendChild(item);
}

function removeTransaction(id) {
  transactions = transactions.filter((transactions) => transactions.id !== id);

  updateLocalStorage();

  init();
}

function updateValue() {
  const amounts = transactions.map((transactions) => transactions.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

function init() {
  list.innerHTML = "";
  updateValue();

  transactions.forEach(addTransactionDOM);
}

init();

form.addEventListener("submit", addTransaction);

function updateLocalStorage() {
  localStorage.setItem("transaction", JSON.stringify(transactions));
}
