import React, { Component } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import { Container } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route, Link
} from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";
import Dev from "./Dev";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            username: "",
            password: ""
        }
        // this.onFormSubmit = this.onFormSubmit.bind(this)
        // this.handleUsername = this.handleUsername.bind(this)
        // this.handlePassword = this.handlePassword.bind(this)
    }

    // componentDidMount() {
    //     fetch('http://89.28.31.132:8081/user/get')
    //     .then(response => response.json())
    //         .then(records => {
    //             this.setState({
    //                 records: records
    //             })
    //             console.log(this.state.records)
    //         })
    //         .catch(error => console.log(error))
    // }

    onFormSubmit() {
        alert('A username was submitted: ' + this.state.username);
        alert('A password was submitted: ' + this.state.password);

        const formData = new FormData();
        formData.append("username", this.state.username);
        formData.append("password", this.state.password);

        const options = {
            method: 'POST',
            body: formData
        };

        fetch('http://89.28.31.132:8081/user/get', {
            mode: 'no-cors',
            method: 'GET'
        }).then(response => response.json())
            .then(records => {
                console.log(records)
                // this.setState({
                //     username: records.username,
                //     password: records.password
                // })
                // console.log(this.state.username)
                // console.log(this.state.password)
            })
            .catch(error => console.log(error))
    };

    handleUsername(e) {
        e.preventDefault()
        this.setState({ username: e.target.value })
        console.log(this.state.username)
    }

    handlePassword(e) {
        e.preventDefault()
        var s = e.target.value
        this.setState({ password: s })
        console.log(this.state.password)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        alert('The name you entered was: ${name}')
    }

    render() {
        return (
            <div><h1>Login</h1>
                <Container>
                    {/* <Form style={{ margin: "0 auto", width: "30%", marginTop: "60px" }} onSubmit={this.onFormSubmit}> */}
                    <Form style={{ margin: "0 auto", width: "30%", marginTop: "60px" }}>
                    <h1>Login</h1>
                    <Form.Field required>
                        <label>Username</label>
                        <Input placeholder='enter username' onChange={this.handleUsername} />
                        <label>Password</label>
                        <Input placeholder='enter password' onChange={this.handlePassword} />
                    </Form.Field>
                    <Button primary style={{ width: "100%" }} onFormSubmit={this.handleSubmit}>Login</Button>
                    <h4><a href="https://">forgot password</a></h4>
                </Form>
                </Container>
            </div>
        );
    }
}

export default App