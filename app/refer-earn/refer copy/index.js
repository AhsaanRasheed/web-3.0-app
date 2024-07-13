"use client";
import React, { useEffect, useState } from "react";
import Card from "./Components/Card";
import { QRCode } from "react-qrcode-logo";
// import Button from "@/app/_components/Button";
import Button from "@/app/_components/global/Button/Button";
// import Tooltip from "@/app/_components/ToolTip";
import ToolTip from "@/app/_components/global/ToolTip/ToolTip";
import CopyComponent from "@/app/_components/CopyComponent";
import styles from "./style.module.scss";
import Image from "next/image";
import Modal from "@/app/_components/Modal";
import ConfirmationBox from "@/app/_components/ConfirmationBox";
import InputTxt from "@/app/_components/global/Input/InputTxt";
import { get_user_referral_code_api } from "@/app/services/service";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { invite_api } from "../../services/service";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
const Refer = ({ isMobileView }) => {
  const { addNotification } = useNotification();
  const { toggleLoader } = useLoader();
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [showToolTipModal, setShowToolTipModal] = useState(false);

  const [referralCode, setReferralCode] = useState("");
  const getReferralCode = async () => {
    toggleLoader(true);
    try {
      const resp = await get_user_referral_code_api();
      console.log("referral code resp ", resp);
      const code = resp.data?.referral_code;
      setReferralCode(code);
    } catch (e) {
    } finally {
      toggleLoader(false);
    }
  };
  useEffect(() => {
    getReferralCode();
  }, []);
  const [expandedCard, setExpandedCard] = useState(null);
  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className={styles.container}>
        <div className={styles.upper}>
          <div className={styles.text_container}>
            <div className={styles.heading_container}>
              <div className={styles.heading}>
                <label className={`txt_Heading3`}>
                  Earn Tokens by Inviting your friends
                </label>{" "}
                <label className={`txt_Heading3`}>
                  Your referral code is:{" "}
                  <label style={{ color: "var(--status-info-default)" }}>
                    {referralCode}
                  </label>{" "}
                </label>
              </div>
              <div
                style={{
                  position: "relative",
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                  padding: "2.5px",
                }}
              >
                <ToolTip
                  txt="Earn up to 50,000 PTT and Win amazing prizes by inviting your friends. To earn PrimeTrader Tokens share your referral code by emai l and on social media with your community."
                  width="285px"
                  height="137px"
                  position={isMobileView ? "left" : "right"}
                >
                  <Image
                    src="/icons/info.svg"
                    alt="info"
                    width={20}
                    height={20}
                    className={styles.info_image}
                  />
                </ToolTip>
                {/* <ToolTipContainer isMobileView={isMobileView} /> */}
              </div>
            </div>
            <div className={styles.info}>
              <label
                className="txt_Body2"
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
              >
                Direct referal - Level 1: 50 PTT (5 Euros)
              </label>
              <br />
              <label
                className="txt_Body2"
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
              >
                Indirect referal - Level 2: 25 PTT (2.50 Euros)
              </label>
              <br />
              <label
                className="txt_Body2"
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
              >
                Indirect referal - Level 3: 10 PTT (1.00 Euros)
              </label>
            </div>
          </div>
        </div>

        <div className={styles.lower}>
          <div className={styles.cards}>
            <Card
              item={{
                name: "Invite by sharing your invitation link",
                text: "You can generate personal link, copy it and share with your community",
                url: "/icons/link.svg",
                imageWidth: 45,
                imageHeight: 45,
              }}
              isMobileView={isMobileView}
            >
              <div className={styles.invitation_container}>
                <div className={styles.invitation}>
                  <label
                    className="txt_Body2"
                    style={{ alignSelf: "flex-start" }}
                  >
                    Invitation link
                  </label>
                  <div className={styles.copy_component}>
                    <CopyComponent
                      text={window.location.origin + "?rc=" + referralCode}
                      truncateStyle="end"
                    />
                  </div>
                </div>

                <div className={styles.button}>
                  <Button
                    onClick={() => {
                      var copyText =
                        window.location.origin + "?rc=" + referralCode;
                      navigator.clipboard.writeText(copyText).then(() => {
                        addNotification({
                          id: Math.random().toString(36).substr(2, 9),
                          type: "success",
                          message: "Copied to clipboard",
                          customProp: null,
                        });
                      });
                    }}
                    text="Copy Link"
                    Custom_width="220px"
                    Custom_minWidth="220px"
                  />
                </div>
              </div>
            </Card>
            <Card
              item={{
                name: "Invite by sending your friends an E-mail",
                text: "You can send multiple E-mails by hitting Enter button on the keyboard after each email added",
                url: "/icons/mail.svg",
                imageWidth: 45,
                imageHeight: 40,
              }}
              isMobileView={isMobileView}
            >
              <div className={` ${styles.button} ${styles.email_button} `}>
                <Button
                  text="Add E-mails"
                  onClick={() => setShowAddFriendModal(true)}
                  Custom_width="220px"
                  Custom_minWidth="220px"
                />
              </div>
            </Card>
            <Card
              item={{
                name: "Invite by scanning the QR code",
                text: "Scan the QR code to refer",
                url: "/icons/qrscan.svg",
                imageWidth: 40,
                imageHeight: 40,
              }}
              isMobileView={isMobileView}
            >
              <div className={styles.QRCodeBox}>
                <div className={styles.QRCode}>
                  <QRCode
                    value={window.location.origin + "?rc=" + referralCode}
                    size={143}
                    quietZone={2}
                    logoImage={"/qrLogo.png"}
                    logoHeight={60}
                    logoWidth={60}
                    // logoImage="/assets/qrlogo.svg"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
        <AddFriendEmailModal
          showAddFriendModal={showAddFriendModal}
          setShowAddFriendModal={setShowAddFriendModal}
          isMobileView={isMobileView}
        />
      </div>
    </div>
  );
};
export default Refer;

const AddFriendEmailModal = ({
  showAddFriendModal,
  setShowAddFriendModal,
  isMobileView,
}) => {
  const { addNotification } = useNotification();
  const { toggleLoader } = useLoader();

  const [email, setEmail] = useState("");
  const [emailLst, setEmailLst] = useState([]);

  const [emailError, setEmailError] = useState(false);
  const [showConfirmationBox, setShowConfirmationBox] = useState(false);

  // useEffect(() => {
  //   if (emailError) emailIsValid();
  // }, [email]);
  const emailIsValid = () => {
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailPattern.test(email)) {
    //   setEmailError(true);
    //   return false;
    // } else {
    //   setEmailError(false);
    // return true;
    // }
  };
  const removeItem = (indexToRemove) => {
    setEmailLst((prevItems) =>
      prevItems.filter((item, index) => index !== indexToRemove)
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let result = email.replaceAll(" ", ";");
    result = result.replaceAll(",", ";");
    let tempEmails = result.split(";");
    tempEmails.forEach((element) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailPattern.test(element)) {
        if (!emailLst.includes(element))
          setEmailLst((prevItems) => [element, ...prevItems]);
      }
    });
    setEmail("");
  };

  const onCloseModal = () => {
    setShowConfirmationBox(true);
  };
  const onCloseConfirmation = () => {
    setShowConfirmationBox(false);

    setShowAddFriendModal(false);
  };
  return (
    <Modal showModal={showAddFriendModal} onClose={() => onCloseModal()}>
      <div className={styles.AddFriendEmailModal}>
        <div className={styles.Modalcontent}>
          <div className={styles.center_container}>
            <label
              className={`${
                isMobileView ? `txt_Large_title` : `txt_Heading1`
              } txt_align_center`}
            >
              Add friends' E-mails
            </label>
            <br />
            <label className={`txt_Title3 txt_align_center`}>
              Enter E-mail addresses of all {isMobileView && <br />}friends you
              want{!isMobileView && <br />} to invite to the
              {isMobileView && <br />} PrimeTrader. Use Enter button
              {!isMobileView && <br />} on {isMobileView && <br />}the keyboard
              to add several {isMobileView && <br />}E-mails.
            </label>
            <br />
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate={true}
            >
              <div className={styles.inputBox}>
                <InputTxt
                  value={email}
                  placeHolder="Enter E-mails"
                  Custom_width="100%"
                  Custom_minWidth="99%"
                  label="E-mail"
                  show_error={emailError}
                  error_msg={"E-mail is not correct"}
                  onChange={(value) => {
                    let result = value.replace("+", "");
                    setEmail(result);
                  }}
                />
              </div>
            </form>
            <label
              className="txt_Title3"
              style={{ color: "var(--primary-Neutrals-strong-color)" }}
            >
              Total added {emailLst.length} E-mails
            </label>
          </div>
        </div>
        <div className={styles.emailsBox}>
          {emailLst.map((item, index) => (
            <div className={styles.emailtag}>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Caption"
              >
                {item}
              </label>{" "}
              <div
                style={{ height: "16px", width: "16px", cursor: "pointer" }}
                onClick={() => removeItem(index)}
              >
                <CrossIcon />
              </div>
            </div>
          ))}
        </div>
        <div className={`${styles.btnCover} ${styles.center_container}`}>
          <Button
            disable={!emailLst.length}
            text="Send"
            onClick={() => {
              toggleLoader(true);
              try {
                invite_api({
                  emails: emailLst,
                  username: "",
                  message: "",
                }).then((res) => {
                  if (res.code == 200) {
                    if (
                      res.data.already_reg_emails &&
                      res.data.already_reg_emails.length
                    ) {
                      addNotification({
                        id: Math.random().toString(36).substr(2, 9),
                        type: emailLst.length == 1 ? "fail" : "success",
                        message:
                          emailLst.length == 1
                            ? "E-mail is already registered"
                            : "Some of the e-mails are already registered",
                        customProp: null,
                      });
                    } else {
                      addNotification({
                        id: Math.random().toString(36).substr(2, 9),
                        type: "success",
                        message: "Your invites are being sent.",
                        customProp: null,
                      });
                    }
                    setShowAddFriendModal(false);
                    setEmailLst([]);
                  }
                });
              } catch (e) {
              } finally {
                toggleLoader(false);
              }
            }}
            Custom_width={isMobileView ? "100%" : null}
            Custom_maxWidth={isMobileView ? "100%" : null}
          />
        </div>
      </div>
      <ConfirmationBoxModal
        isMobileView={isMobileView}
        showAlert={showConfirmationBox}
        SetShowAlert={setShowConfirmationBox}
        onAccept={() => onCloseConfirmation()}
      />
    </Modal>
  );
};

const ConfirmationBoxModal = ({
  isMobileView,
  showAlert,
  SetShowAlert,
  onAccept,
}) => {
  return (
    <div>
      <ConfirmationBox
        title={`Are you sure you want to close?`}
        para={"All the data will be deleted"}
        acceptBtnTxt={"Yes, close"}
        rejectBtnTxt={"Cancel"}
        onAccept={() => onAccept()}
        onReject={() => SetShowAlert(false)}
        onClose={() => SetShowAlert(false)}
        showAlert={showAlert}
        isMobileView={isMobileView}
      />
    </div>
  );
};

const CrossIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99999 8.70254L4.61792 12.0846C4.52562 12.1769 4.4096 12.2241 4.26986 12.2263C4.13012 12.2284 4.01197 12.1812 3.91539 12.0846C3.8188 11.988 3.77051 11.8709 3.77051 11.7333C3.77051 11.5957 3.8188 11.4786 3.91539 11.3821L7.29744 7.99999L3.91539 4.61792C3.82308 4.52562 3.77586 4.4096 3.77372 4.26986C3.77158 4.13012 3.8188 4.01197 3.91539 3.91539C4.01197 3.8188 4.12906 3.77051 4.26666 3.77051C4.40426 3.77051 4.52135 3.8188 4.61792 3.91539L7.99999 7.29744L11.3821 3.91539C11.4744 3.82308 11.5904 3.77586 11.7301 3.77372C11.8699 3.77158 11.988 3.8188 12.0846 3.91539C12.1812 4.01197 12.2295 4.12906 12.2295 4.26666C12.2295 4.40426 12.1812 4.52135 12.0846 4.61792L8.70254 7.99999L12.0846 11.3821C12.1769 11.4744 12.2241 11.5904 12.2263 11.7301C12.2284 11.8699 12.1812 11.988 12.0846 12.0846C11.988 12.1812 11.8709 12.2295 11.7333 12.2295C11.5957 12.2295 11.4786 12.1812 11.3821 12.0846L7.99999 8.70254Z"
        fill="#9EA6BA"
      />
    </svg>
  );
};

const ToolTipContainer = ({ isMobileView }) => {
  return (
    <ToolTip
      txt="Earn up to 50,000 PTT and Win amazing prizes by inviting your friends. To earn PrimeTrader Tokens share your referral code by emai l and on social media with your community."
      width="285px"
      height="137px"
      position="right"
    />
  );
};
