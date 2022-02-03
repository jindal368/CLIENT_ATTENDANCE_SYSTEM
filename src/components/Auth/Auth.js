/** @format */

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/react";
import { useAlert } from "react-alert";
import BounceLoader from "react-spinners/BounceLoader";

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Tabs,
  Tab,
  AppBar,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import env from "react-dotenv";
import Icon from "./icon";
import { signin, signup } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";
import { signInFaculty } from "../../actions/attendance";
import useStyles from "./styles";
import Input from "./Input";
import { Redirect, useHistory } from "react-router-dom";
import VerificationMessage from "../VerificationMessage/VerificationMessage";
import { getCollegeData } from "../../api";
// const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [value, setValue] = React.useState("student");
  const [form, setForm] = useState({});
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const alert = useAlert();
  // const user = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("profile"));
  const designation = JSON.parse(localStorage.getItem("designation"));
  const collegeId = JSON.parse(localStorage.getItem("collegeId"));
  const [collegeData, setCollegeData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef();
  const handleShowPassword = () => setShowPassword(!showPassword);

  function getLocation() {
    console.log("GEtLocation running");

    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log("Latitude : ", latitude);
      console.log("Longitude : ", longitude);
    });
  }
  const getCollege = async (collegeId) => {
    const { data } = await getCollegeData(collegeId);
    console.log("Data : ", data);
    setCollegeData(data);
  };

  useEffect(() => {
    getLocation();
    getCollege(collegeId);
  }, []);

  const switchMode = () => {
    setForm({});
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "faculty") {
      setLoading(true);
      dispatch(signInFaculty(form, collegeId))
        .then((res) => {
          console.log(res);
          if (res.status !== 200) alert.show(`${res.data.message}`);
          setLoading(false);
          return false;
        })
        .catch((err) => alert.show(err));
    } else {
      if (isSignup) {
        setLoading(true);
        dispatch(signup(form, collegeId, latitude, longitude))
          .then((res) => {
            console.log(res);
            if (res.status !== 200) {
              alert.show(`${res.data.message}`);
              setLoading(false);
            } else {
              history.push("/successmsg");
            }
          })
          .catch((err) => alert.show(err));
      } else {
        setLoading(true);
        dispatch(signin(form, latitude, longitude))
          .then((res) => {
            console.log(res);
            if (res.status !== 200) {
              alert.show(`${res.data.message}`);
              setLoading(false);
              return false;
            }
            setLoading(false);
            history.push("/student");
          })
          .catch((err) => alert.show(err));
      }
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      history.push("/student");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () =>
    console.log("Google Sign In was unsuccessful. Try again later");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleChange1 = (event, newValue) => {
    formRef.current.reset();
    setValue(newValue);
    setForm({});
  };

  return loading ? (
    <BounceLoader color='red' loading={loading} css={override} size={150} />
  ) : collegeId === null ? (
    <Redirect to='/' />
  ) : user !== null ? (
    designation === "faculty" ? (
      <Redirect to='/faculty' />
    ) : (
      <Redirect to='/student' />
    )
  ) : (
    <div>
      <Container component='main' maxWidth='xs'>
        <AppBar position='static' style={{ marginTop: "20px" }}>
          <Tabs
            value={value}
            onChange={handleChange1}
            aria-label='simple tabs example'
          >
            <Tab label='Faculty' value={"faculty"} className={classes.head} />
            <Tab label='Student' value={"student"} className={classes.head} />
          </Tabs>
        </AppBar>
      </Container>

      {value == "student" ? (
        <Container component='main' maxWidth='xs'>
          <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              {isSignup ? "Sign up" : "Sign in"}
            </Typography>
            <form
              className={classes.form}
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <Grid container spacing={2}>
                {isSignup && (
                  <>
                    <Input
                      name='firstName'
                      label='Name'
                      handleChange={handleChange}
                      half
                      autoFocus
                    />
                    <Input
                      name='lastName'
                      label='Name'
                      handleChange={handleChange}
                      half
                    />
                  </>
                )}
                <Input
                  name='email'
                  label='Email Address'
                  handleChange={handleChange}
                  type='email'
                />
                <Input
                  name='password'
                  label='Password'
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                />
                {isSignup && (
                  <>
                    <Input
                      name='confirmPassword'
                      label='Repeat Password'
                      handleChange={handleChange}
                      type='password'
                    />
                    <Input
                      name='rollNo'
                      label='Roll No'
                      handleChange={handleChange}
                      type='number'
                      half
                    />
                    <Input
                      name='mobile'
                      label='Mobile No.'
                      handleChange={handleChange}
                      half
                    />
                    <Input
                      name='course'
                      label='Course'
                      handleChange={handleChange}
                    />
                    <Input
                      name='year'
                      label='Year'
                      handleChange={handleChange}
                      half
                    />
                    <Input
                      name='semester'
                      label='Semester'
                      handleChange={handleChange}
                      half
                    />
                    <Input
                      name='section'
                      label='Section'
                      handleChange={handleChange}
                      half
                    />
                  </>
                )}
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                {isSignup ? "Sign Up" : "Sign In"}
              </Button>

              <GoogleLogin
                clientId={env.GOOGLE_CLIENT_ID}
                render={(renderProps) => (
                  <Button
                    className={classes.googleButton}
                    color='primary'
                    fullWidth
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    startIcon={<Icon />}
                    variant='contained'
                  >
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy='single_host_origin'
              />
              <Grid container justify='center'>
                <Grid item>
                  <Button onClick={switchMode} type='reset'>
                    {isSignup
                      ? "Already have an account? Sign in"
                      : "Don't have an account? Sign Up"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      ) : (
        <Container component='main' maxWidth='xs'>
          <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <form
              className={classes.form}
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <Grid container spacing={2}>
                <Input
                  name='email'
                  label='Email Address'
                  handleChange={handleChange}
                  type='email'
                  autoFocus
                />
                <Input
                  name='password'
                  label='Password'
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                />
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Sign In
              </Button>
              {/* <GoogleLogin
                  clientId = {env.GOOGLE_CLIENT_ID}
                  render={(renderProps) => (
                    <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                      Google Sign In
                    </Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleError}
                  cookiePolicy="single_host_origin"
                /> */}
            </form>
          </Paper>
        </Container>
      )}
    </div>
  );
};

export default SignUp;
