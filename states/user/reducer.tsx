import * as userActions from "./actions";

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case userActions.UPDATE_USER:
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
};
