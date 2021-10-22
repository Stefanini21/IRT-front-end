import React, { Component } from 'react'
// import { Form, Input, Button } from 'semantic-ui-react'
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'
import User from "./User";
import Admin from "./Admin";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            currentUser: {},
            authenticated: false
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.logout = this.logout.bind(this)
    }

    onFormSubmit() {
        let formData = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://89.28.31.132:8081/login/' + JSON.stringify(formData))
            .then(response => {
                console.log(response);
                this.setState({
                    currentUser: response.data,
                    authenticated: true
                });
                // window.localStorage.setItem('currentUser', JSON.stringify(this.state.currentUser));
            }).catch(() => {
                this.setState({
                    currentUser: {},
                    authenticated: false
                });
            })
    };

    handleEmail(e) {
        e.preventDefault()
        this.setState({ email: e.target.value })
        console.log(this.state.email)
    }

    handlePassword(e) {
        e.preventDefault()
        var s = e.target.value
        this.setState({ password: s })
        console.log(this.state.password)
    }

    logout(tab) {
        this.setState({
            loggedIn: false
        });
    }


    render() {
        const currentUser = this.state.currentUser;
        return (
            <div>
                {!this.state.authenticated ?
                    <Container>
                        <Row>
                            <Col xs="4"></Col>
                            <Col xs="4">
                                <Form style={{marginTop: "20%"}}>
                                    <FormGroup>
                                        {/* <Label for="exampleEmail">Email</Label> */}
                                        <Input type="email" name="email" placeholder="email" style={{margin: 10, marginBottom: 20}} onChange={this.handleEmail}/>
                                    </FormGroup>
                                    <FormGroup>
                                        {/* <Label for="examplePassword">Password</Label> */}
                                        <Input type="password" name="password" placeholder="password" style={{margin: 10}} onChange={this.handlePassword}/>
                                    </FormGroup>
                                    <Button style={{margin: 10}} onClick={this.onFormSubmit}>Login</Button>
                                </Form>
                            </Col>
                            <Col xs="4"></Col>
                        </Row>
                    </Container>
                    : currentUser.role === "ADMIN" ? <Admin currentUser={currentUser} /> : <User currentUser={currentUser} />}
            </div>
        )
    }
}

export default Login;