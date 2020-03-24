import { httpClient } from "./httpClient";
import { User } from "./interface";

export const getUser = async (): Promise<User> => {
  const result = await httpClient.get<User>(`/user/me`, {});

  return result;
};
