const moneyFormater = (price, count) => {
  if (!price) return 0;
  var countRaw = 1;
  if (count) countRaw = parseInt(count);
  var priceRaw = price * countRaw;
  return priceRaw
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .replace(/^\D+/g, "");
};

export { moneyFormater };
