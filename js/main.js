const dayInp = document.querySelector('#day');
const monthInp = document.querySelector('#month');
const yearInp = document.querySelector('#year');
const submitBtn = document.querySelector('.submit-btn button');
const currentDate = new Date();
const yearsNumberOut = document.querySelector('#years .number');
const yearsTextOut = document.querySelector('#years .text');
const monthsNumberOut = document.querySelector('#months .number');
const monthsTextOut = document.querySelector('#months .text');
const daysNumberOut = document.querySelector('#days .number');
const daysTextOut = document.querySelector('#days .text');

const showAge = (age) => {
  const years = age.yearsResult;
  const months = age.monthsResult;
  const days = age.daysResult;

  if (years === 1) yearsTextOut.textContent = 'year';
  if (months === 1) monthsTextOut.textContent = 'month';
  if (days === 1) daysTextOut.textContent = 'day';

  yearsNumberOut.textContent = years;
  monthsNumberOut.textContent = months;
  daysNumberOut.textContent = days;
};

const calculateDate = (day, month, year) => {
  let daysResult = currentDate.getDate() - day;
  let monthsResult = (currentDate.getMonth() + 1) - month;
  let yearsResult = currentDate.getFullYear() - year;

  if (daysResult < 0) {
    daysResult = 30 + daysResult;
    monthsResult -= 1;
  }
  if (monthsResult < 0) {
    monthsResult = 12 + monthsResult;
    yearsResult -= 1;
  }

  return { daysResult, monthsResult, yearsResult };
};

const showAnError = (inp, msg) => {
  const input = inp;
  const inptsContainer = document.querySelector('.date-inputs');
  inptsContainer.classList.add('error-date-inputs');

  input.nextElementSibling.textContent = msg;
};

const dateValidate = (dayInput, monthInput, yearInput) => {
  if (dayInput === '' || monthInput === '' || yearInput === '') {
    if (dayInput === '') {
      showAnError(dayInp, 'This field is required');
    }
    if (monthInput === '') {
      showAnError(monthInp, 'This field is required');
    }
    if (yearInput === '') {
      showAnError(yearInp, 'This field is required');
    }
    return;
  }

  const day = Number(dayInput);
  const month = Number(monthInput);
  const year = Number(yearInput);

  if (currentDate.getFullYear() > year && year > 0) {
    if (month > 12 || month < 1) {
      showAnError(monthInp, 'Must be a valid month');
    } else if (month === 4) {
      if (day > 30 || day < 1) {
        showAnError(dayInp, 'Must be a valid date');
      } else {
        const ageResult = calculateDate(day, month, year);
        showAge(ageResult);
      }
    } else if (day > 31 || day < 1) {
      showAnError(dayInp, 'Must be a valid day');
    } else {
      const ageResult = calculateDate(day, month, year);
      showAge(ageResult);
    }
  } else if (currentDate.getFullYear() === year) {
    if ((currentDate.getMonth() + 1) > month && month >= 1) {
      if (month === 4) {
        if (day > 30 && day < 1) {
          showAnError(dayInp, 'Must be a valid date');
        } else {
          const ageResult = calculateDate(day, month, year);
          showAge(ageResult);
        }
      }
    } else if (currentDate.getMonth() + 1 === month) {
      if (currentDate.getDate() > day && day >= 1) {
        const ageResult = calculateDate(day, month, year);
        showAge(ageResult);
      } else {
        showAnError(dayInp, 'Must be a valid day');
      }
    } else if (day > 31 || day < 1) {
      showAnError(dayInp, 'Must be a valid day');
    } else if ((currentDate.getMonth() + 1) < month || month < 1) {
      showAnError(monthInp, 'Must be a valid Month');
    } else {
      const ageResult = calculateDate(day, month, year);
      showAge(ageResult);
    }
  } else {
    showAnError(yearInp, 'Must be a valid year');
  }
};

submitBtn.addEventListener('click', () => {
  dateValidate(dayInp.value, monthInp.value, yearInp.value);
});
