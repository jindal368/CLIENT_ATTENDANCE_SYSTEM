import React, { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { Typography, Paper, Card, CardContent , CardActionArea, CardMedia, Avatar, Button, CardActions, AppBar} from '@material-ui/core';
import useStyles from './styles';
import ReactCardFlip from 'react-card-flip';
import report from '../../images/report.png';
import DatePicker from 'sassy-datepicker';
import {fetchAllListToFaculty} from '../../actions/attendance'


const StudentReport = () =>{

    const [isFlip, setIsFlip] = useState(false);
    const classes = useStyles();    
    const dispatch = useDispatch();
    const fetchAllAttendance = useSelector((state)=>state.attendance?.fetchAllAttendance)
    const user = useSelector((state)=>state.attendance.authData)
    const [resultArray , setResultArray] = useState([])
    const attendanceFetchedData = useSelector((state) => state.attendance)
    const [date, setDate] = useState(new Date());

    // const displayData = (resultArray) =>{
    //   if (!resultArray?.length) return "No Data";

    //   return resultArray?.map((data) => (
    //       <div>
    //         <Card className={classes.root}>
    //           <CardContent>
    //             <QrCodeGenerator value={data._id} />
    //             <br />
    //             <Typography color="red" gutterBottom>
    //               Date : {new Date(data.date).toLocaleString("en-US")}
    //             </Typography>
    //             <Typography color="red" gutterBottom>
    //               Subject : {data.subject}
    //             </Typography>
    //             <Typography>
    //               Student Availed Attendance :{" "}
    //               {!data.students?.length
    //                 ? `No Student Availed Yet`
    //                 : data.students.map((student, key) => (
    //                     <Typography key={key}>
    //                       <variant>{`${key}`}</variant>
    //                       <Avatar src={student.imageUrl} alt={student.name} />
    //                       <variant>{`${student.name}`}</variant>
    //                     </Typography>
    //                   ))}
    //             </Typography>
    //           </CardContent>
    //           <CardActions>
    //             <Button size="medium" style={{ color: "blue" }}>
    //               Import As CSV
    //             </Button>
    //           </CardActions>
    //           <br />
    //         </Card>
    //         <hr />
    //       </div>
    //     ));
    //   }
    const fetchData = () =>{
      dispatch(fetchAllListToFaculty( user.result.email))
              .then((res) =>{
                console.log("fetch All List to Faculty")
              })
              .catch((err)=>{
                  console.log('error ')
              })
    }

    const fliphandler = () =>{
        // if(isFlip===false){
        //   fetchData()
        // }
        setIsFlip(!isFlip);
    }
    const onChange = (date) => {
      console.log(date.toString());
      setDate(date.toString());
    };

    return(
        <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal">
            <Card className={classes.root} onClick={fliphandler}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={report}
                    title="Contemplative Reptile"
                    style={{backgroundSize:'380px'}}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h4" component="h2">
                        Student Report
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Click to Check the detail of the students
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            {isFlip?
            <div>
              <Paper className={classes.paper} elevation={3} style={{padding:'0'}}>
                <Button fullWidth variant="contained" color="secondary" onClick={fliphandler}>
                  Cancel
                </Button>
                  {/* {resultArray?.length ? 
                    null:
                    <Button onClick={fetchData} style={{color:'red'}}>Fetch Data</Button>
                  }
                  {displayData(resultArray)}
                  {resultArray?.length ? <Button onClick={clearResultArray}>Clear</Button> : <div/>} */}
                <div>
                  <DatePicker onChange={onChange} />
                </div>
                <AppBar position="static" style={{padding:10}} >
                    <Typography component="h2" variant="h5" ><center>Student List</center></Typography>
                </AppBar>
                {/* <List component="nav" aria-label="main mailbox folders" className={classes.list}>
                  {resultArray?.map(faculty =>{
                      return (<ListItem key={faculty._id}>
                          <Avatar className={classes.purple} alt={faculty.name} src={faculty.name}>{faculty.name.charAt(0).toUpperCase()}</Avatar>
                          <ListItemText primary={faculty.name.toUpperCase()} />
                      </ListItem>);
                  })}
              </List> */}
              </Paper>
            </div>     
            :<></>} 
        </ReactCardFlip>
    );
}
export default StudentReport;