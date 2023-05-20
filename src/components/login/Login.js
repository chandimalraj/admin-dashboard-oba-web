import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import user from "../../assets/emailuser.png";
import lock from "../../assets/password.png";
import eye from "../../assets/eye.png";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../../actions/setCurrentUserAction";
import axios from "axios";
import ClipLoader from 'react-spinners/ClipLoader';
import { BeatLoader } from "react-spinners";

function Login(props) {
  const { setCurrentUser } = props;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwdShow, setPwdShow] = useState(false);
  const [loading,setLoading] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')

  useEffect(() => {

    const token = localStorage.getItem("token"); // Check for the JWT token in local storage
    if (token) {
      navigate("/home");
    }
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    
    if(savedEmail!=null && savedPassword!=null){
      setEmail(savedEmail)
      setPassword(savedPassword)
    }

  },[]);

  const userLogin = async () => {

    const user = {
      email: email,
      password: password,
    };
    
    if (email === "") {
      alert("Please enter your email");
      return;
    }
    if (password === "") {
      alert("Please enter your password");
      return;
    } else {

      if (selectedValue=="remember") {
        // Save the user's login credentials in a cookie or local storage
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      }
      try {
        setLoading(true)
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/admin/login`,
          user
        );

        if (res.status == 200) {
          const userInfo = res.data.data;
          const token = userInfo.accessToken;
          const id = userInfo.userId;
          localStorage.setItem("token", token);
          localStorage.setItem("id", id); // Store the JWT token in local storage
          setCurrentUser(userInfo);
          navigate("/home");
          setLoading(false)
        } else {
          setLoading(false)
          alert(res.data.msg);
        }
      } catch (err) {
        setLoading(false)
        console.error(err);
        alert(err.response.data.msg);
      }
    }
  };

  return (
    <div className="login ">
      {/* header section */}
      <div className="lg-header d-flex p-3 align-items-center">
        <img src={logo} />
        <div className="ms-4 lg-header-txt">S.THOMAS’ COLLEGE,GURUTALAWA</div>
      </div>
      <div class="quarter-left"></div>
      <div className="lg-body-section pt-5">
        <form className="log-container d-flex flex-column align-items-center pt-4 pb-5" onSubmit={(e)=>
        e.preventDefault()}>
          <div className="pt-3 log-heading">Login to Admin Dashboard</div>
          <div className="small-txt pt-2 pb-2 mb-5">
            For comprehensive program administration.
          </div>

          <div className="log-email-container ps-4 mb-4">
            <img src={user} className="user-img" />
            <input
              value={email}
              className="log-email-input"
              placeholder="Enter Your Email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              autoComplete="email"
            />
          </div>

          <div className="log-email-container ps-4 mb-4">
            <img src={lock} className="user-img" />
            <input
            value={password}
              className="log-email-input"
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="current-password"
            />
            <img src={eye} className="eye-img" />
          </div>

          <div className="d-flex remember mb-5 pb-3">
            <input type="radio" value="remember"  onChange={(e)=>{ 
              alert(e.target.value)
              setSelectedValue(e.target.value)
            }} />
            <div className="remember-txt ps-3">Remember me</div>
          </div>

          <button
          type="submit"
            className="log-btn mb-5"
            onClick={() => {
              userLogin();
            }}
          >
            Login to Continue
          </button>
        </form>

        <div class="quarter-right"></div>
      </div>
      {
        loading == true && (
          <div className="pop-up" style={{  }}>
            {/* <ClipLoader color="#52bfd9" size={50}/> */}
            <BeatLoader color="#0057a7"/>
            </div>
        )
      }
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  // setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setCurrentUser: (user) => setCurrentUser(dispatch, user),
});

export default connect(null, mapDispatchToProps)(Login);
