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
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const postattendancedata =
  (formData, collegeId, latitude, longitude) => async (dispatch) => {
    try {
      const { data } = await api.postAttendanceData(
        formData,
        collegeId,
        latitude,
        longitude
      );

      dispatch({ type: POST_ATTENDANCE, data });
    } catch (error) {
      console.log(error);
    }
  };

export const getAttendanceById = (attendanceId) => async (dispatch) => {
  try {
    const { data } = await api.getAttendanceById(attendanceId);
    console.log("Data in actions : ", data);
    dispatch({ type: GET_ATTENDANCE, data });
  } catch (error) {
    console.log(error);
  }
};
export const getDetailToAdmin =
  (course, section, semester, year, subject) => async (dispatch) => {
    try {
      const { data } = await api.getDetailToAdmin(
        course,
        section,
        semester,
        year,
        subject
      );
      console.log("Data in actions : ", data);
      dispatch({ type: GET_DETAIL_TO_ADMIN, data });
    } catch (error) {
      console.log(error);
    }
  };
export const fetchAllListToFaculty = (email) => async (dispatch) => {
  try {
    const { data } = await api.fetchAllListToFaculty(email);
    console.log("Data in actions : ", data);
    dispatch({ type: FETCH_LIST_TO_FACULTY, data });
  } catch (error) {
    console.log(error);
  }
};

export const updateStudentData = (listingId, email) => async (dispatch) => {
  try {
    const { data } = await api.updateStudentData(listingId, email);
    console.log("Data in actions : ", data);
    dispatch({ type: UPDATE_STUDENT, data });
  } catch (error) {
    console.log(error);
  }
};
export const expireRetrieveSubject = (listingId) => async (dispatch) => {
  try {
    const { data } = await api.expireRetrieveSubject(listingId);
    console.log("Data in actions : ", data);
    dispatch({ type: EXPIRE_SUBJECT, data });
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
    const { data } = await api.addCollege(formData);

    dispatch({ type: ADD_COLLEGE, data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllCollege = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllCollege();
    console.log("Data in actions : ", data);
    dispatch({ type: FETCH_ALL_COLLEGE, data });
  } catch (error) {
    console.log(error);
  }
};

export const addInitialAdmin = (formedData, collegeId) => async (dispatch) => {
  try {
    const { data } = await api.addInitialAdmin(formedData, collegeId);
    console.log("Data in actions : ", data);
    dispatch({ type: ADD_INITIAL_ADMIN, data });
  } catch (error) {
    console.log(error);
  }
};

// FACULTY ACTION

export const signInFaculty = (formedData, collegeId) => async (dispatch) => {
  try {
    const { data } = await api.signInFaculty(formedData, collegeId);
    console.log("Data in actions : ", data);
    dispatch({ type: SIGNIN_FACULTY, data });
  } catch (error) {
    console.log(error);
  }
};
export const signUpFaculty = (formedData, collegeId) => async () => {
  try {
    const { data } = await api.signUpFaculty(formedData, collegeId);
    console.log("Data in actions : ", data);
  } catch (error) {
    console.log(error);
  }
};
export const removeFaculty = (email) => async () => {
  try {
    const { data } = await api.removeFaculty(email);
    console.log("Data in actions : ", data);
  } catch (error) {
    console.log(error);
  }
};
export const getFaculty = (collegeId) => async (dispatch) => {
  try {
    const { data } = await api.getFaculty(collegeId);
    console.log("Data in actions : ", data);

    dispatch({ type: GET_FACULTY, data });
  } catch (error) {
    console.log(error);
  }
};
export const makeAdmin = (email) => async () => {
  try {
    const { data } = await api.makeAdmin(email);
    console.log("Data in actions : ", data);
  } catch (error) {
    console.log(error);
  }
};
export const removeAdmin = (email) => async () => {
  try {
    const { data } = await api.removeAdmin(email);
    console.log("Data in actions : ", data);
  } catch (error) {
    console.log(error);
  }
};
// subject

export const subjectCreate = (formData) => async () => {
  try {
    const { data } = await api.subjectCreate(formData);
    console.log("Data in actions : ", data);
  } catch (error) {
    console.log(error);
  }
};
export const getSubjects = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getSubjects(formData);
    console.log("Data in actions : ", data);

    dispatch({ type: SUBJECT_LIST, data });
  } catch (error) {
    console.log(error);
  }
};
