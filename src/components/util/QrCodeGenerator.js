/** @format */

import React, { useEffect } from "react";
import QRCode from "qrcode.react";
import { useSelector, useDispatch } from "react-redux";
import { updateTempTime } from "../../actions/attendance";
import { Button } from "@material-ui/core";
import { updateStudentData } from "../../api";
export default function QrCodeGenerator({
  value,
  setListed,
  tempTime,
  setTempTime,
}) {
  const userType = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const data = {
    _id: value,
    data: userType?.authData?.result,
  };
  useEffect(() => {
    setTimeout(() => {
      setTempTime(Date.now() + 5000);
      console.log("TempTime : ", tempTime);

      console.log("dwbhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    }, 3000);
  }, [tempTime]);
  return (
    <div
      style={{
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
        display: "space-between",
        margin: "30px",
      }}
    >
      <QRCode
        size='50vh'
        value={`${value}+${tempTime}`}
        renderAs='svg'
        fgColor='red'
        bgColor='#fff'
        key={`key-${value}`}
      />
      {/* <h1>{tempTime}</h1> */}
      <Button
        onClick={() => setListed("0")}
        style={{ backgroundColor: "lawngreen", marginTop: "30px" }}
      >
        GoBack To list
      </Button>
    </div>
  );
}
