import React, { useState } from "react";
import Navbar from "../navbar";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make API call to login user
    try {
      // Replace this with actual API endpoint and request
      const response = await fetch("your-backend-api-url/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // If successful response, perform further actions like redirecting to dashboard
        console.log("User logged in successfully");
      } else {
        // Handle error response
        console.error("Failed to login:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to login:", error.message);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Navbar />
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
            height: "500px",
            width: "500px",
            backgroundColor: "white",
            padding: "30px",
            margin: "50px",
            border: "0.5px solid black",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 style={{ color: "#000", padding: "0", margin: "0" }}>
            Create your account
          </h2>
          <h2 style={{ color: "#000", padding: "0", margin: "0" }}>
            Welcome back to ECOMMERCE
          </h2>
          <h5 style={{ color: "#000", padding: "0", margin: "10px" }}>
            The next gen business marketplace
          </h5>
          <form onSubmit={handleSubmit}>
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
              <div style={{ display: "flex", alignContent: "start" }}>
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
                    flexGrow: "1",
                  }}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter password"
                  required
                />
                <span
                  style={{
                    marginLeft: "8px",
                    cursor: "pointer",
                    alignSelf: "center",
                    color: "#000",
                  }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </span>
              </div>
            </div>
            <button style={{ width: "100%", margin: "30px 0px" }} type="submit">
              LOGIN
            </button>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                color: "#000",
                margin: "35px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span>
                Don't have an Account? &nbsp;
                <a href="/signup" style={{ color: "#000", cursor: "pointer" }}>
                  SIGN UP
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
