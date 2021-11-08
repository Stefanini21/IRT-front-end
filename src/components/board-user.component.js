import React from "react";
import Kanban from "./kanban/kanban";
import { Container, Row, Col } from "reactstrap";

function User(props) {
  return (
    <div style={{margin: "0 auto"}}>
      <Kanban />
    </div>
  );
}

export default User;
