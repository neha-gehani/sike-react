import { httpClient } from "./httpClient";
import { Answer } from "./interface";

export const voteForAnswer = async (answerId): Promise<Answer> => {
  const result = await httpClient.post<Answer>(`/answer/${answerId}/vote`);

  return result;
};


