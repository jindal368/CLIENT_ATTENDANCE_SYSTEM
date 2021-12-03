import React from 'react'
import { AppBar, Typography} from '@material-ui/core';
import useStyles from './styles'
import {useSelector } from 'react-redux'
import AddSubject from './AddSubject';
import AdminAdd from './AdminAdd';
import FacultySignup from './FacultySignup';
import QrCodeGenerate from './QrCodeGenerate';
import FacultyList from './FacultyList';
import StudentReport from './StudentReport';

export default function Faculty() {
  var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const classes = useStyles()
    
    return (
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
