import { httpClient } from "./httpClient";

export const guestLogin = async name => {

  const result = await httpClient.post(
    "http://sike-api.herokuapp.com/auth/guest", 
    {
      name: name
    });

  return result;
};
