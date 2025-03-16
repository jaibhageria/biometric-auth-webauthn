import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const BiometricAuthForm = () => {
  const [email, setEmail] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);

  // const options = {
  //   publicKey: {
  //     rp: { name: "Example Corporation" },
  //     user: {
  //       name: email,
  //       id: new Uint8Array([/* credential ID from the server */]),
  //       displayName: "Test Account",
  //       transports: ["internal"],
  //     },
  //     pubKeyCredParams: [{ type: "public-key", alg: -7 }],
  //     challenge: new Uint8Array([/* some challenge data */]),
  //     authenticatorSelection: { authenticatorAttachment: "platform" },
  //   },
  // };

  const options = {
    publicKey: {
      challenge: new Uint8Array([/* some challenge data */]),
      // rpId: "http://localhost:3000",
      allowCredentials: [],
      mediation: "conditional",
      userVerification: "required",
    }
  }

  const authenticateAndSubmit = async () => {
    try {
      if (!window.PublicKeyCredential) {
        throw new Error("Web Authentication API is not supported on this browser.");
      }

      // const credential = await navigator.credentials.create(options);
      const credential = await navigator.credentials.get(options);
      console.log("Credential:", credential);
      if (credential) {
        setIsAuthenticated(true);
        setAuthError("");

        const token = {
          userId: email,
          deviceId: "device123",
          expires: Date.now() + 10 * 60 * 1000, // 10-minute expiry
        };

        const response = await submitEmailToBackend(token);
        console.log("Email submitted successfully:", response);
      }
    } catch (error) {
      setAuthError("Authentication failed: " + error.message);
      setIsAuthenticated(false);
    }
  };

  const submitEmailToBackend = async (token) => {
    try {
      const response = await axios.post("http://localhost:5000/verify", token);
      if (response.status !== 200) {
        throw new Error("Failed to submit email");
      }
      return response.data;
    } catch (error) {
      throw new Error("Error submitting email: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 border-0">
        <h2 className="text-center mb-4">Biometric Authentication</h2>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            disabled={isAuthenticated}
          />
        </div>
        <button 
          className="btn btn-primary w-100"
          onClick={authenticateAndSubmit} 
          disabled={isAuthenticated || !email}
        >
          {isAuthenticated ? "Authenticated" : "Submit Email"}
        </button>
        {authError && <p className="text-danger text-center mt-3">{authError}</p>}
        {isAuthenticated && <p className="text-success text-center mt-3">Authentication successful!</p>}
      </div>
    </div>
  );
};

export default BiometricAuthForm;
