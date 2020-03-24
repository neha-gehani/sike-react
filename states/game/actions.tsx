export const UPDATE_GAME = "UPDATE_GAME";
import { Game } from "../../api/interface";

export const updateGame = (game: Game) => dispatch => {
  return dispatch({ type: UPDATE_GAME, game });
};
