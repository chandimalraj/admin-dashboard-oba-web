import React from "react";
import "./searchresults.css";
import User from "../user/User";
import SearchResultUser from "../searchresultUser/SearchResultUser";

export default function SearchResults(props) {
  const { backToUserSearch  ,data ,viewUser ,editUser} = props;

  return (
    <div className="w-100 d-flex flex-column pt-4 px-5">
      <div className="d-flex justify-content-end me-5">
        <button
          className="d-flex align-items-center add-admin-btn px-5 py-3"
          onClick={() => {
            backToUserSearch();
          }}
        >
          {/* <div className="fw-bold plus-txt">+</div> */}
          <div className="mx-2">Search Filter</div>
        </button>
      </div>

      <div className="d-flex flex-column me-5 mt-4">
        <div className="px-4 p-3 admin-header">Search Results</div>
        <div className="d-flex w-100 flex-column  bg-body">
          {/* <SearchResultUser />
          <SearchResultUser />
          <SearchResultUser />
          <SearchResultUser /> */}
          {
            data.map((user)=>
            <SearchResultUser name={user.fullName} viewUser={viewUser} id={user.userId} data={user} editUser={editUser}/>
            )
          }
        </div>
        <div className="px-4 p-4 admin-footer"></div>
      </div>
    </div>
  );
}
