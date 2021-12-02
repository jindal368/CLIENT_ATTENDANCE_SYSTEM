import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  TextField,
  Chip,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useStyles from "./styles";
import Input from "../Auth/Input";
import {
  postattendancedata,
  fetchAllListToFaculty,
} from "../../actions/attendance";
import ReactCardFlip from "react-card-flip";
import subjectIcon from "../../images/subject.jpg";

// const initialState = {course: '',year: '', semester: '',stream: '',subject: []};
const subjecList = [];

const AddSubject = () => {
  const [form, setForm] = useState({});
  const [value, setValue] = useState("signup");
  const [isFlip, setIsFlip] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const postAttendanceData = useSelector(
    (state) => state.attendance.fetchAllAttendance
  );
  // const handleSubmit = (e) => {
  //     e.preventDefault();

  //     if (isSignup) {
  //       dispatch(registerCollege(form, history));
  //     } else {
  //       dispatch(facultySignin(form, history));
  //     }
  //   };
  useEffect(() => {
    dispatch(fetchAllListToFaculty(user.authData.result.email));
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      facultyEmail: user.authData.result.email,
      subject: "form.subject",
      course: form.course,
      year: form.year,
      semester: form.sem,
      section: "F",
      stream: form.stream,
    };
    console.log("Data : ", data);

    dispatch(postattendancedata(data, "234532", "34.3434", "76.4433"));
    console.log("DFHADAKA : ", postAttendanceData);
    setForm({});
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fliphandler = () => {
    setForm({});
    setIsFlip(!isFlip);
  };

  return (
    <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal">
      <Card
        className={classes.root}
        onClick={fliphandler}
        style={{ width: "250px" }}
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={subjectIcon}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2">
              Add Subject
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Click to Add a Subject
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {/* <Container component="main" maxWidth="xs"> */}
      <Paper className={classes.paper} elevation={3}>
        <Typography gutterBottom component="h2" variant="h4">
          Subject Add
          {form.semester}
        </Typography>
        <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Input
              name="course"
              label="Course"
              handleChange={handleChange}
              autoFocus
            />
            <Input name="year" label="year" handleChange={handleChange} half />
            <Input
              name="sem"
              label="Semester"
              handleChange={handleChange}
              half
            />
            <Input name="stream" label="Stream" handleChange={handleChange} />
            <Autocomplete
              multiple
              id="tags-filled"
              options={subjecList.map((option) => option.title)}
              style={{ width: "100%" }}
              freeSolo
              onChange={handleChange}
              name="subject"
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Subject"
                  placeholder="Subject"
                />
              )}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Subject Add
          </Button>
          <Button
            fullWidth
            type="reset"
            variant="contained"
            color="Secondary"
            className={classes.submit}
            onClick={fliphandler}
            style={{ marginTop: "0px" }}
          >
            Cancel
          </Button>
        </form>
      </Paper>
      {/* </Container> */}
    </ReactCardFlip>
  );
};
export default AddSubject;
