import { httpClient } from "./httpClient";
import { TOKEN } from "../helpers/constants";
import { Game } from "./interface";

export const createGame = async (user): Promise<Game> => {
  const result = await httpClient.post<Game>("/game", {}, user.token);

  return result;
};

export const joinGame = async (gameId): Promise<Game> => {
  const result = await httpClient.post<Game>(`/game/${gameId}/join`, {}, TOKEN);

  return result;
};

export const startGame = async (gameId, user): Promise<Game> => {
  const result = await httpClient.post<Game>(`/game/${gameId}/start`, {}, user.token);

  return result;
};

export const getGame = async (gameId): Promise<Game> => {
  const result = await httpClient.get<Game>(`/game/${gameId}`, {}, TOKEN);

  return result;
};
