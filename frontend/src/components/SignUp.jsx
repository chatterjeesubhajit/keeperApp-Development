import React, { useState } from "react";
import Header from "./Header";
import classNames from "classnames";
import Register from "./RegisterTab";
import LoginTab from "./LoginTab";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const containerClasses = classNames("container", "mt-5");
  const cardClasses = classNames("card", "social-block");
  const btnClasses = classNames("btn", "btn-block", "btn-social", "btn-google");
  const fbIconClasses = classNames("fab", "fa-facebook");
  const gIconClasses = classNames("fab", "fa-google");
  const navClasses = classNames("nav", "nav-tabs");
  const navItemClasses = classNames("nav-link", "active");
  console.log("sign up");
  // const tabStyle = {width: "20rem" };

  const [register, setRegister] = useState(false);
  function registerClick() {
    setRegister(true);
  }
  function loginClick() {
    setRegister(false);
  }

  return (
    <div>
      <Header />
      <div className={containerClasses}>
        <ul className={navClasses}>
          <li className="nav-item">
            <button onClick={loginClick} className={navItemClasses}>
              Login
            </button>
          </li>
          <li style={{ paddingLeft: "0.5rem" }} className="nav-item">
            <button onClick={registerClick} className="nav-link">
              Register
            </button>
          </li>
        </ul>
        <div className="row">
        <div className="col-sm-6">
          {register ? (
            <div style={{paddingTop:"2%"}}>
              <Register />
            </div>
          ) : (
            <div>
              <a style={{marginLeft:"0rem"}}className={btnClasses} href="/auth/google" role="button">
                <h3 style={{ color: "white" ,textShadow:"2px 2px black"}}>
                  <FcGoogle size="3rem"/> Sign In with Google
                </h3>
              </a>
              <h4 style={{ textAlign: "center", color: "white" }}>OR</h4>
              <div className="card-body">
                <LoginTab />
              </div>
            </div>
          )}
        </div>
        <div className="col-sm-6">
          <div
            style={{
              color: "white"
            }}
          >
            <h1 style={{textShadow:"2px 2px black"}}>Keeper App</h1>
            <ul>
              <p>Your Note Keeping solution made easy!</p>
              <p>
                Click on Login to sign-in with Google or use registered email{" "}
              </p>
              <p>
                Click on Register to register yourself to get the most
                personalised experience
              </p>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
