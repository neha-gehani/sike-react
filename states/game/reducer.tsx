import * as gameActions from "./actions";

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case gameActions.UPDATE_GAME:
      return Object.assign({}, state, action.game);
    default:
      return state;
  }
};
