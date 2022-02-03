/** @format */

import {
  POST_ATTENDANCE,
  GET_ATTENDANCE,
  GET_DETAIL_TO_ADMIN,
  FETCH_LIST_TO_FACULTY,
  UPDATE_STUDENT,
  EXPIRE_SUBJECT,
  ADD_COLLEGE,
  ADD_INITIAL_ADMIN,
  GET_COLLEGE_DATA,
  FETCH_ALL_COLLEGE,
  SIGNIN_FACULTY,
  SIGNUP_FACULTY,
  GET_FACULTY,
  REMOVE_FACULTY,
  MAKE_ADMIN,
  REMOVE_ADMIN,
  SIGNIN_STUDENT,
  SIGNUP_STUDENT,
  GET_DATA_TO_STUDENT,
  LOGOUT,
  RESET_STUDENT,
  SUBJECT_LIST,
  UPDATE_TIME,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const postattendancedata =
  (formData, collegeId, latitude, longitude) => async (dispatch) => {
    try {
      const { data, status } = await api.postAttendanceData(
        formData,
        collegeId,
        latitude,
        longitude
      );

      dispatch({ type: POST_ATTENDANCE, data });
      return status;
    } catch (error) {
      console.log(error);
    }
  };

export const getAttendanceById = (attendanceId) => async (dispatch) => {
  try {
    const { data, status } = await api.getAttendanceById(attendanceId);
    console.log("Data in actions : ", data);
    dispatch({ type: GET_ATTENDANCE, data });
    return status;
  } catch (error) {
    console.log(error);
  }
};
export const getDetailToAdmin =
  (course, section, semester, year, subject) => async (dispatch) => {
    try {
      const { data, status } = await api.getDetailToAdmin(
        course,
        section,
        semester,
        year,
        subject
      );
      console.log("Data in actions : ", data);
      dispatch({ type: GET_DETAIL_TO_ADMIN, data });
      return status;
    } catch (error) {
      console.log(error);
    }
  };
export const fetchAllListToFaculty = (email) => async (dispatch) => {
  try {
    const { data, status } = await api.fetchAllListToFaculty(email);
    console.log("Data in actions : ", data);
    dispatch({ type: FETCH_LIST_TO_FACULTY, data });
    return status;
  } catch (error) {
    console.log(error);
  }
};

export const updateStudentData = (listingId, email) => async (dispatch) => {
  try {
    const { data, status } = await api.updateStudentData(listingId, email);
    console.log("Data in actions : ", data);
    dispatch({ type: UPDATE_STUDENT, data });
    return status;
  } catch (error) {
    console.log(error);
  }
};
export const expireRetrieveSubject = (listingId) => async (dispatch) => {
  try {
    const { data, status } = await api.expireRetrieveSubject(listingId);
    console.log("Data in actions : ", data);
    dispatch({ type: EXPIRE_SUBJECT, data });
    return status;
  } catch (error) {
    console.log(error);
  }
};
export const updateTempTime = (listingId) => async (dispatch) => {
  try {
    const { data, status } = await api.updateTempTime(listingId);
    console.log("Data in actions : ", data);
    dispatch({ type: UPDATE_TIME, data });
    return status;
  } catch (error) {
    console.log(error);
  }
};
export const resetStudent = () => async (dispatch) => {
  try {
    dispatch({ type: RESET_STUDENT });
    console.log("Dispatch : reset :");
  } catch (error) {
    console.log(error);
  }
};
// export const updateStudent = (studentData) => async (dispatch) => {
//   try {
//     const { data } = await api.updateStudentData(studentData);
//     console.log("Data in actions : ", data);
//     dispatch({ type: UPDATE_STUDENT, data });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const addCollege = (formData) => async (dispatch) => {
  try {
    const { data, status } = await api.addCollege(formData);

    dispatch({ type: ADD_COLLEGE, data });
    return status;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllCollege = () => async (dispatch) => {
  try {
    const { data, status } = await api.fetchAllCollege();
    console.log("Data in actions : ", data);
    dispatch({ type: FETCH_ALL_COLLEGE, data });
    return status;
  } catch (error) {
    return error;
  }
};

export const addInitialAdmin = (formedData, collegeId) => async (dispatch) => {
  try {
    const { data, status } = await api.addInitialAdmin(formedData, collegeId);
    console.log("Data in actions : ", data);
    dispatch({ type: ADD_INITIAL_ADMIN, data });
    return status;
  } catch (error) {
    return error;
  }
};

// FACULTY ACTION

export const signInFaculty = (formedData, collegeId) => async (dispatch) => {
  try {
    const { data, status } = await api.signInFaculty(formedData, collegeId);
    console.log("Data in actions : ", data);
    if (status === 200) dispatch({ type: SIGNIN_FACULTY, data });
    return { data, status };
  } catch (error) {
    return error;
    console.log(error);
  }
};
export const signUpFaculty = (formedData, collegeId) => async () => {
  try {
    const { data, status } = await api.signUpFaculty(formedData, collegeId);
    console.log("Data in actions : ", data);
    return status;
  } catch (error) {
    console.log(error);
  }
};
export const removeFaculty = (email) => async () => {
  try {
    const { data, status } = await api.removeFaculty(email);
    console.log("Data in actions : ", data);
    return status;
  } catch (error) {
    console.log(error);
  }
};
export const getFaculty = (collegeId) => async (dispatch) => {
  try {
    const { data, status } = await api.getFaculty(collegeId);
    console.log("Data in actions : ", data);

    dispatch({ type: GET_FACULTY, data });
    return status;
  } catch (error) {
    console.log(error);
  }
};
export const makeAdmin = (email) => async () => {
  try {
    const { data, status } = await api.makeAdmin(email);
    console.log("Data in actions : ", data);
    return status;
  } catch (error) {
    console.log(error);
  }
};
export const removeAdmin = (email) => async () => {
  try {
    const { data, status } = await api.removeAdmin(email);
    console.log("Data in actions : ", data);
    return status;
  } catch (error) {
    console.log(error);
  }
};
// subject

export const subjectCreate = (formData) => async () => {
  try {
    const { data, status } = await api.subjectCreate(formData);
    console.log("Data in actions : ", data);
    return status;
  } catch (error) {
    console.log(error);
  }
};
export const getSubjects = (formData) => async (dispatch) => {
  try {
    const { data, status } = await api.getSubjects(formData);
    console.log("Data in actions : ", data);

    dispatch({ type: SUBJECT_LIST, data });
    return status;
  } catch (error) {
    console.log(error);
  }
};
