"use client";
import Modal from "@/app/_components/Modal";
import Button from "@/app/_components/Button";
import TagList from "@/app/_components/TagsComponent";
import { useState } from "react";

export default function AddFriend() {
  const [tags, setTags] = useState([
    "example1@gmail.com",
    "example2@gmail.com",
    "abc",
    "example2@gmail.com",
    "gmail.com",
    "example2@gmail.com",
    "example2@gmail.com",
    "gmail",
    "example2@gmail.com",
    "example2@gmail.com",
    "example2@gmail.com",
    "example2@gmail.com",
    "example2@gmail.com",
  ]);

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const onClose = () => console.log("Modal closed");
  return (
    <>
      <Modal showModal="true" onClose={onClose}>
        <div className="heading-container">
          <h1 className="heading-1">Add friends' E-mails</h1>
          <p className="heading-1-paraText">
            Enter E-mail addresses of all friends you want to invite to the
            PrimeTrader. Use Enter button on the keyboard to add several
            E-mails.
          </p>
        </div>
        <form className="content">
          <div className="form-container">
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email*
              </label>
              <div className="input-container">
                <input type="email" placeholder="Enter your Email" />
              </div>

              <p className="error-text" id="email-error">
                Please enter the correct E-mail address
              </p>
            </div>
          </div>
        </form>
        <p className="heading-1-paraText">Total added 0 E-mails</p>
        <TagList tags={tags} onRemoveTag={handleRemoveTag} />
        <div style={{ alignSelf: "center" }}>
          <Button label="Next" />
        </div>
      </Modal>
    </>
  );
}
