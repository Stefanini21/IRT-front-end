
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./css/home.component.css";
import homephoto from "./homepage.png";
import Image from "react-image-resizer";
import jwt from "jwt-decode";
import {
  getUserLoaded,
  getUserData,
  getTokenValidity,
} from "../../redux/selectors/auth";
import { checkTokenValidity } from "../../redux/actions/auth";

<h1>
  “If a task is once begun, never leave it ‘till it’s done. Be the labor great
  or small, do it well or not at all.”
</h1>;

const Home = () => {
  const currentUserLoaded = useSelector(getUserLoaded);
  const currentUserData = useSelector(getUserData);
  const isTokenValid = useSelector(getTokenValidity);
  const history = useHistory();
  var jwtToken = null;
  const dispatch = useDispatch(); 

  if (currentUserLoaded) {
    jwtToken = jwt(currentUserData.accessToken);
    console.log("jwtToken  : " + jwtToken.exp);
    console.log("Date.now(): " + Math.ceil(Date.now() / 1000));
    dispatch(checkTokenValidity(jwtToken.exp, history));
    console.log("isTokenValid? " + isTokenValid);
  }

  useEffect(() => {
    if (currentUserLoaded) {
    dispatch(checkTokenValidity(jwtToken.exp, history))}
    console.log("isTokenValid? " + isTokenValid);
  }, []);

  return (
    <div>
      {/* {isTokenValid == true ?  */}
      <div>
        <h4
          style={{
            fontFamily: "fantasy",
            fontWeight: 500,
            color: "#3f4a70",
            fontStyle: "oblique",
            width: "75%",
            textAlign: "center",
            margin: " 0 auto",
            fontSize: "2rem",
            paddingTop: 22,
          }}
        >
          “If a task is once begun, never leave it ‘till it’s done. Be the labor
          great or small, do it well or not at all.”
        </h4>

        <div className="centerimage">
          <Image
            img
            src={homephoto}
            alt="homephoto"
            class="centerimage"
            width={600}
            height={650}
          />
        </div>
      </div>
      {/* // : history.push("/logout")} */}
    </div>
  );
};

export default Home;

