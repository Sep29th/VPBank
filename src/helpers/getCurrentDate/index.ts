export function getCurrentDate(): string {
  const today: Date = new Date();
  const day: string = String(today.getDate()).padStart(2, '0');
  const month: string = String(today.getMonth() + 1).padStart(2, '0');
  const year: number = today.getFullYear();
  return `${day}/${month}/${year}`;
}