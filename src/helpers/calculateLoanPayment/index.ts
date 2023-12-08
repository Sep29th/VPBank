export function calculateLoanPayments(principal: number, months: number, date: Date): any {
  const goc: number = principal / months;
  const currentDate: Date = new Date(date);
  currentDate.setMonth(currentDate.getMonth() + 1);
  return [...Array(months)].map((_, index: number) => {
    const tienThang: number = goc + principal / 100;
    principal = principal - goc;
    const month: string = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    currentDate.setMonth(currentDate.getMonth() + 1);
    return {
      key: index,
      quad: `Kỳ thứ ${index + 1}`,
      value: Math.round(tienThang).toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ",
      month: month
    }
  })
}