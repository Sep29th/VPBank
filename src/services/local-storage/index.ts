export function getLocalStorage(key: string): string {
  const result: string | null = localStorage.getItem(key);
  return result !== null ? result : "";
}

export function setLocalStorage(key: string, value: string | number | symbol | boolean): void {
  key !== "" && localStorage.setItem(key, value.toString());
}

export function deleteLocalStorage(key: string): void {
  key !== "" && localStorage.removeItem(key);
}

export function deleteAllLocalStorage(): void {
  localStorage.clear();
}