import axios from "axios";
import { FETCH_ADMIN_DETAILS } from "./types";


export const fetchAdminDetails = () => async (dispatch, getState) => {
    try {
       
        const token = localStorage.getItem('token'); // assuming the JWT token is stored in local storage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/admin/getAll`,config
      );
      const adminsData = response.data.data
      
      dispatch({ type: FETCH_ADMIN_DETAILS, payload: adminsData });
  

    } catch (error) {
      //   dispatch({ type: FETCH_FAILURE, payload: { error } });
    }
  };