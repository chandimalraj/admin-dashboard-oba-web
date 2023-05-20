import React, { useState } from "react";
import "./addadmin.css";
import circle from "../../../assets/dfuser.jpg";
import axios from "axios";
import { connect } from "react-redux";
import { fetchAdminDetails } from "../../../actions/adminDetailsAction";

function AddAdmin(props) {
  const { fetchAdmins } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [img, setImg] = useState(circle);
  const [showPopUp, setShowPopUp] = useState(false);

  const addAdmin = async () => {
    if (email == "") {
      alert("Enter valid email address");
    }
    if (email !== "" && pwd == "") {
      alert("Enter a password");
    }

    try {
      const token = localStorage.getItem("token"); // assuming the JWT token is stored in local storage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const admin = {
        email: email,
        password: pwd,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/admin/add`,
        admin,
        config
      );
      //console.log(response)
      if (response.status == 200) {
        setShowPopUp(true);
        setEmail("")
        setPwd("")
      }
      fetchAdmins();
    } catch (error) {
      alert(error.response.data.msg)
      console.error(error);
    }
  };

  return (
    <div className="w-100 d-flex flex-column pt-2 mt-1 ">
      <div
        className="d-flex flex-column me-5 mt-4 bg-body"
        style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
      >
        <div className="px-4 p-3 admin-header">Add Admin</div>
        <div
          className="d-flex w-100  mt-4"
          style={{ background: "rgba(149, 149, 149, 0.2)" }}
        >
          <div className="d-flex w-50 justify-content-center align-items-center " >
            <img src={img} className="add-admin-img me-3" />
            <div className="d-flex flex-column">
              <div className="add-admin-profile mb-2" style={{ opacity:0 }}>Profile Avatar</div>
              <label className="add-admin-img-btn px-3 p-2" htmlFor="img-input" style={{ opacity:0 }}>
                Add Image
              </label>

              <input
                style={{ opacity: "0", width: "10px", height: "10px" }}
                id="img-input"
                // type="file"
                // onChange={(e) => {
                //   setSelectedFile(e.target.files[0]);
                //   setImg(URL.createObjectURL(e.target.files[0]));
                // }}
              />
            </div>
          </div>
          <div className="w-50 d-flex flex-column mt-2 pt-2 mb-2 pb-4">
            {/* <div className="d-flex admin-settings-name my-2">Name</div>
            <div className="d-flex mb-4">
              <input
                className="admin-settings-input p-3 "
                placeholder="Enter Your Name"
                onChange={(e)=>{
                  setName(e.target.value)
                }}
                type="text"
              />
              
            </div> */}
            <div className="d-flex admin-settings-name my-2">Email Address</div>
            <div className="d-flex mb-4">
              <input
                className="admin-settings-input p-3 "
                placeholder="Enter Your Email Address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                value={email}
              />
            </div>
            <div className="d-flex admin-settings-name my-2">Passowrd</div>
            <div className="d-flex mb-4">
              <input
                className="admin-settings-input p-3"
                placeholder="Enter Your Password"
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                value={pwd}
              />
              <button
                className="add-new-admin-btn ms-5 px-4"
                onClick={() => {
                  addAdmin();
                }}
              >
                Add Admin
              </button>
            </div>
          </div>
        </div>
        {/* <div className="px-4 p-4 admin-add-footer"></div> */}
      </div>
      <div className="px-4 p-4 admin-add-footer me-5"></div>

      {showPopUp == true && (
        <div className="pop-up">
          <div className="pop-up-container">
            <div className="d-flex justify-content-center align-items-center p-3 pop-up-heading">
              Admin Added Successfully
            </div>
            <div
              className="d-flex justify-content-center align-items-center p-3 pop-up-close"
              onClick={() => {
                setShowPopUp(false);
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
  fetchAdmins: () => dispatch(fetchAdminDetails()),
});

export default connect(null, mapDispatchToProps)(AddAdmin);
