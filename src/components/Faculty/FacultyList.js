/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrUserAdmin } from "react-icons/gr";
import { GoVerified, GoUnverified } from "react-icons/go";
import {
  Typography,
  Card,
  CardContent,
  Avatar,
  CardActionArea,
  CardMedia,
  Paper,
  AppBar,
  ListItem,
  ListItemText,
  List,
} from "@material-ui/core";
import useStyles from "./styles";
import ReactCardFlip from "react-card-flip";
import facultyListIcon from "../../images/facultyList.jfif";
import { getFaculty } from "../../actions/attendance";

const FacultyList = ({ collegeId }) => {
  const [isFlip, setIsFlip] = useState(false);
  const classes = useStyles();

  const dispatch = useDispatch();
  const facultyList = useSelector((state) => state.attendance.facultyList);
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log("FacultyList L:", facultyList);
  useEffect(() => {
    dispatch(getFaculty(collegeId));
  }, []);

  // const handleSubmit = () => {
  //     e.preventDefault();

  //     if (isSignup) {
  //       dispatch(registerCollege(form, history));
  //     } else {
  //       dispatch(facultySignin(form, history));
  //     }
  //   };

  const fliphandler = () => {
    setIsFlip(!isFlip);
  };

  return (
    <ReactCardFlip isFlipped={isFlip} flipDirection='horizontal'>
      <Card className={classes.root} onClick={fliphandler}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={facultyListIcon}
            title='Contemplative Reptile'
          />
          <CardContent>
            <Typography gutterBottom variant='h4' component='h2'>
              List of Faculty
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Click to get the list of Faculty
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <div>
        {isFlip ? (
          <Paper
            className={classes.paper}
            elevation={3}
            style={{ padding: "0" }}
          >
            <AppBar position='static' style={{ padding: 10 }}>
              <Typography component='h2' variant='h4' onClick={fliphandler}>
                <center>FacultyList</center>
              </Typography>
            </AppBar>
            <List
              component='nav'
              aria-label='main mailbox folders'
              className={classes.list}
            >
              {facultyList?.facultySchema?.map((faculty) => {
                return (
                  <div
                    style={{
                      backgroundColor:
                        faculty._id === user.result._id ? "grey" : "white",
                    }}
                  >
                    <ListItem key={faculty._id} style={{ display: "flex" }}>
                      <Avatar
                        className={classes.purple}
                        alt={faculty.name}
                        src={faculty.name}
                      >
                        {faculty.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <ListItemText primary={faculty.name.toUpperCase()} />
                      {faculty.isVerified ? <GoVerified /> : <GoUnverified />}
                      {faculty.isAdmin ? <GrUserAdmin /> : ""}
                    </ListItem>
                  </div>
                );
              })}
            </List>
          </Paper>
        ) : null}
      </div>
    </ReactCardFlip>
  );
};
export default FacultyList;
