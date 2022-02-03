/** @format */

import React from "react";
import { AppBar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import AddSubject from "./AddSubject";
import AdminAdd from "./AdminAdd";
import FacultySignup from "./FacultySignup";
import QrCodeGenerate from "./QrCodeGenerate";
import FacultyList from "./FacultyList";
import StudentReport from "./StudentReport";
import VerifyMessage from "../VerifyMessage/VerifyMessage";

export default function Faculty() {
  var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const collegeId = JSON.parse(localStorage.getItem("collegeId"));
  const designation = JSON.parse(localStorage.getItem("designation"));
  const isAdmin = user?.result?.isAdmin;
  console.log("User : ", user);
  console.log("collegeId  : ", collegeId);

  return (
    <>
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
            FACULTY PORTAL
          </Typography>
        </div>
      </AppBar>
      <br />
      <br />

      <div className={classes.contain}>
        {user?.result?.isVerified ? (
          <>
            {isAdmin ? <AdminAdd collegeId={collegeId} /> : <div />}
            {isAdmin ? <FacultySignup collegeId={collegeId} /> : <div />}
            {isAdmin ? <AddSubject collegeId={collegeId} /> : <div />}
            <QrCodeGenerate collegeId={collegeId} />
            <StudentReport collegeId={collegeId} />
            <FacultyList collegeId={collegeId} />
          </>
        ) : (
          <VerifyMessage type={"faculty"} />
        )}
      </div>
    </>
  );
}
