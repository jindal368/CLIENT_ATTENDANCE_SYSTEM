import React ,{useState , useEffect}from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button, Card, TextField,variant, CardContent , CardActions, CardActionArea, Paper , CardMedia, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import useStyles from './styles'
import QrCodeGenerator from '../util/QrCodeGenerator'
import {useHistory ,Redirect} from 'react-router-dom'
import QRCode from 'qrcode.react'
import qrImage from '../../images/qrcode.png';
import report from '../../images/report.png';
import {useSelector , useDispatch} from 'react-redux'
import {postattendancedata , getAttendanceData , resetStudent} from '../../actions/attendance'
import * as api from '../../api/index.js';


export default function Faculty() {
  const [qrComponent , setQrComponent] = useState(false);
  const [resultArray , setResultArray] = useState([])
  useEffect(() => {
    displayData(resultArray)
  })
  
  const user = useSelector((state)=>state.auth)
  const attendanceFetchedData = useSelector((state) => state.attendance)

  const [attendanceData  , setAttendanceData] = useState({});
  const [detail,setDetail] = useState({});
  const dispatch = useDispatch();
  var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const classes = useStyles()

    useEffect(()=>{
      api.detail(attendanceData)
        .then((data) =>{
          return setDetail(data);
        })
        .catch((err) =>{
          return ;
        })
    },[attendanceData]);
    
    const handleSubmit = (e) =>{
         e.preventDefault();
         dispatch(postattendancedata(attendanceData))
         .then((res) =>{
           console.log("data dispatched : ",res)
          
         })
         .catch((err) =>{
           console.log("Error : ",err);
         })
         setQrComponent(!qrComponent)
    }
    const fetchData = () => {
      
      dispatch(getAttendanceData( user?.authData?.result?.email))
      .then((res) =>{
        console.log("Response : ",attendanceFetchedData[0])
        setResultArray(attendanceFetchedData[0])
      })
      .catch((err) =>{
        console.log("Error : ",err);
      })

    }
    const displayData = (resultArray) =>{
      if(!resultArray?.length) return "No Data"

     return  resultArray?.map((data) =>(
                   <div>
                     
                   <Card className={classes.root}>
               <CardContent>
                <QrCodeGenerator value={data._id}/>
                <br/> 
               <Typography color="red" gutterBottom>
                   Date : {new Date(data.date).toLocaleString('en-US')}
                 </Typography>
                 <Typography color="red" gutterBottom>
                   Subject : {data.subject}
                 </Typography>
                 <Typography>
                   
                   Student Availed Attendance : {!data.students?.length ? `No Student Availed Yet`: data.students.map((student , key) => (
                     <Typography key={key} >
                         <variant >{`${key}`}</variant>
                       <Avatar src={student.imageUrl} alt={student.name}/>
                       <variant >{`${student.name}`}</variant>
                       </Typography>
                   ))}
                 </Typography>
               </CardContent>
                  <CardActions>
                    <Button size="medium" style={{color : 'blue'}}>Import As CSV</Button>
                  </CardActions>
                <br/>
              </Card>
              <hr/>
                    </div>
                 ))
    }
     const clearResultArray = () =>{
      
       setResultArray([])
       dispatch(resetStudent())
    }
    const qrCodeManager = () =>{

      return qrComponent ?
        <form onSubmit={(e) =>handleSubmit(e)} className={classes.form} style={{justifyContent:'center'}}>
               <Typography gutterBottom variant="h4" component="h2">DETAIL</Typography>
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
                    {detail?.course?.map((data,index)=>{
                      return <MenuItem value={data} key={data+index}>{data}</MenuItem>;
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
                    {detail?.year?.map((data,index)=>{
                      return <MenuItem value={data} key={data+index}>{data}</MenuItem>;
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
                    {detail?.section?.map((data,index)=>{
                      return <MenuItem value={data} key={data+index}>{data}</MenuItem>;
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
                    {detail?.subject?.map((data,index)=>{
                      return <MenuItem value={data} key={data+index}>{data}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
                <Button variant="contained" color="secondary" style={{marginTop:'10px'}}>
                  Submit and Generate
                </Button>
        </form>
        :<div/>
    }
    const showQrCode = () =>{

    }


    return (
      user.authData === null ?
      <Redirect to="/auth"/>
      :
      user?.authData?.result?.email !== "vipul.sharma.cs.2018@miet.ac.in"  ?
      
      <Redirect to="/student"/>
      :
        <>
            {/* <Modal isOpen={isOpen} modalClosed={modalClosed} qrCodeManager={qrCodeManager()}>
            </Modal> */}
             <AppBar className={classes.brandContainer} position="static" color="inherit">
              <div className={classes.brandContainer}>
              <Typography  className={classes.heading+' '+classes.head} variant="h2" align="center">FACULTY PORTAL</Typography>
             </div>
             </AppBar>
             <br/><br/>

              <div className= {classes.contain}>
                <div>
                  <Card className={classes.root} onClick={() =>setQrComponent(!qrComponent)}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={qrImage}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h4" component="h2">
                          Generate QRCode
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Click to generate qrCode for attendance
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  <Paper className={classes.root} style={{alignItems:'center'}} square>
                    {qrCodeManager()}
                  </Paper>
                  <Paper className={classes.root} style={{alignItems:'center'}} square>
                    {showQrCode()}
                  </Paper>
                </div>
                <div>
                  <Card className={classes.root}>
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
                </div>
              </div>

               <Card className={classes.root}>
               <CardContent>
                 <Typography className={classes.heading} color="textPrimary" gutterBottom>
                   See Detailed report of All the students
                 </Typography>
                 {resultArray?.length ? 
                   <div/>:
                   <Button onClick={fetchData} style={{color:'red'}}>Fetch Data</Button>
                  }
                 <Typography className={classes.heading}>
                   History of Attendance
                 </Typography>
                 {displayData(resultArray)}
                 {resultArray?.length ? <Button onClick={clearResultArray}>Clear</Button> : <div/>}
               </CardContent>
                  <CardActions>
                    <Button size="medium" style={{color : 'green'}} >History</Button>
                  </CardActions>
                <br/>
              </Card>
              <br/>
              
              
        </>

    )
    }
