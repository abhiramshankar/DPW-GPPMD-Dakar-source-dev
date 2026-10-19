// Format integers as whole numbers with commas
const fmtAmounts = (amounts: any): string => {
  if (!amounts) return "0";
  return amounts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export default fmtAmounts;
