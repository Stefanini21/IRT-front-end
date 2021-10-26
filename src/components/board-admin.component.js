import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'First Name',
    selector: row => row.firstName,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: row => row.lastName,
    sortable: true,
  },
  {
    name: 'Username',
    selector: row => row.username,
    sortable: true,
  },
  {
    name: 'Role',
    selector: row => row.role,
    sortable: true,
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true,
  },
  {
    name: 'Specialty',
    selector: row => row.specialty,
    sortable: true,
  },
];


export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    UserService.getUsers().then(
      response => {
        this.setState({
          users: response.data
        });
      },
      error => {
        this.setState({
          users:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <DataTable title={'Users'} columns={columns} data={this.state.users} pagination={true} />
        </header>
      </div>
    );
  }
}
