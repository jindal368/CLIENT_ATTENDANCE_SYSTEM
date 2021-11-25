import React, { useState } from "react";
import "./styles.css";

import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ModalBox(props) {
  return (
    <div className="App">
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.modalClosed}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        {console.log(props.qrCodeManager)}
        <div>{props.qrCodeManager}</div>
        <button onClick={props.modalClosed}>Close modal</button>
      </Modal>
    </div>
  );
}