import {getLocalStorage} from "../local-storage";

const API_DOMAIN: string = import.meta.env.VITE_REACT_APP_API_URL;

export const get = async (path: string): Promise<any> => {
  const response: Response = await fetch(API_DOMAIN + path, {
    method: "GET",
    headers: {
      Authorization: 'Bearer ' + getLocalStorage("user-token")
    }
  });
  return await response.json();
}

export const post = async (path: string, options: object = {}): Promise<any> => {
  const response: Response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + getLocalStorage("user-token")
    },
    body: JSON.stringify(options)
  });
  return await response.json();
}

export const del = async (path: string): Promise<any> => {
  const response: Response = await fetch(API_DOMAIN + path, {
    method: "DELETE",
    headers: {
      Authorization: 'Bearer ' + getLocalStorage("user-token")
    }
  });
  if (!response.ok) {
    return await response.json();
  }
}

export const put = async (path: string, options: object = {}): Promise<any> => {
  const response: Response = await fetch(API_DOMAIN + path, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + getLocalStorage("user-token")
    },
    body: JSON.stringify(options)
  });
  return await response.json();
}
export const uploadFile = async (path: string, formData: FormData = new FormData()): Promise<any> => {
  const response: Response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Authorization: 'Bearer ' + getLocalStorage("user-token")
    },
    body: formData
  });
  return await response.json();
}