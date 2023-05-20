import { React, useEffect, useState } from "react";
import "./edituser.css";
import circle from "../../../assets/dfuser.jpg";
import web from "../../../assets/web.png";
import fb from "../../../assets/fb.png";
import insta from "../../../assets/insta.png";
import twitter from "../../../assets/twitter.png";
import linkedin from "../../../assets/linkdin.png";
import sl from "../../../assets/slphone.png";
import phone from "../../../assets/phone.png";
import mail from "../../../assets/mail.png";
import axios from "axios";
import { connect } from "react-redux";
import { months, days, countries } from "../StaticData/Data";
import { BeatLoader } from "react-spinners";
import { fetchUsersAndOtherDetails } from "../../../actions/userDetailsAction";

function EditUser(props) {
  const { id, data, allYears, fetchData } = props;

  useEffect(() => {
    const date = data.dateOfBirth.split("-");
    setDobYear(date[0]);
    setDobDay(date[2]);
    setDobMonth(months[date[1] - 1].text);

    console.log(id);

    if( data.profileImg!=null){

      setProfileImg({
        id:  data.profileImg.id,
        imgPath:  data.profileImg.imgPath,
        prevPathList: [],
      })
      setImg(data.profileImg.imgPath)
    }

  }, []);

  const [dobDay, setDobDay] = useState();
  const [dobMonth, setDobMonth] = useState();
  const [dobYear, setDobYear] = useState();

  const [selectedFile, setSelectedFile] = useState(null);
  const [img, setImg] = useState(
    circle
  );
  const [base64Data, setBase64Data] = useState("");

  const [profileImg, setProfileImg] = useState();

  const [loading, setLoading] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const [genralName, setGeneralName] = useState(data.nameUsedAtSTCG);
  const [webLink, setWebLink] = useState(data.webAddress);
  const [fbLink, setFbLink] = useState(data.fbUrl);
  const [instaLink, setInstaLink] = useState(data.IgUrl);
  const [twiiterLink, setTwitterLink] = useState(data.twitterUrl);
  const [linkedIn, setLinkedIn] = useState(data.linkedinUrl);
  const [hobbie01, setHobbie01] = useState(data.hobbies[0]);
  const [hobbie02, setHobbie02] = useState(data.hobbies[1]);
  const [hobbie03, setHobbie03] = useState(data.hobbies[2]);
  const [mobile, setMobile] = useState(data.mobileNo);
  const [home, setHome] = useState(data.landPhoneNo);
  const [email, setEmail] = useState("");
  const [houseNum, setHouseNum] = useState("asd");
  const [street, setStreet] = useState("asd");
  const [town, setTown] = useState(data.town);
  const [country, setCountry] = useState(data.country);
  const [occupation, setOccupation] = useState(data.occupationDesignation);
  const [profession, setProfession] = useState("");
  const [organization, setOrganization] = useState(data.organizationName);
  const [industry, setIndustry] = useState(data.natureOfOrganization);
  const [orgWeb, setOrgWeb] = useState(data.organizationWebAddress);

  const submit = async (e) => {

    try {
      const imgData = {
        base64Data: base64Data,
      };

      setLoading(true);
      if(selectedFile!=null){
         
        console.log("image selected")

        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/upload/profileImg`,
          imgData
        );
  
        console.log(response);
  
        const imgId = response.data.data.fileId;
        const url = response.data.data.url;
  
        const user = {
          nameUsedAtSTCG: genralName,
          webAddress: webLink,
          fbUrl: fbLink,
          IgUrl: instaLink,
          twitterUrl: twiiterLink,
          linkedinUrl: linkedIn,
          hobbies: [hobbie01,hobbie02,hobbie03],
          profileImg: {
            id: imgId,
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
        };
  
        const token = localStorage.getItem("token"); // assuming the JWT token is stored in local storage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        if (response.status == 200) {
          const res = await axios.post(
            `${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/admin/update_user?id=${id}`,
            user,
            config
          );
  
          setLoading(false);
          setShowPopUp(true);
          console.log(res);
        }

      }else{

        const user = {

          nameUsedAtSTCG: genralName,
          webAddress: webLink,
          fbUrl: fbLink,
          IgUrl: instaLink,
          twitterUrl: twiiterLink,
          linkedinUrl: linkedIn,
          hobbies: [hobbie01,hobbie02,hobbie03],
          profileImg: profileImg,
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

        };
  
        const token = localStorage.getItem("token"); // assuming the JWT token is stored in local storage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        
        console.log("image not selected")
        const res = await axios.post(
          `https://brotherhood-backend.vercel.app/api/v1/admin/update_user?id=${id}`,
          user,
          config
        );

        setLoading(false);
        setShowPopUp(true);
        console.log(res);

      }
      
    } catch (error) {

      setLoading(false);
      alert(error);
      console.log(error)

    }
  };

  return (
    <div>
      {/* General User Details */}
      <div className="d-flex flex-column filters-container mt-5 pb-4">
        <div className="d-flex  pe-5 me-5 ps-5 pt-5 ">
          <div className="add-user-col d-flex align-items-center">
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
            <div className="add-user-txt mb-2" style={{ opacity: "50%" }}>
              Full Name
            </div>
            <input
              className="add-user-input mb-4"
              placeholder=""
              disabled
              style={{ opacity: "50%" }}
              value={data.fullName}
            />
            <div className="add-user-txt mb-2" style={{ opacity: "50%" }}>
              Nick Name
            </div>
            <input
              className="add-user-input mb-4"
              style={{ opacity: "50%" }}
              disabled
              value={data.nickName}
            />
            {/* <div className="add-user-txt mb-2" style={{opacity:"50%"}}>NIC Number </div>
            <input className="add-user-input" style={{opacity:"50%"}} disabled value={data.nickName}/> */}
          </div>
          <div className="add-user-col d-flex flex-column ps-5">
            <div className="add-user-txt mb-2">Name generally used at STCG</div>
            <input
              className="add-user-input mb-4"
              value={genralName}
              onChange={(e) => {
                setGeneralName(e.target.value);
              }}
            />
            <div className="add-user-txt mb-2" style={{ opacity: "50%" }}>
              Date Of Birth
            </div>
            <div className="add-user-dob d-flex">
              <select
                className="dob-date me-2 ps-2"
                style={{ opacity: "50%" }}
                disabled
              >
                <option>{dobDay}</option>
              </select>
              <select
                className="dob-year ps-2"
                style={{ opacity: "50%" }}
                disabled
              >
                <option>{dobYear}</option>
              </select>
            </div>
            <select
              className="dob-month me-2 mt-2 ps-2"
              style={{ opacity: "50%" }}
              disabled
            >
              <option>{dobMonth}</option>
            </select>
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
              value={hobbie01}
            />
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="Hobbie 02"
              onChange={(e) => {
                setHobbie02(e.target.value);
              }}
              value={hobbie02}
            />
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="Hobbie 03"
              onChange={(e) => {
                setHobbie03(e.target.value);
              }}
              value={hobbie03}
            />
          </div>
        </div>
      </div>

      {/* Contact Details */}

      <div className="d-flex flex-column filters-container mt-4 pb-4">
        <div className="d-flex flex-column pe-5 me-5 ps-5 pt-5 ">
          <div
            className="add-user-section-heading mb-4"
            style={{ opacity: "100%" }}
          >
            Contact Details
          </div>
          <div
            className="d-flex justify-content-between"
            style={{ opacity: "100%" }}
          >
            <div
              className="d-flex"
              style={{
                background: "#F7F7F7",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex align-items-center img-container p-2 px-2">
              <span className="mx-2 px-3 fw-bold" style={{ color: "white" }}>+</span>
                <div className="" style={{ color: "white" }}></div>
              </div>
              <input
                className="link-input"
                placeholder="Mobile Phone Number"
                value={mobile}
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
                value={home}
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
                opacity: "50%",
              }}
            >
              <div className="d-flex justify-content-center img-container p-2 px-4">
                <img src={mail} className="web-img" />
              </div>
              <input
                className="link-input"
                placeholder="Email Address"
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      {/* Address */}

      <div className="d-flex flex-column filters-container mt-4 pb-4">
        <div className="d-flex flex-column pe-5 me-5 ps-5 pt-5 ">
          <div className="add-user-section-heading mb-4">Address</div>

          <div className="d-flex justify-content-between">
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="House Number"
              value={houseNum}
              onChange={(e) => {
                setHouseNum(e.target.value);
              }}
            />
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="Street Name"
              value={street}
              onChange={(e) => {
                setStreet(e.target.value);
              }}
            />
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="Town"
              value={town}
              onChange={(e) => {
                setTown(e.target.value);
              }}
            />
          </div>
          <div>
            <select
              className="dob-month me-2 mt-2 ps-2"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            >
              <option>Country</option>

              {countries.map((country) => (
                <option value={country.name}>{country.name}</option>
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
              value={occupation}
            />
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="Profession"
              onChange={(e) => {
                setProfession(e.target.value);
              }}
              value={profession}
            />
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="Name of organization"
              onChange={(e) => {
                setOrganization(e.target.value);
              }}
              value={organization}
            />
          </div>
          <div className="d-flex justify-content-between">
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="Industry / nature of organization"
              onChange={(e) => {
                setIndustry(e.target.value);
              }}
              value={industry}
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
                value={orgWeb}
                
              />
            </div>
            <input
              style={{ opacity: "0" }}
              className="add-user-input mb-3 ps-3"
              placeholder="Name of organization"
              disabled
            />
          </div>
        </div>
      </div>

      {/* School Years */}

      <div className="d-flex justify-content-center align-items-center scl-footer mt-4  py-4">
        YEARS AT S. THOMAS' COLLEGE GURUTALAWA
      </div>

      <div className="d-flex  scl-footer-details ">
        <div
          className="footer-section d-flex flex-column ps-5 pt-3"
          style={{ opacity: "50%" }}
        >
          <div className="d-flex">
            <div className="footer-section-half d-flex flex-column ">
              <div className="footer-txt">From</div>
              <input className="footer-input" value={data.collegeYearsFromTo.from} disabled/>
            </div>
            <div className="footer-section-half d-flex flex-column">
              <div className="footer-txt">To</div>
              <input className="footer-input" value={data.collegeYearsFromTo.to} disabled/>
            </div>
          </div>

          <div className="footer-txt mt-5">GCE O/L Year</div>
          <select className="ol-year me-2 mt-2 ps-2 mb-5" disabled>
            <option>{data.gceOLYear.yearText}</option>
          </select>
        </div>
        <div
          className="footer-section d-flex flex-column ps-5 pt-3"
          style={{ opacity: "50%" }}
        >
          <div className="d-flex">
            <div className="footer-section-half d-flex flex-column ">
              <div className="footer-txt">From Class</div>
              <input className="footer-input" value={data.classesFromTo.from} disabled/>
            </div>
            <div className="footer-section-half d-flex flex-column">
              <div className="footer-txt">To Class</div>
              <input className="footer-input" value={data.classesFromTo.to} disabled/>
            </div>
          </div>

          <div className="footer-txt mt-5">
            If sat for GCE A/L from the college
          </div>
          <select className="ol-year me-2 mt-2 ps-2 mb-5" disabled>
            <option>{data.gceALYear.yearText}</option>
          </select>
        </div>

        <div className="footer-section d-flex flex-column ps-5  pb-5 mt-5" style={{ paddingTop:"57px" }}>
          <button
            className="footer-btn-submit ms-2 ms-5 mt-5"
            onClick={() => {
              submit();
            }}
          >
            Submit
          </button>
        </div>
      </div>

      {/* <div className="d-flex justify-content-center align-items-center scl-footer mt-4  py-4">
        IF you are a STCG OBA member
      </div>

      <div className="d-flex  scl-footer-details mb-5">
        <div className="footer-section  d-flex flex-column ps-5 pt-5 pb-5">
          <div className="footer-txt mb-2" style={{ opacity: "50%" }}>
            STCG OBA Membership Number
          </div>
          <input
            className="oba-membership ps-3"
            placeholder="19955115526625"
            style={{ opacity: "50%" }}
          />
        </div>
        <div className="footer-section  d-flex flex-column ps-5 pt-4 pb-5">
          <div className="footer-txt mb-2" style={{ opacity: "50%" }}>
            Do you confirm this user add a STCG OBA Member?
          </div>
          <div className="d-flex mt-1">
            <button className="footer-btn me-4" style={{ opacity: "50%" }}>
              Yes
            </button>
            <button className="footer-btn ms-2" style={{ opacity: "50%" }}>
              No
            </button>
          </div>
        </div>
        <div className="footer-section d-flex flex-column ps-5 pt-4 pb-5 ">
          <button
            className="footer-btn-submit ms-2 ms-5"
            onClick={() => {
              submit();
            }}
          >
            Submit
          </button>
        </div>
      </div> */}

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
              User Updated Successfully
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

const mapStateToProps = (state) => ({
  allYears: state.userReducer.years,
});
const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchUsersAndOtherDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
