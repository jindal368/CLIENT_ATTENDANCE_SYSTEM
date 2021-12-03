import React, { useState, useEffect} from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { Typography, Card, CardContent , Avatar,CardActionArea, CardMedia, Paper, AppBar, ListItem, ListItemText, List} from '@material-ui/core';
import useStyles from './styles';
import ReactCardFlip from 'react-card-flip';
import facultyListIcon from '../../images/facultyList.jfif';
import {fetchAllCollege} from '../../actions/attendance'


const FacultyList = () =>{
    const [isFlip, setIsFlip] = useState(false);
    const classes = useStyles();   
    // const [list, setList] = useState([
    // {
    //     "isActive": true,
    //     "isAdmin": true,
    //     "_id": "61a0c6188193db26933faf9f",
    //     "email": "vishesh368@gmail.com",
    //     "password": "$2a$12$UxGyuWdXYiYXnrZuQUblpu.D.zzBQzvrKq95ran8Qlo5T5WxPVbGW",
    //     "name": "Vishesh jindal",
    //     "mobile": 9833434982,
    //     "address": "Jani khurd",
    //     "department": "CSE",
    //     "collegeId": "61a0c51efb2a5123cfd3feb1",
    //     "__v": 0
    // },
    // {
    //     "isActive": false,
    //     "isAdmin": false,
    //     "_id": "61a0c869cfd2c627da0d9bcd",
    //     "email": "vipul@gmail.com",
    //     "password": "$2a$12$Yi0r4WPQus5LhPVyXgnk3OyyRSN4fMmRu3rGFmJYa3zfAchqfBQhG",
    //     "name": "vipul sharma",
    //     "mobile": 9833434982,
    //     "address": "xyz",
    //     "collegeId": "61a0c51efb2a5123cfd3feb1",
    //     "department": "CSE",
    //     "__v": 0
    // },
    // {
    //     "isActive": true,
    //     "isAdmin": false,
    //     "_id": "61a0db2d18ffbe2fc5389d1a",
    //     "email": "suhail@gmail.com",
    //     "password": "$2a$12$IJKOS55foOVqWazX3grsn.Vx9XfYPdzOhYOY6YWjhmfpRRI2w1CHy",
    //     "name": "suhail Khan",
    //     "mobile": 9833434982,
    //     "address": "xyz",
    //     "collegeId": "61a0c51efb2a5123cfd3feb1",
    //     "department": "CSE",
    //     "__v": 0
    // },
    // {
    //     "isActive": true,
    //     "isAdmin": false,
    //     "_id": "61a0dc728708933083476416",
    //     "email": "daniels@gmail.com",
    //     "password": "$2a$12$59lxs13I8YIb/DIXS0/lK.zyNlofDphKemgEAVB3ouMt4EPZdcdxu",
    //     "name": "suhail Khan",
    //     "mobile": 9833434982,
    //     "address": "xyz",
    //     "collegeId": "61a0c51efb2a5123cfd3feb1",
    //     "department": "CSE",
    //     "__v": 0
    // },
    // {
    //     "isActive": true,
    //     "isAdmin": true,
    //     "_id": "61a0c6188193db26933faf9",
    //     "email": "vishesh368@gmail.com",
    //     "password": "$2a$12$UxGyuWdXYiYXnrZuQUblpu.D.zzBQzvrKq95ran8Qlo5T5WxPVbGW",
    //     "name": "Vishesh jindal",
    //     "mobile": 9833434982,
    //     "address": "Jani khurd",
    //     "department": "CSE",
    //     "collegeId": "61a0c51efb2a5123cfd3feb1",
    //     "__v": 0
    // },
    // {
    //     "isActive": false,
    //     "isAdmin": false,
    //     "_id": "61a0c869cfd2c627da0d9bc",
    //     "email": "vipul@gmail.com",
    //     "password": "$2a$12$Yi0r4WPQus5LhPVyXgnk3OyyRSN4fMmRu3rGFmJYa3zfAchqfBQhG",
    //     "name": "vipul sharma",
    //     "mobile": 9833434982,
    //     "address": "xyz",
    //     "collegeId": "61a0c51efb2a5123cfd3feb1",
    //     "department": "CSE",
    //     "__v": 0
    // },
    // {
    //     "isActive": true,
    //     "isAdmin": false,
    //     "_id": "61a0db2d18ffbe2fc5389d1",
    //     "email": "suhail@gmail.com",
    //     "password": "$2a$12$IJKOS55foOVqWazX3grsn.Vx9XfYPdzOhYOY6YWjhmfpRRI2w1CHy",
    //     "name": "suhail Khan",
    //     "mobile": 9833434982,
    //     "address": "xyz",
    //     "collegeId": "61a0c51efb2a5123cfd3feb1",
    //     "department": "CSE",
    //     "__v": 0
    // },
    // {
    //     "isActive": true,
    //     "isAdmin": false,
    //     "_id": "61a0dc72870893308347641",
    //     "email": "daniels@gmail.com",
    //     "password": "$2a$12$59lxs13I8YIb/DIXS0/lK.zyNlofDphKemgEAVB3ouMt4EPZdcdxu",
    //     "name": "suhail Khan",
    //     "mobile": 9833434982,
    //     "address": "xyz",
    //     "collegeId": "61a0c51efb2a5123cfd3feb1",
    //     "department": "CSE",
    //     "__v": 0
    // },{
    //     "isActive": true,
    //     "isAdmin": true,
    //     "_id": "61a0c6188193db26933faf",
    //     "email": "vishesh368@gmail.com",
    //     "password": "$2a$12$UxGyuWdXYiYXnrZuQUblpu.D.zzBQzvrKq95ran8Qlo5T5WxPVbGW",
    //     "name": "Vishesh jindal",
    //     "mobile": 9833434982,
    //     "address": "Jani khurd",
    //     "department": "CSE",
    //     "collegeId": "61a0c51efb2a5123cfd3feb1",
    //     "__v": 0
    // },
    // {
    //     "isActive": false,
    //     "isAdmin": false,
    //     "_id": "61a0c869cfd2c627da0d9b",
    //     "email": "vipul@gmail.com",
    //     "password": "$2a$12$Yi0r4WPQus5LhPVyXgnk3OyyRSN4fMmRu3rGFmJYa3zfAchqfBQhG",
    //     "name": "vipul sharma",
    //     "mobile": 9833434982,
    //     "address": "xyz",
    //     "collegeId": "61a0c51efb2a5123cfd3feb1",
    //     "department": "CSE",
    //     "__v": 0
    // },
    // {
    //     "isActive": true,
    //     "isAdmin": false,
    //     "_id": "61a0db2d18ffbe2fc5389d",
    //     "email": "suhail@gmail.com",
    //     "password": "$2a$12$IJKOS55foOVqWazX3grsn.Vx9XfYPdzOhYOY6YWjhmfpRRI2w1CHy",
    //     "name": "suhail Khan",
    //     "mobile": 9833434982,
    //     "address": "xyz",
    //     "collegeId": "61a0c51efb2a5123cfd3feb1",
    //     "department": "CSE",
    //     "__v": 0
    // },
    // {
    //     "isActive": true,
    //     "isAdmin": false,
    //     "_id": "61a0dc7287089330834764",
    //     "email": "daniels@gmail.com",
    //     "password": "$2a$12$59lxs13I8YIb/DIXS0/lK.zyNlofDphKemgEAVB3ouMt4EPZdcdxu",
    //     "name": "suhail Khan",
    //     "mobile": 9833434982,
    //     "address": "xyz",
    //     "collegeId": "61a0c51efb2a5123cfd3feb1",
    //     "department": "CSE",
    //     "__v": 0
    // }]); 
    const dispatch = useDispatch();
    const facultyList = useSelector((state)=>state.attendance.facultylist) 

    // useEffect(() => {
    //     dispatch(fetchAllCollege());
    //   },[])

    // const handleSubmit = () => {
    //     e.preventDefault();
    
    //     if (isSignup) {
    //       dispatch(registerCollege(form, history));
    //     } else {
    //       dispatch(facultySignin(form, history));
    //     }
    //   };


    const fliphandler = () =>{
        setIsFlip(!isFlip);
    }


    return(
        <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal">
            <Card className={classes.root} onClick={fliphandler}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={facultyListIcon}
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h4" component="h2">
                        List of Faculty
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Click to get the list of Faculty
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <div>
                {isFlip?
                <Paper className={classes.paper} elevation={3} style={{padding:'0'}}>
                    <AppBar position="static" style={{padding:10}} >
                        <Typography component="h2" variant="h4" onClick={fliphandler}><center>FacultyList</center></Typography>
                    </AppBar>
                        <List component="nav" aria-label="main mailbox folders" className={classes.list}>
                            {facultyList?.map(faculty =>{
                                return (<ListItem key={faculty._id}>
                                    <Avatar className={classes.purple} alt={faculty.name} src={faculty.name}>{faculty.name.charAt(0).toUpperCase()}</Avatar>
                                    <ListItemText primary={faculty.name.toUpperCase()} />
                                </ListItem>);
                            })}
                        </List>
                </Paper>:null}
            </div>
        </ReactCardFlip>
    );
}
export default FacultyList;