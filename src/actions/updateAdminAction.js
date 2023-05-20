import { UPDATE_ADMIN_DETAILS } from "./types"

export const updateAdmin = (dispatch , updatedAdmin)=>{

    dispatch({type: UPDATE_ADMIN_DETAILS , payload: updatedAdmin})

}