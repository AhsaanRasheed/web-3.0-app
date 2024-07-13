"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../_components/Navbar";
import Modal from "../_components/Modal";
import ProfileBar from "../_components/ProfileBar";
import menuData from "../data/newPortfolioNavBarData.json";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

import Overview from "./overview";
import Allocation from "./allocation";
import NFT from "./nft";
import Transaction from "./transaction";
export default function ProfileLayout({ children }) {
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
    if (search == "Transaction") {
      return <Transaction isMobileView={isMobileView} />;
    } else if (search == "NFT") {
      return <NFT isMobileView={isMobileView} />;
    } else if (search == "Allocation") {
      return <Allocation isMobileView={isMobileView} />;
    } else if (search == "Overview") {
      return <Overview isMobileView={isMobileView} />;
    } else if (search == null) {
      return <Allocation isMobileView={isMobileView} />;
    }
  };

  return (
    <>
      <div className="pageContainer">
        <ProfileBar
          title="New Portfolio"
          id="0x85cEa...2b857"
          name="Dario Hanke"
          email="darhnk@gmail.com"
          imgUrl="/profile/dario-hanke.svg"
          isMobileView={isMobileView}
        />
        <Navbar Data={menuData.data}>
          <ActiveSection />
        </Navbar>
        <br />
      </div>
    </>
  );
}
