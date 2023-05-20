import { SET_CURRENT_USER } from "./types";

export const setCurrentUser = (dispatch , userData)=>{

    dispatch({ type: SET_CURRENT_USER, payload: userData });
}