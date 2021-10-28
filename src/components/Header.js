import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            area: this.props.area,
            currentUser: this.props.currentUser
        }
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        if(this.state.currentUser === "") {
            alert("!!!!")
        }
    }

    logOut() {
        this.props.logOut()
    }

    render() {
        return (
            <div style={{ backgroundColor: '#F0F8FF', width: '100%', height: '60px', borderBottom: '1px solid #DCDCDC' }}>
                <Container>
                    <Row>
                        <Col>
                            <div style={{ display: '', justifyContent: 'center', paddingTop: '19px' }}>
                                <h6 style={{ fontWeight: 400, display: 'inline-block' }}>logged as {this.state.currentUser.role}, (username: {this.state.currentUser.username})</h6>
                                <Button className="float-end btn" style={{marginTop: -9}} onClick={this.logOut}>logout</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Header
