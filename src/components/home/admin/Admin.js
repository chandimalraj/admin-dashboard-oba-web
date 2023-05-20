import React, { useState } from "react";
import "./admin.css";
import user from "../../../assets/dfuser.jpg";
import bin from "../../../assets/bin.png";
import axios from "axios";
import { connect } from "react-redux";
import { fetchAdminDetails } from "../../../actions/adminDetailsAction";

function Admin(props) {
  const { email, id ,fetchAdmins} = props;

  const [showPopUp , setShowPopUp] = useState(false)

  const removeAdmin = async () => {
    try {
      const token = localStorage.getItem("token"); // assuming the JWT token is stored in local storage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/admin/delete?id=${id}`,config);
       console.log(response)
       if(response.status==200){
        
         setShowPopUp(true)
        // setEmail("")
        // setPwd("")
        // setAdmin(admin)
        fetchAdmins()
      }
     
    } catch (error) {}
  };

  return (
    <div className="d-flex align-items-center justify-content-between admin-item my-2 pe-5">
      <div className="d-flex py-1   w-100 px-3">
        <img src={user} className="log-user-img " />
        <div className="d-flex flex-column ps-3 justify-content-center">
          <div className="admin-item-name">{email}</div>
          <div className="admin-item-member">Member</div>
        </div>
      </div>

      <div className="admin-btn-container d-flex align-items-center">
        {/* <button className="admin-view-btn px-5 p-2 me-4" >View</button> */}
        <button className="admin-remove-btn d-flex align-items-center ps-4 pe-3 p-2 me-4"
        onClick={()=>{
            removeAdmin()
        }}
        >
          <div>Remove</div>
          <img src={bin} className="bin-img ms-3 me-2" />
        </button>
      </div>

      {
        showPopUp == true && (<div className="pop-up">
        <div className="pop-up-container">
          <div className="d-flex justify-content-center align-items-center p-3 pop-up-heading">
             Admin Removed Successfully
          </div>
          <div className="d-flex justify-content-center align-items-center p-3 pop-up-close"
          onClick={()=>{
            setShowPopUp(false)
          }}
          >
            close
          </div>
          
        </div>
    </div>)
      }
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchAdmins: () => dispatch(fetchAdminDetails()),
});

export default connect(null, mapDispatchToProps)(Admin);
