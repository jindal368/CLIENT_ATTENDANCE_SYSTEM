import React ,{useState , useEffect}from 'react'
import { AppBar, Typography} from '@material-ui/core';
import useStyles from './styles'
import {useHistory ,Redirect} from 'react-router-dom'
import {useSelector } from 'react-redux'
import AddSubject from './AddSubject';
import AdminAdd from './AdminAdd';
import FacultySignup from './FacultySignup';
import QrCodeGenerate from './QrCodeGenerate';
import FacultyList from './FacultyList';
import StudentReport from './StudentReport';

export default function Faculty() {
  const user = useSelector((state)=>state.auth)
  var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const classes = useStyles()
    
    return (
      user.authData === null ?
      <Redirect to="/auth"/>
      :
      user?.authData?.result?.email !== "vipul.sharma.cs.2018@miet.ac.in"  ?
      
      <Redirect to="/student"/>
      :
        <>
             <AppBar className={classes.brandContainer} position="static" color="inherit">
                <div className={classes.brandContainer}>
                  <Typography  className={classes.heading+' '+classes.top} variant="h2" align="center">FACULTY PORTAL</Typography>
              </div>
             </AppBar>
             <br/><br/>

              <div className= {classes.contain}>
                <AdminAdd />
                <FacultySignup />
                <AddSubject />
                <FacultyList />
                <QrCodeGenerate />
                <StudentReport />
              </div>     
        </>

    )
    }
