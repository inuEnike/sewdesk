export const logoInitials = (business_name: string) => {
  const logo = business_name
    ? business_name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "BI";
  return logo;
};
