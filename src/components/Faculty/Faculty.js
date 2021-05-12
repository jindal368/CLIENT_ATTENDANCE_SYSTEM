import React from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button, TextField } from '@material-ui/core';
import useStyles from './styles'

import {useHistory ,Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
export default function Faculty() {
    const classes = useStyles()
    const user = useSelector((state)=>state.auth)
    
    return (
      user.authData === null ?
      <Redirect to="/auth"/>
      :
      user?.authData?.result?.email !== "vishesh.jindal.cs.2018@miet.ac.in" ?
      
      <Redirect to="/student"/>
      :
        <div>
             <AppBar className={classes.brandContainer} position="static" color="inherit">
       <div className={classes.brandContainer}>
        <Typography  className={classes.heading} variant="h2" align="center">Faculty Portal</Typography>
      </div>
      </AppBar>
        </div>
    )
}
