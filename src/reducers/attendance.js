import * as actionType from "../constants/actionTypes";
const initialState = {
  postAttendance: [],
  getAttendanceById: [],
  fetchAllAttendance: [],
  detailToAdmin: [],
  updateStudent: [],
  subjectListing: [],
  facultyList: [],
  collegeId: null,
  adminSignup: false,
  designation: "",
};
const authReducer = (
  state = {
    ...initialState,
    collegeId: JSON.parse(localStorage.getItem("collegeId")),
    designation: localStorage.getItem("designation"),
    authData: JSON.parse(localStorage.getItem("profile")),
  },
  // getAttendanceById = [],
  // fetchAllAttendance = [],
  // detailToAdmin = [],
  // updateStudent = [],
  // subjectListing = [],
  action
) => {
  switch (action.type) {
    case actionType.POST_ATTENDANCE:
      console.log("State : ", action);
      return { ...state, postAttendance: action.data };
    case actionType.GET_ATTENDANCE:
      return { ...state, getAttendanceById: action.payload.data };
    case actionType.FETCH_LIST_TO_FACULTY:
      return { ...state, fetchAllAttendance: action.data };
    case actionType.GET_DETAIL_TO_ADMIN:
      return { ...state, detailToAdmin: action.payload.data };
    case actionType.UPDATE_STUDENT:
      return { ...state, updateStudent: action.payload.data };
    case actionType.EXPIRE_SUBJECT:
      return { ...state, subjectListing: action.payload.data };
    case actionType.RESET_STUDENT:
      return [];

    //College

    case actionType.ADD_COLLEGE:
      console.log("Action :", action);
      localStorage.setItem(
        "collegeId",
        JSON.stringify(action?.data?.collegeSchema?._id)
      );
      return { ...state, collegeId: action.data, adminSignup: true };
    case actionType.FETCH_ALL_COLLEGE:
      return { ...state, collegeList: action.data };
    case actionType.SET_COLLEGE_ID:
      console.log("Actions : ", action);
      localStorage.setItem("collegeId", JSON.stringify(action?.collegeSelect));
      return { ...state, collegeId: action?.collegeSelect };
    case actionType.ADD_INITIAL_ADMIN:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      localStorage.setItem("designation", JSON.stringify("faculty"));
      return { ...state, adminSignup: false, designation: "faculty" };

    // faculty
    case actionType.SIGNIN_FACULTY:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      localStorage.setItem("designation", JSON.stringify("faculty"));
      return { ...state, authData: action?.data, designation: "faculty" };
    case actionType.GET_FACULTY:
      return { ...state, facultyList: action?.data };

    // student
    case actionType.SIGNIN_STUDENT:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data, designation: "student" };
    case actionType.SIGNUP_STUDENT:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data, designation: "student" };

    //logout
    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, collegeId: null, designation: "", authData: null };

    default:
      return state;
  }
};

export default authReducer;
