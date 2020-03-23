import { httpClient } from "./httpClient";
import { TOKEN } from "../helpers/constants";
import { Game } from "./interface";

export const createGame = async (): Promise<Game> => {
  const result = await httpClient.post<Game>("/game", {}, TOKEN);

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
