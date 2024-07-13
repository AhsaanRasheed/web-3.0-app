"use client";
import React from "react";
import Card from "./Components/Card";
import Link from "next/link";
import style from "../style.module.scss";

const Activity = (props) => {
  return (
    <>
      <div className={style.component_container}>
        <Card
          title="Session Management"
          isMobileView={props.isMobileView}
          isSessionManagement= {true}
          totalActiveSessions={2}
          data={[
            {
              device: "Chrome (Windows)",
              date: "8/10/23, 17:23:29 UTC",
              country: "United Arab Emirates",
              ip: "94.204.96.186",
              isMobile: false,

              active: true,
            },
            {
              device: "Iphone",
              date: "8/10/23, 17:23:29 UTC",
              country: "Spain",
              ip: "79.152.44.58",
              isMobile: true,
              active: false,
            },
            {
              device: "Iphone",
              date: "8/10/23, 17:23:29 UTC",
              country: "Spain",
              ip: "79.152.44.58",
              isMobile: true,
              active: false,
            },
          ]}
        />
        <br />
        <Card
          title="Device Management"
          isMobileView={props.isMobileView}
          isSessionManagement= {false}
          totalActiveSessions={5}

          data={[
            {
              device: "Chrome (Windows)",
              date: "8/10/23, 17:23:29 UTC",
              country: "United Arab Emirates",
              ip: "94.204.96.186",
              isMobile: false,

              active: true,
            },
            {
              device: "Iphone",
              date: "8/10/23, 17:23:29 UTC",
              country: "Spain",
              ip: "79.152.44.58",
              isMobile: true,

              active: false,
            },
          ]}
        />
      </div>
    </>
  );
};

export default Activity;
