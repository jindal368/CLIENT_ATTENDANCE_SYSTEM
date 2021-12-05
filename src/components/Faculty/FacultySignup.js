import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BusinessRoundedIcon from "@material-ui/icons/BusinessRounded";
import {
  Button,
  Paper,
  Grid,
  Typography,
  Tabs,
  Tab,
  AppBar,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import useStyles from "./styles";
import ReactCardFlip from "react-card-flip";
import Input from "../Auth/Input";
import facultyImage from "../../images/faculty.png";
import { signUpFaculty, removeFaculty } from "../../actions/attendance";

const FacultySignup = ({ collegeId }) => {
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState("signup");
  const [isFlip, setIsFlip] = useState(false);
  const classes = useStyles();
  const formRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value == "signup") {
      dispatch(signUpFaculty(form, collegeId))
        .then(() => {
          console.log("faculty SignUp ");
          formRef.current.reset();
          setIsFlip(!isFlip);
        })
        .catch((err) => {
          console.log("Error : ", err);
        });
    } else {
      dispatch(removeFaculty(form.email))
        .then(() => {
          console.log("Faculty Remove ");
          formRef.current.reset();
          setIsFlip(!isFlip);
        })
        .catch((err) => {
          console.log("Error : ", err);
        });
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleChange1 = (event, newValue) => {
    formRef.current.reset();
    setValue(newValue);
    setForm({});
  };
  const fliphandler = () => {
    setForm({});
    setIsFlip(!isFlip);
  };

  return (
    <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal">
      <Card className={classes.root} onClick={fliphandler}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={facultyImage}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              gutterBottom
              style={{ fontSize: "25px" }}
              component="h2"
            >
              Faculty Add or Remove
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Click to Add or Remove a faculty
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <div>
        <AppBar position="static" style={{ width: "360px" }}>
          <Tabs
            value={value}
            onChange={handleChange1}
            aria-label="simple tabs example"
          >
            <Tab label="Signup" value={"signup"} className={classes.head} />
            <Tab label="Remove" value={"remove"} className={classes.head} />
          </Tabs>
        </AppBar>
        {value == "signup" ? (
          <Paper className={classes.paper} elevation={3}>
            <BusinessRoundedIcon color="primary" style={{ fontSize: "60px" }} />
            <Typography component="h1" variant="h5">
              Faculty SignUp
            </Typography>
            <form
              className={classes.form}
              ref={formRef}
              onSubmit={(e) => handleSubmit(e)}
            >
              <Grid container spacing={2}>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
                <Input
                  name="email"
                  label="Email"
                  handleChange={handleChange}
                  type="email"
                />
                <Input
                  name="mobile"
                  label="Mobile No."
                  handleChange={handleChange}
                  half
                />
                <Input
                  name="department"
                  label="Department"
                  handleChange={handleChange}
                  half
                />
                <Input
                  name="address"
                  label="Address"
                  handleChange={handleChange}
                />
                <Input
                  name="password"
                  label="Password"
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                />
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
              <Button
                fullWidth
                type="reset"
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={fliphandler}
                style={{ marginTop: "0px" }}
              >
                Cancel
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
        ) : (
          <Paper className={classes.paper} elevation={3}>
            <BusinessRoundedIcon color="primary" style={{ fontSize: "60px" }} />
            <Typography component="h1" variant="h5">
              Faculty Remove
            </Typography>
            <form
              className={classes.form}
              ref={formRef}
              onSubmit={(e) => handleSubmit(e)}
            >
              <Grid container spacing={1}>
                <Input
                  name="email"
                  label="Email"
                  handleChange={handleChange}
                  type="email"
                  autoFocus
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Remove
              </Button>
              <Button
                fullWidth
                type="reset"
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={fliphandler}
                style={{ marginTop: "0px" }}
              >
                Cancel
              </Button>
            </form>
          </Paper>
        )}
      </div>
    </ReactCardFlip>
  );
};
export default FacultySignup;
