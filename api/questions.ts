import { httpClient } from "./httpClient";

export const sendAnswer = async (questionId, answerStr) => {
  const result = await httpClient.post(`/question/${questionId}/answer`, {answerStr});

  return result;
};

