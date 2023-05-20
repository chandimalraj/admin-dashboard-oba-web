import React, { useEffect, useState } from "react";
import "./user.css";
import user from "../../../assets/dfuser.jpg";
import bin from "../../../assets/bin.png";
import axios from "axios";
import { connect } from "react-redux";
import { fetchUsersAndOtherDetails } from "../../../actions/userDetailsAction";

function User(props) {
  const { editUser, viewUser, name, data, id, fetchData } = props;

  const [msg, setMsg] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const [img,setImg] = useState(user)

  useEffect(() => {
    // console.log(name)
    
    if(data.profileImg!=null){
      setImg(data.profileImg.imgPath)
    }
  },[]);

  const removeUser = async () => {

    try {
      const token = localStorage.getItem("token"); // assuming the JWT token is stored in local storage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axios.delete(
        `https://brotherhood-backend.vercel.app/api/v1/admin/delete_user?id=${id}`,
        config
      );
      console.log(response);
      if (response.status == 200) {
        setMsg("User Removed Successfully");
        setShowPopUp(true);
      }
    } catch (error) {
      console.log(error)
    }
  };

  const aproveUser = async () => {

    try {
      const token = localStorage.getItem("token"); // assuming the JWT token is stored in local storage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const idObject = {
        id:id
      }

      console.log(id)
      const response = await axios.post(
        `https://brotherhood-backend.vercel.app/api/v1/admin/approve_user?id=${id}`,
        idObject,
        config
        
      );
      console.log(response);
      if (response.status == 200) {
        setMsg("User Approved Successfully");
        setShowPopUp(true);
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between admin-item my-2 pe-5">
      <div className="d-flex py-1   w-100 px-3">
        <img src={img} className="log-user-img " />
        <div className="d-flex flex-column ps-3 justify-content-center">
          <div className="admin-item-name">{name}</div>
          <div className="admin-item-member">Member</div>
        </div>
      </div>

      <div className="admin-btn-container d-flex align-items-center">
        <button
          className="user-aprove-btn px-5 p-2 me-4"
          style={{ opacity: data.userApproved ? "0" : "100%" }}
          onClick={() => {
            if (!data.userApproved) {
              aproveUser();
            }
          }}
        >
          Aprove
        </button>
        <button
          className="admin-view-btn px-5 p-2 me-4"
          onClick={() => {
            viewUser(id, data);
          }}
        >
          View
        </button>
        <button
          className="user-edit-btn px-5 p-2 me-4"
          onClick={() => {
            editUser(id,data);
          }}
        >
          Edit
        </button>
        <button
          className="admin-remove-btn d-flex align-items-center ps-4 pe-3 p-2 me-4"
          onClick={() => {
            removeUser();
          }}
        >
          <div>Remove</div>
          <img src={bin} className="bin-img ms-3 me-2" />
        </button>
      </div>

      {showPopUp == true && (
        <div className="pop-up">
          <div className="pop-up-container">
            <div className="d-flex justify-content-center align-items-center p-3 pop-up-heading">
              {msg}
            </div>
            <div
              className="d-flex justify-content-center align-items-center p-3 pop-up-close"
              onClick={() => {
                setShowPopUp(false);
                fetchData();
              }}
            >
              close
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchUsersAndOtherDetails()),
});

export default connect(null, mapDispatchToProps)(User);
