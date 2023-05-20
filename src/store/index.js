import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from '../reducers'
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import userReducer from "../reducers/userReducer";
import adminReducer from "../reducers/adminReducer";
const middleware = [thunk];

// export const initialState = {
//   userReducer: {
//     currentUser: null,
//     users: [],
//     years: [],
//     isLoading: true,
//     isLoggedIn: false,
//   },
//   adminReducer:{
//     admins:[]
//   }
// };

const rootReducer = combineReducers({
  userReducer,
  adminReducer
  
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
