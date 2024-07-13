"use client";
import React from "react";
import Info from "./Components/Info";
import Link from "next/link";

const Verification = () => {
  return (
    <>
      <div className="profile_component_container">
        <Info
          title="Want more features?"
          buttonText="Get started"
          data={["Proof of address", "Passport", "A selfie (Optional)"]}
        ></Info>
      </div>
    </>
  );
};

export default Verification;
