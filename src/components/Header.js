import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserLoaded } from "../redux/selectors/auth";
import { signOutUser } from "../redux/actions/auth";
import { Container, Row, Col, Button } from "reactstrap";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "../components/Admin";
import Login from "../components/Login";
import User from "../components/User";

const Header = () => {
  const currentUserLoaded = useSelector(getUserLoaded);
  const history = useHistory();
  const userData = useSelector(
    (state) => state.auth.userData
  );

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(signOutUser(history));
  };

  return (
    <div
      style={{
        backgroundColor: "#F0F8FF",
        width: "100%",
        height: "60px",
        borderBottom: "1px solid #DCDCDC",
      }}
    >
      <Container>
        <Row>
          <Col>
            <div
              style={{
                backgroundColor: "#F0F8FF",
                width: "100%",
                height: "60px",
                borderBottom: "1px solid #DCDCDC",
              }}
            >
              {currentUserLoaded && (
                <div
                  style={{
                    display: "",
                    justifyContent: "center",
                    paddingTop: "19px",
                  }}
                >
                  <h6 style={{ fontWeight: 400, display: "inline-block" }}>
                    logged as {userData.role}, (username: {userData.username})
                  </h6>
                  <Button
                    className="float-end btn"
                    style={{ marginTop: -9 }}
                    onClick={handleLogOut}
                  >
                    logout
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
