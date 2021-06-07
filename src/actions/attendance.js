import { POST_ATTENDANCE , GET_STUDENT ,UPDATE_STUDENT } from '../constants/actionTypes';
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