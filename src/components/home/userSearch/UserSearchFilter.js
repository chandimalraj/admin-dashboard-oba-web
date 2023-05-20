import React, { useState } from "react";
import "./usersearchfilter.css";
import search from "../../../assets/user-search.png";
import { connect } from "react-redux";
import { months, days, countries, newCountries } from "../StaticData/Data";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function UserSeacrhFilter(props) {
  const { showResults, allYears, data } = props;

  const [regNum, setRegNum] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [profession, setProfession] = useState("");

  const searchUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/search?classYear=${year}&profession=${profession}&country=${country}&city=${city}&name=${name}`
      );

      console.log(res.data.data.data);
      showResults(res.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column filters-container mt-5 pb-4">
      <div className="d-flex justify-content-between pe-5 me-5 ps-5 pt-5 ">
        <input
          className="user-reg-search my-4 ps-3"
          placeholder="Reg No"
          onChange={(e) => {
            setRegNum(e.target.value);
          }}
        />

        <input
          className="user-name-search my-4 ps-3"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <input
          className="user-name-search my-4 ps-3"
          placeholder="Profession"
          onChange={(e) => {
            setProfession(e.target.value);
          }}
        />
      </div>

      <div className="d-flex justify-content-between pe-5 me-5 ps-5 pt-0 ">
        <select
          className="user-class-search my-4 ps-3"
          placeholder="Class Year"
          type=""
          onChange={(e) => {
            setYear(e.target.value);
          }}
        >
          <option value=""> Year</option>
          {allYears.map((year) => (
            <option value={year.value}>{year.text}</option>
          ))}
        </select>
        <select
          className="user-class-search my-4 ps-3"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        >
          <option value="">Country</option>

          {newCountries.map((country) => (
            <option value={country.name}>{country.name}</option>
          ))}
        </select>

        <input
          className="user-reg-search my-4 ps-3"
          placeholder="City"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
      </div>
      <div className="d-flex justify-content-end pe-5 me-5">
        <button
          className="user-search-btn d-flex justify-content-center px-5 p-3"
          onClick={() => {
            searchUser();
          }}
        >
          <img src={search} className="search-img me-3 mt-1" />
          <div className="user-search-btn-txt me-4">Search</div>
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  allYears: state.userReducer.years,
  data: state.userReducer.users,
});

export default connect(mapStateToProps)(UserSeacrhFilter);
