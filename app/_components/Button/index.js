"use client";
import React from "react";

const Button = ({ label, onClick }) => {
  return (
    <div className="info-box-button">
      <div className="button-container">
        <button type="button" className="button-style" onClick={onClick}>
          <p className="txt_Button txt_align_center">{label}</p>
        </button>
      </div>
    </div>
  );
};

export default Button;
