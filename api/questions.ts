import { httpClient } from "./httpClient";

export const sendAnswer = async (questionId, answer) => {
  const result = await httpClient.post(`/quesiton/${questionId}/answer`, {answer});

  return result;
};

