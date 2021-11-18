import React from "react";
import {FaFacebook, FaInstagram, FaSlack, FaTwitter, FaYoutube} from 'react-icons/fa'
import {Col, Container, Row} from "react-bootstrap";


const footerStyle = {
    'margin-top': '235px',
    'padding': '1rem',
    'bottom': '0',
    'left': '0',
    'width': '100%',
    'textAlign': 'center',
    'font-size': '20px',
    'background-image': 'linear-gradient(to bottom right, #3b6a9a, #80a9d1)'

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