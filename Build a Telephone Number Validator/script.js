const input = document.getElementById("user-input");

const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultContainer = document.getElementById("results-div")

const countryRegex = /^1\s?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/;

const areaRegex = /^(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/;

const acceptList = [countryRegex, areaRegex];

const checkNumber = value => acceptList.some(regex => regex.test(value))
  ;

const handleOutput = value => {
  if (!value) {
    alert("Please provide a phone number");
    return;
  }

  if (checkNumber(value)) {
    const result = document.createElement("p");
    result.classList.add("result");
    result.innerText = `Valid US number: ${value}`;
    resultContainer.appendChild(result);
  } else {
    const result = document.createElement("p");
    result.classList.add("result");
    result.innerText = `Invalid US number: ${value}`;
    resultContainer.appendChild(result);
  }
}

checkBtn.addEventListener("click", () => {
  const value = input.value.trim();
  handleOutput(value);
  input.value ="";
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const value = input.value.trim();
    handleOutput(value);
    input.value = "";
  }
})

clearBtn.addEventListener("click", () => {
  resultContainer.textContent = "";
  input.value = "";
});