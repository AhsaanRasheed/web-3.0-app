"use client";
import ConfirmationBox from "@/app/_components/ConfirmationBox";

export default function Confirmation() {
  const onClose = () => console.log("Modal closed");
  const onAccept = () => console.log("Accepted");
  const onReject = () => console.log("Rejected");

  return (
    <>
      <ConfirmationBox
        title="Are you sure you want to close?"
        para="All the data will be deleted"
        acceptBtnTxt="Yes, close"
        rejectBtnTxt="Cancel"
        showAlert="true"
        btnOrder="reverse"
        onClose={onClose}
        onAccept={onAccept}
        onReject={onReject}
      />
    </>
  );
}
