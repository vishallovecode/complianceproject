export const isEmpty = (obj) => Object.keys(obj).length === 0;
export const getDate = (timestamp) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dateObj = new Date(timestamp);
  const date = dateObj.getDate();
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  return `${date} ${month} ${year}`;
}


export const getMonthDayYear = (timestamp) => {
  const dateObj = new Date(timestamp);
  const date = dateObj.getDate().toString();
  const month = dateObj.getMonth().toString();
  const year = dateObj.getFullYear().toString();
  return (date + month + year).toString();
}