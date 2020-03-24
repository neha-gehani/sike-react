import { httpClient } from "./httpClient";
import { Game } from "./interface";

export const sendAnswer = async (questionId, answerStr): Promise<Game> => {
  const result = await httpClient.post<Game>(`/question/${questionId}/answer`, {answerStr});

  return result;
};


