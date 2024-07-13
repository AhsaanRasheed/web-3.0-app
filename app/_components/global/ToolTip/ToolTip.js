import React from "react";
import "../style.css";
export default function ToolTip({
  txt,
  width,
  height,
  position = "right",
  children,
}) {
  return (
    <>
      <div className="tooltipParent">
        <span
          data-text={txt}
          className={`tooltip ${position == "right" ? `left` : `left`} `}
          style={{
            width: width,
            maxWidth: width,
          }}
        >
          {children}
        </span>
      </div>
      {/* <div style={{width:width,maxWidth:width, height:'max-content'}}>
         <span className={`${position=="right"?`tooltiptextRight`:`tooltiptextLeft`}`} >{txt}</span>
    </div> */}
    </>
  );
}
