import { httpClient } from "./httpClient";

export const createGame = async () => {
  const result = await httpClient.post("/game");

  return result;
};

export const joinGame = async gameId => {
  const result = await httpClient.post(`/game/${gameId}/join`);

  return result;
};

export const startGame = async gameId => {
  const result = await httpClient.post(`/game/${gameId}/start`);

  return result;
};

export const getGame = async gameId => {
  const result = await httpClient.get(`/game/${gameId}`);

  return result;
};
