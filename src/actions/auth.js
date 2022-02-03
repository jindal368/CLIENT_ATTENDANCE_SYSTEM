/** @format */

import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";
import { verifiyEmail } from "../api/apiVerify";
import { Redirect } from "react-router-dom";
export const signin =
  (formData, latitude, longitude, router) => async (dispatch) => {
    try {
      console.log("formdata : ", formData);
      console.log("latitude : ", latitude);
      console.log("longitude : ", longitude);
      const { data, status } = await api.signIn(formData, latitude, longitude);

      if (status === 200) dispatch({ type: AUTH, data });
      return { data, status };
    } catch (error) {
      console.log(error);
    }
  };

export const signup =
  (formData, collegeId, latitude, longitude) => async (dispatch) => {
    try {
      const { data, status } = await api.signUp(
        formData,
        collegeId,
        latitude,
        longitude
      );

      if (status === 200) {
        dispatch({ type: "SIGNUPUSER", data });
      }

      return { data, status };
    } catch (error) {
      console.log(error);
    }
  };
export const verificationOnEmail = (email, token, type) => async (dispatch) => {
  try {
    const { data, status } = await api.verificationOnEmail(email, token, type);

    if (status === 200) {
      dispatch({ type: "VERIFICATIONONEMAIL", data });
    }

    return { data, status };
  } catch (error) {
    console.log(error);
  }
};
export const verifyEmail = (token) => async (dispatch) => {
  try {
    const { data, status } = await verifiyEmail(token);

    if (status === 200) {
      dispatch({ type: "VERIFYEMAIL", data });
    }

    return { data, status };
  } catch (error) {
    console.log(error);
  }
};
