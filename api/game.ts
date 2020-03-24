import { httpClient } from "./httpClient";
import { TOKEN } from "../helpers/constants";
import { Game } from "./interface";

export const createGame = async (user): Promise<Game> => {
  const result = await httpClient.post<Game>("/game", {});

  return result;
};

export const joinGame = async (gameId): Promise<Game> => {
  const result = await httpClient.post<Game>(`/game/${gameId}/join`, {});

  return result;
};

export const startGame = async (gameId, user): Promise<Game> => {
  const result = await httpClient.post<Game>(`/game/${gameId}/start`, {});

  return result;
};

export const getGame = async (gameId): Promise<Game> => {
  const result = await httpClient.get<Game>(`/game/${gameId}`, {}, TOKEN);

  return result;
};
