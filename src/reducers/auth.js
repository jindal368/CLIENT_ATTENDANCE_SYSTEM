/** @format */

import * as actionType from "../constants/actionTypes";
const state = {
  successSignedUp: false,
};
const authReducer = (
  state = { authData: JSON.parse(localStorage.getItem("profile")) },
  action
) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action?.data, loading: false, errors: null };
    // case actionType.LOGOUT:
    //   localStorage.clear();
    case "SIGNUPUSER":
      return { ...state, successSignedUp: true };
    //   return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;
