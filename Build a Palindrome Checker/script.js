const inputElement = document.querySelector("#text-input");
const btnElement = document.querySelector("#check-btn");
const resultElement = document.querySelector("#result");

btnElement.addEventListener("click", handleCheck);
inputElement.addEventListener("keypress", (e) => {
  if(e.key === "Enter") handleCheck();
})

function handleCheck() {
  const inputValue = inputElement.value.trim();

  if(!inputValue) {
    alert("Please input a value");
    return;
  } 

  const result = isPalindrome(inputValue) ? `${inputValue} is a palindrome.` : `${inputValue} is not a palindrome.`;

  resultElement.textContent = result;
  inputElement.value = "";
}


function cleanInput(str) {
  const regex = /[^0-9a-z]/gi;
  return str.replace(regex, "");
}


function isPalindrome(str) {
  const cleaned = cleanInput(str.toLowerCase());
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}