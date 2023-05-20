import { SET_USER_LOGGED} from "./types";

export const setUserLoggedIn = (dispatch , data)=>{

    dispatch({ type: SET_USER_LOGGED, payload:data });
}