export const UPDATE_USER = "UPDATE_USER";
import { User } from "../../api/interface";

export const updateUserStore = (user: User) => dispatch => {
  return dispatch({ type: UPDATE_USER, user });
};
