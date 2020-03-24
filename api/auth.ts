import { httpClient } from "./httpClient";
import Cookie from "js-cookie";
import { User } from "./interface";
import { COOKIES } from "../helpers/constants";

export class Auth {
  private token: string;
  
  constructor() {
    const token = Cookie.get(COOKIES.authToken);
    this.setToken(token);
  }

  getToken() {
    return this.token;
  }

  setToken(newToken: string) {
    Cookie.set(COOKIES.authToken, newToken);
    this.token = newToken;
  }
}

const auth = new Auth();

export const guestLogin = async (name: string): Promise<User>  => {
  const result = await httpClient.post<User>("/auth/guest", {
    name: name
  }, false);

  auth.setToken(result.token)
  
  return result;
};

export const isAuthenticated = () => {
  return !!auth.getToken && auth.getToken() != ''
}

export const getToken = () => {
  return auth.getToken();
}

