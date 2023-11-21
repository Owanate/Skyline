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
  dateElement.textContent = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;

  //Set the datetime 
  timeElement.setAttribute("datetime", `${date.getFullYear()}-${(date.getMonth())+1}-${date.getDate()}`);

  // Display the time
  if (date.getHours() < 12 || date.getHours() === 0) {
    timeElement.textContent = `${String(date.getHours()).padStart(
      2,
      "0"
    )}:${String(date.getMinutes()).padStart(2, "0")} AM`;
  } else {
    timeElement.textContent = `${String(date.getHours() % 12).padStart(
      2,
      "0"
    )}:${String(date.getMinutes()).padStart(2, "0")} PM`;
  }
}