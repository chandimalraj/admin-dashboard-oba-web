import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/Login";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/home/Home";
import PrivateRoute from "./PrivateRoute";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { setUserLoggedIn } from "./actions/setUserLoggedInAction";

export default function App(props) {
  //const { setUser , user, isLoggedIn } = props;

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token"); // Check for the JWT token in local storage

  useEffect(() => {
    console.log(token);

    // if (token) {
    //   setIsLoggedIn(true);
    //   console.log(isLoggedIn);
    // } else {
    //   setIsLoggedIn(false);
    // }
    
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        {/* <Route exact path='/home' element={<Home/> }></Route>  */}
        <Route
          exact
          path="/home"
          element={ <Home/>}
        />
        {/* <PrivateRoute path="/home" element={<Home />} isLoggedIn={isLoggedIn} /> */}

        {/* {isLoggedIn ? (
          <Route path="/home" element={<Home />} />
        ) : (
          <Route path="/home" element={<Navigate to="/" />} />
        )} */}
      </Routes>
    </Router>
  );
}
//  const mapDispatchToProps = (dispatch) => ({
//    setUser: (data) => setUserLoggedIn(dispatch,data),

//  });

//  const mapStateToProps = (state) => ({
//   //  user: state.userReducer.currentUser,
//   //  isLoggedIn:state.userReducer.isLoggedIn
//  });

//  export default connect(mapDispatchToProps,mapStateToProps)(App);
