"use client";
import React from "react";
import { useDispatch } from "react-redux";
import NotificationBox from "@/app/_components/Notification";

const Notification = () => {
  const dispatch = useDispatch();

  const handleShowErrorAlert = () => {
    dispatch({
      type: "SHOW_ALERT",
      payload: {
        alertType: "error",
        text: "An error occurred while saving",
        top: "42px",
      },
    });
  };

  const handleShowSuccessAlert = () => {
    dispatch({
      type: "SHOW_ALERT",
      payload: {
        alertType: "success",
        text: "Your password has been successfully saved",
        top: "42px",
      },
    });
  };

  return (
    <div>
      <button onClick={handleShowErrorAlert}>Show Error Alert</button>
      <button onClick={handleShowSuccessAlert}>Show Success Alert</button>
      <NotificationBox />
    </div>
  );
};

export default Notification;
