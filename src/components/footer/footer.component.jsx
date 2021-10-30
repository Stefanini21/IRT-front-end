import React from "react";

const Footer = () => {
    return (
        <div className="container">
            <footer className="py-5">

                <div className="d-flex justify-content-between py-4 my-4 border-top">
                    <p>&copy; 2021 IRT powered by Stefanini, Inc. All rights reserved.</p>
                    <ul className="list-unstyled d-flex">
                        <li className="ms-3"><a className="link-dark" href="#">
                            <svg className="bi" width="24" height="24">

                            </svg>
                        </a></li>
                        <li className="ms-3"><a className="link-dark" href="#">
                            <svg className="bi" width="24" height="24">
                            </svg>
                        </a></li>
                        <li className="ms-3"><a className="link-dark" href="#">
                            <svg className="bi" width="24" height="24">
                            </svg>
                        </a></li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default Footer;