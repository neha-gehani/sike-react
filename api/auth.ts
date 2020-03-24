import { httpClient } from "./httpClient";
import Cookie from "js-cookie";
import { User } from "./interface";
import { COOKIES } from "../helpers/constants";


export const guestLogin = async (name: string): Promise<User> => {
  const result = await httpClient.post<User>("/auth/guest", {
    name: name
  }, false);
  Token.setToken(result.token)
  Cookie.set(COOKIES.authToken, result.token);
  return result;
};

export const isAuthenticated = () => {
  const token = Cookie.get(COOKIES.authToken);
  Token.setToken(token) 
  return !!token && token != ''
}

export class Token {
  static token: string;
  constructor() {
  }

  static getToken() {
    return this.token;
  }

  static setToken(newToken: string) {
    this.token = newToken;
  }
}

