import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Student from './components/Student/Student';
import Faculty from './components/Faculty/Faculty'
import {useSelector} from 'react-redux'
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';


const App = () => {
  const userType = useSelector((state)=> state.auth);
  console.log("UserType : ",userType)
  var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  return (
  <BrowserRouter>
    <Container maxWidth="xl" style={{padding:'0',width:'95%'}}>
      
      <Navbar />
      <Switch>
      {
        userType?.authData === null ? 
        <Route path="/" exact component={() => <Redirect to="/auth" />} />:(
         userType?.authData?.result?.email==="vipul.sharma.cs.2018@miet.ac.in" 
          ?
         <Route path="/" exact component={() => <Redirect to="/faculty" />} />
          : 
        <Route path="/" exact component={() => <Redirect to="/student" />} />)
      }
     
        <Route path="/auth" exact component={Auth} />
     {/* <div className={classes.back}> */}
         <Route path="/student" exact component={Student} />
         <Route path="/faculty" exact component={Faculty} />
      {/* </div> */}
      </Switch>
    </Container>
  </BrowserRouter>
);
}

export default App;
