import * as actionType from "../constants/actionTypes";

const authReducer = (
  state = {
    postAttendance: [],
    getAttendanceById: [],
    fetchAllAttendance: [],
    detailToAdmin: [],
    updateStudent: [],
    subjectListing: [],
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

    default:
      return state;
  }
};

export default authReducer;
