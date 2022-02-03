/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/react";
import { useAlert } from "react-alert";
import BounceLoader from "react-spinners/BounceLoader";
import BusinessRoundedIcon from "@material-ui/icons/BusinessRounded";
import {
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Tabs,
  Tab,
  AppBar,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@material-ui/core";
import useStyles from "./styles";
import Input from "../Auth/Input";
import { useHistory } from "react-router-dom";
import { fetchAllCollege, addCollege } from "../../actions/attendance";
import { SET_COLLEGE_ID } from "../../constants/actionTypes";
import { Redirect } from "react-router-dom";
const College = () => {
  const [form, setForm] = useState({});
  const [value, setValue] = useState("college");
  const [collegeSelect, setCollegeSelect] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  const collegelist = useSelector((state) => state.attendance.collegeList);
  const collegeId = JSON.parse(localStorage.getItem("collegeId"));
  const designation = JSON.parse(localStorage.getItem("designation"));
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    setLoading(true);
    dispatch(fetchAllCollege())
      .then((res) => {
        console.log("REs : ", res);
        if (res != 200) alert.show(`Server Error ${res}`);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert.show("err");
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(addCollege(form, history))
      .then((res) => {
        if (res != 200) alert.show(`Server Error ${res}`);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert.show(err);
      });
  };

  const handleCollege = () => {
    console.log("CollegeSelect : ", collegeSelect);
    if (collegeSelect === "") {
      setIsError(true);
    } else {
      dispatch({ type: SET_COLLEGE_ID, collegeSelect });

      history.push("/");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleChange1 = (event, newValue) => {
    setValue(newValue);
    setForm({});
  };
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return loading ? (
    <BounceLoader color='red' loading={loading} css={override} size={150} />
  ) : (
    <div>
      <Container component='main' maxWidth='xs'>
        <AppBar position='static' style={{ marginTop: "20px" }}>
          <Tabs
            value={value}
            onChange={handleChange1}
            aria-label='simple tabs example'
          >
            <Tab label='Register' value={"register"} className={classes.head} />
            <Tab label='College' value={"college"} className={classes.head} />
          </Tabs>
        </AppBar>
      </Container>
      {value == "register" ? (
        <Container component='main' maxWidth='xs'>
          <Paper className={classes.paper} elevation={3}>
            <BusinessRoundedIcon color='primary' style={{ fontSize: "60px" }} />
            <Typography component='h1' variant='h5'>
              {" "}
              Register College
            </Typography>
            <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
              <Grid container spacing={2}>
                <Input
                  name='name'
                  label='College Name'
                  handleChange={handleChange}
                  autoFocus
                />
                <Input
                  name='university'
                  label='University'
                  handleChange={handleChange}
                  type='text'
                />
                <Input
                  name='collegeNo'
                  label='College Code'
                  handleChange={handleChange}
                  half
                />
                <Input
                  name='AdminMobile'
                  label='Mobile No.'
                  handleChange={handleChange}
                  half
                />
                <Input
                  name='address'
                  label='Address'
                  handleChange={handleChange}
                  type='text'
                />
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Register
              </Button>
            </form>
          </Paper>
        </Container>
      ) : (
        <Container component='main' maxWidth='xs'>
          <Paper className={classes.paper} elevation={3}>
            <BusinessRoundedIcon color='primary' style={{ fontSize: "60px" }} />
            <Typography component='h1' variant='h5'>
              {" "}
              Select Your College
            </Typography>
            <FormControl
              variant='outlined'
              style={{ width: "80%", margin: "10px" }}
              error={isError}
            >
              <InputLabel id='demo-simple-select-outlined-label'>
                College
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                value={collegeSelect}
                onChange={(e) => setCollegeSelect(e.target.value)}
                label='College'
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {collegelist?.collegeSchema?.map((college, index) => {
                  return (
                    <MenuItem value={college._id} key={college._id + index}>
                      {college.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={handleCollege}
            >
              Submit
            </Button>
          </Paper>
        </Container>
      )}
    </div>
  );
};
export default College;
