import React from "react";
import {FaFacebook, FaInstagram, FaSlack, FaTwitter, FaYoutube} from 'react-icons/fa'
import {Col, Container, Row} from "react-bootstrap";


const footerStyle = {
    padding: '24px',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    fontSize: '20px',
    backgroundImage: 'linear-gradient(to bottom right, #0c0032, #5c7de3',
    backgroundColor: '#4e83b9 !important',
    position: "absolute",
    color: "white",
}

const Footer = () => {
    return (
        <div>
            <footer>
                <div className="d-flex justify-content-between border-top" style={footerStyle}>
                    <h6 style={{margin: "0 auto"}}>&copy; 2021 IRT powered by Stefanini, Inc. All rights reserved.</h6>
                </div>
            </footer>
        </div>
    )
}

export default Footer;