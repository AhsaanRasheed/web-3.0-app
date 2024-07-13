"use client";
import React from "react";
import style from "./style.module.scss";
import Image from "next/image";
export default function NFT({ isMobileView }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div className={style.main}>
        <div className={style.leftSide}>
          <div className={style.card}>
            {/* Card */}
            <div className={style.ImgContainer}>
              {/* <Image
                src="/portfolio/NFT.png"
                fill
                sizes="(max-width: 2500px) 99%, 99%"
                alt="Image of the author "
              /> */}
              <img src="/portfolio/NFT.png" alt="Image of author " />
            </div>
          </div>
        </div>
        <div className={style.rightSide}>
          <div>
            {/* title */}
            <label
              className={`${isMobileView ? "txt_Title1" : "txt_Heading2"}`}
            >
              NFT "Men PT1"
            </label>
          </div>
          <div className={style.status}>
            {/* Status */}
            <label
              className="txt_Body1"
              style={{ color: "var(--primary-Neutrals-medium-color)" }}
            >
              Status
            </label>
            <button className={style.OnChain}>Onchain</button>
          </div>
          <div>
            {/* Para */}
            <p>
              This unique NFT is designed for those who are looking for a unique
              masterpiece in their collection. The image of a young boy is
              intertwined with elements of modern aesthetics, where his facial
              expression is reflected in an ultra-modern context. The high
              resolution and mastery of detail allow us to immerse ourselves in
              a world where every line and color shade is important.
            </p>
          </div>
          <div className={style.col}>
            <div className={style.row}>
              <label
                className="txt_Body1"
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
              >
                Status
              </label>{" "}
              <h3>9.5</h3>
            </div>
            <div className={style.row}>
              <label
                className="txt_Body1"
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
              >
                Rarity score
              </label>{" "}
              <h3>81.5</h3>
            </div>
            <div className={style.row}>
              <label
                className="txt_Body1"
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
              >
                High resolution
              </label>{" "}
              <h3>4K</h3>
            </div>
            <div className={style.row}>
              <label
                className="txt_Body1"
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
              >
                Size
              </label>{" "}
              <h3>210mb</h3>
            </div>
          </div>
          <div className={style.col}>
            <div className={style.row}>
              <label
                className="txt_Body"
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
              >
                Highest Bid
              </label>{" "}
              <h4>PTT 3000</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
