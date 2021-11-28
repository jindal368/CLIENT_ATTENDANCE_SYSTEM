/** @format */

import React, { useState } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  TextField,
} from "@material-ui/core";
import useStyles from "./styles";
import QrReader from "react-qr-scanner";
import { useHistory, Redirect } from "react-router-dom";
import { updateStudent } from "../../actions/attendance";
import { useSelector, useDispatch } from "react-redux";
export default function Student() {
  const [scanned, setScanned] = useState(0);
  const [openScanner, setOpenScanner] = useState(false);
  const [id, setId] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const data = {
    _id: id,
    data: user?.authData?.result,
  };
  const handleScan = () => {
    if (!scanned) return <div />;
    if (scanned === 1) {
      return <div style={{ color: "green" }}>Successfully scanned..</div>;
    } else {
      return <div style={{ color: "red" }}>Scanned Failed..</div>;
    }
  };

  var handleResponse = (res) => {
    console.log("response : ", res);
    const data = {
      _id: res?.text,
      data: user?.authData?.result,
    };
    return res?.text ? (
      <div>
        <div style={{ color: "green" }}>
          {console.log("Data After sacn : ", data)}
          {dispatch(updateStudent(data))
            .then(() => {
              setScanned(1);
            })
            .catch((err) => {
              setScanned(2);
            })}
        </div>
        <AppBar
          className={classes.brandContainer}
          position='static'
          color='inherit'
        >
          {res}
        </AppBar>
      </div>
    ) : (
      <div />
    );
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };
  return user.authData === null ? (
    <Redirect to='/auth' />
  ) : user?.authData?.result?.email === "visheshjindal368@gmail.com" ? (
    <Redirect to='/faculty' />
  ) : (
    <div>
      <AppBar
        className={classes.brandContainer}
        position='static'
        color='inherit'
      >
        <div className={classes.brandContainer}>
          <Typography className={classes.heading} variant='h2' align='center'>
            Student Portal
          </Typography>
        </div>
        <div>
          <Button
            style={{ color: "red" }}
            onClick={() => setOpenScanner(!openScanner)}
          >
            {!openScanner ? "Open Scanner To Scan" : "Close Scanner"}
          </Button>
        </div>
        {scanned === 1 ? (
          handleScan()
        ) : openScanner ? (
          <div>
            <QrReader
              delay={10000}
              style={previewStyle}
              onError={() => setScanned(2)}
              onScan={(res) => handleResponse(res)}
            />
          </div>
        ) : (
          <div />
        )}
      </AppBar>
    </div>
  );
}
