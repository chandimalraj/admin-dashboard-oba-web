import { FETCH_ADMIN_DETAILS, UPDATE_ADMIN_DETAILS } from "../actions/types";

const initialState = {
  admins: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ADMIN_DETAILS:
      return { ...state, admins: action.payload };
      break;
    
      case UPDATE_ADMIN_DETAILS:
        const updatedAdmin = action.payload
        const updatedAdmins = state.admins.map(admin=>{
          if(admin._id==updatedAdmin._id){
            return updatedAdmin
          }
          return admin
        })
        return {...state,admins:updatedAdmins}
      
  }
  return state;
}
