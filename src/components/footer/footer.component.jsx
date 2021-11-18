import React from "react";

const footerStyle = {
    'background-color': 'green',
    'border-top': '2px solid red',
    'position': 'fixed',
    'width': '100%',
    'bottom': 0,
    'color': 'white',
    'font-size': '25px',
    'background-image': 'linear-gradient(to bottom right, #3b6a9a, #80a9d1)'

}

const Footer = () => {
    return (
        <div className="container">
            <footer className="py-5">
                <div className="d-flex" style={footerStyle}>
                    <p>&copy; 2021 IRT powered by Stefanini, Inc. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer;