import { POST_ATTENDANCE , GET_STUDENT ,UPDATE_STUDENT ,RESET_STUDENT,GET_ATTENDANCE} from '../constants/actionTypes';
import * as api from '../api/index.js';


export const postattendancedata = (formData) => async (dispatch) => {
    try {
      const { data } = await api.postAttendanceData(formData);
  
      dispatch({ type: POST_ATTENDANCE, data });
  
     
    } catch (error) {
      console.log(error);
    }
  };

  export const getStudentData = (email) => async (dispatch) => {
    try {
      const { data } = await api.getStudentData(email);
       console.log("Data in actions : ",data)
      dispatch({ type: GET_STUDENT, data });
  
     
    } catch (error) {
      console.log(error);
    }
  };

  export const resetStudent = () => async (dispatch) => {
    try {
      
      dispatch({ type: RESET_STUDENT });
       console.log("Dispatch : reset :")
     
    } catch (error) {
      console.log(error);
    }
  };
  export const updateStudent = (studentData) => async (dispatch) => {
    try {
      const { data } = await api.updateStudentData(studentData);
       console.log("Data in actions : ",data)
      dispatch({ type: UPDATE_STUDENT, data });
  
     
    } catch (error) {
      console.log(error);
    }
  };
  export const getAttendanceData = (email) => async (dispatch) => {
    try {
      const { data } = await api.getAttendanceData(email);
       console.log("Data in actions : ",data)
      dispatch({ type: GET_ATTENDANCE, data });
  
     
    } catch (error) {
      console.log(error);
    }
  };