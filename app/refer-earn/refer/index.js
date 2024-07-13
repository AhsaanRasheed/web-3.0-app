"use client";
import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import style from "./style.module.scss";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import TopCard from "./Components/TopCard";
import InViteCard from "./Components/InviteCard";
import EmailInviteCard from "./Components/EmailInviteCard";
const Refer = ({ isMobileView, referalCode }) => {
  const { addNotification } = useNotification();
  const { toggleLoader } = useLoader();
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [showToolTipModal, setShowToolTipModal] = useState(false);

  const [referralCode, setReferralCode] = useState(""); 
 
  return (
    <div className={style.mainCardCustom}>
    <>
      <TopCard />
      <EmailInviteCard referalCode={referalCode} />
      <InViteCard />
    </>
     </div>
  );
};
export default Refer;
