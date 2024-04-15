import React, { useState } from "react";
import Navbar from "../navbar";
import OtpInput from "react-otp-input";

export const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false); 
  const maskedEmail = `${"***"}${email.slice(3)}`;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const CreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/user/v1/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password }),
      });

      if (response.status == 200) {
        sessionStorage.setItem("email", email);
        setShowOtpInput(true);
      } else {
        alert("Failed to register user:", response);
      }
    } catch (error) {
      alert("Failed to register user:", error.message);
    }
  };

  const handleOtpSubmit = async (e) => {
    
    try {
      const email = sessionStorage.getItem("email");
      console.log(email, otp);
      const response = await fetch("http://localhost:3001/api/user/v1/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      console.log("response", response);
      if (response.status === 200) {
        console.log("OTP verified successfully");
        window.location.href = "/interest"
      } else {
        alert("Failed to verify OTP:", response);
      }
    } catch (error) {
      alert("Failed to verify OTP:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      {!showOtpInput && (
        <div
          style={{
            height: "100vh",
            backgroundColor: "#fff",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "600px",
              width: "500px",
              backgroundColor: "white",
              padding: "40px",
              margin: "20px",
              border: "0.5px solid black",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2 style={{ color: "#000" }}>Create your account</h2>
            <form >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "30px 0px",
                  width: "100%",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignContent: "start",
                    color: "#000",
                  }}
                >
                  Name:
                </label>
                <input
                  style={{
                    marginTop: "8px",
                    display: "flex",
                    alignContent: "start",
                    height: "30px",
                    borderRadius: "5px",
                    color: "#000",
                    backgroundColor: "#fff",
                    padding: "5px",
                    border: "0.5px solid black",
                  }}
                  type="email"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Enter name"
                  required
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "30px 0px",
                  width: "100%",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignContent: "start",
                    color: "#000",
                  }}
                >
                  Email:
                </label>
                <input
                  style={{
                    marginTop: "8px",
                    display: "flex",
                    alignContent: "start",
                    height: "30px",
                    borderRadius: "5px",
                    color: "#000",
                    backgroundColor: "#fff",
                    padding: "5px",

                    border: "0.5px solid black",
                  }}
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "30px 0px",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignContent: "start",
                    color: "#000",
                  }}
                >
                  Password:
                </label>
                <input
                  style={{
                    marginTop: "8px",
                    display: "flex",
                    alignContent: "start",
                    height: "30px",
                    borderRadius: "5px",
                    color: "#000",
                    backgroundColor: "#fff",
                    padding: "5px",
                    border: "0.5px solid black",
                  }}
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter password"
                  required
                />
              </div>
              <button
                style={{ width: "100%", margin: "30px 0px" }}
                type="submit"
                onClick={CreateUser}
              >
                CREATE ACCOUNT
              </button>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  color: "#000",
                  margin: "5px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span>
                  Have an account? &nbsp;
                  <a href="/login" style={{ color: "#000", cursor: "pointer" }}>
                    LOGIN
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
      )}

      {showOtpInput && (
        <div
          style={{
            height: "100vh",
            backgroundColor: "#fff",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "370px",
              width: "500px",
              backgroundColor: "white",
              padding: "30px",
              margin: "50px",
              border: "0.5px solid black",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              color: "black",
            }}
          >
            <h2 style={{ color: "#000" }}>Verify your email</h2>
            <h3
              style={{
                color: "#000",
                marginBottom: "25px",
                fontWeight: "400",
              }}
            >
              Enter the 8 digit code you have received on {maskedEmail}
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#fff",
                width: "100%",
                alignItems: "center",
              }}
            >
              <h5
                style={{
                  display: "flex",
                  color: "#000",

                  width: "80%",
                  justifyContent: "start",
                }}
              >
                Code
              </h5>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props, index) => (
                  <input
                    {...props}
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "10px",
                      borderRadius: "5px",
                      border: "1px solid #000",
                      color: "#000",
                      backgroundColor: "#fff",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  />
                )}
              />
              <button
                style={{ width: "80%", margin: "30px 0px" }}
                type="submit"
                onClick={handleOtpSubmit}
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
