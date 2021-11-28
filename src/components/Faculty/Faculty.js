/** @format */

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  TextField,
  Card,
  variant,
  CardContent,
  CardActions,
  Paper,
  CardMedia,
} from "@material-ui/core";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap.js";
import useStyles from "./styles";
import QrCodeGenerator from "../util/QrCodeGenerator";
import { useHistory, Redirect } from "react-router-dom";
import QRCode from "qrcode.react";
import { useSelector, useDispatch } from "react-redux";
import {
  postattendancedata,
  getStudentData,
  resetStudent,
} from "../../actions/attendance";
export default function Faculty() {
  const [qrComponent, setQrComponent] = useState(false);
  const [resultArray, setResultArray] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  function getLocation() {
    console.log("GEtLocation running");

    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log("Latitude : ", latitude);
      console.log("Longitude : ", longitude);
    });
  }
  useEffect(() => {
    getLocation();
  }, getLocation());
  useEffect(() => {
    displayData(resultArray);
  });
  const user = useSelector((state) => state.auth);
  const attendanceFetchedData = useSelector((state) => state.attendance);
  const [attendanceData, setAttendanceData] = useState({
    subject: "",
    email: user?.authData?.result?.email,
  });
  const dispatch = useDispatch();
  var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postattendancedata(attendanceData))
      .then((res) => {
        console.log("data dispatched : ", res);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
    setQrComponent(!qrComponent);
  };

  const fetchData = () => {
    dispatch(getStudentData(user?.authData?.result?.email))
      .then((res) => {
        console.log("Response : ", attendanceFetchedData[0]);
        setResultArray(attendanceFetchedData[0]);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  };
  const displayData = (resultArray) => {
    if (!resultArray?.length) return "No Data";

    return resultArray?.map((data) => (
      <div>
        <Card className={classes.root}>
          <CardContent>
            <QrCodeGenerator value={data._id} />
            <br />
            <Typography color='red' gutterBottom>
              Date : {new Date(data.date).toLocaleString("en-US")}
            </Typography>
            <Typography color='red' gutterBottom>
              Subject : {data.subject}
            </Typography>
            <Typography>
              Student Availed Attendance :{" "}
              {!data.students?.length
                ? `No Student Availed Yet`
                : data.students.map((student, key) => (
                    <Typography key={key}>
                      <variant>{`${key}`}</variant>
                      <Avatar src={student.imageUrl} alt={student.name} />
                      <variant>{`${student.name}`}</variant>
                    </Typography>
                  ))}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='medium' style={{ color: "blue" }}>
              Import As CSV
            </Button>
          </CardActions>
          <br />
        </Card>
        <hr />
      </div>
    ));
  };
  const clearResultArray = () => {
    setResultArray([]);
    dispatch(resetStudent());
  };

  const qrCodeManager = () => {
    return qrComponent ? (
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={classes.form}
        style={{ justifyContent: "center" }}
      >
        <TextField value={attendanceData.email} label='email' type='email' />
        <br />
        <TextField
          type='text'
          label='Subject'
          onChange={(e) =>
            setAttendanceData({ ...attendanceData, subject: e.target.value })
          }
        />
        <br />
        <Button type='submit' fullWidth variant='contained' color='primary'>
          Submit & Generate
        </Button>
      </form>
    ) : (
      <div />
    );
  };
  return user.authData === null ? (
    <Redirect to='/auth' />
  ) : user?.authData?.result?.email !== "visheshjindal368@gmail.com" ? (
    <Redirect to='/student' />
  ) : (
    <>
      <AppBar
        className={classes.brandContainer}
        position='static'
        color='inherit'
      >
        <div className={classes.brandContainer}>
          <Typography className={classes.heading} variant='h2' align='center'>
            Faculty Portal
          </Typography>
        </div>
      </AppBar>
      <br />
      <br />
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.heading}
            color='textSecondary'
            gutterBottom
          >
            Generate a QR Code by clicking Generate
          </Typography>
          <Typography>Kindly share With Students</Typography>
        </CardContent>
        <CardActions>
          <Button
            size='medium'
            style={{ color: "green" }}
            onClick={() => setQrComponent(!qrComponent)}
          >
            {qrComponent ? "Reset Code" : "Generate Code"}
          </Button>
        </CardActions>
        <br />
      </Card>
      <Paper className={classes.root} style={{ alignItems: "center" }} square>
        {qrCodeManager()}
      </Paper>
      <br />
      <br /> <br />
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.heading}
            color='textPrimary'
            gutterBottom
          >
            See Detailed report of All the students
          </Typography>
          {resultArray?.length ? (
            <div />
          ) : (
            <Button onClick={fetchData} style={{ color: "red" }}>
              Fetch Data
            </Button>
          )}
          <Typography className={classes.heading}>
            History of Attendance
          </Typography>
          {displayData(resultArray)}
          {resultArray?.length ? (
            <Button onClick={clearResultArray}>Clear</Button>
          ) : (
            <div />
          )}
        </CardContent>
        <CardActions>
          <Button size='medium' style={{ color: "green" }}>
            History
          </Button>
        </CardActions>
        <br />
      </Card>
      <br />
    </>
  );
}
