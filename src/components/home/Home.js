import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "./home.css";
import logo from "../../assets/logo.png";
import user from "../../assets/dfuser.jpg";
import sideuser from "../../assets/loginuser.png";
import settings from "../../assets/settings.png";
import admin from "../../assets/admin.png";
import logout from "../../assets/shutdown.png";
import lessthan from "../../assets/lessthan.png";
import AdminPanel from "./adminPanel/AdminPanel";
import UserPanel from "./userpanel/UserPanel";
import Settings from "./settingsPanel/Settings";
import UserSeacrhFilter from "./userSearch/UserSearchFilter";
import SearchResults from "./searchResults/SearchResults";
import AddUser from "./addUser/AddUser";
import EditUser from "./editUser/EditUser";
import ViewUser from "./viewUser/ViewUser";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { fetchUsersAndOtherDetails } from "../../actions/userDetailsAction";
import { bindActionCreators } from "redux";
import { useSelector } from "react-redux";
import { fetchAdminDetails } from "../../actions/adminDetailsAction";
import { BeatLoader } from "react-spinners";

function Home({ fetchAdmins, fetchData, userInfo ,isLoading}) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email"); // Check for the JWT token in local storage
    setSavedEmail(savedEmail);

    if (token == null) {
      navigate("/");
    }
    fetchAdmins();
    fetchData();
  }, []);

  const [savedEmail, setSavedEmail] = useState("");
  const [showAdmins, setShowAdmins] = useState(false);
  const [showUsers, setShowUsers] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showUserSearch, setUsersSearch] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showViewUser, setShowViewUser] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState({});
  const [searchData, setSearchData] = useState([]);

  const userSearch = () => {
    setShowSearchResults(false);
    setShowUsers(false);
    setUsersSearch(true);
  };

  const hideUserSearch = () => {
    setShowSearchResults(false);
    setUsersSearch(false);
    setShowUsers(true);
  };

  const searchResults = (data) => {
    setSearchData(data);
    setUsersSearch(false);
    setShowSearchResults(true);
  };
  const backToUserSearch = () => {
    setShowSearchResults(false);
    setUsersSearch(true);
  };
  const addUser = () => {
    setShowUsers(false);
    setShowAddUser(true);
  };

  const editUser = (id, data) => {
    setId(id);
    setData(data);
    setShowSearchResults(false);
    setShowUsers(false);
    setShowEditUser(true);
  };

  const viewUSer = (id, data) => {
    setId(id);
    setData(data);
    console.log(id);
    setShowSearchResults(false);
    setShowUsers(false);
    setShowViewUser(true);
  };

  const closeViewUser = () => {
    setShowAddUser(false);
    setShowViewUser(false);
    setShowUsers(true);
  };

  const logOutUser = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="home">
      <div className="home-header d-flex p-3 align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img src={logo} />
          <div className="ms-4 lg-header-txt">S.THOMAS’ COLLEGE,GURUTALAWA</div>
        </div>
        <div className="d-flex align-items-center me-5 pe-5">
          <img src={user} className="log-user-img me-3" />
          <div className="user-name">{savedEmail}</div>
        </div>
      </div>
      <div className="d-flex">
        <div className="side-bar d-flex flex-column justify-content-between ">
          <div className="w-100 d-flex flex-column align-items-center">
            <button
              className="side-bar-btn mt-4 d-flex align-items-center p-3"
              style={{
                backgroundColor: showUsers ? "#3895EA" : "",
                filter: showUsers ? "brightness(120%)" : "",
              }}
              onClick={() => {
                setShowViewUser(false);
                setShowEditUser(false);
                setShowAddUser(false);
                setShowSearchResults(false);
                setUsersSearch(false);
                setShowAdmins(false);
                setShowUsers(true);
                setShowSettings(false);
              }}
            >
              <img src={sideuser} className="side-img mx-3" />
              <div className="btn-txt">Users</div>
            </button>
            <button
              className="side-bar-btn mt-4 d-flex align-items-center p-3"
              onClick={() => {
                setShowViewUser(false);
                setShowEditUser(false);
                setShowAddUser(false);
                setShowAdmins(false);
                setShowUsers(false);
                setShowSettings(true);
                setUsersSearch(false);
                setShowSearchResults(false);
              }}
              style={{
                backgroundColor: showSettings ? "#3895EA" : "",
                filter: showSettings ? "brightness(120%)" : "",
              }}
            >
              <img src={settings} className="mx-3 side-img" />
              <span className="btn-txt">Settings</span>
            </button>
            <button
              className="side-bar-btn mt-4 d-flex align-items-center p-3"
              style={{
                backgroundColor: showAdmins ? "#3895EA" : "",
                filter: showAdmins ? "brightness(120%)" : "",
              }}
              onClick={() => {
                setShowViewUser(false);
                setShowEditUser(false);
                setShowAddUser(false);
                setShowAdmins(true);
                setShowUsers(false);
                setShowSettings(false);
                setUsersSearch(false);
                setShowSearchResults(false);
              }}
            >
              <img src={admin} className="mx-3 side-img" />
              <span className="btn-txt">Admins</span>
            </button>
          </div>

          <div className=" d-flex mb-5 pb-5">
            <button
              className="side-bar-btn-shut  d-flex align-items-center p-3 w-100"
              onClick={() => {
                logOutUser();
              }}
            >
              <img src={logout} className="mx-3 side-img" />
              <span className="btn-txt ms-3 me-4">Log Out</span>
              <img src={lessthan} className="mx-3 " />
            </button>
          </div>
        </div>
        <div className="load-section">
          {showAdmins == true && <AdminPanel />}
          {showUsers == true && (
            <UserPanel
              userSearch={userSearch}
              hideUserSearch={hideUserSearch}
              addUser={addUser}
              editUser={editUser}
              viewUser={viewUSer}
            />
          )}
          {showSettings == true && <Settings />}
          {showUserSearch == true && (
            <UserSeacrhFilter showResults={searchResults} />
          )}
          {showSearchResults == true && (
            <SearchResults
              backToUserSearch={backToUserSearch}
              data={searchData}
              viewUser={viewUSer}
              editUser={editUser}
            />
          )}
          {showAddUser == true && <AddUser close={closeViewUser} />}
          {showEditUser == true && <EditUser id={id} data={data} />}
          {showViewUser == true && (
            <ViewUser id={id} data={data} close={closeViewUser} />
          )}
        </div>
      </div>
      {isLoading == true && (
        <div className="pop-up" style={{}}>
          {/* <ClipLoader color="#52bfd9" size={50}/> */}
          <BeatLoader color="#0057a7" />
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchAdmins: () => dispatch(fetchAdminDetails()),
  fetchData: () => dispatch(fetchUsersAndOtherDetails()),
});

const mapStateToProps = (state) => ({
  userInfo: state.userReducer.currentUser,
  isLoading:state.userReducer.isLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
