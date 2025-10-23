import moment from "moment";
const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("result");
  localStorage.removeItem("temp_email");
  localStorage.removeItem("profileImage");
  localStorage.removeItem("location_address");
  localStorage.clear();
  // signOut("google");
};
const countCharacters = (str) => {
  // use the \s quantifier to remove all white space
  let remText = str.replace(/\s/g, " ");

  // get the length of the string after removal
  let length = remText.length;
  return length;
};

const getFormattedDateFromTwoSeperateDates = async (date1, date2) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const finalFormattedDate = new Date(
    monthNames[date1.getMonth()] +
      " " +
      date1.getDate() +
      ", " +
      date1.getFullYear() +
      " " +
      date2.toLocaleTimeString() +
      " GMT+6:00"
  );
  return finalFormattedDate.toISOString();
};

const compareTwoDates = (date1, date2, type) => {
  let diff = new Date(date2) - new Date(date1);
  // default javascript date was giving same date difference to -1
  // diff = diff + 86400000;
  let finalResult = 0;
  if (type === "miliseconds") {
    finalResult = diff;
  } else if (type === "seconds") {
    finalResult = Math.floor(diff / 1000);
  } else if (type === "minutes") {
    finalResult = Math.floor(diff / (60 * 1000));
  } else if (type === "hours") {
    finalResult = Math.floor(diff / (60 * 60 * 1000));
  } else if (type === "days") {
    finalResult = Math.floor(diff / (24 * 60 * 60 * 1000));
  } else if (type === "months") {
    finalResult = Math.floor(diff / (30 * 24 * 60 * 60 * 1000));
  } else if (type === "years") {
    finalResult = Math.floor(diff / (365 * 30 * 24 * 60 * 60 * 1000));
  }
  // console.log("result ", finalResult);
  return finalResult;
};
const displayNameAndOthersFieldInShort = (data, length) => {
  if (data === null || data === undefined || data === "") {
    return "";
  }
  if (data.length > length) {
    let displayEventName = data.slice(0, length);

    displayEventName = displayEventName + " ...";

    return displayEventName;
  } else {
    return data;
  }
};
// given DateTime format: 2023-05-04T05:41:08.122Z convert to May 4, 2023
const getFormattedDateFromDateTime5 = (dateTime) => {
  const date = new Date(dateTime);
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
};
////////////////////////////////
const allowOnlyNumeric = (event) => {
  if (!(event.charCode >= 48 && event.charCode <= 57)) {
    event.preventDefault();
  }
};

const onlyNameInput = (data) => {
  let tempString = "";

  for (let i = 0; i < data.length; i++) {
    const asciiValue = data.charCodeAt(i);

    if (
      (asciiValue >= 65 && asciiValue <= 90) || // Uppercase letters (A-Z)
      (asciiValue >= 97 && asciiValue <= 122) || // Lowercase letters (a-z)
      asciiValue === 32 || // Space character
      asciiValue === 39 // Apostrophe character (')
    ) {
      tempString += data.charAt(i);
    }
  }

  return tempString;
};

const onlyEmailInput = (data) => {
  let tempString = "";

  for (let i = 0; i < data.length; i++) {
    const asciiValue = data.charCodeAt(i);

    if (
      (asciiValue >= 65 && asciiValue <= 90) || // Uppercase letters (A-Z)
      (asciiValue >= 97 && asciiValue <= 122) || // Lowercase letters (a-z)
      (asciiValue >= 48 && asciiValue <= 57) || // Numbers (0-9)
      [43, 45, 46, 64, 95].includes(asciiValue) // Allowed special characters
    ) {
      tempString += data.charAt(i);
    }
  }

  return tempString;
};

const getFullDateFromDateTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // add 1 to get 1-12 instead of 0-11
  const day = date.getDate();

  const result = new Date(year, month, day);
  return result;
};

function getSystemTimeInMill() {
  return Date.now();
}

function getRandomNumber() {
  return Math.floor(1000000000 + Math.random() * 900000000);
}

const getRandomID = () => {
  const temp = getRandomNumber() + getSystemTimeInMill() + getRandomNumber();
  return String(temp);
};

// given DateTime format: 2023-05-04T05:41:08.122Z convert to 04-05-23(day-month-year)
const getFomattedDateFromDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const year = date.getFullYear().toString().substr(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

// given DateTime format: 2023-05-04T05:41:08.122Z convert to 5:41 AM(hour:minute AM/PM)
const getFomattedTimeFromDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
  return formattedTime;
};

const allowOnlyNumericWithPeriod = (e) => {
  const charCode = e.which ? e.which : e.keyCode;
  if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
    e.preventDefault();
  } else {
    const input = e.target.value + String.fromCharCode(charCode);
    const regex = /^\d*\.?\d{0,2}$/;
    if (!regex.test(input)) {
      e.preventDefault();
    }
  }
};

// given DateTime format: 2023-05-04T05:41:08.122Z convert to 04-May-2023(day-month-year)
const getFormattedDateFromDateTime2 = (dateTime) => {
  const date = new Date(dateTime);
  const day = date.getDate().toString().padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear().toString();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};
// given DateTime format: 2023-05-04T05:41:08.122Z convert to 4th May 2023(day month year)
const getFormattedDateFromDateTime4 = (dateTime) => {
  const date = new Date(dateTime);
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  return formattedDate;
};

// Helper function to get the ordinal suffix for the day
const getOrdinalSuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const checkNameValidation = (event) => {
  const charCode = event.charCode;
  const isValidChar =
    (charCode >= 65 && charCode <= 90) || // Uppercase letters (A-Z)
    (charCode >= 97 && charCode <= 122) || // Lowercase letters (a-z)
    charCode === 32 || // Space character
    charCode === 39; // apostrophe character (')

  if (!isValidChar) {
    event.preventDefault();
  }
};

const checkAlphaNumericValidation = (event) => {
  const charCode = event.charCode;
  const isValidChar =
    (charCode >= 48 && charCode <= 57) || // Numbers (0-9)
    (charCode >= 65 && charCode <= 90) || // Uppercase letters (A-Z)
    (charCode >= 97 && charCode <= 122); // Lowercase letters (a-z)

  if (!isValidChar) {
    event.preventDefault();
  }
};

const checkAlphaNumericWithSpaceValidation = (event) => {
  const charCode = event.charCode;
  const isValidChar =
    (charCode >= 48 && charCode <= 57) || // Numbers (0-9)
    (charCode >= 65 && charCode <= 90) || // Uppercase letters (A-Z)
    (charCode >= 97 && charCode <= 122) || // Lowercase letters (a-z)
    charCode === 32 || // Space character
    charCode === 39; // apostrophe character (')

  if (!isValidChar) {
    event.preventDefault();
  }
};

const checkPhoneValidation = (event) => {
  const charCode = event.charCode;
  const isValidChar =
    (charCode >= 48 && charCode <= 57) || // Numbers (0-9)
    charCode === 43 || // Plus sign (+)
    charCode === 45 || // Hyphen (-)
    charCode === 46 || // Period (.)
    charCode === 32 || // Space character
    charCode === 40 || // Opening parenthesis
    charCode === 41; // Closing parenthesis

  if (!isValidChar) {
    event.preventDefault();
  }
};

const checkNameValidationWithDot = (event) => {
  const charCode = event.charCode;
  const isValidChar =
    (charCode >= 65 && charCode <= 90) || // Uppercase letters (A-Z)
    (charCode >= 97 && charCode <= 122) || // Lowercase letters (a-z)
    charCode === 32 || // Space character
    charCode === 46; // Dot character

  if (!isValidChar) {
    event.preventDefault();
  }
};

// given DateTime format: 05-06-23(day-month-year) convert to 04-May-2023(day-month-year)
const getFormattedDateFromDateTime3 = (dateTime) => {
  const parts = dateTime.split("-");
  const day = parts[0].padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[Number(parts[1]) - 1];
  const year = `20${parts[2]}`;
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

const getAllMonthNames = () => {
  const monthNames = [];

  for (let month = 0; month < 12; month++) {
    const date = new Date(2000, month, 1); // Using a fixed year (2000 in this case)
    const monthName = date.toLocaleString("en-US", { month: "long" });
    monthNames.push(monthName);
  }

  return monthNames;
};

const getYearList = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 1950;
  const years = [];

  for (let year = currentYear; year >= startYear; year--) {
    years.push(year.toString());
  }

  return years;
};

const checkAlphaNumericWithSomeSpecialCharectersValidation = (event) => {
  const charCode = event.charCode;
  const isValidChar =
    (charCode >= 48 && charCode <= 57) || // Numbers (0-9)
    (charCode >= 65 && charCode <= 90) || // Uppercase letters (A-Z)
    (charCode >= 97 && charCode <= 122) || // Lowercase letters (a-z)
    charCode === 32 || // Space character
    charCode === 95 || // underscore character (_)
    charCode === 45 || // hyphen character (-)
    charCode === 46 || // dot character (.)
    charCode === 124; // vertical bar character (|)

  if (!isValidChar) {
    event.preventDefault();
  }
};

const onlyCharectersWithSpace = (event) => {
  const charCode = event.charCode;
  const isValidChar =
    (charCode >= 65 && charCode <= 90) || // Uppercase letters (A-Z)
    (charCode >= 97 && charCode <= 122) || // Lowercase letters (a-z)
    charCode === 32; // Space character

  if (!isValidChar) {
    event.preventDefault();
  }
};

const nameCharactersCountAndEmptyCheck = (firstName, lastName) => {
  let tempName = "";
  if (firstName.trim() === "" && lastName.trim() === "") {
    tempName = "User";
  } else if (firstName.trim() === "") {
    if (lastName.length < 10) {
      tempName = lastName;
    } else {
      tempName = lastName.substring(0, 10);
    }
  } else {
    if (firstName.length < 10) {
      tempName = firstName;
    } else {
      tempName = firstName.substring(0, 10);
    }
  }
  return tempName;
};

const createBlobFromString = (str, type = "text/plain") => {
  // Convert the string to an array buffer
  const buffer = new ArrayBuffer(str.length);
  const bufferView = new Uint8Array(buffer);
  for (let i = 0; i < str.length; i++) {
    bufferView[i] = str.charCodeAt(i);
  }

  // Create a Blob from the array buffer
  const blob = new Blob([bufferView], { type });
  // console.log("blob", blob);
  return blob;
};

// given DateTime format: 2023-05-04T05:41:08.122Z convert to 4 May 2023 5:41 PM(day month year time AM/PM)
const getFormattedDateFromDateTime6 = (dateTime) => {
  const date = new Date(dateTime);
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

  return formattedDate + " " + formattedTime;
};
// given DateTime format: 2023-05-04T05:41:08.122Z convert to 4 May 2023(day month year)
const getFormattedDateFromDateTime7 = (dateTime) => {
  const date = new Date(dateTime);
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
};
const createQRCodeData = (
  id,
  event_name,
  participant_name,
  // event_start_date,
  // event_end_date,
  ticket_name,
  ticket_quantity,
  total_ticket_price,
  event_type
  // event_address_line1,
  // event_platform,
  // event_platform_link,
  // firstName,
  // lastName,
) => {
  let finalData = "";

  if (id) {
    finalData = finalData + "ID : " + id + "\n";
  }

  if (event_name) {
    finalData = finalData + "Event Name : " + event_name + "\n";
  }

  if (participant_name) {
    finalData = finalData + "Participant Name : " + participant_name + "\n";
  }

  // if (event_start_date) {
  //   finalData =
  //     finalData +
  //     "Start Date : " +
  //     moment(event_start_date).format("MMM DD YYYY hh:mm A") +
  //     "\n";
  // }
  // if (event_end_date) {
  //   finalData =
  //     finalData +
  //     "End Date : " +
  //     moment(event_end_date).format("MMM DD YYYY hh:mm A") +
  //     "\n";
  // }
  if (total_ticket_price) {
    finalData = finalData + "Price : $" + total_ticket_price.toString() + "\n";
  } else {
    finalData = finalData + "Price : $0 \n";
  }
  if (ticket_quantity) {
    finalData = finalData + "Quantity : " + ticket_quantity + "\n";
  }

  // if (event_type) {
  //   finalData = finalData + "Event Type : " + event_type + "\n";
  // }
  // if (event_address_line1) {
  //   finalData = finalData + "Location : " + event_address_line1 + "\n";
  // }
  // if (event_platform) {
  //   finalData = finalData + "Platform : " + event_platform + "\n";
  // }
  // if (event_platform_link) {
  //   finalData = finalData + "Link : " + event_platform_link + "\n";
  // }
  // if (firstName) {
  //   if (lastName) {
  //     finalData =
  //       finalData + "Organized By : " + firstName + " " + lastName + "\n";
  //   } else {
  //     finalData = finalData + "Organized By : " + firstName + "\n";
  //   }
  // } else {
  //   if (lastName) {
  //     finalData = finalData + "Organized By : " + lastName + "\n";
  //   }
  // }

  return finalData;
};

const timeZones = [
  "(UTC-12:00) International Date Line West",
  "(UTC-11:00) Coordinated Universal Time-11",
  "(UTC-10:00) Hawaii",
  "(UTC-09:00) Alaska",
  "(UTC-08:00) Pacific Time (US & Canada)",
  "(UTC-07:00) Mountain Time (US & Canada)",
  "(UTC-07:00) Arizona",
  "(UTC-06:00) Central Time (US & Canada)",
  "(UTC-06:00) Mexico City",
  "(UTC-05:00) Eastern Time (US & Canada)",
  "(UTC-05:00) Bogota, Lima",
  "(UTC-04:00) Atlantic Time (Canada)",
  "(UTC-04:00) Caracas",
  "(UTC-03:30) Newfoundland",
  "(UTC-03:00) Buenos Aires",
  "(UTC-03:00) Greenland",
  "(UTC-02:00) Coordinated Universal Time-02",
  "(UTC-01:00) Azores",
  "(UTC-00:00) Coordinated Universal Time",
  "(UTC+00:00) Dublin, Edinburgh, Lisbon, London",
  "(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
  "(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague",
  "(UTC+01:00) Brussels, Copenhagen, Madrid, Paris",
  "(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb",
  "(UTC+02:00) Athens, Bucharest",
  "(UTC+02:00) Cairo",
  "(UTC+02:00) Harare, Pretoria",
  "(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius",
  "(UTC+03:00) Istanbul",
  "(UTC+03:00) Jerusalem",
  "(UTC+03:00) Minsk",
  "(UTC+03:00) Moscow, St. Petersburg",
  "(UTC+03:00) Nairobi",
  "(UTC+03:30) Tehran",
  "(UTC+04:00) Abu Dhabi, Muscat",
  "(UTC+04:00) Baku",
  "(UTC+04:00) Tbilisi",
  "(UTC+04:30) Kabul",
  "(UTC+05:00) Ekaterinburg",
  "(UTC+05:00) Islamabad, Karachi",
  "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
  "(UTC+05:45) Kathmandu",
  "(UTC+06:00) Astana",
  "(UTC+06:00) Dhaka",
  "(UTC+06:30) Yangon (Rangoon)",
  "(UTC+07:00) Bangkok, Hanoi, Jakarta",
  "(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi",
  "(UTC+08:00) Kuala Lumpur, Singapore",
  "(UTC+08:00) Taipei",
  "(UTC+09:00) Osaka, Sapporo, Tokyo",
  "(UTC+09:00) Seoul",
  "(UTC+09:30) Adelaide",
  "(UTC+09:30) Darwin",
  "(UTC+10:00) Brisbane",
  "(UTC+10:00) Canberra, Melbourne, Sydney",
  "(UTC+10:00) Guam, Port Moresby",
  "(UTC+11:00) Magadan, Solomon Islands, New Caledonia",
  "(UTC+12:00) Auckland, Wellington",
  "(UTC+12:00) Fiji, Kamchatka, Marshall Is.",
  "(UTC+13:00) Nuku'alofa",
  "(UTC+14:00) Kiritimati Island",
];

const convertLocalDateTimeToUTCFormat = (locatDateTime) => {
  // Example: Create a moment object for the local date-time
  const localDateTime = moment(locatDateTime); // Local date-time

  // Convert the local date-time to UTC
  const utcDateTime = localDateTime.utc();

  // Format the UTC date-time as a string (optional)
  const utcDateTimeString = utcDateTime.format("YYYY-MM-DD HH:mm:ss");

  // console.log(utcDateTimeString); // Output: 2024-09-04 07:30:00
  return utcDateTimeString;
};

const convertUTCDateTimeToUserSelectedTime = (dateTime, userTimeZone) => {
  // Regular expression to match the +06:00 part
  const match = userTimeZone.match(/\(UTC([+-]\d{2}:\d{2})\)/);

  // Extract the matched part
  const offset = match ? match[1] : null;

  // Example: Create a moment object for a UTC date-time
  const utcDateTime = moment.utc(dateTime); // UTC date-time

  // Convert the UTC date-time to CST (UTC-06:00)
  const cstDateTime = utcDateTime.utcOffset(offset);

  // console.log("asdsadfsafd sagor", cstDateTimeString);
  return cstDateTime._d;
};

const getTimeZoneUTC = (userTimeZone) => {
  // Regular expression to match the +06:00 part
  const match = userTimeZone?.match(/\(UTC([+-]\d{2}:\d{2})\)/);

  // Extract the matched part
  const offset = match ? match[1] : null;

  return offset;
};

function timeToDecimal(timeString) {
  if (timeString !== undefined && timeString !== null && timeString !== "") {
    // console.log("sagor == ", timeString);
    const getFromTimeZoneOffset = getTimeZoneUTC(timeString);

    // Split the time string into hours and minutes
    if (getFromTimeZoneOffset) {
      const [hours, minutes] = getFromTimeZoneOffset?.split(":")?.map(Number);

      // Convert the minutes to a decimal by dividing by 60
      const decimalMinutes = minutes / 60;

      // Add the hours and decimal minutes together
      const decimalTime = hours + decimalMinutes;

      return decimalTime;
    }
  }
}

const convertTimeZone = (dateString, fromTimeZone, toTimeZone) => {
  // Parse the date string
  const eventDate = new Date(dateString);
  // Convert both time zones to decimal format
  const decimalTime1 = timeToDecimal(fromTimeZone);
  const decimalTime2 = timeToDecimal(toTimeZone);

  // If either time zone conversion failed, return an error
  if (
    decimalTime1 === null ||
    decimalTime2 === null ||
    decimalTime1 === undefined ||
    decimalTime2 === undefined
  ) {
    console.error("Invalid time zone(s)");
    return dateString;
  }
  // !Number.isNaN(ConvertedStartTime)
  // console.log("sagor 11 ", decimalTime1, decimalTime2);
  // Convert the event date to UTC using the 'from' time zone offset
  const utcTime = eventDate.getTime() - decimalTime1 * 60 * 60 * 1000;

  // Calculate the target time using the 'to' time zone offset (including fractional hours)
  const targetTime = utcTime + decimalTime2 * 60 * 60 * 1000;
  // Create a new Date object for the converted time
  const targetDate = new Date(targetTime);
  // Format the target date to be human-readable
  return targetDate.toLocaleString();
};

const cleanText = (text) => {
  // Remove HTML tags using a regular expression
  let cleanedText = text.replace(/<\/?[^>]+(>|$)/g, ""); // Remove all HTML tags

  // Trim leading and trailing whitespace
  cleanedText = cleanedText.trim();

  // Remove list numbers (e.g., "1. abc", "2) adsd")
  cleanedText = cleanedText.replace(/^\d+[\.\)]\s+/gm, "");

  // Remove bullet points if needed (e.g., "• abc")
  cleanedText = cleanedText.replace(/^\s*•\s+/gm, "");

  // Remove extra newlines or spaces between list items
  cleanedText = cleanedText.replace(/\n\s*\n/g, "\n");

  // Remove trailing newline characters that might be left at the end
  cleanedText = cleanedText.replace(/\n$/, "");

  return cleanedText;
};
// convert (gmt+06:00) Bangladesh Standard Time (BST) to Bangladesh Standard Time
const getTimeZoneUTCText = (userTimeZone) => {
  const match =
    userTimeZone?.match(/\) (.*?) (\(.*?\)|$)/) ||
    userTimeZone.match(/\(UTC[+-]\d{2}:\d{2}\)\s*(.*)/);
  return match ? match[1].trim() : null;
};

module.exports = {
  getTimeZoneUTCText,
  convertTimeZone,
  cleanText,
  getTimeZoneUTC,
  convertUTCDateTimeToUserSelectedTime,
  convertLocalDateTimeToUTCFormat,
  createQRCodeData,
  getFormattedDateFromDateTime7,
  getFormattedDateFromDateTime6,
  createBlobFromString,
  nameCharactersCountAndEmptyCheck,
  getFormattedDateFromDateTime5,
  displayNameAndOthersFieldInShort,
  compareTwoDates,
  getFormattedDateFromTwoSeperateDates,
  countCharacters,
  onlyCharectersWithSpace,
  checkAlphaNumericWithSomeSpecialCharectersValidation,
  getYearList,
  getAllMonthNames,
  getFormattedDateFromDateTime4,
  getFormattedDateFromDateTime3,
  checkNameValidationWithDot,
  checkPhoneValidation,
  checkAlphaNumericWithSpaceValidation,
  checkAlphaNumericValidation,
  checkNameValidation,
  getFormattedDateFromDateTime2,
  getRandomID,
  getRandomNumber,
  getSystemTimeInMill,
  getFullDateFromDateTime,
  onlyEmailInput,
  onlyNameInput,
  allowOnlyNumeric,
  getFomattedDateFromDateTime,
  getFomattedTimeFromDateTime,
  allowOnlyNumericWithPeriod,
  logOut,
  timeZones,
};