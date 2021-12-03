import React, { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { Button, Paper, Typography, AppBar, Card, CardContent , CardActionArea, CardMedia} from '@material-ui/core';
import useStyles from './styles';
import ReactCardFlip from 'react-card-flip';
import qrImage from '../../images/qrcode.png';
import QrReader from 'react-qr-scanner'
import {updateStudent} from '../../actions/attendance'
  

const QrCodeScanner = () =>{
    const [scanned , setScanned] = useState(0);
    const [isFlip, setIsFlip] = useState(false);
    const classes = useStyles();    
    const dispatch  = useDispatch();
    const user = useSelector((state)=>state.auth)
    const [id , setId] = useState('');
    const data = {
      _id : id,
      data : user?.authData?.result
    }

    var handleResponse = (res) =>{
        console.log("response : ",res)
        const data = {
          _id : res?.text,
          data : user?.authData?.result
        }
        // return(
        // res?.text ?
        // <div>
        //     <div style={{color:'green'}}>
        //     {console.log("Data After sacn : ",data)}
        //     { dispatch(updateStudent(data))
        //     .then(() =>{
        //         setScanned(1)
        //         fliphandler()
        //     })
        //     .catch((err) =>{
        //         setScanned(2);
        //         fliphandler()
        //     })}
        //     </div>
        //     </div>
        //     :
        //     <div/>
        // )
    }
     


    const fliphandler = () =>{
        setIsFlip(!isFlip);
    }


    return(
        <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal">
            <Card className={classes.root} onClick={fliphandler} >
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={qrImage}
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h4" component="h2">
                        Open Scanner
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Click to Open a Scanner for Attendance
                    </Typography>
                    </CardContent>
                </CardActionArea>
                {scanned==1?
                    <Typography variant="body2" component="p" style={{backgroundColor:'rgb(236,250,214',padding:'5px'}}>
                        Successfully scanned..
                    </Typography>
                    :(scanned==2? <Typography variant="body2" component="p" style={{backgroundColor:'rgb(255,200,200',padding:'5px'}}>
                        Scanned Failed..
                    </Typography>:<></>)
                }
            </Card>
            <div>           
                <Button fullWidth variant="contained" color="secondary" onClick={fliphandler} >
                    Cancel
                </Button>
                <Paper className={classes.paper} elevation={3} style={{padding:'0',marginRight:0}}>
                    
                    {isFlip?<QrReader
                        delay={10000}
                        style={{width: 'inherit'}}
                        onError={() => setScanned(2)}
                        onScan={(res) => handleResponse(res)}
                        />:null}
                        
                </Paper>
            </div>
        </ReactCardFlip>
    );
}
export default QrCodeScanner;