import React from "react";
import "./css/home.component.css";
import homephoto from "./homepage.png";
import SessionExpirationModal from "../SessionExpirationModal.js";

const Home = () => {
    return (
            <div>
                <div>
                    <h4
                        style={{
                            fontFamily: "fantasy",
                            fontWeight: 500,
                            color: "#3f4a70",
                            fontStyle: "oblique",
                            width: "75%",
                            textAlign: "center",
                            margin: " 0 auto",
                            fontSize: "2rem",
                            paddingTop: 22,
                        }}
                    >
                        “If a task is once begun, never leave it ‘till it’s done. Be the labor
                        great or small, do it well or not at all.”
                    </h4>

                    <div className="centerimage">
                        <img
                            src={homephoto}
                            alt="homephoto"
                            class="centerimage"
                            width={600}
                            height={600}
                        />
                    </div>
                </div>
            </div>
    );
};

export default Home;
