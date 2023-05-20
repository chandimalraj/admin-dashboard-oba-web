import {
  FETCH_BUTTON_CLICKED,
  FETCH_COUNTRY_DETAILS,
  FETCH_USER_DETAILS,
  SET_CURRENT_USER,
  SET_LOADING,
  SET_USER_LOGGED,
  UPDATE_USER_DETAILS,
} from "../actions/types";
import { FETCH_YEAR_DETAILS } from "../actions/types";


const initialState = {
   
        currentUser: null,
        users: [],
        years: [],
        countries:[],
        isLoading: true,
        isLoggedIn: false,
   
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
      break;

    case FETCH_USER_DETAILS:
      return { ...state, users: action.payload };
      break;

      case FETCH_COUNTRY_DETAILS:
        return { ...state, countries: action.payload };
        break;

    case FETCH_YEAR_DETAILS:
      return { ...state, years: action.payload };
      break;

    case SET_LOADING:
      return { ...state, isLoading: action.payload.isLoading };
      break;

    case UPDATE_USER_DETAILS:
      return action.payload;
      break;

    case SET_USER_LOGGED:
      return { ...state, isLoggedIn: action.payload };
      break;
  }

  return state;
}
