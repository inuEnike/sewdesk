export const formattedDate = (date: string | Date) => {
  const value = date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      })
    : "N/A";

  return value;
};
