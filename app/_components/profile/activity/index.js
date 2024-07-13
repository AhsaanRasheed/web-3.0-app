"use client";
import React from "react";
import Info from "./Components/Info";
import Link from "next/link";

const Activity = () => {
  return (
    <>
      <div className="profile_component_container">
        <Info
          title="Session Management (2 active sessions)"
          buttonText="Disconnect all"
          data={[
            {
              device: "Chrome (Windows)",
              info: "Currenty active",
              country: "United Arab Emirates",
              ip: "94.204.96.186",
              imageUrl: "/icons/window.svg",
            },
            {
              device: "Iphone",
              info: "8/10/23, 17:23:29 UTC",
              country: "Spain",
              ip: "79.152.44.58",
              imageUrl: "/icons/iphone.svg",
            },
          ]}
        ></Info>
        <Info
          title="Device Management (3 Devices)"
          buttonText="Disconnect all"
          data={[
            {
              device: "Chrome (Windows)",
              info: "Currenty active",
              country: "United Arab Emirates",
              ip: "94.204.96.186",
              imageUrl: "/icons/window.svg",
            },
            {
              device: "Iphone",
              info: "8/10/23, 17:23:29 UTC",
              country: "Spain",
              ip: "79.152.44.58",
              imageUrl: "/icons/iphone.svg",
            },
          ]}
        ></Info>
      </div>
    </>
  );
};

export default Activity;
