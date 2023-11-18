export const months = [
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

export function displayDateTime(dateElement, timeElement) {
  const date = new Date();

  // Display the date
  dateElement.innerText = `${date.getDate()} ${
    months[date.getMonth()]
  }, ${date.getFullYear()}`;

  // Display the time
  if (date.getHours() < 12 || date.getHours() === 0) {
    timeElement.innerText = `${String(date.getHours()).padStart(
      2,
      "0"
    )}:${String(date.getMinutes()).padStart(2, "0")} AM`;
  } else {
    timeElement.innerText = `${String(date.getHours() % 12).padStart(
      2,
      "0"
    )}:${String(date.getMinutes()).padStart(2, "0")} PM`;
  }
}