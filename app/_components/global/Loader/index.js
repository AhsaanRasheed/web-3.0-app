import React from "react";
import "../style.css";
import { useLoader } from "./loaderContext";
import Image from "next/image";
export default function Loader() {
  const { loader, toggleLoader } = useLoader();
  if (loader) {
    return (
      <div id="loader-overlay">
        {/* <span className="loader"></span>
        <h4 className="loaderText">Loading ...</h4> */}
        <img src="/icons/loader.png" width="150" height="150" alt="loader" />
      </div>
    );
  }
}
