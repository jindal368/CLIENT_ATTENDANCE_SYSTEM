/** @format */

import React from "react";
import { Container } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import Student from "./components/Student/Student";
import Faculty from "./components/Faculty/Faculty";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import College from "./components/component/College";
import AdminSignup from "./components/component/AdminSignup";

const App = () => {
  const collegeId = useSelector((state) => state.attendance.collegeId);
  const adminSignup = useSelector((state) => state.attendance.adminSignup);
  const designation = useSelector((state) => state.attendance.designation);
  let history = useHistory();
  var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  {
    collegeId === null
      ? history.push("/")
      : adminSignup
      ? history.push("/adminSignup")
      : designation === ""
      ? history.push("/auth")
      : designation === "faculty"
      ? history.push("/faculty")
      : history.push("/student");
  }
  return (
    <Container maxWidth='xl' style={{ padding: "0", width: "95%" }}>
      <Navbar />
      <Switch>
        <Route path='/student' exact component={Student} />
        <Route path='/faculty' exact component={Faculty} />
        <Route path='/auth' exact component={Auth} />
        <Route path='/adminSignup' exact component={AdminSignup} />
        <Route path='/' exact component={College} />
      </Switch>
    </Container>
  );
};

export default App;
