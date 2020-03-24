import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { reducer as gameReducer } from "./states/game/reducer";
import { Game, User } from "./api/interface";

export interface InitialState {
  game?: Game;
  user?: User;
}

export const store = (initialState: InitialState) => {
  return createStore(
    combineReducers({
      game: gameReducer
    }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};
