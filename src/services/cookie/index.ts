export function getCookie(cname: string): string {
  const name: string = cname + "=";
  const ca: string[] = document.cookie.split(";");
  for (let i: number = 0; i < ca.length; i++) {
    let c: string = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function setCookie(cname: string, value: string | number | symbol | boolean, expire: number): void {
  const d: Date = new Date();
  d.setTime(d.getTime() + expire * 24 * 60 * 60 * 1000);
  const expires: string = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + value.toString() + "; " + expires;
}

export function deleteCookie(cname: string): void {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}

export function deleteAllCookie(): void {
  const cookies: string[] = document.cookie.split(";");
  for (let i: number = 0; i < cookies.length; i++) {
    const cookie: string = cookies[i];
    const eqPos: number = cookie.indexOf("=");
    const name: string = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}