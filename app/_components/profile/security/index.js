"use client";
import React from "react";
import Factor from "./Components/SignIn/2Factor";
import SignIn from "./Components/SignIn";
import Link from "next/link";

const Security = () => {
  return (
    <>
      <div >
        <SignIn
          title="Sign In"
          buttonText="Change Password"
          data={[
            { label: "Username", value: "Ichrak_1" },
            { label: "Email", value: "lamouchi@gmail.com" },
            { label: "Password", value: "7850504948584" },
          ]}
        ></SignIn>
       
      </div>
    </>
  );
};

export default Security;
