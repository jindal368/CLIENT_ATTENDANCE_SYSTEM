/** @format */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { css } from "@emotion/react";
import { Header, Table } from "semantic-ui-react";
import {
  expireRetrieveSubject,
  getAttendanceById,
} from "../../actions/attendance";
import QrCodeGenerator from "../util/QrCodeGenerator";
import BounceLoader from "react-spinners/BounceLoader";
function Modal({ facultyListing }) {
  const [listed, setListed] = useState("0");
  const [tempTime, setTempTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  const handleExpire = (id) => {
    setLoading(true);
    dispatch(expireRetrieveSubject(id))
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const handleValue = (id, time) => {
    setListed(id);
    setTempTime(time);
  };
  return (
    <>
      {listed === "0" ? (
        loading ? (
          <BounceLoader
            color='green'
            loading={loading}
            css={override}
            size={150}
          />
        ) : (
          <div style={{ overflowY: "scroll", height: "50vh" }}>
            <h1 style={{ textAlign: "center" }}>List Of Listings</h1>
            <Table
              celled
              padded
              className='container'
              style={{
                borderStyle: "groove",
                borderColor: "black",
              }}
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine>S.No</Table.HeaderCell>
                  <Table.HeaderCell>Course</Table.HeaderCell>
                  <Table.HeaderCell>Expire</Table.HeaderCell>
                  <Table.HeaderCell>Subject</Table.HeaderCell>
                  <Table.HeaderCell>Year</Table.HeaderCell>
                  <Table.HeaderCell>Semester</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>QrCode</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              {facultyListing?.map((list, key) => (
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header textAlign='center'>{key + 1}</Header>
                    </Table.Cell>
                    <Table.Cell>
                      <Header textAlign='center'>{list.course}</Header>
                    </Table.Cell>
                    <Table.Cell singleLine>
                      {list.expire ? "Expired" : "Active"}
                    </Table.Cell>
                    <Table.Cell>{list.subject}</Table.Cell>
                    <Table.Cell textAlign='right'>
                      {list.year}
                      <br />
                    </Table.Cell>
                    <Table.Cell>{list.semester}</Table.Cell>
                    <Table.Cell>{list.section}</Table.Cell>
                    <Table.Cell>{list.date}</Table.Cell>

                    <Table.Cell>
                      <button
                        onClick={() => handleValue(list._id, list.tempTime)}
                      >
                        ShowQrCode
                      </button>
                    </Table.Cell>
                    <Table.Cell>
                      <button onClick={() => handleExpire(list._id)}>
                        {list.expire ? "Retrieve The Code" : "Expire The Code"}
                      </button>
                    </Table.Cell>
                  </Table.Row>
                  <hr style={{ width: "100%" }} />
                </Table.Body>
              ))}
            </Table>
          </div>
        )
      ) : (
        <QrCodeGenerator
          value={listed}
          tempTime={tempTime}
          setListed={setListed}
          setTempTime={setTempTime}
        />
      )}
    </>
  );
}

export default Modal;
