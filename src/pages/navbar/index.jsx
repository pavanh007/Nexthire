import { useState, useEffect } from "react";
import "./nav.css";
const Navbar = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100vw",
          color: "white",
          backgroundColor: "#fff",
          border: "0.5px solid black",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
            color: "#000",
          }}
        >
          <a href="/" style={{ color: "#000" }}>
            <h3>ECOMMERCE</h3>
          </a>
        </div>
        <div
          className="scrolled"
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="outerLayer">
            <div className="tabs">
              <button className="tabs-buttons">&nbsp;Categories</button>
              <button className="tabs-buttons">&nbsp;Sale</button>
              <button className="tabs-buttons">&nbsp;Clearance</button>
              <button className="tabs-buttons">&nbsp;New stock</button>
              <button className="tabs-buttons">&nbsp;Trending</button>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "10.33%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            src="https://i.ibb.co/0jjWj2H/trolly.png"
            alt="trolly"
            border="0"
            height={30}
            width={30}
          />

          <img
            src="https://i.ibb.co/YyqpwCf/search.png"
            alt="search"
            border="0"
            height={30}
            width={30}
          />
          <br />
          <br />
        </div>
      </div>
      <div style={{backgroundColor: "rgb(225, 255, 255, 0.4)", padding: "10px", margin: "0", width: "100vw"}}>
        <h5 style={{padding: "0", margin: "0", width: "100%"}}>Get 10% off on business sign up</h5>
      </div>
    </>
  );
};

export default Navbar;
