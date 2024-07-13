"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ProfileBar from "@/app/_components/ProfileBar";
import style from "./style.module.scss";

const TradingViewWidget = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const router = useRouter();
  const container = useRef();
  const isVisible = useSelector((state) => state.profileVisibility.isVisible);
  useEffect(() => {
    if (!isVisible) {
      let address = "http://localhost:3000/cryptopricing/chartview/";
      if (
        window.location.host.includes("sandbox") ||
        window.location.host.includes("white-label-app-prime-trader.s3") ||
        window.location.host.includes("s3-website")
      ) {
        address = "https://sandbox.primetrader.com/cryptopricing/chartview/";
      } else if (window.location.host.includes("app")) {
        address = "https://app.primetrader.com/cryptopricing/chartview/";
      }

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js";
      script.async = true;
      script.type = "text/javascript";
      script.innerHTML = `{
          "dataSource": "Crypto",
          "blockSize": "market_cap_calc",
          "blockColor": "change",
          "locale": "en",
          "symbolUrl": "${address}",
          "colorTheme": "dark",
          "hasTopBar": false,
          "isDataSetEnabled": false,
          "isZoomEnabled": true,
          "hasSymbolTooltip": true,
          "isMonoSize": false,
          "width": "95%",
          "height": "100%"
      }`;
      container.current.appendChild(script);
    } else {
      router.push("/auth/signin");
    }
  }, []);

  return (

      <div className={style.tableWidget}>
        <div
          className={`tradingview-widget-container ${style.table}`}
          ref={container}
        >
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
    
  );
};
export default memo(TradingViewWidget);
