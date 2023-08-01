import React, { useState } from "react";

const Modal = (props) => {
  const { setShowModal,onayla } = props;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "25%",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "5px",
        }}
      >
        <h1>Eminmisin</h1>
        <div className="d-flex justify-content-center">
          <button
            onClick={() => setShowModal(false)}
            className="btn btn-sm  btn-outline-danger mx-3"
          >
            Kapat
          </button>
          <button onClick={onayla} className="btn btn-sm  btn-outline-danger ">Onayla</button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
