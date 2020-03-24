import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { reducer as gameReducer } from "./states/game/reducer";
import { reducer as userReducer } from "./states/user/reducer";
import { Game, User } from "./api/interface";

export interface InitialState {
  game?: Game;
  user?: User;
}

export const store = (initialState: InitialState) => {
  return createStore(
    combineReducers({
      game: gameReducer,
      user: userReducer
    }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};
