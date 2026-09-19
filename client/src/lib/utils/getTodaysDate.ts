export const getTodaysDate = () => {
  let date = new Date();
  const monthOfTheYear = [
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
  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const getMonthOfTheYear = monthOfTheYear[date.getMonth()];
  const getDayOfTheWeek = daysOfTheWeek[date.getDay()];
  const getToday = date.getDate();

  return {
    getDayOfTheWeek,
    getMonthOfTheYear,
    getToday,
  };
};
