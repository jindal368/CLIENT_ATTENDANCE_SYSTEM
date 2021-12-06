import React, { useState ,useRef} from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { Button, Paper, Typography, Card, CardContent , CardActionArea, CardActions, CardMedia, Grid, MenuItem, FormControl, InputLabel, Select} from '@material-ui/core';
import useStyles from './styles';
import ReactCardFlip from 'react-card-flip';
import qrImage from '../../images/qrcode.png';
import ModalBox from '../Modal/ModalBox';
import QrCodeGenerator from '../util/QrCodeGenerator'
import {fetchAllListToFaculty,postattendancedata , getSubjects} from '../../actions/attendance'
import Input from '../Auth/Input';
  

const QrCodeGenerate = () =>{
    const [form, setForm] = useState({});
    const [attendanceData  , setAttendanceData] = useState({});
    // const [resultArray , setResultArray] = useState([{"_id":"61a0c6188193db26933faf9f"}])
    const [isShow, setIsShow] = useState(false);
    const [isFlip, setIsFlip] = useState(false);
    const [showSubject, setShowSubject] = useState(false);
    const fetchAllAttendance = useSelector((state)=>state.attendance?.fetchAllAttendance[0])
    const user = useSelector((state)=>state.attendance.authData)
    const collegeId = useSelector((state)=>state.attendance?.collegeId.collegeSchema.collegeId)
    const subjectList = useSelector((state)=>state.attendance.subjectListing?.result?.subjects)
    const classes = useStyles();   
    const formRef = useRef(); 
    const dispatch = useDispatch();
    const handleSubmit = (e) =>{
             e.preventDefault();
            if(showSubject)
            {   const data = {
                    facultyEmail: user.result.email,
                    course: form.course,
                    year: form.year,
                    semester: form.sem,
                    section: form.section,
                    subject: attendanceData.subject
                }
                console.log('post data', data)
                dispatch(postattendancedata(data,collegeId,27.2046,77.4977))
                    .then((res) =>{
                        console.log("attendance Posted ")
                        fetchData();
                        formRef.current.reset();
                    })
                    .catch((err) =>{
                        console.log("Error : ",err);
                    })
            }
            else{
                const data = {
                    course: form.course,
                    year: form.year,
                    sem: form.sem,
                    stream: form.stream,
                }
                dispatch(getSubjects(data))
                .then((res) =>{
                    console.log("get Subject ")
                    setShowSubject(true)
                })
                .catch((err) =>{
                    console.log("Error : ",err);
                })
            }
        }

    const fetchData = () => {
      
              dispatch(fetchAllListToFaculty( user.result.email))
              .then((res) =>{
                console.log("fetch All List to Faculty")
                setShowSubject(false)

                fliphandler()
              })
              .catch((err) =>{
                console.log("Error : ",err);
              })
        
            }


    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    
    const fliphandler = () =>{
        setShowSubject(false)
        setForm({});
        setIsFlip(!isFlip);
    }
    const ModalOpen = () =>{
        setIsShow(!isShow);
    }
    const showQRCode = () =>{
        if(!fetchAllAttendance?.length){
            dispatch(fetchAllListToFaculty( user.result.email))
              .then((res) =>{
                console.log("fetch All List to Faculty")
                setIsShow(!isShow);
              })
              .catch((err)=>{
                  console.log('error ')
              })
        }
        else{
            setIsShow(!isShow);
        }
    }
    return(
    <div>
        <ModalBox isOpen={isShow} modalClosed={ModalOpen}>
            <QrCodeGenerator value={fetchAllAttendance?._id} />
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
                    <Typography gutterBottom component="h2" variant="h4">Generate QRCode</Typography>
                    <form  className={classes.form} onSubmit={(e) =>handleSubmit(e)} ref={formRef} style={{justifyContent:'center',marginTop:'0'}}>
                            <Grid container spacing={2}>
                                <Input name="course" label="Course" handleChange={handleChange} autoFocus/> 
                                <Input name="year" label="year" handleChange={handleChange} half/> 
                                <Input name="sem" label="Semester" handleChange={handleChange} half/> 
                                <Input name="stream" label="Stream" handleChange={handleChange} half/> 
                                <Input name="section" label="Section" handleChange={handleChange} half/> 
                            </Grid>
                            
                        {showSubject?
                            <>
                                <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Subject</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined"
                                    onChange={(e) => setAttendanceData({subject: e.target.value})}
                                    label="subject"
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {subjectList?.map((data,index)=>{
                                    return <MenuItem value={data} key={index}>{data}</MenuItem>;
                                    })}
                                </Select>
                                </FormControl>
                                <Button variant="contained" type='submit' color="primary" style={{marginTop:'10px'}}>
                                    Submit and Generate
                                </Button>
                            </>
                            :<Button variant="contained" type='submit' color="primary" style={{marginTop:'10px'}}>
                                Get Subject
                            </Button>
                        }
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