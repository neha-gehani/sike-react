import { httpClient } from "./httpClient";
import { TOKEN } from "../helpers/constants";
import { User } from "./interface";

export const getUser = async (): Promise<User> => {
  const result = await httpClient.get<User>(`/user/me`, {}, TOKEN);

  return result;
};
