"use client";
import React, { useEffect, useState } from "react";
import Card from "./Components/Card";
import { QRCode } from "react-qrcode-logo";
import Button from "@/app/_components/Button";

import CopyComponent from "@/app/_components/CopyComponent";
import styles from "./style.module.scss";
import Image from "next/image";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";

const Refer = () => {
  const { addNotification } = useNotification();
  const referralCode = "vfv nfvmkcmdskvms";
  const [expandedCard, setExpandedCard] = useState(null);
  const [link, setLink] = useState('');

  useEffect(() => {
    const referralLink = `${window.location.origin}?rc=${referralCode}`;
    setLink(referralLink);
  }, [referralCode]);

  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.upper}>
          <div className={styles.text_container}>
            <Image
              src="/icons/info.svg"
              alt="info"
              width={20}
              height={20}
              className={styles.info_image}
            />

            <p className="heading-2">Earn Tokens by Inviting your friends</p>
            <p className="heading-2">
              Your referral code is:{" "}
              <span className={styles.colour_blue}>{referralCode}</span>{" "}
            </p>
            <div className={styles.info}>
              <p className="info-plain-text">
                Direct referal - Level 1: 50 PTT (5 Euros)
              </p>
              <p className="info-plain-text">
                Indirect referal - Level 2: 25 PTT (2.50 Euros)
              </p>
              <p className="info-plain-text">
                Indirect referal - Level 3: 10 PTT (1.00 Euros)
              </p>
            </div>
          </div>
        </div>
        <div className={styles.lower}>
          <div className={styles.cards}>
            <Card
              data={[
                {
                  name: "Invite by sharing your invitation link",
                  text: "You can generate personal link, copy it and share with your community",
                  url: "/icons/link.svg",
                },
              ]}
              expanded={expandedCard === "card1"}
              onCardClick={() => handleCardClick("card1")}
            >
              <div className={styles.invitation_container}>
                <p className="info-plain-text">Invitation link</p>
                <div className={styles.copy_component}>
                  <CopyComponent
                    text={link}
                    truncateStyle="end"
                  />
                </div>
                <div className={styles.button}>
                  <Button
                    onClick={() => {
                      var copyText =
                        { link };
                      navigator.clipboard.writeText(copyText).then(() => {
                        addNotification({
                          id: Math.random().toString(36).substr(2, 9),
                          type: "success",
                          message: "Copied to clipboard",
                          customProp: null,
                        });
                      });
                    }}
                    label="Copy Link"
                  />
                </div>
              </div>
            </Card>
            <Card
              data={[
                {
                  name: "Invite by sending your friends an E-mail",
                  text: "You can send multiple E-mails by hitting Enter button on the keyboard after each email added",
                  url: "/icons/mail.svg",
                },
              ]}
              expanded={expandedCard === "card2"}
              onCardClick={() => handleCardClick("card2")}
            >
              <div className={styles.button}>
                <Button label="Add Emails" />
              </div>
            </Card>
            <Card
              data={[
                {
                  name: "Invite by scanning the QR code",
                  text: "Scan the QR code to refer",
                  url: "/icons/qrscan.svg",
                },
              ]}
              expanded={expandedCard === "card3"}
              onCardClick={() => handleCardClick("card3")}
            >
              <div className="qrBox">
                <QRCode
                  value={link}
                // logoImage="/assets/qrlogo.svg"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Refer;
