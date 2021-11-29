import React , {useState} from 'react'
import { AppBar, Typography } from '@material-ui/core';
import useStyles from './styles'
import {useHistory ,Redirect} from 'react-router-dom';
import {useSelector , useDispatch} from 'react-redux';
import StudentReport from './StudentReport';
import QrCodeScanner from './QrCodeScanner';

export default function Student() {
  const [id , setId] = useState('');
    const classes = useStyles()
    const dispatch  = useDispatch();
    const user = useSelector((state)=>state.auth)
    const data = {
      _id : id,
      data : user?.authData?.result
    }
    // const handleScan = () =>{
    //    if(!scanned) return <div/>
    //    if(scanned ===1){
        
    //    return (
    //    <div style={{color:'green'}}>
    //    Successfully scanned..
    //  </div>
    //    )
    //    }
    //   else{
    //    return(
    //   <div style={{color:'red'}}>
    //     Scanned Failed..
    //   </div>
    //    )
    //   }
    // }
    
    // var handleResponse = (res) =>{
    //   console.log("response : ",res)
    //   const data = {
    //     _id : res?.text,
    //     data : user?.authData?.result
    //   }
    //     return(
    //       res?.text ?
    //       <div>
    //          <div style={{color:'green'}}>
    //          {console.log("Data After sacn : ",data)}
    //           { dispatch(updateStudent(data))
    //           .then(() =>{
    //             setScanned(1)
               
    //           })
    //           .catch((err) =>{
    //             setScanned(2);
    //           })}
    //           </div>
    //           <AppBar className={classes.brandContainer} position="static" color="inherit">
    //             {res}
    //           </AppBar>
    //        </div>
    //           :
    //           <div/>
          
    //     )

    // }
   
    return (
      user.authData === null ?
      <Redirect to="/auth"/>
      :
      user?.authData?.result?.email==="vipul.sharma.cs.2018@miet.ac.in"  ?
      
      <Redirect to="/faculty"/>
      :
        <div>
          <AppBar className={classes.brandContainer} position="static" color="inherit">
            <div className={classes.brandContainer}>
              <Typography  className={classes.heading+' '+classes.top} variant="h2" align="center">STUDENT PORTAL</Typography>
            </div>
          </AppBar>
          <br/><br/>
          <div className= {classes.contain}>
            <QrCodeScanner/>
            <StudentReport/>
          </div>
        </div>
    )
}
