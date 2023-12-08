export const formatMoney = (old: string): string => {
  if (old === "") return "0";
  if (old.length === 2 && old.substring(0, 1) === "0") return old.substring(1);
  if (old.length === 12) return old.substring(0, 11);
  return old.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}