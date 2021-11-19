import React from "react";

const footerStyle = {
    bottom: '0',
    left: '0',
    width: '100%',
    padding: '1rem',

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