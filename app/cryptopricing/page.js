"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import ProfileBar from "../_components/ProfileBar";
import menuData from "../data/cryptopricingNavBar.json";
import Navbar from "../_components/Navbar";
import Cryptopricetable from "./cryptopricetable/cryptopricetable";
import Heatmaptable from "./heatmaptable/heatmaptable";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const TradingViewWidget = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const search = searchParams.get("s");

  const isVisible = useSelector((state) => state.profileVisibility.isVisible);
  useEffect(() => {
    if (!isVisible) {
    } else {
      router.push("/auth/signin");
    }
  }, []);

  const ActiveSection = () => {
    console.log("search is", search);
    if (search === "Cryptomarket") {
      return (
        <div style={{ height: "85dvh", position: "relative" }}>
          <Cryptopricetable />
        </div>
      );
    } else if (search === "Cryptoheatmap") {
      return (
        <div style={{ height: "85dvh", position: "relative" }}>
          <Heatmaptable />
        </div>
      );
    } else {
      return (
        <div style={{ height: "85dvh", position: "relative" }}>
          <Cryptopricetable />
        </div>
      );
    }
  };

  return (
    <>
      <div
        className="pageContainer"
        style={{ height: "100%", width:"50px" ,overflow: "hidden"}}
      >
        <ProfileBar
          title="Crypto Pricing"
          id="0x85cEakckvk2932b857"
          name="Dario Hanke"
          email="darhnk@gmail.com"
          imgUrl={"/profile/dario-hanke.svg"}
        />

        <Navbar Data={menuData.data}>
          <ActiveSection />
        </Navbar>
      </div>
    </>
  );
};
export default memo(TradingViewWidget);
