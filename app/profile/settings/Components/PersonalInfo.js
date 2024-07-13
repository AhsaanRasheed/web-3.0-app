import React, { useState, useEffect } from "react";
import styles from "../../style.module.scss";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import Modal from "@/app/_components/Modal";

import { update_user_info_api } from "@/app/services/service";
import Button from "@/app/_components/global/Button/Button";
import TextButton from "@/app/_components/global/Button/TextButton";
import InputTxt from "@/app/_components/global/Input/InputTxt";
import DropDown from "@/app/_components/global/DropDown/DropDown";
import { SET_USER } from "@/app/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import { current } from "@reduxjs/toolkit";
import PhoneDropDown from "@/app/_components/global/DropDown/PhoneDropDown/PhoneDropDown";
const PersonalInfo = ({ prevResp, refresh, setRefresh, isMobileView }) => {
  const [showModal, setShowModal] = useState(false);
  const [prevRespNow, setPrevRespNow] = useState(prevResp);
  useEffect(() => {
    setPrevRespNow(prevResp);
  }, [prevResp]);

  return (
    <div className={styles.card}>
      <div className={styles.topBar}>
        <label className={`${isMobileView ? "txt_Title2" : "txt_Heading3"}`}>
          Personal Info
        </label>
      </div>
      <div className={styles.cardBody} style={{ marginTop: "30px" }}>
        <div className={styles.infoSide} style={{ height: "220px" }}>
          <div className={styles.row}>
            <div className={styles.type}>
              <label className="txt_Body2">First name</label>
            </div>
            <div className={styles.content}>
              <label className="txt_Body1">{prevResp?.first_name}</label>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.type}>
              <label className="txt_Body2">E-mail</label>
            </div>
            <div className={styles.content}>
              <label className="txt_Body1">{prevResp?.email}</label>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.type}>
              <label className="txt_Body2">Address Line 1</label>
            </div>
            <div className={styles.content}>
              <label className="txt_Body1">{prevResp?.addr_line_1}</label>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.type}>
              <label className="txt_Body2">City</label>
            </div>
            <div className={styles.content}>
              <label className="txt_Body1">{prevResp?.city}</label>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.type}>
              <label className="txt_Body2">Postal Code</label>
            </div>
            <div className={styles.content}>
              <label className="txt_Body1">{prevResp?.postal_code}</label>
            </div>
          </div>
        </div>
        <div className={styles.infoSide} style={{ height: "220px" }}>
          <div className={styles.row}>
            <div className={styles.type}>
              <label className="txt_Body2">Last name</label>
            </div>
            <div className={styles.content}>
              <label className="txt_Body1">{prevResp?.last_name}</label>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.type}>
              <label className="txt_Body2">Phone number</label>
            </div>
            <div className={styles.content}>
              <label className="txt_Body1">{prevResp?.phone}</label>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.type}>
              <label className="txt_Body2">Address Line 2</label>
            </div>
            <div className={styles.content}>
              <label className="txt_Body1">{prevResp?.addr_line_2}</label>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.type}>
              <label className="txt_Body2">State/Province</label>
            </div>
            <div className={styles.content}>
              <label className="txt_Body1">{prevResp?.state}</label>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.type}>
              <label className="txt_Body2">Country</label>
            </div>
            <div className={styles.content}>
              <label className="txt_Body1">{prevResp?.country}</label>
            </div>
          </div>
        </div>

        <div className={styles.btnSide}>
          <Button
            text={"Edit"}
            onClick={() => {
              setShowModal(true);
            }}
            Custom_minWidth={"100%"}
            Custom_maxWidth={"100%"}
            Custom_width={"100%"}
            Custom_height={"51px"}
          />
        </div>
      </div>
      <InfoModal
        isMobileView={isMobileView}
        showModal={showModal}
        setShowModal={setShowModal}
        prevResp={prevRespNow}
        setRefresh={setRefresh}
        refresh={refresh}
      />
    </div>
  );
};

export default PersonalInfo;

function InfoModal({
  showModal,
  setShowModal,
  isMobileView,
  prevResp,
  refresh,
  setRefresh,
}) {
  // console.log(prevResp);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profileVisibility.user);
  const [firstName, setFirstName] = useState(prevResp?.first_name);
  const [firstNameError, setFirstNameError] = useState(false);

  const [lastName, setLastName] = useState(prevResp?.last_name);
  const [lastNameError, setLastNameError] = useState(false);

  const [email, setEmail] = useState(prevResp?.email);

  const [phone, setPhone] = useState(prevResp?.phone);
  const [phoneError, setPhoneError] = useState(false);

  const [adrLine1, setAdrLine1] = useState(prevResp?.addr_line_1);
  const [adrLine1Error, setAdrLine1Error] = useState(false);

  const [adrLine2, setAdrLine2] = useState(prevResp?.addr_line_2);
  const [adrLine2Error, setAdrLine2Error] = useState(false);

  const [city, setCity] = useState(prevResp?.city);
  const [cityError, setCityError] = useState(false);

  const [state, setState] = useState(prevResp?.state);
  const [stateError, setStateError] = useState(false);

  const [postalCode, setPostalCode] = useState(prevResp?.postal_code);
  const [postalCodeError, setPostalCodeError] = useState(false);

  const [country, setCountry] = useState(prevResp?.country);
  const [countryError, setCountryError] = useState(false);

  const { addNotification } = useNotification();
  const { toggleLoader } = useLoader();

  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };
  function isValidFirstName() {
    const regex = /^[a-zA-Z\s]+$/;
    if (firstName == undefined) {
      setFirstNameError(true);
      return false;
    }
    if (
      firstName.length >= 30 ||
      !regex.test(firstName) ||
      firstName.length < 3
    ) {
      setFirstNameError(true);
      return false;
    }
    if (firstNameError) {
      setFirstNameError(false);
    }

    return true;
  }

  function isValidLastName() {
    const regex = /^[a-zA-Z\s]+$/;
    if (lastName == undefined) {
      setLastNameError(true);
      return false;
    }
    if (lastName.length >= 30 || !regex.test(lastName) || lastName.length < 3) {
      setLastNameError(true);
      return false;
    }
    if (lastNameError) {
      setLastNameError(false);
    }

    return true;
  }

  function isValidAddrLine1() {
    if (adrLine1 == undefined) {
      setAdrLine1Error(true);
      return false;
    }
    if (adrLine1.length >= 60 || adrLine1.length < 3) {
      setAdrLine1Error(true);
      return false;
    }
    if (adrLine1Error) {
      setAdrLine1Error(false);
    }

    return true;
  }
  function isValidAddrLine2() {
    if (adrLine2 == undefined) {
      setAdrLine2Error(true);
      return false;
    }
    if (adrLine2.length >= 60 || adrLine2.length < 3) {
      setAdrLine2Error(true);
      return false;
    }
    if (adrLine2Error) {
      setAdrLine2Error(false);
    }

    return true;
  }

  function isValidCity() {
    const regex = /^[a-zA-Z0-9\s]+$/;
    if (city == undefined) {
      setCityError(true);
      return false;
    }
    if (city.length >= 30 || !regex.test(city) || city.length < 3) {
      setCityError(true);
      return false;
    }

    if (cityError) {
      setCityError(false);
    }
    return true;
  }

  function isValidState() {
    const regex = /^[a-zA-Z0-9\s]+$/;
    if (state == undefined) {
      setStateError(true);
      return false;
    }
    if (state.length >= 30 || !regex.test(state) || state.length < 3) {
      setStateError(true);
      return false;
    }
    if (stateError) {
      setStateError(false);
    }
    return true;
  }

  function isValidPostalCode() {
    const regex = /^[a-zA-Z0-9\s]+$/;
    if (postalCode == undefined) {
      setPostalCodeError(true);
      return false;
    }
    if (
      postalCode.length >= 30 ||
      !regex.test(postalCode) ||
      postalCode.length < 3
    ) {
      setPostalCodeError(true);
      return false;
    }
    if (postalCodeError) {
      setPostalCodeError(false);
    }
    return true;
  }

  function isValidCountry(countryName) {
    let countriesData = CountriesData();
    if (country == undefined) {
      setCountryError(true);
      return false;
    }
    if (countriesData.some((country) => country.label === countryName)) {
      // setCountryError(false);
      return true;
    } else {
      handleAddNotification(
        "fail",
        "Select the Country from the dropdown only"
      );
      return false;
    }
  }
  useEffect(() => {
    setFirstName(prevResp?.first_name);

    setLastName(prevResp?.last_name);

    setEmail(prevResp?.email);

    setPhone(prevResp?.phone);

    setAdrLine1(prevResp?.addr_line_1);

    setAdrLine2(prevResp?.addr_line_2);

    setCity(prevResp?.city);

    setState(prevResp?.state);

    setPostalCode(prevResp?.postal_code);

    setCountry(prevResp?.country);
  }, [prevResp]);
  useEffect(() => {
    if (countryError) setCountryError(false);
  }, [country]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleLoader(true);
    try {

    let isAllValid = true;
    isAllValid = isValidFirstName() && isAllValid;
    isAllValid = isValidCountry(country) && isAllValid;
    isAllValid = isValidLastName() && isAllValid;
    isAllValid = isValidAddrLine1() && isAllValid;
    isAllValid = isValidAddrLine2() && isAllValid;
    isAllValid = isValidCity() && isAllValid;
    isAllValid = isValidState() && isAllValid;
    isAllValid = isValidPostalCode() && isAllValid;

    if (isAllValid) {
      try {
        const resp = await update_user_info_api({
          first_name: firstName,
          country: country,
          currency: prevResp?.currency == "" ? "-" : prevResp?.currency,
          time_zone: prevResp?.time_zone == "" ? "-" : prevResp?.time_zone,
          language: prevResp?.language == "" ? "-" : prevResp?.language,
          addr_line_1: adrLine1,
          addr_line_2: adrLine2,

          city: city,
          state: state,
          postal_code: postalCode,
          last_name: lastName,
          phone: phone,
        });
        console.log(resp);
        if (resp.code == 200) {
          // alert("account information updated successfully");
          handleAddNotification("success", "Account information updated");
          let temp = JSON.parse(JSON.stringify(user));
          temp.first_name = firstName;
          temp.last_name = lastName;
          secureLocalStorage.setItem("user", JSON.stringify(temp));
          localStorage.setItem("user", JSON.stringify(temp));

          dispatch({ type: SET_USER, payload: temp });
          toggleLoader(false);
          setRefresh(!refresh);
          onCancel();
        }
      } catch (error) {
        // alert("An error occurred while updating user information.");
        console.log(error);
        handleAddNotification(
          "fail",
          "Error occurred while updating information"
        );
      }
    }
  } catch (e) {
  } finally {
    toggleLoader(false);
  }
  };

  const onCancel = () => {
    setFirstNameError(false);
    setLastNameError(false);
    setPhoneError(false);
    setAdrLine1Error(false);
    setAdrLine2Error(false);
    setCityError(false);
    setStateError(false);
    setPostalCodeError(false);
    setCountryError(false);

    setShowModal(false);
  };
  return (
    <div>
      <Modal showModal={showModal} onClose={() => onCancel()}>
        <>
          <div className={styles.center_container}>
            <label
              className={`${
                isMobileView ? `txt_Large_title` : `txt_Heading1`
              } txt_align_center`}
            >
              Edit your personal info
            </label>
            <br />
            <br />

            <div
              className={`${styles.Modalcontent} ${styles.ModalcontentSetting}`}
            >
              <form
                className={`${styles.form} ${styles.SettingInfoForm}`}
                onSubmit={handleSubmit}
                noValidate={true}
              >
                <div className={styles.FormRow}>
                  <div className={styles.FormCol}>
                    <div className={styles.inputBox}>
                      <InputTxt
                        value={firstName}
                        placeHolder="First name"
                        Custom_width="100%"
                        Custom_minWidth="99%"
                        label="First name"
                        show_error={firstNameError}
                        error_msg={
                          "Name should be 3 to 30 characters without special characters."
                        }
                        onChange={(value) => {
                          setFirstName(value);
                        }}
                      />
                    </div>
                    <div className={styles.inputBox}>
                      <InputTxt
                        value={email}
                        placeHolder="E-Mail"
                        Custom_width="100%"
                        Custom_minWidth="99%"
                        label="E-Mail"
                        show_error={false}
                        error_msg={""}
                        onChange={(value) => {}}
                        disable={true}
                      />
                    </div>
                    <div className={styles.inputBox}>
                      <InputTxt
                        value={adrLine1}
                        placeHolder="Address Line 1"
                        Custom_width="100%"
                        Custom_minWidth="99%"
                        label="Address Line 1"
                        show_error={adrLine1Error}
                        error_msg={
                          "Address must be between 3 and 60 characters."
                        }
                        onChange={(value) => {
                          setAdrLine1(value);
                        }}
                      />
                    </div>
                    <div className={styles.inputBox}>
                      <InputTxt
                        value={city}
                        placeHolder="City"
                        Custom_width="100%"
                        Custom_minWidth="99%"
                        label="City"
                        show_error={cityError}
                        error_msg={
                          "City should be 3 to 30 characters without special characters."
                        }
                        onChange={(value) => {
                          setCity(value);
                        }}
                      />
                    </div>
                    <div className={styles.inputBox}>
                      <InputTxt
                        value={postalCode}
                        placeHolder="Postal code"
                        Custom_width="100%"
                        Custom_minWidth="99%"
                        label="Postal code"
                        show_error={postalCodeError}
                        error_msg={"Invalid Postal Code"}
                        onChange={(value) => {
                          setPostalCode(value);
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.FormCol}>
                    <div className={styles.inputBox}>
                      <InputTxt
                        value={lastName}
                        placeHolder="Last name"
                        Custom_width="100%"
                        Custom_minWidth="99%"
                        label="Last name"
                        show_error={lastNameError}
                        error_msg={
                          "Name should be 3 to 30 characters without special characters."
                        }
                        onChange={(value) => {
                          setLastName(value);
                        }}
                      />
                    </div>
                    <div className={styles.inputBox}>
                      {/* <InputTxt
                        value={phone}
                        placeHolder="Phone"
                        Custom_width="100%"
                        Custom_minWidth="99%"
                        label="Phone number"
                        show_error={phoneError}
                        error_msg={"Invalid Phone number."}
                        onChange={(value) => {
                          setPhone(value);
                        }}
                      /> */}
                      <label className="txt_Body3">Country</label>
                      <div style={{ paddingTop: "5px", width: "100%" }}>
                        <PhoneDropDown
                          prevPhoneNumber={prevResp?.phone}
                          onNumberUpdate={(e) => {
                            setPhone(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.inputBox}>
                      <InputTxt
                        value={adrLine2}
                        placeHolder="Address Line 2"
                        Custom_width="100%"
                        Custom_minWidth="99%"
                        label="Address Line 2"
                        show_error={adrLine2Error}
                        error_msg={
                          "Address must be between 3 and 60 characters."
                        }
                        onChange={(value) => {
                          setAdrLine2(value);
                        }}
                      />
                    </div>
                    <div className={styles.inputBox}>
                      <InputTxt
                        value={state}
                        placeHolder="State/Province"
                        Custom_width="100%"
                        Custom_minWidth="99%"
                        label="State/Province"
                        show_error={stateError}
                        error_msg={
                          "State/Province should be 3 to 30 characters."
                        }
                        onChange={(value) => {
                          setState(value);
                        }}
                      />
                    </div>
                    <div className={styles.inputBox}>
                      <label className="txt_Body3">Country</label>
                      <div style={{ paddingTop: "5px" }}>
                        <DropDown
                          listOfItems={CountriesData()}
                          Custom_width={"100%"}
                          Custom_minWidth={"100%"}
                          Custom_maxWidth={"100%"}
                          onSelect={(val) => setCountry(val)}
                          Custom_height="50px"
                          Custom_bg={"#050E1D"}
                          Custom_shadow={
                            "0px 4px 16px 0px #0066FF52 !important"
                          }
                          isSearchable={true}
                          placeholder={"Country"}
                          DefaultValue={
                            country == null || country == ""
                              ? null
                              : {
                                  value: country,
                                  label: country,
                                }
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className={styles.center_container}>
                  <Button
                    text="Save"
                    // onClick={() => {handleSubmit}}
                    submit={true}
                    Custom_width={isMobileView ? "100%" : null}
                    Custom_maxWidth={isMobileView ? "100%" : null}
                  />
                </div>
              </form>
            </div>
          </div>
        </>
      </Modal>
    </div>
  );
}

function CountriesData() {
  return [
    { label: "Afghanistan", code: "AF" },
    { label: "Åland Islands", code: "AX" },
    { label: "Albania", code: "AL" },
    { label: "Algeria", code: "DZ" },
    { label: "American Samoa", code: "AS" },
    { label: "AndorrA", code: "AD" },
    { label: "Angola", code: "AO" },
    { label: "Anguilla", code: "AI" },
    { label: "Antarctica", code: "AQ" },
    { label: "Antigua and Barbuda", code: "AG" },
    { label: "Argentina", code: "AR" },
    { label: "Armenia", code: "AM" },
    { label: "Aruba", code: "AW" },
    { label: "Australia", code: "AU" },
    { label: "Austria", code: "AT" },
    { label: "Azerbaijan", code: "AZ" },
    { label: "Bahamas", code: "BS" },
    { label: "Bahrain", code: "BH" },
    { label: "Bangladesh", code: "BD" },
    { label: "Barbados", code: "BB" },
    { label: "Belarus", code: "BY" },
    { label: "Belgium", code: "BE" },
    { label: "Belize", code: "BZ" },
    { label: "Benin", code: "BJ" },
    { label: "Bermuda", code: "BM" },
    { label: "Bhutan", code: "BT" },
    { label: "Bolivia", code: "BO" },
    { label: "Bosnia and Herzegovina", code: "BA" },
    { label: "Botswana", code: "BW" },
    { label: "Bouvet Island", code: "BV" },
    { label: "Brazil", code: "BR" },
    { label: "British Indian Ocean Territory", code: "IO" },
    { label: "Brunei Darussalam", code: "BN" },
    { label: "Bulgaria", code: "BG" },
    { label: "Burkina Faso", code: "BF" },
    { label: "Burundi", code: "BI" },
    { label: "Cambodia", code: "KH" },
    { label: "Cameroon", code: "CM" },
    { label: "Canada", code: "CA" },
    { label: "Cape Verde", code: "CV" },
    { label: "Cayman Islands", code: "KY" },
    { label: "Central African Republic", code: "CF" },
    { label: "Chad", code: "TD" },
    { label: "Chile", code: "CL" },
    { label: "China", code: "CN" },
    { label: "Christmas Island", code: "CX" },
    { label: "Cocos (Keeling) Islands", code: "CC" },
    { label: "Colombia", code: "CO" },
    { label: "Comoros", code: "KM" },
    { label: "Congo", code: "CG" },
    { label: "Congo, The Democratic Republic of the", code: "CD" },
    { label: "Cook Islands", code: "CK" },
    { label: "Costa Rica", code: "CR" },
    { label: 'Cote D"Ivoire', code: "CI" },
    { label: "Croatia", code: "HR" },
    { label: "Cuba", code: "CU" },
    { label: "Cyprus", code: "CY" },
    { label: "Czech Republic", code: "CZ" },
    { label: "Denmark", code: "DK" },
    { label: "Djibouti", code: "DJ" },
    { label: "Dominica", code: "DM" },
    { label: "Dominican Republic", code: "DO" },
    { label: "Ecuador", code: "EC" },
    { label: "Egypt", code: "EG" },
    { label: "El Salvador", code: "SV" },
    { label: "Equatorial Guinea", code: "GQ" },
    { label: "Eritrea", code: "ER" },
    { label: "Estonia", code: "EE" },
    { label: "Ethiopia", code: "ET" },
    { label: "Falkland Islands (Malvinas)", code: "FK" },
    { label: "Faroe Islands", code: "FO" },
    { label: "Fiji", code: "FJ" },
    { label: "Finland", code: "FI" },
    { label: "France", code: "FR" },
    { label: "French Guiana", code: "GF" },
    { label: "French Polynesia", code: "PF" },
    { label: "French Southern Territories", code: "TF" },
    { label: "Gabon", code: "GA" },
    { label: "Gambia", code: "GM" },
    { label: "Georgia", code: "GE" },
    { label: "Germany", code: "DE" },
    { label: "Ghana", code: "GH" },
    { label: "Gibraltar", code: "GI" },
    { label: "Greece", code: "GR" },
    { label: "Greenland", code: "GL" },
    { label: "Grenada", code: "GD" },
    { label: "Guadeloupe", code: "GP" },
    { label: "Guam", code: "GU" },
    { label: "Guatemala", code: "GT" },
    { label: "Guernsey", code: "GG" },
    { label: "Guinea", code: "GN" },
    { label: "Guinea-Bissau", code: "GW" },
    { label: "Guyana", code: "GY" },
    { label: "Haiti", code: "HT" },
    { label: "Heard Island and Mcdonald Islands", code: "HM" },
    { label: "Holy See (Vatican City State)", code: "VA" },
    { label: "Honduras", code: "HN" },
    { label: "Hong Kong", code: "HK" },
    { label: "Hungary", code: "HU" },
    { label: "Iceland", code: "IS" },
    { label: "India", code: "IN" },
    { label: "Indonesia", code: "ID" },
    { label: "Iran, Islamic Republic Of", code: "IR" },
    { label: "Iraq", code: "IQ" },
    { label: "Ireland", code: "IE" },
    { label: "Isle of Man", code: "IM" },
    { label: "Israel", code: "IL" },
    { label: "Italy", code: "IT" },
    { label: "Jamaica", code: "JM" },
    { label: "Japan", code: "JP" },
    { label: "Jersey", code: "JE" },
    { label: "Jordan", code: "JO" },
    { label: "Kazakhstan", code: "KZ" },
    { label: "Kenya", code: "KE" },
    { label: "Kiribati", code: "KI" },
    { label: 'Korea, Democratic People"S Republic of', code: "KP" },
    { label: "Korea, Republic of", code: "KR" },
    { label: "Kuwait", code: "KW" },
    { label: "Kyrgyzstan", code: "KG" },
    { label: 'Lao People"S Democratic Republic', code: "LA" },
    { label: "Latvia", code: "LV" },
    { label: "Lebanon", code: "LB" },
    { label: "Lesotho", code: "LS" },
    { label: "Liberia", code: "LR" },
    { label: "Libyan Arab Jamahiriya", code: "LY" },
    { label: "Liechtenstein", code: "LI" },
    { label: "Lithuania", code: "LT" },
    { label: "Luxembourg", code: "LU" },
    { label: "Macao", code: "MO" },
    { label: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
    { label: "Madagascar", code: "MG" },
    { label: "Malawi", code: "MW" },
    { label: "Malaysia", code: "MY" },
    { label: "Maldives", code: "MV" },
    { label: "Mali", code: "ML" },
    { label: "Malta", code: "MT" },
    { label: "Marshall Islands", code: "MH" },
    { label: "Martinique", code: "MQ" },
    { label: "Mauritania", code: "MR" },
    { label: "Mauritius", code: "MU" },
    { label: "Mayotte", code: "YT" },
    { label: "Mexico", code: "MX" },
    { label: "Micronesia, Federated States of", code: "FM" },
    { label: "Moldova, Republic of", code: "MD" },
    { label: "Monaco", code: "MC" },
    { label: "Mongolia", code: "MN" },
    { label: "Montserrat", code: "MS" },
    { label: "Morocco", code: "MA" },
    { label: "Mozambique", code: "MZ" },
    { label: "Myanmar", code: "MM" },
    { label: "Namibia", code: "NA" },
    { label: "Nauru", code: "NR" },
    { label: "Nepal", code: "NP" },
    { label: "Netherlands", code: "NL" },
    { label: "Netherlands Antilles", code: "AN" },
    { label: "New Caledonia", code: "NC" },
    { label: "New Zealand", code: "NZ" },
    { label: "Nicaragua", code: "NI" },
    { label: "Niger", code: "NE" },
    { label: "Nigeria", code: "NG" },
    { label: "Niue", code: "NU" },
    { label: "Norfolk Island", code: "NF" },
    { label: "Northern Mariana Islands", code: "MP" },
    { label: "Norway", code: "NO" },
    { label: "Oman", code: "OM" },
    { label: "Pakistan", code: "PK" },
    { label: "Palau", code: "PW" },
    { label: "Palestinian Territory, Occupied", code: "PS" },
    { label: "Panama", code: "PA" },
    { label: "Papua New Guinea", code: "PG" },
    { label: "Paraguay", code: "PY" },
    { label: "Peru", code: "PE" },
    { label: "Philippines", code: "PH" },
    { label: "Pitcairn", code: "PN" },
    { label: "Poland", code: "PL" },
    { label: "Portugal", code: "PT" },
    { label: "Puerto Rico", code: "PR" },
    { label: "Qatar", code: "QA" },
    { label: "Reunion", code: "RE" },
    { label: "Romania", code: "RO" },
    { label: "Russian Federation", code: "RU" },
    { label: "RWANDA", code: "RW" },
    { label: "Saint Helena", code: "SH" },
    { label: "Saint Kitts and Nevis", code: "KN" },
    { label: "Saint Lucia", code: "LC" },
    { label: "Saint Pierre and Miquelon", code: "PM" },
    { label: "Saint Vincent and the Grenadines", code: "VC" },
    { label: "Samoa", code: "WS" },
    { label: "San Marino", code: "SM" },
    { label: "Sao Tome and Principe", code: "ST" },
    { label: "Saudi Arabia", code: "SA" },
    { label: "Senegal", code: "SN" },
    { label: "Serbia and Montenegro", code: "CS" },
    { label: "Seychelles", code: "SC" },
    { label: "Sierra Leone", code: "SL" },
    { label: "Singapore", code: "SG" },
    { label: "Slovakia", code: "SK" },
    { label: "Slovenia", code: "SI" },
    { label: "Solomon Islands", code: "SB" },
    { label: "Somalia", code: "SO" },
    { label: "South Africa", code: "ZA" },
    { label: "South Georgia and the South Sandwich Islands", code: "GS" },
    { label: "Spain", code: "ES" },
    { label: "Sri Lanka", code: "LK" },
    { label: "Sudan", code: "SD" },
    { label: "Suriname", code: "SR" },
    { label: "Svalbard and Jan Mayen", code: "SJ" },
    { label: "Swaziland", code: "SZ" },
    { label: "Sweden", code: "SE" },
    { label: "Switzerland", code: "CH" },
    { label: "Syrian Arab Republic", code: "SY" },
    { label: "Taiwan", code: "TW" },
    { label: "Tajikistan", code: "TJ" },
    { label: "Tanzania, United Republic of", code: "TZ" },
    { label: "Thailand", code: "TH" },
    { label: "Timor-Leste", code: "TL" },
    { label: "Togo", code: "TG" },
    { label: "Tokelau", code: "TK" },
    { label: "Tonga", code: "TO" },
    { label: "Trinidad and Tobago", code: "TT" },
    { label: "Tunisia", code: "TN" },
    { label: "Turkey", code: "TR" },
    { label: "Turkmenistan", code: "TM" },
    { label: "Turks and Caicos Islands", code: "TC" },
    { label: "Tuvalu", code: "TV" },
    { label: "Uganda", code: "UG" },
    { label: "Ukraine", code: "UA" },
    { label: "United Arab Emirates", code: "AE" },
    { label: "United Kingdom", code: "GB" },
    { label: "United States", code: "US" },
    { label: "United States Minor Outlying Islands", code: "UM" },
    { label: "Uruguay", code: "UY" },
    { label: "Uzbekistan", code: "UZ" },
    { label: "Vanuatu", code: "VU" },
    { label: "Venezuela", code: "VE" },
    { label: "Viet Nam", code: "VN" },
    { label: "Virgin Islands, British", code: "VG" },
    { label: "Virgin Islands, U.S.", code: "VI" },
    { label: "Wallis and Futuna", code: "WF" },
    { label: "Western Sahara", code: "EH" },
    { label: "Yemen", code: "YE" },
    { label: "Zambia", code: "ZM" },
    { label: "Zimbabwe", code: "ZW" },
  ];
}
