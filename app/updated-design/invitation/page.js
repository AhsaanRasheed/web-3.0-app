"use client";
import Modal from "@/app/_components/Modal";
import Button from "@/app/_components/Button";
import { useState } from "react";
import styles from "./style.module.scss"; // Import the CSS module

export default function InviteFriend() {
  const onClose = () => console.log("Modal closed");
  const [subject, setSubject] = useState(
    "You have been invited to PrimeTrader"
  );
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    console.log(
      "Sending invitation with subject:",
      subject,
      "and message:",
      message
    );
  };
  const [selectedOption, setSelectedOption] = useState("");
  console.log("Selected option:", selectedOption);

  return (
    <Modal showModal={true} onClose={onClose}>
      <div className={styles.main_div}>
        <div className="heading-container">
          <h1 className="heading-1">Send an invitation to your friends</h1>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.subjectSection}>
            <p className="info-plain-text">Subject</p>
            <label className={styles["container"]}>
              <p className={`text-style-1`}>
                You have been invited to PrimeTrader
              </p>
              <input
                type="radio"
                name="select"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={() => setSelectedOption("option1")}
              />
            </label>
            <label className={styles["container"]}>
              <div className={styles.inputDiv}>
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Add Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ opacity: 1 }}
                  />
                </div>
                <p className={`text-style-1`}>Invited you to PrimeTrader</p>
              </div>

              <input
                type="radio"
                name="select"
                value="option2"
                checked={selectedOption === "option2"}
                onChange={() => setSelectedOption("option2")}
              />
            </label>
          </div>

          <div className={styles.messageSection}>
            <label htmlFor="message" className="info-plain-text">
              Message
            </label>
            <textarea
              className={`textarea text-style-1`}
              id="message"
              name="message"
              value={message}
              onChange={handleMessageChange}
              placeholder="Add personal invitation message"
            ></textarea>
          </div>
          <div className="note">
            <p className={`color-gray text-style-1`}>
              A warm welcome from PrimeTrader
            </p>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button label="Send" onClick={handleSend} />
        </div>
      </div>
    </Modal>
  );
}
