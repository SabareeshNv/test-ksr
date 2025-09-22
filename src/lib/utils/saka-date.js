function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Saka months lengths
const sakaMonthDays = {
  common: [30, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30], // non-leap
  leap: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30], // leap
};

const sakaMonthNames = [
  "Chaitra",
  "Vaisakha",
  "Jyaishtha",
  "Ashadha",
  "Shravana",
  "Bhadra",
  "Ashwin",
  "Kartika",
  "Agrahayana",
  "Pausha",
  "Magha",
  "Phalguna",
];

// Days in Gregorian months
const gregorianMonthDays = (year) => [
  31,
  isLeapYear(year) ? 29 : 28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
];

export function gregorianToSaka(gYear, gMonth, gDay) {
  const leap = isLeapYear(gYear);
  const startDay = leap ? 21 : 22;
  const startMonth = 3; // March (index 3 = April since months are 0-based)

  let sakaYear = gYear - 78;

  // Find day of year for Gregorian
  let gDayOfYear = gDay;
  for (let i = 0; i < gMonth; i++) {
    gDayOfYear += gregorianMonthDays(gYear)[i];
  }

  // Find start day of Saka year in Gregorian
  let sakaStartDayOfYear = startDay;
  for (let i = 0; i < startMonth - 1; i++) {
    sakaStartDayOfYear += gregorianMonthDays(gYear)[i];
  }

  let sakaDayOfYear = gDayOfYear - sakaStartDayOfYear;

  if (sakaDayOfYear < 0) {
    // Previous Saka year
    sakaYear -= 1;
    const prevLeap = isLeapYear(gYear - 1);
    const daysInYear = prevLeap ? 366 : 365;
    sakaDayOfYear += daysInYear - (sakaStartDayOfYear - 1);
  }

  const monthDays = leap ? sakaMonthDays.leap : sakaMonthDays.common;

  let sakaMonth = 0;
  while (sakaDayOfYear >= monthDays[sakaMonth]) {
    sakaDayOfYear -= monthDays[sakaMonth];
    sakaMonth++;
  }

  return {
    year: sakaYear,
    month: sakaMonthNames[sakaMonth],
    day: sakaDayOfYear + 1,
  };
}

export function convertToSaka() {
  const dateInput = document.getElementById("gregorian-date").value;
  if (!dateInput) {
    document.getElementById("result").innerText = "Please select a date.";
    return;
  }

  const [year, month, day] = dateInput.split("-").map(Number);
  const sakaDate = gregorianToSaka(year, month - 1, day);

  // Get weekday name
  const weekdayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dateObj = new Date(dateInput);
  const weekday = weekdayNames[dateObj.getDay()];

  document.getElementById("result").innerText =
    `${weekday}, ${sakaDate.day} ${sakaDate.month}, ${sakaDate.year}`;
}
