import moment from "jalali-moment";
export const dateToPersian = (date) => {
  return moment(date, "YYYY jMMMM jDD")
    .locale("fa")
    .format("jMMMM jYYYY jDD  HH:MM");
};

export const datePersian = (date, type = "dateTime") => {
  const format = type === "dateTime" ? "YYYY/MM/DD - HH:mm" : "YYYY/MM/DD";
  return moment(date).locale("fa").format(format);
};

export const dateToCharecter = (date) => {
  let splitDate = date?.split("T")[0];
  return moment(splitDate).locale("fa").format("jMMMM jYYYY jDD");
};

export const dateTimeToUtc = (date) => {
  const gmtDateTime = moment.utc(date, "YYYY-MM-DD HH:mm");
  return gmtDateTime.local().format("jYYYY-jMM-jDD HH:mm");
};
