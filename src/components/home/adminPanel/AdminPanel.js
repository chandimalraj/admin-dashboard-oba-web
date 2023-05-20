import React, { useState } from "react";
import "./adminpanel.css";
import Admin from "../admin/Admin";
import AddAdmin from "../addAdmin/AddAdmin";
import { connect } from "react-redux";
import { fetchAdminDetails } from "../../../actions/adminDetailsAction";
import axios from "axios";

 function AdminPanel(props) {
 

  const {data} = props
  const [showAddAdmin, setShowAddAdmin] = useState(false);

  return (
    <div className="w-100 d-flex flex-column pt-4 px-5"
    //  style={{ overflow:"hidden" }}
     >
      {showAddAdmin == true && <AddAdmin />}
      {showAddAdmin == false && (
        <div className="d-flex justify-content-end me-5">
          <button className="d-flex align-items-center add-admin-btn px-3 py-1"
          onClick={()=>{
            setShowAddAdmin(true)
          }}
          >
            <div className="fw-bold plus-txt">+</div>
            <div className="mx-2"> Add Admin</div>
          </button>
        </div>
      )}

      <div className="d-flex flex-column me-5 mt-4">
        <div className="px-4 p-3 admin-header">All Admins</div>
        <div className="d-flex w-100 flex-column  bg-body">
          {
            data.map((admin)=>(
               <Admin email={admin.email} id={admin._id} key={admin._id}/>
            ))
          }
          
          
        </div>
        <div className="px-4 p-4 admin-footer"></div>
      </div>
    </div>
  );
}


const mapStateToProps = (state) => ({
  
  data: state.adminReducer.admins,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAdmins:()=>dispatch(fetchAdminDetails()),
 
  
});

export default connect(mapStateToProps)(AdminPanel);