import React, { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { Typography, Container, Card, CardContent , CardActionArea, CardMedia} from '@material-ui/core';
import useStyles from './styles';
import ReactCardFlip from 'react-card-flip';
import facultyListIcon from '../../images/facultyList.jfif';


const initialState = {email: ''};

const SignUp = () =>{
    const [form, setForm] = useState(initialState);
    const [isFlip, setIsFlip] = useState(false);
    const classes = useStyles();    
    const dispatch = useDispatch();


    // const handleSubmit = () => {
    //     e.preventDefault();
    
    //     if (isSignup) {
    //       dispatch(registerCollege(form, history));
    //     } else {
    //       dispatch(facultySignin(form, history));
    //     }
    //   };


    const fliphandler = () =>{
        // handleSubmit()
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
            <Container component="main" maxWidth="xs">

            </Container>
            </div>
        </ReactCardFlip>
    );
}
export default SignUp;