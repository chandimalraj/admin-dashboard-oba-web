import axios from "axios";
import {
  FETCH_USER_DETAILS,
  FETCH_YEAR_DETAILS,
  UPDATE_USER_DETAILS,
  SET_LOADING,
  FETCH_COUNTRY_DETAILS
} from "./types";

// export const fetchUserDetails=()=>dispatch=>{
//     axios.get("https://brotherhood-backend.vercel.app/api/v1/search/homeResults")
//     .then(res=>{
//       dispatch({
//         type:FETCH_BUTTON_CLICKED,
//         payload:res.data.data.data
//       })
//     })
// }

export const fetchUsersAndOtherDetails = () => async (dispatch, getState) => {
  try {
    const userResponse = await axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/search/homeResults`
    );
    const usersData = userResponse.data.data.data;

    dispatch({ type: FETCH_USER_DETAILS, payload: usersData });

    const yearResponse = await axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/static/getYearsList`
    );
    const yearData = yearResponse.data.data;
    
    dispatch({ type: FETCH_YEAR_DETAILS, payload: yearData});

    // const countryResponse = await axios.get(
    //   "https://brotherhood-backend.vercel.app/api/v1/static/getCountries"
    // );
    // const countryData = yearResponse.data.data;
    //  console.log(countryData)
    //  dispatch({ type: FETCH_COUNTRY_DETAILS, payload: countryData});

    dispatch({ type: SET_LOADING, payload: { isLoading: false } }); 
  } catch (error) {
    //   dispatch({ type: FETCH_FAILURE, payload: { error } });
  }
};
