import React, { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import {Button, Paper, Grid, Typography, Container, Tabs, Tab , AppBar,MenuItem, FormControl, InputLabel, Select} from '@material-ui/core';
import useStyles from './styles';
import Input from '../Auth/Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const College = () =>{
    const [form, setForm] = useState(initialState);
    const [value, setValue] = useState("college");
    const [collegeSelect,setCollegeSelect] = useState('');
    const [detail,setDetail] = useState([]);
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
      setValue(newValue);
      setForm(initialState);
    };


    return(
      <div>
        <Container component="main" maxWidth="xs">
            <AppBar position="static" style={{marginTop:'20px'}}>
                <Tabs value={value} onChange={handleChange1} aria-label="simple tabs example">
                  <Tab label="Register" value={'register'} className={classes.head} />
                  <Tab label="College" value={'college'} className={classes.head} />
                </Tabs>
            </AppBar>
        </Container>
      {value=='register'?
          <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={3}>
            <BusinessRoundedIcon color='primary' style={{fontSize:'60px'}} />
            <Typography component="h1" variant="h5"> Register College</Typography>
            <form className={classes.form} >
              <Grid container spacing={2}>
                <Input name="name" label="College Name" handleChange={handleChange} autoFocus/>
                <Input name="university" label="University" handleChange={handleChange} type="text" />
                <Input name="collegeNo" label="College Code" handleChange={handleChange} half />
                <Input name="AdminMobile" label="Mobile No." handleChange={handleChange} half />
                <Input name="address" label="Address" handleChange={handleChange} type="text" />
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Register
              </Button>
            </form>
          </Paper>
        </Container>
      :
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <BusinessRoundedIcon color='primary' style={{fontSize:'60px'}} />
          <Typography component="h1" variant="h5"> Select Your College</Typography>
          <FormControl variant="outlined" style={{width:'80%',margin:'10px'}}>
            <InputLabel id="demo-simple-select-outlined-label">College</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined"
              value={collegeSelect}
              onChange={(e) => setCollegeSelect(e.target.value)}
              label="Course"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {detail?.course?.map((data,index)=>{
                return <MenuItem value={data} key={data+index}>{data}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Submit
          </Button>
        </Paper>
    </Container>
       }
    </div>
    );
}
export default College;