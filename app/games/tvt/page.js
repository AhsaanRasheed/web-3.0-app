"use client";
import React, { useState, useEffect } from "react";
import ProfileBar from "@/app/_components/ProfileBar";
import Navbar from "@/app/_components/Navbar";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Lobby from "./components/Lobby/Lobby";

export default function Page() {
  const router = useRouter();
  const isVisible = useSelector((state) => state.profileVisibility.isVisible);

  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const [isMobileView, setIsMobileView] = useState(false);
  const ActiveSection = () => {
    if (search == "lobby") {
      return <Lobby />;
    } else if (search == null) {
      return <Lobby />;
    }
  };
  return (
    <div className="pageContainer">
      <ProfileBar
        title="Staking"
        id="0x85cEakckvk2932b857"
        name="Dario Hanke"
        email="darhnk@gmail.com"
        imgUrl={"/profile/dario-hanke.svg"}
        isMobileView={isMobileView}
        hideOnMob={true}
      />
      {/* <OldNavbar Data={menuData.data}>
    <ActiveSection />
  </OldNavbar> */}

      <Navbar
        Data={[
          {
            title: "Lobby",
            link: "temp_game/tvt/?s=lobby",
          },
        ]}
      >
        <ActiveSection />
      </Navbar>
      <br />
    </div>
  );
}
