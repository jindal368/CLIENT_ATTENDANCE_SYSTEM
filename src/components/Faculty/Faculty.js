import React ,{useState , useEffect}from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button, TextField, Card, CardContent , CardActions, CardActionArea, Paper , CardMedia, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import useStyles from './styles'
import QrCodeGenerator from '../util/QrCodeGenerator'
import {useHistory ,Redirect} from 'react-router-dom'
import report from '../../images/report.png';
import {useSelector , useDispatch} from 'react-redux'
import {resetStudent} from '../../actions/attendance'
import * as api from '../../api/index.js';
import Modal from '../Modal/ModalBox';
import AddSubject from './AddSubject';
import AdminAdd from './AdminAdd';
import FacultySignup from './FacultySignup';
import QrCodeGenerate from './QrCodeGenerate';
import FacultyList from './FacultyList';

export default function Faculty() {
  const [qrComponent , setQrComponent] = useState(false);
  const [resultArray , setResultArray] = useState([])
  useEffect(() => {
    displayData(resultArray)
  })
  
  const user = useSelector((state)=>state.auth)
  const attendanceFetchedData = useSelector((state) => state.attendance)
  const [isOpen,setIsOpen] = useState(false);

  const [attendanceData  , setAttendanceData] = useState({});
  const [detail,setDetail] = useState([]);
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
            {/* <Modal isOpen={isOpen} modalClosed={isModalOpen} >
              <AdminSignUp />
            </Modal> */}
             <AppBar className={classes.brandContainer} position="static" color="inherit">
                <div className={classes.brandContainer}>
                  <Typography  className={classes.heading+' '+classes.top} variant="h2" align="center">FACULTY PORTAL</Typography>
              </div>
             </AppBar>
             <br/><br/>

              <div className= {classes.contain}>
                <AdminAdd />
                <AddSubject />
                <FacultySignup />
                <FacultyList />
                <QrCodeGenerate />
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
                 {/* {resultArray?.length ? 
                   <div/>:
                   <Button onClick={fetchData} style={{color:'red'}}>Fetch Data</Button>
                  } */}
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
