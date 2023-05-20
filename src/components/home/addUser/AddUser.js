import React, { useEffect, useState } from "react";
import "./adduser.css";
import circle from "../../../assets/circle.png";
import web from "../../../assets/web.png";
import fb from "../../../assets/fb.png";
import insta from "../../../assets/insta.png";
import twitter from "../../../assets/twitter.png";
import linkedin from "../../../assets/linkdin.png";
import sl from "../../../assets/slphone.png";
import phone from "../../../assets/phone.png";
import mail from "../../../assets/mail.png";
import { connect } from "react-redux";
import axios from "axios";
import { fetchAdminDetails } from "../../../actions/adminDetailsAction";
import { months, days, countries, newCountries } from "../StaticData/Data";
import { BeatLoader } from "react-spinners";
import { fetchUsersAndOtherDetails } from "../../../actions/userDetailsAction";

function AddUser(props) {
  const { allYears, fetchData ,close , } = props;

  // const months = [{
  //   id:1,
  //   text:"January"
  // }]

  const [selectedFile, setSelectedFile] = useState(null);
  const [img, setImg] = useState(circle);
  const [base64Data, setBase64Data] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const [profileImg, setProfileImg] = useState(null);
  const [showTown, setShowTown] = useState(false);
  const [cities, setCities] = useState([]);

  const [fName, setFName] = useState("");
  const [nickName, setNickName] = useState("");
  const [nic, setNic] = useState("");
  const [genralName, setGeneralName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [webLink, setWebLink] = useState("");
  const [fbLink, setFbLink] = useState("");
  const [instaLink, setInstaLink] = useState("");
  const [twiiterLink, setTwitterLink] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [hobbie01, setHobbie01] = useState("");
  const [hobbie02, setHobbie02] = useState("");
  const [hobbie03, setHobbie03] = useState("");
  const [mobile, setMobile] = useState("");
  const [home, setHome] = useState("");
  const [email, setEmail] = useState("");
  const [houseNum, setHouseNum] = useState("");
  const [street, setStreet] = useState("");
  const [town, setTown] = useState("");
  const [country, setCountry] = useState("");
  const [occupation, setOccupation] = useState("");
  const [profession, setProfession] = useState("");
  const [organization, setOrganization] = useState("");
  const [industry, setIndustry] = useState("");
  const [orgWeb, setOrgWeb] = useState("");
  const [olFrom, setOlFrom] = useState("");
  const [olTo, setOlTo] = useState("");
  const [classFrom, setClassFrom] = useState("");
  const [classTo, setClassTo] = useState("");
  const [olYear, setOlYear] = useState("");
  const [alYear, setAlYear] = useState("");
  const [obaNum, setObaNum] = useState("");
  const [conf, setConf] = useState(false);
  const [pwd, setPwd] = useState("");

  useEffect(() => {});

  const submit = async (e) => {
    try {
      const imgData = {
        base64Data: base64Data,
      };

      const birth = `${birthYear}-${birthMonth}-${birthDate}`;

      if (selectedFile != null) {
        setLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/upload/profileImg`,
          imgData
        );

        console.log(response);

        const id = response.data.data.fileId;
        const url = response.data.data.url;

        const user = {
          fullName: fName,
          email: email,
          username: fName,
          nameUsedAtSTCG: genralName,
          nickName: nickName,
          dateOfBirth: birth,
          idOrPassportNum: nic,
          webAddress: webLink,
          fbUrl: fbLink,
          IgUrl: instaLink,
          twitterUrl: twiiterLink,
          linkedinUrl: linkedIn,
          hobbies: [hobbie01, hobbie02, hobbie03],
          profileImg: {
            id: id,
            imgPath: url,
            prevPathList: [],
          },
          mobileNo: mobile,
          landPhoneNo: home,
          emailAddresses: [],
          address: `${houseNum} ${street}`,
          town: town,
          country: {
            id: country,
            text: country,
            value: country,
            countryCode: country,
          },
          occupationDesignation: occupation,
          professionKeywords: ["example", "example"],
          organizationName: organization,
          natureOfOrganization: industry,
          organizationWebAddress: orgWeb,
          collegeYearsFromTo: { from: olFrom, to: olTo },
          classesFromTo: { from: classFrom, to: classTo },
          gceOLYear: { yearValue: olYear, yearText: olYear },
          gceALYear: { yearValue: alYear, yearText: alYear },
          obaMembershipNo: obaNum,
          obaRequested: conf,
          passwordString: pwd,
        };

        if (response.status == 200) {
          const res = await axios.post(
            `${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/users/register`,
            user
          );
          setLoading(false);
          setShowPopUp(true);
          console.log(res);
        }
      } else {
        setLoading(true);
        const user = {
          fullName: fName,
          email: email,
          username: fName,
          nameUsedAtSTCG: genralName,
          nickName: nickName,
          dateOfBirth: birth,
          idOrPassportNum: nic,
          webAddress: webLink,
          fbUrl: fbLink,
          IgUrl: instaLink,
          twitterUrl: twiiterLink,
          linkedinUrl: linkedIn,
          hobbies: [hobbie01, hobbie02, hobbie03],
          profileImg: null,
          mobileNo: mobile,
          landPhoneNo: home,
          emailAddresses: [],
          address: `${houseNum} ${street}`,
          town: town,
          country: {
            id: country,
            text: country,
            value: country,
            countryCode: country,
          },
          occupationDesignation: occupation,
          professionKeywords: ["example", "example"],
          organizationName: organization,
          natureOfOrganization: industry,
          organizationWebAddress: orgWeb,
          collegeYearsFromTo: { from: olFrom, to: olTo },
          classesFromTo: { from: classFrom, to: classTo },
          gceOLYear: { yearValue: olYear, yearText: olYear },
          gceALYear: { yearValue: alYear, yearText: alYear },
          obaMembershipNo: obaNum,
          obaRequested: conf,
          passwordString: pwd,
        };

        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/users/register`,
          user
        );
        setLoading(false);
        setShowPopUp(true);
      }
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  const setCitiesInCountry = (name) => {
    newCountries.forEach((element) => {
      if (element.name == name) {
        setCities(element.cities);
      }
    });
  };

  return (
    <div>
      {/* General User Details */}
      <div className="d-flex flex-column filters-container mt-5 pb-4">
        <div className="d-flex  pe-5 me-5 ps-5 pt-5 ">
          <div className="add-user-col d-flex align-items-center ">
            <img src={img} className="add-admin-img me-3" />
            <div className="d-flex flex-column">
              <div className="add-admin-profile mb-2">Profile Avatar</div>
              <label className="add-admin-img-btn px-3 p-2" htmlFor="img-input">
                Add Image
              </label>
              <input
                style={{ opacity: "0", width: "10px", height: "10px" }}
                id="img-input"
                type="file"
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]);
                  setImg(URL.createObjectURL(e.target.files[0]));

                  const file = e.target.files[0];
                  const reader = new FileReader();

                  reader.onload = function (e) {
                    // The base64 data
                    const base64 = e.target.result;
                    setBase64Data(base64);
                    console.log(base64);
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </div>
          </div>
          <div className="add-user-col d-flex flex-column ps-3">
            <div className="add-user-txt mb-2">Full Name</div>
            <input
              className="add-user-input mb-4"
              placeholder=""
              onChange={(e) => {
                setFName(e.target.value);
              }}
            />
            <div className="add-user-txt mb-2">Nick Name</div>
            <input
              className="add-user-input mb-4"
              onChange={(e) => {
                setNickName(e.target.value);
              }}
            />
            <div className="add-user-txt mb-2">NIC Number </div>
            <input
              className="add-user-input"
              onChange={(e) => {
                setNic(e.target.value);
              }}
            />
          </div>
          <div className="add-user-col d-flex flex-column ps-5">
            <div className="add-user-txt mb-2">Name generally used at STCG</div>
            <input
              className="add-user-input mb-4"
              onChange={(e) => {
                setGeneralName(e.target.value);
              }}
            />
            <div className="add-user-txt mb-2">Date Of Birth</div>
            <div className="add-user-dob d-flex">
              <select
                className="dob-date me-2 ps-2"
                onChange={(e) => {
                  setBirthDate(e.target.value);
                }}
              >
                <option>Date</option>
                {days.map((data) => (
                  <option value={data}>{data}</option>
                ))}
              </select>
              <select
                className="dob-year ps-2"
                onChange={(e) => {
                  setBirthYear(e.target.value);
                }}
              >
                <option>Year of Birth</option>
                {allYears.map((data) => (
                  <option value={data.value}>{data.text}</option>
                ))}
              </select>
            </div>
            <select
              className="dob-month me-2 mt-2 ps-2"
              onChange={(e) => {
                setBirthMonth(e.target.value);
              }}
            >
              <option>Month</option>
              {months.map((data) => (
                <option value={data.id}>{data.text}</option>
              ))}
            </select>

            <input
              className="add-user-input mb-4 mt-1"
              placeholder="Enter User Password"
              onChange={(e) => {
                setPwd(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      {/* Social Media Details */}
      <div className="d-flex flex-column filters-container mt-4 pb-4">
        <div className="d-flex flex-column pe-5 me-5 ps-5 pt-5 ">
          <div className="add-user-section-heading mb-4">
            Social Media Account Details
          </div>
          <div className="d-flex justify-content-between">
            <div
              className="d-flex"
              style={{
                background: "#F7F7F7",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-center img-container p-2 px-4">
                <img src={web} className="web-img" />
              </div>
              <input
                className="link-input"
                placeholder="Web Link"
                value={webLink}
                onChange={(e) => {
                  setWebLink(e.target.value);
                }}
              />
            </div>

            <div
              className="d-flex"
              style={{
                background: "#F7F7F7",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-center img-container p-2 px-4">
                <img src={fb} className="web-img" />
              </div>
              <input
                className="link-input"
                placeholder="Facebook URL"
                value={fbLink}
                onChange={(e) => {
                  setFbLink(e.target.value);
                }}
              />
            </div>

            <div
              className="d-flex"
              style={{
                background: "#F7F7F7",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-center img-container p-2 px-4">
                <img src={insta} className="web-img" />
              </div>
              <input
                className="link-input"
                placeholder="Instagram URL"
                value={instaLink}
                onChange={(e) => {
                  setInstaLink(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <div
              className="d-flex"
              style={{
                background: "#F7F7F7",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-center img-container p-2 px-4">
                <img src={twitter} className="web-img" />
              </div>
              <input
                className="link-input"
                placeholder="Twitter URL"
                value={twiiterLink}
                onChange={(e) => {
                  setTwitterLink(e.target.value);
                }}
              />
            </div>

            <div
              className="d-flex"
              style={{
                background: "#F7F7F7",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-center img-container p-2 px-4">
                <img src={linkedin} className="web-img" />
              </div>
              <input
                className="link-input"
                placeholder="Linkedin URL"
                value={linkedIn}
                onChange={(e) => {
                  setLinkedIn(e.target.value);
                }}
              />
            </div>

            <div
              className="d-flex"
              style={{
                background: "#F7F7F7",
                borderRadius: "10px",
                opacity: "0",
              }}
            >
              <div className="d-flex justify-content-center img-container p-2 px-4">
                <img src={insta} className="web-img" />
              </div>
              <input className="link-input" placeholder="Instagram URL" />
            </div>
          </div>
        </div>
      </div>

      {/* Hobbies */}
      <div className="d-flex flex-column filters-container mt-4 pb-4">
        <div className="d-flex flex-column pe-5 me-5 ps-5 pt-5 ">
          <div className="add-user-section-heading mb-4">Hobbies</div>

          <div className="d-flex justify-content-between">
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="Hobbie 01"
              onChange={(e) => {
                setHobbie01(e.target.value);
              }}
            />
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="Hobbie 02"
              onChange={(e) => {
                setHobbie02(e.target.value);
              }}
            />
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="Hobbie 03"
              onChange={(e) => {
                setHobbie03(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      {/* Contact Details */}

      <div className="d-flex flex-column filters-container mt-4 pb-4">
        <div className="d-flex flex-column pe-5 me-5 ps-5 pt-5 ">
          <div className="add-user-section-heading mb-4">Contact Details</div>
          <div className="d-flex justify-content-between">
            <div
              className="d-flex"
              style={{
                background: "#F7F7F7",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex align-items-center img-container p-2 px-2">
                <span className="mx-2 px-3 fw-bold" style={{ color: "white" }}>
                  +
                </span>
                <div className="" style={{ color: "white" }}></div>
              </div>
              <input
                className="link-input"
                placeholder="Mobile Phone Number"
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
              />
            </div>

            <div
              className="d-flex"
              style={{
                background: "#F7F7F7",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-center img-container p-2 px-4">
                <img src={phone} className="web-img" />
              </div>
              <input
                className="link-input"
                placeholder="Home Number"
                onChange={(e) => {
                  setHome(e.target.value);
                }}
              />
            </div>

            <div
              className="d-flex"
              style={{
                background: "#F7F7F7",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-center img-container p-2 px-4">
                <img src={mail} className="web-img" />
              </div>
              <input
                className="link-input"
                placeholder="Email Address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Address */}

      <div className="d-flex flex-column filters-container mt-4 pb-4">
        <div className="d-flex flex-column pe-5 me-5 ps-5 pt-5 ">
          <div className="add-user-section-heading mb-4">Address</div>

          <div>
            <select
              className="dob-month me-2 mt-2 ps-2 mb-3 "
              onChange={(e) => {
                setShowTown(true);
                setCitiesInCountry(e.target.value);
                setCountry(e.target.value);
              }}
            >
              <option>Country</option>

              {newCountries.map((country) => (
                <option value={country.name}>{country.name}</option>
              ))}
            </select>
          </div>
          <div
            className="d-flex justify-content-between"
            style={{ opacity: showTown ? 100 : 0 }}
          >
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="House Number"
              onChange={(e) => {
                setHouseNum(e.target.value);
              }}
            />
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="Street Name"
              onChange={(e) => {
                setStreet(e.target.value);
              }}
            />
            {/* <input
              className="add-user-input mb-3 ps-3"
              placeholder="Town"
              onChange={(e) => {
                setTown(e.target.value);
              }}
            /> */}

            <select
              className="dob-month me-2  ps-2 mb-3 "
              onChange={(e) => {
                setShowTown(true);
                setTown(e.target.value);
              }}
            >
              {/* <option>Country</option> */}

              {cities.map((city) => (
                <option value={city.name}>{city.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Ocupation Details */}

      <div className="d-flex flex-column filters-container mt-4 pb-4 mb-3">
        <div className="d-flex flex-column pe-5 me-5 ps-5 pt-5 ">
          <div className="add-user-section-heading mb-4">
            Occupation Details
          </div>

          <div className="d-flex justify-content-between">
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="Occupation/Designation"
              onChange={(e) => {
                setOccupation(e.target.value);
              }}
            />
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="Profession"
              onChange={(e) => {
                setProfession(e.target.value);
              }}
            />
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="Name of organization"
              onChange={(e) => {
                setOrganization(e.target.value);
              }}
            />
          </div>
          <div className="d-flex justify-content-between">
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="Industry / nature of organization"
              onChange={(e) => {
                setIndustry(e.target.value);
              }}
            />
            <div
              className="d-flex mb-3"
              style={{
                background: "#F7F7F7",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-center img-container p-2 px-4">
                <img src={web} className="web-img" />
              </div>
              <input
                className="link-input"
                placeholder="Organization Web address"
                onChange={(e) => {
                  setOrgWeb(e.target.value);
                }}
              />
            </div>
            <input
              style={{ opacity: "0" }}
              className="add-user-input mb-3 ps-3"
              placeholder="Name of organization"
              onChange={(e) => {
                setIndustry(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      {/* School Years */}

      <div className="d-flex justify-content-center align-items-center scl-footer mt-4  py-4">
        YEARS AT S. THOMAS' COLLEGE GURUTALAWA
      </div>

      <div className="d-flex  scl-footer-details ">
        <div className="footer-section d-flex flex-column ps-5 pt-3">
          <div className="d-flex">
            <div className="footer-section-half d-flex flex-column ">
              <div className="footer-txt">From</div>
              <select
                className="footer-input ps-2"
                onChange={(e) => {
                  setOlFrom(e.target.value);
                }}
              >
                {allYears.map((data) => (
                  <option value={data.text}>{data.text}</option>
                ))}
              </select>
            </div>
            <div className="footer-section-half d-flex flex-column">
              <div className="footer-txt">To</div>
              <select
                className="footer-input ps-2"
                onChange={(e) => {
                  setOlTo(e.target.value);
                }}
              >
                {allYears.map((data) => (
                  <option value={data.text}>{data.text}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="footer-txt mt-5">GCE O/L Year</div>
          <select
            className="ol-year me-2 mt-2 ps-2 mb-5"
            onChange={(e) => {
              setOlYear(e.target.value);
            }}
          >
            {/* <option>1995</option> */}
            {allYears.map((data) => (
              <option value={data.text}>{data.text}</option>
            ))}
          </select>
        </div>
        <div className="footer-section d-flex flex-column ps-5 pt-3">
          <div className="d-flex">
            <div className="footer-section-half d-flex flex-column ">
              <div className="footer-txt">From Class</div>
              <input
                className="footer-input-cls ps-2"
                onChange={(e) => {
                  setClassFrom(e.target.value);
                }}
                required
              />
            </div>
            <div className="footer-section-half d-flex flex-column">
              <div className="footer-txt">To Class</div>
              <input
                className="footer-input-cls ps-2"
                onChange={(e) => {
                  setClassTo(e.target.value);
                }}
                required
              />
            </div>
          </div>

          <div className="footer-txt mt-5">
            If sat for GCE A/L from the college
          </div>
          <select
            className="ol-year me-2 mt-2 ps-2 mb-5"
            onChange={(e) => {
              setAlYear(e.target.value);
            }}
          >
            {/* <option>1995</option> */}
            {allYears.map((data) => (
              <option value={data.text}>{data.text}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center scl-footer mt-4  py-4">
        IF you are a STCG OBA member
      </div>

      <div className="d-flex  scl-footer-details mb-5">
        <div className="footer-section  d-flex flex-column ps-5 pt-5 pb-5">
          <div className="footer-txt mb-2">STCG OBA Membership Number</div>
          <input
            className="oba-membership ps-3"
            placeholder="19955115526625"
            onChange={(e) => {
              setObaNum(e.target.value);
            }}
          />
        </div>
        <div className="footer-section  d-flex flex-column ps-5 pt-4 pb-5">
          <div className="footer-txt mb-2">
            Do you confirm this user add a STCG OBA Member?
          </div>
          <div className="d-flex mt-1">
            <button
              className={!conf?"footer-btn me-4":"footer-btn-active me-4"}
              onClick={() => {
                setConf(true);
              }}
            >
              Yes
            </button>
            <button
              className={!conf?"footer-btn-active":"footer-btn"}
              onClick={(e) => {
                setConf(false);
              }}
             
            >
              No
            </button>
          </div>
        </div>
        <div className="footer-section d-flex flex-column ps-5 pt-4 pb-5 ">
          <button
            className="footer-btn-submit ms-2 ms-5"
            onClick={(e) => {
              submit(e);
            }}
          >
            Submit
          </button>
        </div>
      </div>

      {loading == true && (
        <div className="pop-up" style={{}}>
          {/* <ClipLoader color="#52bfd9" size={50}/> */}
          <BeatLoader color="#0057a7" />
        </div>
      )}

      {showPopUp == true && (
        <div className="pop-up">
          <div className="pop-up-container">
            <div className="d-flex justify-content-center align-items-center p-3 pop-up-heading">
              User Added Successfully
            </div>
            <div
              className="d-flex justify-content-center align-items-center p-3 pop-up-close"
              onClick={() => {
                setShowPopUp(false);
                fetchData();
                close()
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

const mapStateToProps = (state) => ({
  allYears: state.userReducer.years,
});
const mapDispatchToProps = (dispatch) => ({
  fetchAdmins: () => dispatch(fetchAdminDetails()),
  fetchData: () => dispatch(fetchUsersAndOtherDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
