"use client";
import React, { useState, useEffect } from "react";
import "./style.css";
import DesktopView from "./Component/DesktopView";
import MobileView from "./Component/MobileView";

export default function Navbar({ children, Data }) {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1150) {
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
  return (
    <div className="main_navbar">
      {isMobileView ? (
        <DesktopView Data={Data} >
          {children}
        </DesktopView>
      ) : (
        <DesktopView Data={Data} >
          {children}
        </DesktopView>
      )}
    </div>
  );
}
