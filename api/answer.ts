import { httpClient } from "./httpClient";

export const voteForAnswer = async (answerId) => {
  const result = await httpClient.post(`/answer/${answerId}/vote`);

  return result;
};

