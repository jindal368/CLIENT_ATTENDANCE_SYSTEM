/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyEmail } from "../../actions/auth";
import { CgCheckO } from "react-icons/cg";
import "./styles.css";
import { css } from "@emotion/react";
import { useAlert } from "react-alert";
import BounceLoader from "react-spinners/BounceLoader";
import { useParams } from "react-router-dom";

const VerifyAccount = () => {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const { token } = useParams();

  const alert = useAlert();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyEmail(token))
      .then((res) => {
        console.log("Res : ", res);
        if (res.status === 200) {
          setVerified(true);
        }
        alert.show(res.data.message);
        setVerified(false);
      })
      .catch((err) => {
        setVerified(false);
        alert.show(err);
      });
  });
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return verified ? (
    <>
      <BounceLoader color='red' loading={loading} css={override} size={150} />
      <h1>Verifcation is in progress Please wait</h1>
    </>
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
        <h1>Verified Successfully</h1>
        <br />
        <br />
        <CgCheckO style={{ size: "30px" }} />
        <br />
      </div>
    </div>
  );
};

export default VerifyAccount;
