// Функция для проверки длины строки.
// Она принимает строку, которую нужно проверить на максимальную длину, и возвращает true, если строка меньше или равна указанной длине,
// и false, если строка длиннее.

function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}

// Строка короче 20 символов
checkStringLength('qewqe', 20); // true
// Длина строки ровно 18 символов
checkStringLength('qwertyuiopasdfghjk', 18); // true
// Строка длиннее 10 символов
checkStringLength('qwertyuiopa', 10); // false


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

// Строка является палиндромом
checkStringPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
checkStringPalindrome('ДовОд'); // true
// Это не палиндром
checkStringPalindrome('Кекс'); // false
// Это палиндром
checkStringPalindrome('Лёша на полке клопа нашёл '); // true


// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
// Если в строке нет ни одной цифры, функция должна вернуть NaN:

function extractNumber(str) {
  const normalizedStr = str.toString();
  let resultStr = '';

  // Перебираем строку посимвольно
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

extractNumber('2023 год'); // 2023
extractNumber('ECMAScript 2022'); // 2022
extractNumber('1 кефир, 0.5 батона'); // 105
extractNumber('агент 007'); // 7
extractNumber('а я томат'); // NaN

//Если хотите усложнить задание, предусмотрите случай, когда вместо строки приходит число. Обратите внимание,
// что возвращать функция по-прежнему должна только целые положительные числа:

extractNumber(2023); // 2023
extractNumber(-1); // 1
extractNumber(1.5); // 15
