import React, { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { Button, Paper, Typography, Card, CardContent , CardActionArea, CardActions, CardMedia, TextField, MenuItem, FormControl, InputLabel, Select} from '@material-ui/core';
import useStyles from './styles';
import ReactCardFlip from 'react-card-flip';
import qrImage from '../../images/qrcode.png';
import ModalBox from '../Modal/ModalBox';
import QrCodeGenerator from '../util/QrCodeGenerator'
import {fetchAllListToFaculty} from '../../actions/attendance'
  

const QrCodeGenerate = () =>{
    const [form, setForm] = useState({});
    const [detail,setDetail] = useState([]);
    const [attendanceData  , setAttendanceData] = useState({});
    const user = useSelector((state)=>state.auth)
    const [resultArray , setResultArray] = useState([{"_id":"61a0c6188193db26933faf9f"}])
    const [isShow, setIsShow] = useState(false);
    const [isFlip, setIsFlip] = useState(false);
    const fetchAllAttendance = useSelector((state)=>state.attendance.fetchAllAttendance)
    const classes = useStyles();    
    const dispatch = useDispatch();

    // const handleSubmit = (e) =>{
    //          e.preventDefault();
    //          dispatch(postattendancedata(attendanceData))
    //          .then((res) =>{
    //            console.log("data dispatched : ",res)
    //            fetchData();
    //          })
    //          .catch((err) =>{
    //            console.log("Error : ",err);
    //          })
    //     }

    // const fetchData = () => {
      
    //           dispatch(fetchAllListToFaculty( user?.authData?.result?.email))
    //           .then((res) =>{
    //             console.log("Response : ",res)
                // setResultArray(fetchAllAttendance)
            //   })
            //   .catch((err) =>{
            //     console.log("Error : ",err);
            //   })
        
            // }
    // const displayData = (resultArray) =>{
    //     if(!resultArray?.length) return "No Data"
    
    //     return  resultArray?.map((data) =>(
    //                     <div>
                        
    //                     <Card className={classes.root}>
    //                 <CardContent>
    //                 <QrCodeGenerator value={data._id}/>
    //                 <br/> 
    //                 <Typography color="red" gutterBottom>
    //                     Date : {new Date(data.date).toLocaleString('en-US')}
    //                 </Typography>
    //                 <Typography color="red" gutterBottom>
    //                     Subject : {data.subject}
    //                 </Typography>
    //                 <Typography>
                        
    //                     Student Availed Attendance : {!data.students?.length ? `No Student Availed Yet`: data.students.map((student , key) => (
    //                     <Typography key={key} >
    //                         <variant >{`${key}`}</variant>
    //                         <Avatar src={student.imageUrl} alt={student.name}/>
    //                         <variant >{`${student.name}`}</variant>
    //                         </Typography>
    //                     ))}
    //                 </Typography>
    //                 </CardContent>
    //                 <CardActions>
    //                     <Button size="medium" style={{color : 'blue'}}>Import As CSV</Button>
    //                 </CardActions>
    //                 <br/>
    //             </Card>
    //             <hr/>
    //                     </div>
    //                 ))
    //     }


    // const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const fliphandler = () =>{
        setForm({});
        setIsFlip(!isFlip);
    }
    const ModalOpen = () =>{
        setIsShow(!isShow);
    }
    const showQRCode = () =>{
        if(!resultArray?.length){
            // dispatch(fetchAllListToFaculty( user?.authData?.result?.email))
            //   .then((res) =>{
            //     console.log("Response : ",res)
            //     setResultArray(fetchAllAttendance)
                setIsShow(!isShow);
            //   })
        }
        else{
            setIsShow(!isShow);
        }
    }

    return(
    <div>
        <ModalBox isOpen={isShow} modalClosed={ModalOpen}>
            <QrCodeGenerator value={resultArray[0]?._id} />
        </ModalBox>
        <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal">
            <Card className={classes.root}>
                    <CardActionArea onClick={fliphandler}>
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
                    <CardActions>
                        <Button size="medium" color="primary" onClick={showQRCode}>
                        Show QRCode
                        </Button>
                    </CardActions>
                  </Card>
                <Paper className={classes.paper} elevation={3} >
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
                        <Button variant="contained" type='reset' color="secondary" className={classes.submit} style={{width:'204px'}} onClick={fliphandler} >
                            Cancel
                    </Button>
                    </form>
                </Paper>
        </ReactCardFlip>
        </div>
    );
}
export default QrCodeGenerate;