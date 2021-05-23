import React , {useState} from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button, TextField } from '@material-ui/core';
import useStyles from './styles'
import QrReader from 'react-qr-scanner'
import {useHistory ,Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
export default function Student() {
  const [scanned , setScanned] = useState(0);
    const classes = useStyles()
    const user = useSelector((state)=>state.auth)
    const handleScan = () =>{
       if(!scanned) return <div/>
       if(scanned ===1){
       return (
       <div style={{color:'green'}}>
       Successfully scanned..
     </div>
       )
       }
      else{
       return(
     <div style={{color:'red'}}>
     Scanned Failed..
     </div>
       )
      }
    }
    var handleResponse = (res) =>{
      console.log("response : ",res)
        return(
          res?.text ?
          <div>
             <div style={{color:'green'}}>
               Successfully scanned..
              </div>
              <AppBar className={classes.brandContainer} position="static" color="inherit">
                {res}
              </AppBar>
           </div>
              :
              <div/>
          
        )

    }
   
    const previewStyle = {
      height: 240,
      width: 320,
    }
    return (
      user.authData === null ?
      <Redirect to="/auth"/>
      :
      user?.authData?.result?.email==="vishesh.jindal.cs.2018@miet.ac.in" ?
      
      <Redirect to="/faculty"/>
      :
        <div>
             <AppBar className={classes.brandContainer} position="static" color="inherit">
       <div className={classes.brandContainer}>
        <Typography  className={classes.heading} variant="h2" align="center">Student Portal</Typography>
      </div>
      <div>
        <QrReader
          delay={1000}
          style={previewStyle}
          onError={() => setScanned(2)}
          onScan={(res) => handleResponse(res)}
          />
        
      </div>
      {handleResponse()}
      </AppBar>
        </div>
    )
}
