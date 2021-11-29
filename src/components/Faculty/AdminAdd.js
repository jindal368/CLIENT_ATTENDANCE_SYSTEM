import React, { useState ,useRef} from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import { Button, Paper, Grid, Typography, Container, Tabs, Tab , AppBar, Card, CardContent , CardActionArea, CardMedia} from '@material-ui/core';
import useStyles from './styles';
import Input from '../Auth/Input';
import ReactCardFlip from 'react-card-flip';
import adminIcon from '../../images/admin.jpg';


// const initialState = {email: ''};

const AdminAdd = () =>{
    const [form, setForm] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState("add");
    const [isFlip, setIsFlip] = useState(false);
    const formRef = useRef();
    const classes = useStyles();    
    const dispatch = useDispatch();


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    
    //     if (isSignup) {
    //       dispatch(registerCollege(form, history));
    //     } else {
    //       dispatch(facultySignin(form, history));
    //     }
    //   };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleChange1 = (event, newValue) => {
        formRef.current.reset();
        setForm({});
      setValue(newValue);
    };
    const fliphandler = () =>{
        setForm({});
        setIsFlip(!isFlip);
    }


    return(
        <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal">
            <Card className={classes.root} onClick={fliphandler} >
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={adminIcon}
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom style={{fontSize:'30px'}} component="h2">
                        Admin Add or Remove
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Click to Add or Remove a faculty as Admin
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <div>
            {/* <Container component="main" maxWidth="xs"> */}
                <AppBar position="static" style={{width:'360px'}}>
                    <Tabs value={value} onChange={handleChange1} aria-label="simple tabs example">
                        <Tab label="Add" value={'add'} className={classes.head} />
                        <Tab label="Remove" value={'remove'} className={classes.head} />
                    </Tabs>
                </AppBar>
            {/* </Container> */}
            {value=='add'?
            // <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3} >
                <BusinessRoundedIcon color='primary' style={{fontSize:'60px'}} />
                <Typography component="h1" variant="h5">Add as Admin</Typography>
                <form className={classes.form} ref={formRef}>
                    <Grid container spacing={2}>
                    <Input name="email" label="Email" handleChange={handleChange} type="email" autoFocus/> 
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Make Admin
                    </Button>
                    <Button fullWidth type='reset' variant="contained" color="Secondary" className={classes.submit} onClick={fliphandler} style={{marginTop:'0px'}} >
                        Cancel
                    </Button>
                </form>
                </Paper>
            // </Container>
            :
            // <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <BusinessRoundedIcon color='primary' style={{fontSize:'60px'}} />
                <Typography component="h1" variant="h5">Remove as Admin</Typography>
                <form className={classes.form} ref={formRef} >
                <Grid container spacing={1}>
                    <Input name="email" label="Email" handleChange={handleChange} type='email' autoFocus/>
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    Remove Admin
                </Button>
                <Button fullWidth type='reset' variant="contained" color="Secondary" className={classes.submit} onClick={fliphandler} style={{marginTop:'0px'}} >
                        Cancel
                </Button>            
                </form>
            </Paper>
            // </Container>
            }
            </div>
        </ReactCardFlip>
    );
}
export default AdminAdd;