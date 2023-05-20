import React, { useEffect, useState } from "react";
import "./settings.css";
import user from "../../../assets/dfuser.jpg";
import { connect } from "react-redux";
import { fetchAdminDetails } from "../../../actions/adminDetailsAction";
import axios from "axios";
import { updateAdmin } from "../../../actions/updateAdminAction";

function Settings(props) {
  const { data, fetchAdmins ,updateAdmin} = props;
  const [admin, setAdmin] = useState({});
  const [showPopUp,setShowPopUp] = useState(false)

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("id");
    data.forEach((element) => {
      if (element._id == id) {
        setAdmin(element);
      }
    });
  }, []);

  const updateAdminFunction = async () => {
    if (email == "") {
      alert("Enter valid email address");
    }
    if (email !== "" && pwd == "") {
      alert("Enter a password");
    }

    try {
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token"); // assuming the JWT token is stored in local storage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const admin = {
        email:email,
        password:pwd
      }
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/admin/update?id=${id}`,admin,config
      );
     
      //console.log(response)
      if(response.status==200){
        const updatedAdmin = response.data.data
        console.log(response.data.data)
        updateAdmin(updatedAdmin)
        setShowPopUp(true)
        setEmail("")
        setPwd("")
        setAdmin(admin)
      }
      // fetchAdmins()
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="w-100 d-flex flex-column pt-5 px-5 mt-4">
      <div className="d-flex flex-column me-5 mt-4">
        <div className="px-4 p-3 admin-header">Admin Details</div>
        <div className="d-flex w-100   bg-body admin-settings-container">
          <div className="w-50 d-flex justify-content-center align-items-center">
            <div className="d-flex">
              <img src={user} className="admin-img" />
              <div className="d-flex flex-column ps-2 ">
                <div className="admin-name">{admin.email}</div>
                <div className="admin-txt">Admin</div>
              </div>
            </div>
          </div>

          <div className="w-50 d-flex flex-column mt-2 pt-4 mb-2 pb-4">
            {/* <div className="d-flex admin-settings-name my-2">Name</div>
            <div className="d-flex mb-4">
              <input
                className="admin-settings-input p-3 "
                placeholder="Enter Your New Name"
              /> */}
              {/* <button className="admin-settings-btn ms-5 ">Change Name</button> */}
            {/* </div> */}
            <div className="d-flex admin-settings-name my-2">Email Address</div>
            <div className="d-flex mb-4">
              <input
                className="admin-settings-input p-3 "
                placeholder="Enter Your New Email Address"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
              {/* <button className="admin-settings-btn ms-5 ">Change Email</button> */}
            </div>
            <div className="d-flex admin-settings-name my-2">Passowrd</div>
            <div className="d-flex mb-4">
              <input
                className="admin-settings-input p-3"
                placeholder="Enter Your New Password"
                type="text"
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                value={pwd}
              />
              <button
                className="admin-settings-btn ms-5 "
                onClick={() => {
                  updateAdminFunction();
                }}
              >
                update
              </button>
            </div>
          </div>
        </div>
      </div>
      {
        showPopUp == true && (<div className="pop-up">
        <div className="pop-up-container">
          <div className="d-flex justify-content-center align-items-center p-3 pop-up-heading">
             Admin Updated Successfully
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

const mapStateToProps = (state) => ({
  data: state.adminReducer.admins,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAdmins: () => dispatch(fetchAdminDetails()),
  updateAdmin:(admin)=>(updateAdmin(dispatch,admin))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
