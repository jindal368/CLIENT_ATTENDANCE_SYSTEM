/** @format */

import axios from "axios";
import env from "react-dotenv";
const API = axios.create({ baseURL: env.DOMAIN_ADDRESS });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

//Attendance API

export const postAttendanceData = (formData, collegeId, latitude, longitude) =>
  API.post(
    `/attendance/postattendancedata?id=${collegeId}&latitude=${latitude}&longitude=${longitude}`,
    formData
  );

export const getAttendanceById = (attendanceId) =>
  API.get(`/attendance/getattendancebyid?id=${attendanceId}`);

export const getDetailToAdmin = (course, section, semester, year, subject) =>
  API.get(
    `/attendance/getdetailtoadmin?course=${course}&semester=${semester}&section=${section}&year=${year}&subject=${subject}`
  );

export const fetchAllListToFaculty = (email) =>
  API.get(`/attendance/fetchalllistbyfaculty?email=${email}`);

export const updateStudentData = (listingId, studentEmail) =>
  API.patch(`/attendance/updatestudent?_id=${listingId}&email=${studentEmail}`);

export const expireRetrieveSubject = (listingId) =>
  API.put(`/attendance/expiresubject?id=${listingId}`);
export const updateTempTime = (listingId) =>
  API.put(`/attendance/updatetemptime?id=${listingId}`);

// college API

export const addCollege = (formData) =>
  API.post(`/college/addcollege`, formData);
export const addInitialAdmin = (formData, collegeId) =>
  API.post(`/college/addinitialadmin?id=${collegeId}`, formData);

export const getCollegeData = (id) => API.get(`/college/getdata?id=${id}`);

export const fetchAllCollege = () => API.get(`/college/fetchcollege`);

// Faculty API

export const signInFaculty = (formData, collegeId) =>
  API.post(`/faculty/signin?id=${collegeId}`, formData);
export const signUpFaculty = (formData, collegeId) =>
  API.post(`/faculty/signup?id=${collegeId}`, formData);
export const getFaculty = (collegeId) =>
  API.get(`/faculty/getfaculty?collegeId=${collegeId}`);

export const removeFaculty = (email) =>
  API.put(`/faculty/removefaculty?email=${email}`);

export const makeAdmin = (email) =>
  API.put(`/faculty/makeAdmin?email=${email}`);

export const removeAdmin = (email) =>
  API.put(`/faculty/removeadmin?email=${email}`);

// Student API

export const signIn = (formData, latitude, longitude) =>
  API.post(
    `/student/signin?latitude=${latitude}&longitude=${longitude}`,
    formData
  );
export const signUp = (formData, collegeId, latitude, longitude) =>
  API.post(
    `/student/signup?id=${collegeId}&latitude=${latitude}&longitude=${longitude}`,
    formData
  );

export const verificationOnEmail = (email, token, type) =>
  API.post(
    `/student/sendverificationonemail?email=${email}&token=${token}&type=${type}`
  );

export const getDataToStudent = () => API.get(`/student/getdatatostudent`);

export const detail = (formData) => API.post("/subject/detail", formData);

//subject

export const subjectCreate = (formData) =>
  API.post(`/subject/create`, formData);

export const getSubjects = (formData) => API.put(`/subject/list`, formData);
