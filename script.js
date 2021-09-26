const resultEl = document.getElementById('result');
const clipboardEl = document.getElementById('clipboard');
const lenghtEl = document.getElementById('lenght');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const genBtnEl = document.getElementById('genBtn');

const randomFunc = {
  upper: getRandomUpper,
  lower: getRandomLower,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

const regexFunc = {
  upper: /[A-Z]/gm,
  lower: /[a-z]/gm,
  number: /[0-9]/gm,
  symbol: /[!@#$%^&*(){}\[\]+<>\/,.]/gm,
};

clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Password copied to clipboard!');
});

genBtnEl.addEventListener('click', () => {
  const lenght = +lenghtEl.value;
  const hasUpper = uppercaseEl.checked;
  const hasLowercase = lowercaseEl.checked;
  const hasNumbers = numbersEl.checked;
  const hasSymbols = symbolsEl.checked;

  resultEl.innerText = generatePassword(hasUpper, hasLowercase, hasNumbers, hasSymbols, lenght);
});

function generatePassword(upper, lower, number, symbol, lenght) {
  let countValid = 0;
  let generatedPassword = '';
  const typesCount = upper + lower + number + symbol;

  const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(elem => Object.values(elem)[0]);

  if (typesCount === 0) {
    return '';
  }

  const newTypes = typesArr.map(type => Object.keys(type)[0]);

  let checkValid = [null];

  while (checkValid.includes(null)) {
    generatedPassword = '';
    for (let i = 0; i < lenght; i++) {
      generatedPassword += randomFunc[newTypes[Math.floor(Math.random() * newTypes.length)]]();
    }

    checkValid = newTypes.map(re => generatedPassword.match(regexFunc[re]));
  }

  return generatedPassword;
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]+<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
