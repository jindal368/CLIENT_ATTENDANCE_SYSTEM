import axios from 'axios';
import env from 'react-dotenv'
const API = axios.create({ baseURL: env.DOMAIN_ADDRESS });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});



export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const postAttendanceData = (formData) => API.post('/attendance/postattendancedata' , formData)
export const getAttendanceData = (email) => API.get(`/attendance/postattendancedata/${email}`)

export const getStudentData = (email) => API.get(`/attendance/getstudentdata/${email}` )
export const updateStudentData = (studentData) => API.patch('/attendance/updatestudent',studentData )
export const detail = (formData) => API.post('/subject/detail', formData);