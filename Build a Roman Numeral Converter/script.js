const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const romanMap = [
  { value: 1000, symb: "M" },
  { value: 900, symb: "CM" },
  { value: 500, symb: "D" },
  { value: 400, symb: "CD" },
  { value: 100, symb: "C" },
  { value: 90, symb: "XC" },
  { value: 50, symb: "L" },
  { value: 40, symb: "XL" },
  { value: 10, symb: "X" },
  { value: 9, symb: "IX" },
  { value: 5, symb: "V" },
  { value: 4, symb: "IV" },
  { value: 1, symb: "I" }
];

function reset() {
  numberInput.value = "";
  output.value = "";
}

numberInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter") checkInput(); 
})

const checkInput = () => {
  const number = parseInt(numberInput.value);
  
  const error = validateInput(number);
  if(error) {
    output.textContent = error;
    output.className = "error";
    reset();
    return;
  }
  
  output.textContent = convertToRoman(number);
  output.className = "success";

}

function validateInput(num) {
  if(!num || isNaN(num)) 
    return "Please enter a valid number";
  if(num <= 0) 
    return "Please enter a number greater than or equal to 1";
  if(num > 3999) 
    return "Please enter a number less than or equal to 3999";
}

const convertToRoman = (num) => {
  let result = "";

  for(const { value, symb} of romanMap) {
    while(num >= value) {
      result += symb;
      num -= value;
    }
  }
  return result;
} 

convertBtn.addEventListener("click", checkInput);