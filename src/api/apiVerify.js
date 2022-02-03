/** @format */

import axios from "axios";

export const verifiyEmail = (token) =>
  axios.put(`http://localhost:9000/student/verifyAccount?token=${token}`);
