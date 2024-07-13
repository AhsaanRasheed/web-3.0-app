"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/app/_components/Navbar";
import Modal from "@/app/_components/Modal";
import ProfileBar from "@/app/_components/ProfileBar";
import menuData from "@/app/data/myProfileNavBarData.json";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import Activity from "./activity";
import Security from "./security";
import Settings from "./settings";
import Verification from "./verification";
export default function ProfileLayout({}) {
  const router = useRouter();
  const isVisible = useSelector((state) => state.profileVisibility.isVisible);
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const [isMobileView, setIsMobileView] = useState(false);

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
    if (search == "Verification") {
      return <Verification isMobileView={isMobileView} />;
    } else if (search == "Security") {
      return <Security isMobileView={isMobileView} />;
    } else if (search == "Activity") {
      return <Activity isMobileView={isMobileView} />;
    } else if (search == "Settings") {
      return <Settings isMobileView={isMobileView} />;
    } else if (search == null) {
      return <Settings isMobileView={isMobileView} />;
    }
  };
  return (
    <>
      <div className="pageContainer">
        <ProfileBar
          title="My Profile"
          id="0x85cEakckvk2932b857"
          name="Dario Hanke"
          email="darhnk@gmail.com"
          imgUrl="/profile/dario-hanke.svg"
          isMobileView={isMobileView}
        />
        <Navbar Data={menuData.data}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ActiveSection />
          </div>
        </Navbar>

        <br />
      </div>
    </>
  );
}
