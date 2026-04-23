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

// Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи
// в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.
// Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться
// как две цифры, так и одна. Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.
// Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.

function isMeetingValid(dayStart, dayEnd, meetingStart, duration) {
  const toMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startDayInMin = toMinutes(dayStart);
  const endDayInMin = toMinutes(dayEnd);
  const startMeetingInMin = toMinutes(meetingStart);
  const endMeetingInMin = (startMeetingInMin + duration);

  return startMeetingInMin >= startDayInMin && endMeetingInMin <= endDayInMin;
}

isMeetingValid('08:00', '17:30', '14:00', 90);
