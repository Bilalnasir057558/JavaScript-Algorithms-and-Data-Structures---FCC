let price = 19.5;
let cid = [
  ['PENNY', 0.5],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];

const currency = {
  'ONE HUNDRED': 10000,
  'TWENTY': 2000,
  'TEN': 1000,
  'FIVE': 500,
  'ONE': 100,
  'QUARTER': 25,
  'DIME': 10,
  'NICKEL': 5,
  'PENNY': 1,
}


const purchaseBtn = document.getElementById("purchase-btn");
const drawerContainer = document.getElementById("drawer-container");
const changeDueDiv = document.getElementById("change-due");
document.getElementById("item-price").innerHTML += `$${price}`;

const renderDrawer = () => {
  drawerContainer.innerHTML = "";
  let drawerText = "";
  cid.forEach(([name, amount]) => {
    drawerText +=
      `<div class="drawer">
      <p>${name}</p>
      <p>$${amount}</p>
    </div>
    `;
  })
  drawerContainer.innerHTML = drawerText;
}

renderDrawer();

function handleInput(cash) {
  if (!cash) {
    alert("Enter cash...");
    return;
  }

  const regex = /[e+-]/g;
  return cash.replace(regex, "");
}


purchaseBtn.addEventListener("click", () => {
  const cash = document.getElementById("cash");

  
  // handling (e, +, -) in input fields
  const valid_cash = handleInput(cash.value);

  if(!valid_cash) return;
  
  console.log(valid_cash, price);
  if(valid_cash < price) {
    alert("Customer does not have enough money to purchase the item");
    cash.value = "";
    return;
  }

  if(Number(valid_cash) === price) {
    changeDueDiv.textContent = "No change due - customer paid with exact cash";
    cash.value = "";
    return;
  }

  const result = checkCashRegister(valid_cash, price, cid);

  formatResult(result);

});

function formatResult({status, change}) {

  let output = `Status: ${status}`;

  change.forEach(([name, amount]) => {
    output += ` ${name}: $${amount}`;
  });

  changeDueDiv.innerHTML = output;
}

function checkCashRegister(cash, price, cid) {

  // changeDue in cents
  let changeDue = Math.round((cash - price) * 100);


  // drawer in cents
  const drawer = cid.map(([name, amount]) =>
    [name, Math.round(amount * 100)]
  );

  const total = drawer.reduce((acc, [, el]) => acc + el, 0);

  if (total < changeDue) {
    return { 'status': 'INSUFFICIENT_FUNDS', change: [] };
  };

  if (total === changeDue) {
    let closedChange = [...cid].filter(([, amount]) => amount > 0).reverse();
    return { 'status': 'CLOSED', change: closedChange };
  };

  const reversed = [...drawer].reverse();

  let change = [];

  for (let [name, amount] of reversed) {
    let value = currency[name];
    let used = 0;

    while (changeDue >= value && amount > 0) {
      changeDue -= value;
      amount -= value;
      used += value;
    }

    if (used > 0) change.push([name, used / 100]);
  };

  if (changeDue > 0) {
    return { 'status': 'INSUFFICIENT_FUNDS', change: [] };
  }

  return { 'status': 'OPEN', change: change };

}