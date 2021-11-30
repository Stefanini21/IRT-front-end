import React from "react";
import "./css/home.component.css";
import homephoto from "./homepage.png";
import Image from "react-image-resizer";
import SessionExpirationModal from "../SessionExpirationModal";

const Home = () => {
  return (
    <>
    <SessionExpirationModal />
    <div>
      <div>
        <h4
          style={{
            fontFamily: "fantasy",
            fontWeight: 500,
            color: "#3f4a70",
            fontStyle: "oblique",
            fontSize: "40px",
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
          <Image
            img
            src={homephoto}
            alt="homephoto"
            class="centerimage"
            width={600}
            height={650}
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
