import React, { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import { Button, Paper, Grid, Typography, Card, CardContent , CardActionArea, CardMedia, TextField, Chip, MenuItem, FormControl, InputLabel, Select} from '@material-ui/core';
import useStyles from './styles';
import Input from '../Auth/Input';
import ReactCardFlip from 'react-card-flip';
import qrImage from '../../images/qrcode.png';


const initialState = {email: ''};
const top100Films = [];
  

const SignUp = () =>{
    const [form, setForm] = useState(initialState);
    const [detail,setDetail] = useState([]);
    const [attendanceData  , setAttendanceData] = useState({});
    const user = useSelector((state)=>state.auth)
    const [resultArray , setResultArray] = useState([])
    const [isFlip, setIsFlip] = useState(false);
    const classes = useStyles();    
    const dispatch = useDispatch();

    // const handleSubmit = (e) =>{
        //      e.preventDefault();
        //      dispatch(postattendancedata(attendanceData))
        //      .then((res) =>{
        //        console.log("data dispatched : ",res)
        //        fetchData();
        //      })
        //      .catch((err) =>{
        //        console.log("Error : ",err);
        //      })
        // }

        // const fetchData = () => {
      
            //   dispatch(getAttendanceData( user?.authData?.result?.email))
            //   .then((res) =>{
            //     console.log("Response : ",attendanceFetchedData[0])
            //     setResultArray(attendanceFetchedData[0])
            //   })
            //   .catch((err) =>{
            //     console.log("Error : ",err);
            //   })
        
            // }


    // const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const fliphandler = () =>{
        setForm(initialState);
        setIsFlip(!isFlip);
    }


    return(
        <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal">
            <Card className={classes.root} onClick={fliphandler}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={qrImage}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom style={{fontSize:'30px'}} component="h2">
                          Generate QRCode
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Click to generate qrCode for attendance
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
            {/* <Container component="main" maxWidth="xs"> */}
                <Paper className={classes.paper} elevation={3} style={{width:'360px'}}>
                    <Typography variant="h4" component="h1">Generate QRCode</Typography>
                    <form  className={classes.form} style={{justifyContent:'center'}} style={{marginTop:'0'}}>
                        <TextField value={user?.authData?.result?.email} type="hidden"/><br/>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Course</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined"
                                value={attendanceData.course}
                                onChange={(e) => setAttendanceData({...attendanceData, course: e.target.value})}
                                label="Course"
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {detail?.map((data,index)=>{
                                return <MenuItem value={data.course} key={data+index}>{data.course}</MenuItem>;
                                })}
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined"
                            value={attendanceData.year}
                            onChange={(e) => setAttendanceData({...attendanceData, year: e.target.value})}
                            label="year"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {detail?.map((data,index)=>{
                            return <MenuItem value={data.year} key={data+index}>{data.year}</MenuItem>;
                            })}
                        </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Semester</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined"
                            value={attendanceData.semester}
                            onChange={(e) => setAttendanceData({...attendanceData, semester: e.target.value})}
                            label="semester"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {attendanceData.year?<div><MenuItem value={2*(attendanceData.year)-1} >{2*(attendanceData.year)-1}</MenuItem>
                            <MenuItem value={2*(attendanceData.year)} >{2*(attendanceData.year)}</MenuItem></div>:null}
                            
                        </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Section</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined"
                            value={attendanceData.section}
                            onChange={(e) => setAttendanceData({...attendanceData, section: e.target.value})}
                            label="section"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {detail?.map((data,index)=>{
                            return <MenuItem value={data.section} key={data+index}>{data.section}</MenuItem>;
                            })}
                        </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Subject</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined"
                            value={attendanceData.subject}
                            onChange={(e) => setAttendanceData({...attendanceData, subject: e.target.value})}
                            label="subject"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {detail?.map((data,index)=>{
                            return <MenuItem value={data.subject} key={data+index}>{data.subject}</MenuItem>;
                            })}
                        </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" style={{marginTop:'10px'}}>
                            Submit and Generate
                        </Button>
                        <Button variant="contained" color="Secondary" className={classes.submit} style={{width:'204px'}} onClick={fliphandler} >
                            Cancel
                    </Button>
                    </form>
                </Paper>
            {/* </Container> */}
        </ReactCardFlip>
    );
}
export default SignUp;