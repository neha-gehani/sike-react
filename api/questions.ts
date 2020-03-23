import { httpClient } from "./httpClient";

export const sendAnswer = async (questionId, answer) => {
  const result = await httpClient.post(`/game/${questionId}/join`, {answer});

  return result;
};

