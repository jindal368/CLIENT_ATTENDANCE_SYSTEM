import React, { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import {Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import useStyles from './styles';
import Input from '../Auth/Input';
import {useHistory} from 'react-router-dom';
import {addInitialAdmin} from '../../actions/attendance'

const AdminSignup = () =>{
    const [form, setForm] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const collegeId = useSelector((state)=>state.attendance.collegeId.collegeSchema._id)
    const classes = useStyles();    
    const dispatch = useDispatch();
    const history = useHistory();

    console.log('Admin Signup Componenet');
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addInitialAdmin(form, collegeId, history));
      };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleShowPassword = () => setShowPassword(!showPassword);


    return(
        <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3} style={{marginTop:'20px'}}>
        <BusinessRoundedIcon color='primary' style={{fontSize:'60px'}} />
        <Typography component="h1" variant="h5"> Admin SignUp</Typography>
        <form className={classes.form} onSubmit={(e) =>handleSubmit(e)} >
          <Grid container spacing={2}>
            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
            <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
            <Input name="email" label="Email" handleChange={handleChange} type="email" />
            <Input name="mobile" label="Mobile No." handleChange={handleChange} half />
            <Input name="department" label="Department" handleChange={handleChange} half />
            <Input name="address" label="Address" value={true} handleChange={handleChange} />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> 
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Register
          </Button>
          {/* <GoogleLogin
            clientId = {env.GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          /> */}
          
        </form>
      </Paper>
    </Container>
    );
}
export default AdminSignup;