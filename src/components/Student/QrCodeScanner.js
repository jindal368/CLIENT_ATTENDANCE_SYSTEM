/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Paper,
  Typography,
  AppBar,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import useStyles from "./styles";
import ReactCardFlip from "react-card-flip";
import qrImage from "../../images/qrcode.png";
import QrReader from "react-qr-scanner";
import { useAlert } from "react-alert";
import { updateStudentData } from "../../actions/attendance";

const QrCodeScanner = () => {
  const [scanned, setScanned] = useState(0);
  const [isFlip, setIsFlip] = useState(false);
  const [cameraMode, setCameraMode] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [id, setId] = useState("");
  const alert = useAlert();

  var handleResponse = (res) => {
    console.log("response : ", res?.text?.slice(25, 38));
    console.log("response : ", res);
    if (res?.text?.slice(25, 38) < Date.now()) {
      alert.show("Code Corrupted");
      setScanned(2);
      fliphandler();
      return false;
    }
    // const data = {
    //   _id: res?.text,
    //   data: user,
    // };
    return res?.text ? (
      <div>
        <div>
          {dispatch(
            updateStudentData(res?.text?.slice(0, 24), user?.result?.email)
          )
            .then(() => {
              setScanned(1);
              fliphandler();
            })
            .catch((err) => {
              setScanned(2);
              fliphandler();
            })}
        </div>
      </div>
    ) : (
      <div />
    );
  };

  const fliphandler = () => {
    setIsFlip(!isFlip);
  };

  return (
    <ReactCardFlip isFlipped={isFlip} flipDirection='horizontal'>
      <Card className={classes.root} onClick={fliphandler}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={qrImage}
            title='Contemplative Reptile'
          />
          <CardContent>
            <Typography gutterBottom variant='h4' component='h2'>
              Open Scanner
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Click to Open a Scanner for Attendance
            </Typography>
          </CardContent>
        </CardActionArea>
        {scanned == 1 ? (
          <Typography
            variant='body2'
            component='p'
            style={{ backgroundColor: "rgb(236,250,214", padding: "5px" }}
          >
            Successfully scanned..
          </Typography>
        ) : scanned == 2 ? (
          <Typography
            variant='body2'
            component='p'
            style={{ backgroundColor: "rgb(255,200,200", padding: "5px" }}
          >
            Scanned Failed..
          </Typography>
        ) : (
          <></>
        )}
      </Card>
      <div>
        <Button
          fullWidth
          variant='contained'
          color='secondary'
          onClick={fliphandler}
        >
          Cancel
        </Button>
        <Paper
          className={classes.paper}
          elevation={3}
          style={{ padding: "0", marginRight: 0 }}
        >
          {isFlip ? (
            <QrReader
              delay={1000}
              style={{ width: "inherit" }}
              onError={() => setScanned(2)}
              onScan={(res) => handleResponse(res)}
              facingMode={cameraMode ? "environment" : "user"}
            />
          ) : null}
        </Paper>
        <button onClick={() => setCameraMode(!cameraMode)}>{`Change To ${
          cameraMode ? "front" : "rear"
        }`}</button>
      </div>
    </ReactCardFlip>
  );
};
export default QrCodeScanner;
