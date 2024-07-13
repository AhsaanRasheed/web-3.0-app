"use client";
import React, { useState, useEffect } from "react";
// import Info from "./Components/Info";
import Link from "next/link";
// import PersonalInfo from "./Components/PersonalInfo";
// import Preferences from "./Components/Preferences";
import style from "./style.module.scss";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import { get_user_profile, put_user_profile } from "@/app/services/new_service";
import PhoneDropDown from "./newComponent/PhoneDropDown/PhoneDropDown";
import InputTxtNew from "./newComponent/InputTxt/InputTxtNew";
import DropDown from "./newComponent/Dropdown/DropDown";
import Button from "./newComponent/button/Button";
import secureLocalStorage from "react-secure-storage";
import { useDispatch } from "react-redux";
import { SET_USER, TOGGLE_PROFILE_VISIBILITY } from "@/app/actionTypes";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";

const Settings = (props) => { 
  const [resp, setResp] = useState({ 
    user_id: "619de119-cc8e-4778-9970-4e5354df2aa8",
    firstname: "",
    lastname: "",
    nickname: "",
    profile_pic_url: "",
    gender: "undefined",
    phone: "",
    country: "United States",
    city: "",
    birthdate: "0001-01-01T00:00:00Z",
    addr_line1: "",
    addr_line2: "",
    state: "",
    language: "EN",
    currency: "USD",
    postal_code: "",
    timezone: "",
  });
  const dispatch = useDispatch();

  const [editProfile, setEditProfile] = useState(false);
  const { toggleLoader } = useLoader();
  const { addNotification } = useNotification();

  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };
  const getValue = async () => {
    toggleLoader(true);
    try {
      let va = await get_user_profile();
      console.log(va);
      // va.username = secureLocalStorage.getItem("username");
      setResp(va);
    } catch (e) {
    } finally {
      toggleLoader(false);
    }
  };
  const updateProfile = async (body) => {
    toggleLoader(true);
    try {
      let va = await put_user_profile(body);
      console.log(va);
      if (va.message == "account information updated successfully") {
        handleAddNotification(
          "success",
          "Account information updated successfully."
        );

        secureLocalStorage.setItem("user", JSON.stringify(body));
        localStorage.setItem("user", JSON.stringify(body));

        dispatch({
          type: SET_USER,
          payload: body,
        });
        setResp(body);
        secureLocalStorage.setItem("username", body.username);
        localStorage.setItem("username", body.username);
        setEditProfile(false);
      } else if (va.message == "Username already in use") {
        handleAddNotification("fail", "Username already in use.");
      } else {
        handleAddNotification("fail", "Fail to Update Profile.");
      }
      // setResp(va);
    } catch (e) {
      console.log(e);
      handleAddNotification("fail", "Fail to Update Profile.");
    } finally {
      toggleLoader(false);
    }
  };
  useEffect(() => {
    getValue();
  }, []);
  return (
    <>
      <div className={style.mainCard}>
        <div className={style.titleBar}>
          <label className={style.titletxt}>
            {editProfile ? "Edit Profile Settings" : "Profile Settings"}
          </label>
          {editProfile ? (
            <div
              className={style.editBtn}
              onClick={() => setEditProfile(false)}
            >
              <label>Close</label>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ) : (
            <div className={style.editBtn} onClick={() => setEditProfile(true)}>
              <label>Edit</label>
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_3459_77897)">
                  <path
                    d="M15.834 6.0015C16.0091 5.82641 16.2169 5.68751 16.4457 5.59275C16.6745 5.49799 16.9197 5.44922 17.1673 5.44922C17.4149 5.44922 17.6601 5.49799 17.8889 5.59275C18.1177 5.68751 18.3256 5.82641 18.5007 6.0015C18.6757 6.1766 18.8146 6.38447 18.9094 6.61324C19.0042 6.84202 19.0529 7.08721 19.0529 7.33484C19.0529 7.58246 19.0042 7.82766 18.9094 8.05643C18.8146 8.28521 18.6757 8.49307 18.5007 8.66817L9.50065 17.6682L5.83398 18.6682L6.83398 15.0015L15.834 6.0015Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3459_77897">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(4.5 4)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          )}
        </div>

        {editProfile ? (
          <PersonalInfoEditCard
            user={resp}
            onUpdateClose={() => setEditProfile(false)}
            onUpdate={updateProfile}
          />
        ) : (
          <PersonalInfoCard user={resp} />
        )}
        {/*  */}
      </div>
    </>
  );
};

export default Settings;
const PersonalInfoEditCard = ({ user, onUpdateClose, onUpdate }) => {
  const [firstname, setFirstname] = useState(user?.firstname);
  const [firstnameError, setFirstnameError] = useState(null);

  const [lastname, setLastname] = useState(user?.lastname);
  const [lastnameError, setLastnameError] = useState(null);

  const [Username, setUsername] = useState(user?.username);
  const [usernameError, setUsernameError] = useState(null);

  const [email, setEmail] = useState(user?.email);
  const [emailError, setEmailError] = useState(false);

  const [phone, setPhone] = useState(user?.phone);
  const [phoneError, setPhoneError] = useState(false);

  const [addrline1, setAddrline1] = useState(user?.addr_line1);
  const [addrline1Error, setAddrline1Error] = useState(false);

  const [addrline2, setAddrline2] = useState(user?.addr_line2);
  const [addrline2Error, setAddrline2Error] = useState(false);

  const [city, setCity] = useState(user?.city);
  const [cityError, setCityError] = useState(false);

  const [state, setState] = useState(user?.state);
  const [stateError, setStateError] = useState(false);

  const [country, setCountry] = useState(user?.country);
  const [countryError, setCountryError] = useState(false);

  const [postalCode, setPostalCode] = useState(user?.postal_code);
  const [postalCodeError, setPostalCodeError] = useState(false);

  const CountryLists = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "AntiguaAndBarbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "BosniaAndHerzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "BurkinaFaso",
    "Burundi",
    "CaboVerde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "CentralAfricanRepublic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "DemocraticRepublicOfTheCongo",
    "RepublicOfTheCongo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "CzechRepublic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "DominicanRepublic",
    "Ecuador",
    "Egypt",
    "ElSalvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "GuineaBissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "NorthKorea",
    "SouthKorea",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "MarshallIslands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "NorthMacedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua NewGuinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "SaintKittsAndNevis",
    "SaintLucia",
    "SaintVincentAndTheGrenadines",
    "Samoa",
    "SanMarino",
    "SaoTomeAndPrincipe",
    "SaudiArabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "SierraLeone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "SolomonIslands",
    "Somalia",
    "SouthAfrica",
    "SouthSudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "TimorLeste",
    "Togo",
    "Tonga",
    "TrinidadAndTobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "UnitedArabEmirates",
    "UnitedKingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];
  const countryOptions = CountryLists.map((option) => ({
    label: option,
    value: option,
  }));

  function isMinMaxValid(text, error, setError) {
    const regex = /^[a-zA-Z0-9\s]+$/;
    if (text == undefined || text == "" || text == " ") {
      setError("Name should have at least 3 characters.");
      return false;
    }
    if (text.length >= 30 || text.length < 3) {
      setError("Name should have at least 3 and max 30 characters.");
      return false;
    }
    if (!regex.test(text)) {
      setError("Name should not include any special characters.");
      return false;
    }
    if (error != null) {
      setError(null);
    }

    return true;
  }
  function isUsernameValid(text, error, setError) {
    const regex = /^[a-zA-Z0-9]+$/;
    if (text == undefined || text == "" || text == " ") {
      setError(true);
      return false;
    }
    if (text.length >= 30 || text.length < 3) {
      setError(true);
      return false;
    }
    if (error) {
      setError(false);
    }

    return true;
  }
  const onSubmit = async () => {
    let isAllValid = true;
    isAllValid =
      isMinMaxValid(firstname, firstnameError, setFirstnameError) && isAllValid;
    isAllValid =
      isMinMaxValid(lastname, lastnameError, setLastnameError) && isAllValid;
    isAllValid =
      isUsernameValid(Username, usernameError, setUsernameError) && isAllValid;
    // isAllValid =
    //   isMinMaxValid(addrline1, addrline1, setAddrline1Error) && isAllValid;
    // isAllValid = isMinMaxValid(city, cityError, setCityError) && isAllValid;
    // isAllValid = isMinMaxValid(state, stateError, setStateError) && isAllValid;
    // isAllValid =
    //   isMinMaxValid(postalCode, postalCodeError, setPostalCodeError) &&
    //   isAllValid;

    // if (phone.length < 7) {
    //   setPhoneError(true);
    //   isAllValid = false;
    // } else if (phoneError) {
    //   setPhoneError(false);
    // }
    if (isAllValid) {
      let body = {
        firstname: firstname,
        lastname: lastname,
        nickname: "",
        profile_pic_url: "",
        gender: "male",
        phone: phone,
        country: country,
        city: city,
        birthdate: "2006-01-02T15:04:05Z",
        addr_line1: addrline1,
        addr_line2: addrline2,
        state: state,
        language: "English",
        currency: "Euro",
        postal_code: postalCode,
        timezone: "CET",
        username: Username,
        email: user?.email,
      };
      onUpdate(body);
    }
  };
  return (
    <div className={style.editForm}>
      <div className={style.topSec}>
        <label className={style.secTitleEdit}>Edit Your Personal Info</label>
        <div className={style.rowCol}>
          {/* <div className={style.col}> */}
          <div className={style.row}>
            <InputTxtNew
              label={"First Name*"}
              value={firstname}
              onChange={(e) => setFirstname(e)}
              placeHolder={"First Name"}
              showError={firstnameError != null}
              errorMsg={firstnameError}
            />
          </div>
          <div className={style.row}>
            <InputTxtNew
              label={"Last Name*"}
              value={lastname}
              onChange={(e) => setLastname(e)}
              placeHolder={"Last Name"}
              showError={lastnameError != null}
              errorMsg={lastnameError}
            />
          </div>
          <div className={style.row}>
            <InputTxtNew
              label={"Username*"}
              value={Username}
              onChange={(e) => setUsername(e.replace(/\s/g, ''))}
              placeHolder={"Username"}
              showError={usernameError}
              errorMsg={"Username should have 03-30 characters & unique."}
            />
          </div>
          {/* </div>
          <div className={style.col}> */}
          <div className={style.row}>
            <InputTxtNew
              label={"Email*"}
              value={email}
              onChange={(e) => setEmail(e)}
              placeHolder={"user@mail.com"}
              showError={emailError}
              errorMsg={"Email should correct & unique."}
              disabled={true}
            />
          </div>
          <div className={style.row}>
            <PhoneDropDown
              prevPhoneNumber={phone}
              onNumberUpdate={(e) => {
                setPhone(e);
              }}
              showError={phoneError}
              errorMsg={"Phone Number should have at least 6 digits."}
            />
          </div>
          <div className={`${style.row} ${style.emptyrow}`}>
            <label className={style.key}></label>
            <label className={style.value}></label>
          </div>

          {/* </div>
          <div className={style.col}> */}
          <div className={style.row}>
            <InputTxtNew
              label={"Address Line 01"}
              value={addrline1}
              onChange={(e) => setAddrline1(e)}
              placeHolder={"Address Line 01"}
              showError={addrline1Error}
              errorMsg={"Address Line should have at least 3 characters."}
            />
          </div>
          <div className={style.row}>
            <InputTxtNew
              label={"Address Line 02"}
              value={addrline2}
              onChange={(e) => setAddrline2(e)}
              placeHolder={"Address Line 02"}
              showError={addrline2Error}
              errorMsg={"Address Line should have at least 3 characters."}
            />
          </div>
          <div className={style.row}>
            <InputTxtNew
              label={"City"}
              value={city}
              onChange={(e) => setCity(e)}
              placeHolder={"City"}
              showError={cityError}
              errorMsg={"City should have at least 3 characters."}
            />
          </div>

          {/* </div>
      
          <div className={style.col}> */}
          <div className={style.row}>
            <InputTxtNew
              label={"State/Province"}
              value={state}
              onChange={(e) => setState(e)}
              placeHolder={"State/Province"}
              showError={stateError}
              errorMsg={"State/Province should have at least 3 characters."}
            />
          </div>
          <div className={style.row}>
            <InputTxtNew
              label={"Postal Code"}
              value={postalCode}
              onChange={(e) => setPostalCode(e)}
              placeHolder={"Postal Code"}
              showError={postalCodeError}
              errorMsg={"Postal Code should have at least 3 characters."}
            />
          </div>

          <div className={style.row}>
            {/* <label className={style.key}>Country</label>
            <label className={style.value}>{user.country}</label> */}
            <DropDown
              label={"Country*"}
              options={countryOptions}
              value={country}
              handleInputChange={country}
              onChange={(e) => setCountry(e)}
              onSearchCountryClick={() => {
                setCountry(null);
              }}
            />
          </div>
          {/* </div> */}
        </div>
      </div>
      {/* <div className={style.divider} /> */}

      <div className={style.topSec}>
        <label className={style.secTitle}>Edit Preferences</label>
        <div className={style.rowCol}>
          {/* <div className={style.col}> */}
          <div className={style.row}>
            <DropDown
              label={"Language"}
              options={[]}
              // value={language}
              value={"English"}
              onChange={(e) => setLanguage(e)}
              disabled={true}
            />
          </div>

          {/* </div> */}
          {/* <div className={style.col}> */}
          <div className={style.row}>
            <DropDown
              label={"Currency"}
              options={[]}
              // value={currency}
              value={"Euro"}
              onChange={(e) => setCurrency(e)}
              disabled={true}
            />
          </div>

          <div className={style.row}>
            <DropDown
              label={"Time Zone"}
              options={[]}
              // value={timezone}
              value={"CET"}
              onChange={(e) => setTimezone(e)}
              disabled={true}
            />
          </div>
          {/* </div> */}
        </div>
      </div>
      <div className={style.btnCon}>
        <Button txt={"Save"} onClick={() => onSubmit()} />
      </div>
    </div>
  );
};

const PersonalInfoCard = ({ user }) => {
  return (
    <div className={style.infoCard}>
      <div className={style.topSec}>
        <label className={style.secTitle}>Personal Info</label>
        <div className={style.rowCol}>
          {/* <div className={style.col}> */}
          <div className={style.row}>
            <label className={style.key}>First Name</label>
            <label className={style.value}>{user?.firstname}</label>
          </div>
          <div className={style.row}>
            <label className={style.key}>Last Name</label>
            <label className={style.value}>{user?.lastname}</label>
          </div>
          <div className={style.row}>
            <label className={style.key}>Username</label>
            <label className={style.value}>{user?.username}</label>
          </div>
          {/* </div>
          <div className={style.col}> */}
          <div className={style.row}>
            <label className={style.key}>Email</label>
            <label className={style.value}>{user?.email}</label>
          </div>
          <div className={style.row}>
            <label className={style.key}>Phone Numer</label>
            <label className={style.value}>{user?.phone}</label>
          </div>
          <div className={`${style.row} ${style.emptyrow}`}>
            <label className={style.key}></label>
            <label className={style.value}></label>
          </div>

          {/* </div>
          <div className={style.col}> */}
          <div className={style.row}>
            <label className={style.key}>Address Line 01</label>
            <label className={style.value}>{user?.addr_line1}</label>
          </div>
          <div className={style.row}>
            <label className={style.key}>Address Line 02</label>
            <label className={style.value}>{user?.addr_line2}</label>
          </div>
          <div className={style.row}>
            <label className={style.key}>City</label>
            <label className={style.value}>{user?.city}</label>
          </div>

          {/* </div>
      
          <div className={style.col}> */}
          <div className={style.row}>
            <label className={style.key}>State/Province</label>
            <label className={style.value}>{user?.state}</label>
          </div>
          <div className={style.row}>
            <label className={style.key}>Postal Code</label>
            <label className={style.value}>{user?.postal_code}</label>
          </div>

          <div className={style.row}>
            <label className={style.key}>Country</label>
            <label className={style.value}>{user?.country}</label>
          </div>
          {/* </div> */}
        </div>
      </div>
      <div className={style.divider} />

      <div className={style.topSec}>
        <label className={style.secTitle}>Preferences</label>
        <div className={style.rowCol}>
          {/* <div className={style.col}> */}
          <div className={style.row}>
            <label className={style.key}>Language</label>
            <label className={style.value}>{"English"}</label>
          </div>

          {/* </div> */}
          {/* <div className={style.col}> */}
          <div className={style.row}>
            <label className={style.key}>Currency</label>
            <label className={style.value}>{"Euro"}</label>
          </div>
          <div className={`${style.row} ${style.emptyrow}`}>
            <label className={style.key}></label>
            <label className={style.value}></label>
          </div>
          <div className={style.row}>
            <label className={style.key}>Time Zone</label>
            <label className={style.value}>{"CET"}</label>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};
