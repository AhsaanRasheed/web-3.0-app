import React from "react";

export default function Tags({type = "Onchain"}) {
  return (
    <div className={`tags tags-${type}`}>
      <label className="txt_Body2">{type}</label>
    </div>
  );
}
