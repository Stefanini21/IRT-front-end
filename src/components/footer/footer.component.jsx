import React from "react";
import {FaFacebook, FaInstagram, FaSlack, FaTwitter, FaYoutube} from 'react-icons/fa'
import {Col, Container, Row} from "react-bootstrap";


const footerStyle = {
    'margin-top': '310px',
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
        <div className="container" style={{position: "fixed", bottom: 0}}>
            <footer className="py-2">
                <div className="d-flex justify-content-between my-4 border-top" style={footerStyle}>
                    <p>&copy; 2021 IRT powered by Stefanini, Inc. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer;