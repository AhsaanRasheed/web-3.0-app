"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../_components/Navbar";
import Modal from "../_components/Modal";
import ProfileBar from "../_components/ProfileBar";
import menuData from "../data/referEarnNavBarData.json";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Refer from "./refer";
import Earn from "./earn";
import Invited from "./invited";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";

import { get_referal_Code } from "../services/new_service";
export default function ReferLayout({ children }) {
  const router = useRouter();
  const isVisible = useSelector((state) => state.profileVisibility.isVisible);
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const [isMobileView, setIsMobileView] = useState(false);
  const { addNotification } = useNotification();
  const { toggleLoader } = useLoader();
  const [referalCode, setReferalCode] = useState("");
  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };
  const get_starting_info = async () => {
    toggleLoader(true);
    try {
      let referal = await get_referal_Code();
      console.log(referal);
      if (referal.message == "successfully retreived referral code") {
        setReferalCode(referal.data.referral_code);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoader(false);
    }
  };
  useEffect(() => {
    // get_staking_data();
    get_starting_info();
  }, []);
  useEffect(() => {
    if (isVisible) {
      router.push("/auth/signin");
    }
  }, [isVisible, router]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const ActiveSection = () => {
    if (search == "Invited") {
      return <Invited isMobileView={isMobileView} />;
    } else if (search == "Earn") {
      return <Earn isMobileView={isMobileView} />;
    } else if (search == "Refer") {
      return <Refer isMobileView={isMobileView} referalCode={referalCode} />;
    } else if (search == null) {
      return <Refer isMobileView={isMobileView} referalCode={referalCode} />;
    } else {
      return <Refer isMobileView={isMobileView} referalCode={referalCode} />;
    }
  };
  return (
    <>
      <div className="pageContainer">
        <ProfileBar
          title="Refer & Earn"
          id="0x85cEakckvk2932b857"
          name="Dario Hanke"
          email="darhnk@gmail.com"
          imgUrl="/profile/dario-hanke.svg"
          isMobileView={isMobileView}
          hideOnMob={true}
        />
        <Navbar Data={menuData.data}>{ActiveSection()}</Navbar>
        <br />
      </div>
    </>
  );
}
