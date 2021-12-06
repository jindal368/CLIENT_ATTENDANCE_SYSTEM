import React from 'react'
import { AppBar, Typography } from '@material-ui/core';
import useStyles from './styles'
import StudentReport from './StudentReport';
import QrCodeScanner from './QrCodeScanner';

export default function Student() {

    const classes = useStyles()
   
    return (
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
