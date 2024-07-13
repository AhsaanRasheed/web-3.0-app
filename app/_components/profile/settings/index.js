"use client";
import React, { useState, useEffect } from "react";
// import Info from "./Components/Info";
import Link from "next/link";
import PersonalInfo from "./Components/PersonalInfo";
import Preferences from "./Components/Preferences";
import { get_user_info_api } from "@/app/services/service";
import mainStyles from "../style.module.scss";
const Settings = () => {
  const [resp, setResp] = useState({});
  const [refresh, setRefresh] = useState(true);

  const getValue = async () => {
    let va = {
      username: "Test account",
      first_name: "Sam",
      last_name: "Gil",
      phone: "960-1323141",
      email: "samuelgill21@yopmail.com",
      created: "2024-01-05T08:15:38.150608Z",
      is_verified: true,
      gender: "",
      banned: false,
      addr_line_1: "cmxam;",
      addr_line_2: "xcasmcmas",
      city: "ckasmlkca",
      state: "caknslkcanl",
      country: "Afghanistan",
      postal_code: "csacsaca",
      time_zone: "-",
      language: "EN",
      currency: "USD",
    };
    //  await get_user_info_api();
    console.log(va);
    setResp({
      first_name: va.data.first_name,
      email: va.data.email,
      country: va.data.country,
      currency: va.data.currency,
      time_zone: va.data.time_zone,
      language: va.data.language,

      addr_line_1: va.data.addr_line_1,
      city: va.data.city,
      last_name: va.data.last_name,
      phone: va.data.phone,
    });
  };
  useEffect(() => {
    getValue();
  }, [refresh]);
  return (
    <>
      <div className={mainStyles.container}>
        <PersonalInfo
          prevResp={resp}
          refresh={refresh}
          setRefresh={setRefresh}
        />

        <Preferences
          prevResp={resp}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </div>
    </>
  );
};

export default Settings;
