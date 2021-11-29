import React from "react";
import {FaFacebook, FaInstagram, FaSlack, FaTwitter, FaYoutube} from 'react-icons/fa'
import {Col, Container, Row} from "react-bootstrap";


const footerStyle = {
    marginTop: 250,
    marginBottom: 0,
    padding: 15,
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    fontSize: '20px',
    backgroundImage: 'linear-gradient(to bottom right, #0c0032, #5c7de3',
    backgroundColor: '#4e83b9 !important',
    color: "white"
}

const Footer = () => {
    return (
        <div>
            <footer>
                <div style={footerStyle}>

                    <Container>
                        <Row className="justify-content-md-center">
                            <Col xs lg="2">
                                <a href="#" style={{color: 'white'}}><FaFacebook/></a>
                            </Col>
                            <Col xs lg="2">
                                <a href="#" style={{color: 'white'}}><FaTwitter/></a>
                            </Col>
                            <Col xs lg="2">
                                <a href="#" style={{color: 'white'}}><FaInstagram/></a>
                            </Col>
                            <Col xs lg="2">
                                <a href="#" style={{color: 'white'}}><FaYoutube/></a>
                            </Col>
                            <Col xs lg="2">
                                <a href="#" style={{color: 'white'}}><FaSlack/></a>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </footer>
        </div>
    )
}

export default Footer;