/** @format */

import React from "react";
import { AppBar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import StudentReport from "./StudentReport";
import QrCodeScanner from "./QrCodeScanner";
import VerifyMessage from "../VerifyMessage/VerifyMessage";

export default function Student() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("profile"));
  const collegeId = JSON.parse(localStorage.getItem("collegeId"));
  const designation = JSON.parse(localStorage.getItem("designation"));
  console.log("User : ", user);
  return collegeId === undefined ? (
    <Redirect to='/' />
  ) : user === undefined ? (
    <Redirect to='/auth' />
  ) : designation === "faculty" ? (
    <Redirect to='/faculty' />
  ) : (
    <div>
      <AppBar
        className={classes.brandContainer}
        position='static'
        color='inherit'
      >
        <div className={classes.brandContainer}>
          <Typography
            className={classes.heading + " " + classes.top}
            variant='h2'
            align='center'
          >
            STUDENT PORTAL
          </Typography>
        </div>
      </AppBar>
      <br />
      <br />
      <div className={classes.contain}>
        {user?.result?.isVerified ? (
          <>
            <QrCodeScanner />
            <StudentReport />
          </>
        ) : (
          <VerifyMessage type={"student"} />
        )}
      </div>
    </div>
  );
}
