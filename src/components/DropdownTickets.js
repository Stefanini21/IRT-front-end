import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const DropdownTickets = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tickets, setTickets] = useState(props.tickets);
  console.log(tickets);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const listTickets = tickets.map((ticket, key) => <DropdownItem  key={key}>{ticket}</DropdownItem>);

  return (
    <div style={{ display: "inline-block", float: "right" }}>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>{props.dropdownTitle}</DropdownToggle>
        <DropdownMenu>
          {listTickets}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownTickets;
