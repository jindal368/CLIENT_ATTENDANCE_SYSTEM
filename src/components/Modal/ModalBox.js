/** @format */

import React, { useState } from "react";
import "./styles.css";

import Modal from "react-modal";
import { Button } from "@material-ui/core";

Modal.setAppElement("#root");

export default function ModalBox(props) {
  return (
    <div
      className='App'
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.modalClosed}
        contentLabel='My dialog'
        className='mymodal'
        overlayClassName='myoverlay'
        closeTimeoutMS={500}
      >
        {props.children}
        <center>
          <Button
            type='submit'
            fullWidth
            onClick={props.modalClosed}
            variant='contained'
            color='secondary'
            style={{ width: "85%" }}
          >
            Close
          </Button>
        </center>
      </Modal>
    </div>
  );
}
