import { httpClient } from "./httpClient";

export const sendAnswer = async (answerId) => {
  const result = await httpClient.post(`/answer/${answerId}/vote`);

  return result;
};

