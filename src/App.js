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
    <Container maxWidth="xl">
      <Navbar />
      <Switch>
      {
        userType?.authData === null ? 
        <Route path="/" exact component={() => <Redirect to="/auth" />} />:(
         userType?.authData?.result?.email==="visheshjindal368@gmail.com" 
          ?
         <Route path="/" exact component={() => <Redirect to="/faculty" />} />
          : 
        <Route path="/" exact component={() => <Redirect to="/student" />} />)
      }
     
      
         <Route path="/student" exact component={Student} />
         <Route path="/faculty" exact component={Faculty} />
        <Route path="/auth" exact component={Auth} />
      </Switch>
    </Container>
  </BrowserRouter>
);
}

export default App;
