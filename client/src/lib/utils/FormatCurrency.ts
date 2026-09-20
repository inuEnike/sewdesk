export const FormatCurrency = (value: number) => {
  const formattedValue = value.toLocaleString("en-NG", {
    maximumFractionDigits: 2,
    currency: "NGN",
    style: "currency",
    minimumFractionDigits: 2,
  });

  return formattedValue;
};
