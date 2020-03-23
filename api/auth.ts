import { httpClient } from "./httpClient";
import { User } from "./interface";

export const guestLogin = async (name: string): Promise<User> => {
  const result = await httpClient.post<User>("/auth/guest", {
    name: name
  });

  return result;
};
