import { httpClient } from "./httpClient";
import Cookie from "js-cookie";
import { User } from "./interface";
import { COOKIES } from "../helpers/constants";

export class Auth {
  private token: string;

  constructor() {
    const token = Cookie.get(COOKIES.authToken);
    if (token !== undefined) {
      this.setToken(token);
    }
  }

  getToken() {
    return this.token;
  }

  setToken(newToken: string) {
    if (!!newToken) {
      Cookie.set(COOKIES.authToken, newToken);
      this.token = newToken;
    }
  }
}

const auth = new Auth();

export const guestLogin = async (name: string): Promise<User> => {
  const result = await httpClient.post<User>(
    "/auth/guest",
    {
      name: name,
    },
    false
  );

  auth.setToken(result.token);

  return result;
};

export const isAuthenticated = () => {
  return !!auth.getToken();
};

export const getToken = () => {
  return auth.getToken();
};

export const deleteToken = () => {
  auth.setToken(undefined);
  Cookie.remove(COOKIES.authToken);
};
