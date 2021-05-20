import React ,{useState , useEffect}from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button, TextField, Card , CardContent , CardActions, Paper } from '@material-ui/core';

import useStyles from './styles'
import QrCodeGenerator from '../util/QrCodeGenerator'
import {useHistory ,Redirect} from 'react-router-dom'
import QRCode from 'qrcode.react'
import {useSelector , useDispatch} from 'react-redux'
import {postattendancedata , getStudentData} from '../../actions/attendance'
export default function Faculty() {
  const [qrComponent , setQrComponent] = useState(false);
  const [resultArray , setResultArray] = useState([])
  useEffect(() => {
    displayData(resultArray)
  })
  const user = useSelector((state)=>state.auth)
  const attendanceFetchedData = useSelector((state) => state.attendance)
  const [attendanceData  , setAttendanceData] = useState({
     subject : '',
     email : user?.authData?.result?.email
  })
  const dispatch = useDispatch();
    const classes = useStyles()
    
    const handleSubmit = () =>{
         dispatch(postattendancedata(attendanceData))
         .then((res) =>{
           console.log("data dispatched : ",res)
         })
         .catch((err) =>{
           console.log("Error : ",err);
         })
    }

    
    const fetchData = () => {
      dispatch(getStudentData(user?.authData?.result?.email))
      .then((res) =>{
        console.log("Response : ",attendanceFetchedData[0])
        setResultArray(attendanceFetchedData[0])
     
      })
      .catch((err) =>{
        console.log("Error : ",err);
      })

    }
    var displayData = (resultArray) =>{
      if(!resultArray?.length) return "No Data"

     return  resultArray?.map((data) =>(
                   <>
                   <Typography  className={classes.heading} variant="h2" align="center">
                        {data.email}
                   </Typography>
                   <Typography  className={classes.heading} variant="h2" align="center">
                   {data.subject}
                   </Typography>
                   <Typography  className={classes.heading} variant="h2" align="center">
                    
                    </Typography>
                    </>
                 ))
    }

    const qrCodeManager = () =>{
       return  qrComponent ? <QrCodeGenerator/>:<div/>
    }
    return (
      user.authData === null ?
      <Redirect to="/auth"/>
      :
      user?.authData?.result?.email !== "vishesh.jindal.cs.2018@miet.ac.in" ?
      
      <Redirect to="/student"/>
      :
        <>
             <AppBar className={classes.brandContainer} position="static" color="inherit">
              <div className={classes.brandContainer}>
              <Typography  className={classes.heading} variant="h2" align="center">Faculty Portal</Typography>
             </div>
             </AppBar>
             <br/><br/>
             <Card className={classes.root}>
               <CardContent>
                 <Typography className={classes.heading} color="textSecondary" gutterBottom>
                   Generate a QR Code by clicking Generate
                 </Typography>
                 <Typography>
                   Kindly share With Students
                 </Typography>
               </CardContent>
                  <CardActions>
                    <Button size="medium" style={{color : 'green'}} onClick={() =>setQrComponent(!qrComponent)}>{qrComponent ? "Reset Code" : "Generate Code"}</Button>
                  </CardActions>
                <br/>
              </Card>
   
              <Paper className={classes.root} style={{alignItems:'center'}} square>
               {qrCodeManager()}
               </Paper>
               <br/><br/> <br/>
               <Card className={classes.root}>
               <CardContent>
                 <Typography className={classes.heading} color="textSecondary" gutterBottom>
                   See Detailed report of All the students
                 </Typography>
                 <Button onClick={fetchData}>Fetch Data</Button>
                 {displayData(resultArray)}
                 
                 <Typography>
                   History of Attendance
                 </Typography>
               </CardContent>
                  <CardActions>
                    <Button size="medium" style={{color : 'green'}} >History</Button>
                  </CardActions>
                <br/>
              </Card>
              <br/>

              <form onSubmit={handleSubmit} className={classes.form}>
                <TextField type="text"label="Subject"   onChange={(e) => setAttendanceData({...attendanceData, subject: e.target.value})}/>
                <TextField value={attendanceData.email} label="email" type="email"/>
                <Button type="submit"fullWidth variant="contained" color="primary">
                  Submit & Generate
                </Button>
              </form>
        </>

    )
    }
