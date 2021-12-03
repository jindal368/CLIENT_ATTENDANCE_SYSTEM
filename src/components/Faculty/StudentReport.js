import React, { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { Typography, Paper, Card, CardContent , CardActionArea, CardMedia, Avatar, Button, CardActions} from '@material-ui/core';
import useStyles from './styles';
import ReactCardFlip from 'react-card-flip';
import report from '../../images/report.png';
import QrCodeGenerator from '../util/QrCodeGenerator'
import Calendar from 'react-calendar';


const StudentReport = () =>{

    const [isFlip, setIsFlip] = useState(false);
    const classes = useStyles();    
    const dispatch = useDispatch();
    const [resultArray , setResultArray] = useState([])
    const attendanceFetchedData = useSelector((state) => state.attendance)
    const [value, onChange] = useState(new Date());
    // useEffect(() => {
    //     displayData(resultArray)
    // })

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
      
    // const fetchData = () => {
    //     dispatch(getAttendanceData( user?.authData?.result?.email))
    //     .then((res) =>{
    //         console.log("Response : ",attendanceFetchedData[0])
    //         setResultArray(attendanceFetchedData[0])
    //     })
    //     .catch((err) =>{
    //         console.log("Error : ",err);
    //     })

    // }

    const clearResultArray = () =>{
        setResultArray([])
        // dispatch(resetStudent())
     }
    const fliphandler = () =>{
        setIsFlip(!isFlip);
    }


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
                  <Calendar
                    onChange={onChange}
                    value={value}
                  />
                </div>
              </Paper>
            </div>     
            :<></>} 
        </ReactCardFlip>
    );
}
export default StudentReport;