"use client";
import React from "react";
import ProfileBar from "../_components/ProfileBar";
import ProfileTabs from "../_components/ProfileTabs";

const Tab = () => {
  const handleButtonClick = () => {
    // Handle button click logic here
    alert("Button clicked! Handle Function executed");
  };

  return (
    <div className="profile-container">
      <ProfileBar
        id="0x85cEa...2b857"
        name="Dario Hanke"
        email="darhnk@gmail.com"
        imgUrl="/profile/dario-hanke.svg"
      />
      <ProfileTabs />
    </div>
  );
};

export default Tab;
