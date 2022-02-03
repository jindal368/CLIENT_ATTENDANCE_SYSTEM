/** @format */

import React from "react";
import "./successCss.css";
const VerificationMessage = () => {
  return (
    <div>
      <div class='card'>
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <i class='checkmark'>✓</i>
        </div>
        <h1>Success</h1>
        <p>
          Signedup Successfuly
          <br />
          you'll recieve email with link. Verify Your Account
        </p>
      </div>
    </div>
  );
};

export default VerificationMessage;
