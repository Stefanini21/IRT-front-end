import React, { useEffect, useState } from "react";
import Kanban from "./kanban/kanban";
import { useDispatch } from "react-redux";
import { getTicketList } from "../redux/actions/ticket";
// import { HttpService } from "../services/httpService";

function User(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTicketList());
    // setUsers(userList)
  }, []);

  return (
    <div style={{ margin: "0 auto" }}>
      <Kanban />
    </div>
  );
}

export default User;
