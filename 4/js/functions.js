// Функция для проверки длины строки.
// Она принимает строку, которую нужно проверить на максимальную длину, и возвращает true, если строка меньше или равна указанной длине,
// и false, если строка длиннее.
function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}

checkStringLength('sdfaaf', 10);

//Функция для проверки, является ли строка палиндромом.
function checkStringPalindrome(str) {
  const normalizedStr = str.replaceAll(' ', '').toLowerCase();
  let reversedStr = '';
  for (let i = normalizedStr.length - 1; i >= 0; i--) {
    const char = normalizedStr.at(i);
    reversedStr += char;
  }
  if (reversedStr === normalizedStr) {
    return true;
  }
  return false;
}

checkStringPalindrome('топот');

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
// Если в строке нет ни одной цифры, функция должна вернуть NaN:
function extractNumber(str) {
  const normalizedStr = str.toString();
  let resultStr = '';

  for (let i = 0; i < normalizedStr.length; i++) {
    const char = normalizedStr.at(i);
    if (!Number.isNaN(parseInt(char, 10))) {
      resultStr += char;
    }
  }

  if (resultStr === '') {
    return NaN;
  }

  return parseInt(resultStr, 10);
}

extractNumber('fsd8dfa6asd4');
