import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { reducer as gameReducer } from "./states/game/reducer";

export const store = initialState => {
  return createStore(
    combineReducers({
      game: gameReducer
    }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};
