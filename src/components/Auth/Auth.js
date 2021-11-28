import React, { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container, Tabs, Tab ,AppBar} from '@material-ui/core';
import { useHistory ,Redirect} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import env from 'react-dotenv'
import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [value, setValue] = React.useState("student");
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
   const user = useSelector((state)=> state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  
  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };



  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  
  const handleChange1 = (event, newValue) => {
    setValue(newValue);
    setForm(initialState);
  };



  return (
    user.authData!==null ?
    
    <Redirect to="/student" />
     :
     <div>
          <Container component="main" maxWidth="xs">
            <AppBar position="static" style={{marginTop:'20px'}}>
                <Tabs value={value} onChange={handleChange1} aria-label="simple tabs example">
                  <Tab label="Faculty" value={'faculty'} className={classes.head} />
                  <Tab label="Student" value={'student'} className={classes.head} />
                </Tabs>
              </AppBar>
          </Container>

          {value=='student'?
          <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  { isSignup && (
                  <>
                    <Input name="firstName" label="Name" handleChange={handleChange} half autoFocus />
                    <Input name="lastName" label="Name" handleChange={handleChange} half />
                  </>
                  )}
                  <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                  <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                  { isSignup && (
                    <>
                  <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>
                  <Input name="rollNo" label="Roll No" handleChange={handleChange} type="number" half/>
                  <Input name="mobile" label="Mobile No." handleChange={handleChange} half/>
                  <Input name="course" label="Course" handleChange={handleChange} />
                  <Input name="year" label="Year" handleChange={handleChange}half/>
                  <Input name="section" label="Section" handleChange={handleChange}half/>
                  </>
                  )}

                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                  { isSignup ? 'Sign Up' : 'Sign In' }
                </Button>
                <GoogleLogin
                  clientId = {env.GOOGLE_CLIENT_ID}
                  render={(renderProps) => (
                    <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                      Google Sign In
                    </Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleError}
                  cookiePolicy="single_host_origin"
                />
                <Grid container justify="center">
                  <Grid item>
                    <Button onClick={switchMode}>
                      { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Container>
          :
          <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">Sign in</Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Input name="email" label="Email Address" handleChange={handleChange} type="email" autoFocus/>
                  <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                  Sign In
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
                {/* <Grid container justify="center">
                  <Grid item>
                    <Button onClick={switchMode}>
                      { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                    </Button>
                  </Grid>
                </Grid> */}
              </form>
            </Paper>
          </Container>}
    </div>
  );
};

export default SignUp;
