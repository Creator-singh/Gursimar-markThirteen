const date = document.querySelector("#date");
const check = document.querySelector("#check");
const output = document.querySelector("#output");

function reverseStr(str)
{
  var listOfChars = str.split('');
  var reverseList = listOfChars.reverse();
  var reversedStr = reverseList.join('');
  return reversedStr;
}

function isPalindrome(str)
{
  var revStr = reverseStr(str);
  return str === revStr;
}

function convertDateToStr(date)
{
  var dateStr = {day: '', month: '', year: ''};
  if(date.day < 10)
  {
    dateStr.day = '0' + date.day;
  }
  else
  {
    dateStr.day = date.day.toString();
  }
  if(date.month < 10)
  {
    dateStr.month = '0' + date.month;
  }
  else
  {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();
  return dateStr;
}

function allDateFormats(date)
{
  var dateStr = convertDateToStr(date);
  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year; 
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  var dateList = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
  return dateList;
} 

function checkPalindromeForDate(date)
{
  var listOfDate = allDateFormats(date);
  var flag = false;

  for(var i=0; i< listOfDate.length; i++)
  {
    if(isPalindrome(listOfDate[i]))
    {
      flag = true;
      break;
    }
  }
  return flag;
}


function checkLeapYear(year)
{
  if(year % 400 === 0)
  {
    return true;
  }
  if(year % 4 === 0)
  {
    return true;
  }
  if(year % 100 === 0)
  {
    return false;
  }
  return false;
}

function getNextDate(date)
{
  var day = date.day+1;
  var month = date.month;
  var year = date.year;

  var daysEveryMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if(month === 2)
  {
    if(checkLeapYear(year))
    {
      if(day > 29)
      {
        day = 1;
        month = month + 1;
      }
    }
    else 
    {
      if(day > 28)
      {
        day = 1;
        month = month + 1;
      }
    }
  }
  else
  {
    if(day > daysEveryMonth[month - 1])
    {
      day = 1;
      month = month + 1;
    }
  }

  if(month > 12)
  {
    month = 1;
    year = year + 1;
  }

  return {day: day, month: month, year: year}
}

function nextPalindrome(date)
{
  var counter = 0;
  var nextDate = getNextDate(date);

  while(1)
  {
    counter = counter + 1;
    var palindrome = checkPalindromeForDate(nextDate);
    if(palindrome)
    {
      break;
    }
    nextDate = getNextDate(nextDate);
  }

  return [counter, nextDate];
}

function clickHandler()
{
    var bdayStr = date.value;
    if(bdayStr !== '')
    {
        var arrayOfDate = bdayStr.split('-');
        var dateObject = {
            day: Number(arrayOfDate[2]),
            month: Number(arrayOfDate[1]),
            year: Number(arrayOfDate[0])
        }
        var checkingPalindrome = checkPalindromeForDate(dateObject);
        if(checkingPalindrome)
        {
            output.innerText = "Yay! Your Birthday is Palindrome🎉🎉";
        }
        else 
        {
            var [counter, nextDate] = nextPalindrome(dateObject);
            output.innerText = `Oops! Your Birthday is not Palindrome😢. The next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter} days!`;
        }
    }
}

check.addEventListener("click", clickHandler);