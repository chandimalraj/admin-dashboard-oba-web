import React, { useEffect, useState } from "react";
import "./viewuser.css";
import circle from "../../../assets/dfuser.jpg";
import web from "../../../assets/web.png";
import fb from "../../../assets/fb.png";
import insta from "../../../assets/insta.png";
import twitter from "../../../assets/twitter.png";
import linkedin from "../../../assets/linkdin.png";
import sl from "../../../assets/slphone.png";
import phone from "../../../assets/phone.png";
import mail from "../../../assets/mail.png";
import link from "../../../assets/link.png";
import contact from "../../../assets/contact.png";
import mobile from "../../../assets/mobilenum.png";
import sendmail from "../../../assets/sendmail.png";

export default function ViewUser(props) {

  const {id , data , close} = props

  const [img,setImg] = useState(circle)
  const [mail,setMail] = useState("")

  useEffect(()=>{

    if(data.profileImg!=null){
          setImg(data.profileImg.imgPath)
    }
    
    setMail(`mailto:${data.email}`)

  },[])
  

  return (
    <div>
      {/* General User Details */}
      <div className="d-flex flex-column filters-container mt-5 pb-4">
        <div className="d-flex  pe-5 me-5 ps-5 pt-5 ">
          <div className="add-user-col d-flex align-items-center justify-content-center">
            <img src={img} className="user-view-img me-3" />
          </div>
          <div className="add-user-col d-flex flex-column ps-3">
            <div className="add-user-txt mb-2">Name</div>
            <input className="view-user-input mb-4" placeholder="" disabled value={data.fullName}/>
            <div className="add-user-txt mb-2">Nick Name</div>
            <input className="view-user-input mb-4" disabled value={data.nickName}/>
          </div>
          <div className="add-user-col d-flex flex-column ps-3">
            <div className="add-user-txt mb-2">Name Of Used In STCG</div>
            <input className="view-user-input mb-4" placeholder="" disabled value={data.nameUsedAtSTCG}/>
            <div className="add-user-txt mb-2">Date of Birth</div>
            <input className="view-user-input mb-4" disabled value={data.dateOfBirth}/>
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
                background: "rgba(247, 247, 247, 0.5)",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-center img-container p-2 px-4">
                <img src={web} className="web-img" />
              </div>
              <input
                className="link-input-view"
                placeholder="Web Link"
                disabled
                value={data.webAddress}
              />
              <div className="d-flex justify-content-center img-container-link p-2 px-4">
                <img src={link} className="web-img" />
              </div>
            </div>

            <div
              className="d-flex"
              style={{
                background: "rgba(247, 247, 247, 0.5)",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-center img-container p-2 px-4">
                <img src={fb} className="web-img" />
              </div>
              <input
                className="link-input-view"
                placeholder="Facebook URL"
                disabled
                value={data.fbUrl}
              />
              <div className="d-flex justify-content-center img-container-link p-2 px-4">
                <img src={link} className="web-img" />
              </div>
            </div>

            <div
              className="d-flex"
              style={{
                background: "rgba(247, 247, 247, 0.5)",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-center img-container p-2 px-4">
                <img src={insta} className="web-img" />
              </div>
              <input
                className="link-input-view"
                placeholder="Instagram URL"
                disabled
                value={data.IgUrl}
              />
              <div className="d-flex justify-content-center img-container-link p-2 px-4">
                <img src={link} className="web-img" />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <div
              className="d-flex"
              style={{
                background: "rgba(247, 247, 247, 0.5)",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-center img-container p-2 px-4">
                <img src={twitter} className="web-img" />
              </div>
              <input
                className="link-input-view"
                placeholder="Twitter URL"
                disabled
                value={data.twitterUrl}
              />
              <div className="d-flex justify-content-center img-container-link p-2 px-4">
                <img src={link} className="web-img" />
              </div>
            </div>

            <div
              className="d-flex"
              style={{
                background: "rgba(247, 247, 247, 0.5)",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-center img-container p-2 px-4">
                <img src={linkedin} className="web-img" />
              </div>
              <input
                className="link-input-view"
                placeholder="Linkedin URL"
                disabled
                value={data.linkedinUrl}
              />
              <div className="d-flex justify-content-center img-container-link p-2 px-4">
                <img src={link} className="web-img" />
              </div>
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
              <input className="link-input-view" placeholder="Instagram URL" value={data.IgUrl}/>
              <div className="d-flex justify-content-center img-container-link p-2 px-4">
                <img src={link} className="web-img" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hobbies */}
      <div className="d-flex flex-column filters-container mt-5 pb-4">
        <div className="d-flex flex-column pe-5 me-5 ps-5 pt-5 ">
          <div className="add-user-section-heading mb-4">Hobbies</div>

          <div className="d-flex justify-content-between">
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="Hobbie 01"
              disabled
              value={data.hobbies[0]}
            />
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="Hobbie 02"
              disabled
              value={data.hobbies[1]}
            />
            <input
              className="add-user-input mb-3 ps-3"
              placeholder="Hobbie 03"
              disabled
              value={data.hobbies[2]}
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
                background: "rgba(247, 247, 247, 0.5)",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex align-items-center img-container p-2 px-2">
                <span className="mx-2 px-3 fw-bold" style={{ color: "white" }}>+</span>
                <div className="" style={{ color: "white" }}></div>
              </div>
              <input
                className="link-input-view"
                placeholder="Mobile Phone Number"
                disabled
                value={data.mobileNo}
              />
              <div className="d-flex justify-content-center img-container-link p-2 px-4">
                <img src={contact} className="web-img" />
              </div>
            </div>

            <div
              className="d-flex"
              style={{
                background: "rgba(247, 247, 247, 0.5)",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-center img-container p-2 px-4">
                <img src={phone} className="web-img" />
              </div>
              <input
                className="link-input-view"
                placeholder="Home Number"
                disabled
                value={data.landPhoneNo}
              />
              <div className="d-flex justify-content-center img-container-link p-2 px-4">
                <img src={contact} className="web-img" />
              </div>
            </div>

            <div
              className="d-flex"
              style={{
                background: "rgba(247, 247, 247, 0.5)",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-center img-container p-2 px-4">
                <img src={mail} className="web-img" />
              </div>
              <input
                className="link-input-view"
                placeholder="Email Address"
                disabled
                value={data.email}
              />
              <div className="d-flex justify-content-center img-container-link p-2 px-4">
                <img src={contact} className="web-img" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lives In */}
      <div className="d-flex flex-column filters-container mt-4 pb-5">
        <div className="d-flex flex-column pe-5 me-5 ps-5 pt-5 ">
          <div className="add-user-section-heading mb-3">Lives In</div>
          <input disabled className="lives-in ps-3" value={`${data.address},${data.town}` }/>
        </div>
      </div>

      {/* Occupation Details */}

      <div className="d-flex flex-column filters-container mt-4 pb-5">
        <div className="d-flex flex-column pe-5 me-5 ps-5 pt-5 ">
          <div className="add-user-section-heading mb-3">Occupation Details</div>
          <input disabled className="lives-in ps-3" value={data.occupationDesignation}/>
          <div className="w-100 d-flex mt-4 link-container">
            <div className="d-flex justify-content-center img-container p-2 px-4">
              <img src={web} className="web-img" />
            </div>
            <input disabled className="lives-in-address w-100 ps-3" value={data.organizationWebAddress}/>
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
              <input className="footer-input ps-2" disabled value={data.collegeYearsFromTo.from}/>
            </div>
            <div className="footer-section-half d-flex flex-column">
              <div className="footer-txt">To</div>
              <input className="footer-input ps-2" disabled value={data.collegeYearsFromTo.to}/>
            </div>
          </div>

          <div className="footer-txt mt-5">GCE O/L Year</div>
          <input className="ol-year-input me-2 mt-2 ps-2" disabled value={data.gceOLYear.yearText}/>
            {/* <option>1995</option>
          </select> */}
          <div className="footer-txt mt-5">Member at STCG OBA Community</div>
          <div className="d-flex justify-content-between mt-2 member-id-con mb-5">
            <div
              className="img-container-link px-2 p-2"
              style={{ color: "white" }}
            >
              Member Id
            </div>
            <div className="d-flex align-items-center px-3">{data.obaMembershipNo}</div>
            <div className="d-flex justify-content-center img-container-link p-2 px-4">
              <img src={contact} className="web-img" />
            </div>
          </div>
        </div>
        <div className="footer-section d-flex flex-column ps-5 pt-3">
          <div className="d-flex">
            <div className="footer-section-half d-flex flex-column ">
              <div className="footer-txt">From Class</div>
              <input className="footer-input ps-2" disabled value={data.classesFromTo.from}/>
            </div>
            <div className="footer-section-half d-flex flex-column">
              <div className="footer-txt">To Class</div>
              <input className="footer-input ps-2" disabled value={data.classesFromTo.to}/>
            </div>
          </div>

          <div className="footer-txt mt-5">
            If sat for GCE A/L from the college
          </div>
          <input className="ol-year-input me-2 mt-2 ps-2 mb-5" disabled value={data.gceALYear.yearText}/>
            {/* <option>1995</option>
          </select> */}
        </div>
      </div>

      <div className="d-flex justify-content-center pe-5 me-5 ps-5 pt-5 ">
        {/* <div className="mobile d-flex  justify-content-center align-items-center mb-3 mx-2">
          <img src={mobile} className="web-img" />
          <div className="px-3">Get a Mobile Number</div>
        </div> */}
        <a className="email d-flex  justify-content-center align-items-center mb-3 mx-4" href={mail}>
          <img src={sendmail} className="mail-img" />
          <div className="px-3 send-mail" >Send an E-mail</div>
        </a>
      </div>

      <div className="d-flex justify-content-center pe-5 me-5 ps-5 pt-3  pb-5">
      <button className="footer-btn-close  ms-5 mx-2" 
       onClick={()=>{
        close()
       }}
      >Close</button>
      </div>
    </div>
  );
}
