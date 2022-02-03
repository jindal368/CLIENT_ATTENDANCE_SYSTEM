/** @format */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { verificationOnEmail } from "../../actions/auth";
import { CgCheckO } from "react-icons/cg";
import "./styles.css";
import { css } from "@emotion/react";
import { useAlert } from "react-alert";
import BounceLoader from "react-spinners/BounceLoader";

const VerifyMessage = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
  const alert = useAlert();
  const dispatch = useDispatch();

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const handleVerify = (email, token) => {
    setLoading(true);
    dispatch(verificationOnEmail(email, token, type))
      .then((res) => {
        console.log("Res : ", res);
        if (res.status === 200) {
          setSent(true);
        }
        alert.show(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert.show(err);
      });
  };
  return loading ? (
    <BounceLoader color='red' loading={loading} css={override} size={150} />
  ) : (
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
        <h1>Verify</h1>
        <p>
          Verify Your Account
          <br />
          before access the app
        </p>
        <br />

        {sent ? (
          <>
            <CgCheckO />
            <h6>Verification Sent</h6>
            <span>{user?.result?.email}</span>
          </>
        ) : (
          <button
            onClick={() => handleVerify(user?.result?.email, user?.token)}
          >
            Verify
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyMessage;
