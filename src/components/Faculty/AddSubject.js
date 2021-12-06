/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Paper,
  Grid,
  Typography,
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
import ReactCardFlip from "react-card-flip";
import subjectIcon from "../../images/subject.jpg";
import { subjectCreate } from "../../actions/attendance";

const subjecList = [];

const AddSubject = () => {
  const [form, setForm] = useState({});
  const [isFlip, setIsFlip] = useState(false);
  const classes = useStyles();
  const formRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  // useEffect(() => {
  //     dispatch(fetchAllListToFaculty(user.authData.result.email));
  //   }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      subjects: form.subject,
      course: form.course,
      year: form.year,
      sem: form.sem,
      stream: form.stream,
    };
    console.log("Data : ", data);
    dispatch(subjectCreate(data))
      .then(() => {
        console.log("subject Created");
        formRef.current.reset();
        fliphandler();
      })
      .catch((err) => {
        console.log("Error : ", err);
        formRef.current.reset();
        fliphandler();
      });
    setForm({});
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const fliphandler = () => {
    setForm({});
    setIsFlip(!isFlip);
  };

  return (
    <ReactCardFlip isFlipped={isFlip} flipDirection='horizontal'>
      <Card
        className={classes.root}
        onClick={fliphandler}
        style={{ width: "250px" }}
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={subjectIcon}
            title='Contemplative Reptile'
          />
          <CardContent>
            <Typography gutterBottom variant='h4' component='h2'>
              Add Subject
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Click to Add a Subject
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {isFlip ? (
        <Paper className={classes.paper} elevation={3}>
          <Typography gutterBottom component='h2' variant='h4'>
            Subject Add
          </Typography>
          <form
            className={classes.form}
            onSubmit={(e) => handleSubmit(e)}
            ref={formRef}
          >
            <Grid container spacing={2}>
              <Input
                name='course'
                label='Course'
                handleChange={handleChange}
                autoFocus
              />
              <Input
                name='year'
                label='year'
                handleChange={handleChange}
                half
              />
              <Input
                name='sem'
                label='Semester'
                handleChange={handleChange}
                half
              />
              <Input name='stream' label='Stream' handleChange={handleChange} />
              <Autocomplete
                multiple
                id='tags-filled'
                options={subjecList.map((option) => option.title)}
                style={{ width: "100%" }}
                freeSolo
                onChange={(e, value) => {
                  setForm({ ...form, subject: value });
                }}
                name='subject'
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant='outlined'
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='filled'
                    label='Subject'
                    placeholder='Subject'
                  />
                )}
              />
            </Grid>
            <Button
              fullWidth
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Subject Add
            </Button>
            <Button
              fullWidth
              type='reset'
              variant='contained'
              color='secondary'
              className={classes.submit}
              onClick={fliphandler}
              style={{ marginTop: "0px" }}
            >
              Cancel
            </Button>
          </form>
        </Paper>
      ) : null}
    </ReactCardFlip>
  );
};
export default AddSubject;
