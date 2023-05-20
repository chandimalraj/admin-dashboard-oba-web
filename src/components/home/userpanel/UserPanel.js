import React, { useEffect, useState } from "react";
import "./userpanel.css";
import search from "../../../assets/shape.png";
import User from "../user/User";
import { connect } from "react-redux";

function UserPanel(props) {
  const {
    userSearch,
    hideUserSearch,
    addUser,
    editUser,
    viewUser,
    data,
    isLoading,
  } = props;

  const [users, setUsers] = useState([]);
  const [panelHeading,setPanelHeading] = useState("All Users")

  useEffect(() => {
    console.log(data);
    dataSet();
    console.log("rendered");
  }, [data]);

  const dataSet = () => {
    const x = [];
    data.map((user) => {
      if (!user.userApproved) {
        x.push(user);
      }
    });

    data.map((user) => {
      if (user.userApproved) {
        x.push(user);
      }

      setUsers(x);
    });
  };

  const pendingList = () => {
    const x = [];
    const pendingUsers = users.map((user) => {
      if (!user.userApproved) {
        x.push(user);
        return user;
      }
    });
    console.log(pendingUsers);
    console.log(x);
    console.log(users);
    setUsers(x);
  };

  return (
    <div className="w-100 d-flex flex-column pt-4 px-5">
      <div className="d-flex justify-content-between me-5">
        <div
          className="d-flex align-items-center justify-content-center search-container"
          onClick={() => {
            userSearch();
          }}
        >
          <img src={search} className="search-img me-3" />
          <input
            className="user-search-input"
            placeholder="Search Users"
            disabled
          />
        </div>

        <div className="d-flex">
          <button
            className="d-flex align-items-center user-pendinglist-btn px-3 py-1 me-3"
            onClick={() => {
              console.log("clicked");
              setPanelHeading("Pending Users")
              pendingList();
            }}
          >
            <div className="mx-2">Pending List</div>
          </button>

          <button
            className="d-flex align-items-center add-admin-btn px-3 py-1"
            onClick={() => {
              addUser();
            }}
          >
            <div className="fw-bold plus-txt">+</div>
            <div className="mx-2"> Add User</div>
          </button>
        </div>
      </div>

      <div className="d-flex flex-column me-5 mt-4">
        <div className="px-4 p-3 admin-header">{panelHeading}</div>
        <div className="d-flex w-100 flex-column  bg-body">
          {isLoading == false &&
            users.length > 0 &&
            users.map((user) => (
              <User
                editUser={editUser}
                viewUser={viewUser}
                name={user.fullName}
                key={user.userId}
                data={user}
                id={user.userId}
              />
            ))}
        </div>
        <div className="px-4 p-4 admin-footer"></div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.userReducer.isLoading,
  data: state.userReducer.users,
});

export default connect(mapStateToProps)(UserPanel);
