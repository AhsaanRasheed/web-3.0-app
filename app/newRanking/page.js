"use client";
import React, { useState, useEffect } from "react";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import { useSelector } from "react-redux";
import ProfileBar from "../_components/ProfileBar";
import Navbar from "../_components/Navbar";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Affiliates from "./Affiliates/Affiliates";
import QuizMaster from "./QuizMaster/QuizMaster";
export default function Page(props) {
  const { addNotification } = useNotification();
  const { toggleLoader } = useLoader();
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const router = useRouter();
  const [PageHasBeenScroll, setPageHasBeenScroll] = useState(null);

  const isVisible = useSelector((state) => state.profileVisibility.isVisible);
  const NavBarData = [
    {
      title: "Ambassador",
      link: "/profile/settings",
    },
    {
      title: "QuizMaster",
      link: "/profile/security",
    },
  ]; 

  useEffect(() => {
    setPageHasBeenScroll(false);
    // Function to trigger when pageContainer is scrolled
    // const handleScroll = () => {
    //   // Add your code logic here
    //   setPageHasBeenScroll(true);
    //   pageContainer.removeEventListener("scroll", handleScroll);
    // };
    const handleScroll = () => {
      const pageContainer = document.querySelector(".pageContainer");
      
      if (pageContainer.scrollTop === 0) {
        setPageHasBeenScroll(false);
      } else {
        setPageHasBeenScroll(true);
      }
      
      // Optionally, you can remove the event listener after the first scroll event
      // pageContainer.removeEventListener("scroll", handleScroll);
    };
    // Add scroll event listener when component mounts
    const pageContainer = document.querySelector(".pageContainer");
    pageContainer.addEventListener("scroll", handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      pageContainer.removeEventListener("scroll", handleScroll);
    };
  }, [search]);
  
  useEffect(() => {
    if (isVisible) {
      router.push("/auth/signin");
    }
  }, [isVisible, router]);

  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };
  const ActiveSection = () => {
    if (search == "Ambassador") {
      return <Affiliates PageHasBeenScroll={PageHasBeenScroll} />;
    } else if (search == "QuizMaster") {
      return <QuizMaster PageHasBeenScroll={PageHasBeenScroll} />;
    } else if (search == null) {
      return <Affiliates PageHasBeenScroll={PageHasBeenScroll} />;
    } else {
      return <Affiliates PageHasBeenScroll={PageHasBeenScroll} />;
    }
  };
  return (
    <>
      <div className="pageContainer">
        <ProfileBar
          title="Ranking"
          id="0x85cEakckvk2932b857"
          name="Dario Hanke"
          email="darhnk@gmail.com"
          imgUrl="/profile/dario-hanke.svg"
          hideOnMob={true}
        />
        <Navbar Data={NavBarData}>{ActiveSection()}</Navbar>
        <br />
      </div>
    </>
  );
}
