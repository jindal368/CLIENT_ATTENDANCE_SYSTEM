import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";
import { Redirect } from "react-router-dom";
export const signin =
  (formData, latitude, longitude, router) => async (dispatch) => {
    try {
      console.log("formdata : ", formData);
      console.log("latitude : ", latitude);
      console.log("longitude : ", longitude);
      const { data } = await api.signIn(formData, latitude, longitude);

      dispatch({ type: AUTH, data });
    } catch (error) {
      console.log(error);
    }
  };

export const signup =
  (formData, collegeId, latitude, longitude, router) => async (dispatch) => {
    try {
      const { data } = await api.signUp(
        formData,
        collegeId,
        latitude,
        longitude
      );

      dispatch({ type: AUTH, data });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
