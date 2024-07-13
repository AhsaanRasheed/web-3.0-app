import React, { useState, useEffect } from "react";
import styles from "../../style.module.scss";
import Autocomplete from "react-autocomplete";
import { update_user_info_api } from "@/app/services/service";
import TextButton from "@/app/_components/global/Button/TextButton";
import DropDown from "@/app/_components/global/DropDown/DropDown";
import InputTxt from "@/app/_components/global/Input/InputTxt";
import Button from "@/app/_components/global/Button/Button";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";

const Preferences = ({ prevResp, refresh, setRefresh, isMobileView }) => {
  const [currency, setCurrency] = useState();
  const [currencyError, setCurrencyError] = useState(false);

  const [timezone, setTimezone] = useState();
  const [timezoneError, setTimezoneError] = useState(false);
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
  const [editable, setEdit] = useState(false);
  useEffect(() => {
    if (currencyError) setCurrencyError(false);
  }, [currency]);
  useEffect(() => {
    if (timezoneError) setTimezoneError(false);
  }, [timezone]);
  function isValidCurrency(Name) {
    let Data = CurrencyData();
    if (Data.some((item) => item.label === Name)) {
      // setCurrencyError(false);
      return true;
    } else {
      handleAddNotification(
        "fail",
        "Select the Currency from the dropdown only"
      );
      return false;
    }
  }

  function isValidTimeZone(Name) {
    let Data = TimeZoneData();
    if (Name === "" || Name === " " || Name == null) {
      // setTimezoneError(true);
      handleAddNotification("fail", "Timezone cannot be empty");
      return false;
    } else if (Data.some((item) => item.label === Name)) {
      // setCurrencyError(false);
      return true;
    } else {
      handleAddNotification(
        "fail",
        "Select the Timezone from the dropdown only"
      );
      return false;
    }
  }
  const handleSave = async () => {
    toggleLoader(true);
    try {

    let isAllValid = true;
    isAllValid = isValidCurrency(currency) && isAllValid;
    isAllValid = isValidTimeZone(timezone) && isAllValid;

    if (isAllValid) {
      try {
        const resp = await update_user_info_api({
          currency: currency,
          time_zone: timezone,
          first_name: prevResp?.first_name == "" ? " " : prevResp?.first_name,
          country: prevResp?.country == "" ? " " : prevResp?.country,
          language: prevResp?.language == "" ? "-" : prevResp?.language,
          addr_line_1: prevResp?.addr_line_1 == "" ? "-" : prevResp?.addr_line_1,
          city: prevResp?.city == "" ? "-" : prevResp?.city,
          last_name: prevResp?.last_name == "" ? "-" : prevResp?.last_name,
          phone: prevResp?.phone == "" ? "-" : prevResp?.phone,
        });
        console.log(resp);
        if (resp.code == 200) {
          // alert("account information updated successfully");
          handleAddNotification("success", "Account information updated");

          setEdit(false);
          toggleLoader(false);

          setRefresh(!refresh);
        }

        // alert("User information updated successfully!");
      } catch (error) {
        // alert(error);
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
    setCurrency(prevResp?.currency);
    setTimezone(prevResp?.time_zone);
    setCurrencyError(false);
    setTimezoneError(false);
    setEdit(false);
  };
  useEffect(() => {
    setCurrency(prevResp?.currency);
    setTimezone(prevResp?.time_zone);
  }, [prevResp]);

  return (
    <div className={styles.card}>
      <div className={styles.topBar}>
        <label className={`${isMobileView ? "txt_Title2" : "txt_Heading3"}`}>
          Preferenses
        </label>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.infoSide}>
          <div className={styles.row}>
            <div className={styles.type}>
              <label className="txt_Body2">Language</label>
            </div>
            <div className={styles.content}>
              <label className="txt_Body1">English</label>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.type}>
              <label className="txt_Body2">Currency</label>
            </div>
            <div className={styles.content}>
              {editable ? (
                <DropDown
                  listOfItems={CurrencyData()}
                  Custom_width={"98%"}
                  Custom_minWidth={"98%"}
                  Custom_maxWidth={"98%"}
                  onSelect={(val) => setCurrency(val)}
                  isSearchable={true}
                  DefaultValue={{
                    value: currency,
                    label: currency,
                  }}
                />
              ) : (
                <label className="txt_Body1">
                  {currency === "" ? "-" : currency}
                </label>
              )}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.type}>
              <label className="txt_Body2">Timezone</label>
            </div>
            <div className={styles.content}>
              {editable ? (
                <DropDown
                  listOfItems={TimeZoneData()}
                  Custom_width={"98%"}
                  Custom_minWidth={"98%"}
                  Custom_maxWidth={"98%"}
                  onSelect={(val) => setTimezone(val)}
                  isSearchable={true}
                  DefaultValue={{
                    value: timezone,
                    label: timezone,
                  }}
                />
              ) : (
                <label className="txt_Body1">
                  {timezone === "" ? "-" : timezone}
                </label>
              )}
            </div>
          </div>
        </div>
        <div className={styles.btnSide}>
          <Button
            text={editable ? "Update" : "Edit"}
            onClick={() => {
              editable ? handleSave() : setEdit(true);
            }}
            Custom_minWidth={"100%"}
            Custom_maxWidth={"100%"}
            Custom_width={"100%"}
            Custom_height={"51px"}
          />

          {editable && (
            <>
              <br />
              <TextButton
                text={"Cancel"}
                onClick={onCancel}
                Custom_minWidth={"100%"}
                Custom_maxWidth={"100%"}
                Custom_width={"100%"}
                Custom_height={"51px"}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

function CurrencyData() {
  return [
    { label: "AFN", currency_name: "Afghanistan Afghani" },
    { label: "ALL", currency_name: "Albanian Lek" },
    { label: "DZD", currency_name: "Algerian Dinar" },
    { label: "USD", currency_name: "US Dollar" },
    { label: "EUR", currency_name: "Euro" },
    { label: "AOA", currency_name: "Angolan Kwanza" },
    { label: "XCD", currency_name: "East Caribbean Dollar" },
    { label: "ARS", currency_name: "Argentine Peso" },
    { label: "AMD", currency_name: "Armenian Dram" },
    { label: "AWG", currency_name: "Aruban Guilder" },
    { label: "AUD", currency_name: "Australian Dollar" },
    { label: "AZN", currency_name: "Azerbaijan New Manat" },
    { label: "BSD", currency_name: "Bahamian Dollar" },
    { label: "BHD", currency_name: "Bahraini Dinar" },
    { label: "BDT", currency_name: "Bangladeshi Taka" },
    { label: "BBD", currency_name: "Barbados Dollar" },
    { label: "BYR", currency_name: "Belarussian Ruble" },
    { label: "BZD", currency_name: "Belize Dollar" },
    { label: "XOF", currency_name: "CFA Franc BCEAO" },
    { label: "BMD", currency_name: "Bermudian Dollar" },
    { label: "BTN", currency_name: "Bhutan Ngultrum" },
    { label: "BOB", currency_name: "Boliviano" },
    { label: "BAM", currency_name: "Convertible Mark" },
    { label: "BWP", currency_name: "Botswana Pula" },
    { label: "NOK", currency_name: "Norwegian Krone" },
    { label: "BRL", currency_name: "Brazilian Real" },
    { label: "BND", currency_name: "Brunei Dollar" },
    { label: "BGN", currency_name: "Bulgarian Lev" },
    { label: "BIF", currency_name: "Burundi Franc" },
    { label: "KHR", currency_name: "Kampuchean Riel" },
    { label: "XAF", currency_name: "CFA Franc BEAC" },
    { label: "CAD", currency_name: "Canadian Dollar" },
    { label: "CVE", currency_name: "Cape Verde Escudo" },
    { label: "KYD", currency_name: "Cayman Islands Dollar" },
    { label: "XAF", currency_name: "Central African" },
    { label: "CLP", currency_name: "Chilean Peso" },
    { label: "CNY", currency_name: "Yuan Renminbi" },
    { label: "AUD", currency_name: " Australian Dollar" },
    { label: "COP", currency_name: "Colombian Peso" },
    { label: "KMF", currency_name: "Comoros Franc" },
    { label: "NZD", currency_name: "New Zealand Dollar" },
    { label: "CRC", currency_name: "Costa Rican Colon" },
    { label: "EUR", currency_name: "Croatian Kuna" },
    { label: "CUP", currency_name: "Cuban Peso" },
    { label: "CZK", currency_name: "Czech Koruna" },
    { label: "DKK", currency_name: "Danish Krone" },
    { label: "DJF", currency_name: "Djibouti Franc" },
    { label: "DOP", currency_name: "Dominican Peso" },
    { label: "ECS", currency_name: "Ecuador Sucre" },
    { label: "EGP", currency_name: "Egyptian Pound" },
    { label: "SVC", currency_name: "El Salvador Colon" },
    { label: "GBP", currency_name: "Pound Sterlin" },
    { label: "ERN", currency_name: "Eritrean Nakfa" },
    { label: "ETB", currency_name: "Ethiopian Birr" },
    { label: "FKP", currency_name: "Falkland Islands Pound" },
    { label: "DKK", currency_name: " Danish Krone" },
    { label: "FJD", currency_name: "Fijian Dollar" },
    { label: "XPF", currency_name: "CFP Franc" },
    { label: "GMD", currency_name: "Gambian Dalasi" },
    { label: "GEL", currency_name: "Georgian Lari" },
    { label: "GHS", currency_name: "Ghanaian Cedi" },
    { label: "GIP", currency_name: "Gibraltar Pound" },
    { label: "XCD", currency_name: "East Carribean Dollar" },
    { label: "QTQ", currency_name: "Guatemalan Quetzal" },
    { label: "GNF", currency_name: "Guinea Franc" },
    { label: "CFA", currency_name: "West African CFA franc" },
    { label: "GYD", currency_name: "Guyana Dollar" },
    { label: "HTG", currency_name: "Haitian Gourde" },
    { label: "HNL", currency_name: "Honduran Lempira" },
    { label: "HKD", currency_name: "Hong Kong Dollar" },
    { label: "HUF", currency_name: "Hungarian Forint" },
    { label: "ISK", currency_name: "Iceland Krona" },
    { label: "INR", currency_name: "Indian Rupee" },
    { label: "IDR", currency_name: "Indonesian Rupiah" },
    { label: "IRR", currency_name: "Iranian Rial" },
    { label: "IQD", currency_name: "Iraqi Dinar" },
    { label: "ILS", currency_name: "Israeli New Shekel" },
    { label: "JMD", currency_name: "Jamaican Dollar" },
    { label: "JPY", currency_name: "Japanese Yen" },
    { label: "JOD", currency_name: "Jordanian Dinar" },
    { label: "KZT", currency_name: "Tenge" },
    { label: "KES", currency_name: "Kenyan Shilling" },
    { label: "KWD", currency_name: "Kuwaiti Dinar" },
    { label: "KGS", currency_name: "Som" },
    { label: "LAK", currency_name: "Lao Kip" },
    { label: "EUR", currency_name: "Latvian Lats" },
    { label: "LBP", currency_name: "Lebanese Pound" },
    { label: "LSL", currency_name: "Lesotho Loti" },
    { label: "LRD", currency_name: "Liberian Dollar" },
    { label: "LYD", currency_name: "Libyan Dinar" },
    { label: "CHF", currency_name: "Swiss Franc" },
    { label: "EUR", currency_name: "Lithuanian Litas" },
    { label: "MOP", currency_name: "Macanese Pataca" },
    { label: "MKD", currency_name: "Denar" },
    { label: "MGF", currency_name: "Malagasy Franc" },
    { label: "MWK", currency_name: "Malawi Kwacha" },
    { label: "MYR", currency_name: "Malaysian Ringgit" },
    { label: "MVR", currency_name: "Maldive Rufiyaa" },
    { label: "MRO", currency_name: "Mauritanian Ouguiya" },
    { label: "MUR", currency_name: "Mauritius Rupee" },
    { label: "MXN", currency_name: "Mexican Nuevo Peso" },
    { label: "MDL", currency_name: "Moldovan Leu" },
    { label: "MNT", currency_name: "Mongolian Tugrik" },
    { label: "MAD", currency_name: "Moroccan Dirham" },
    { label: "MZN", currency_name: "Mozambique Metical" },
    { label: "MMR", currency_name: "Myanmar Kyat" },
    { label: "NAD", currency_name: "Namibian Dollar" },
    { label: "NPR", currency_name: "Nepalese Rupee" },
    { label: "ANG", currency_name: "Netherlands Antillean Guilder" },
    { label: "NIO", currency_name: "Nicaraguan Cordoba Oro" },
    { label: "NGN", currency_name: "Nigerian Naira" },
    { label: "KPW", currency_name: "North Korean Won" },
    { label: "GBP", currency_name: "Pound Sterling" },
    { label: "OMR", currency_name: "Omani Rial" },
    { label: "PKR", currency_name: "Pakistan Rupee" },
    { label: "PAB", currency_name: "Panamanian Balboa" },
    { label: "PGK", currency_name: "Papua New Guinea Kina" },
    { label: "PYG", currency_name: "Paraguay Guarani" },
    { label: "PEN", currency_name: "Peruvian Nuevo Sol" },
    { label: "PHP", currency_name: "Philippine Peso" },
    { label: "PLN", currency_name: "Polish Zloty" },
    { label: "QAR", currency_name: "Qatari Rial" },
    { label: "RON", currency_name: "Romanian New Leu" },
    { label: "RUB", currency_name: "Russian Ruble" },
    { label: "RWF", currency_name: "Rwanda Franc" },
    { label: "SHP", currency_name: "St. Helena Pound" },
    { label: "EUR", currency_name: " Euro" },
    { label: "WST", currency_name: "Samoan Tala" },
    { label: "STD", currency_name: " Dobra" },
    { label: "SAR", currency_name: "Saudi Riyal" },
    { label: "RSD", currency_name: "Serbian dinar" },
    { label: "SCR", currency_name: "Seychelles Rupee" },
    { label: "SLL", currency_name: "Sierra Leone Leone" },
    { label: "SGD", currency_name: "Singapore Dollar" },
    { label: "SBD", currency_name: "Solomon Islands Dollar" },
    { label: "SOS", currency_name: "Somali Shilling" },
    { label: "ZAR", currency_name: "South African Rand" },
    { label: "KRW", currency_name: "Korean Won" },
    { label: "SSP", currency_name: "South Sudan Pound" },
    { label: "LKR", currency_name: "Sri Lankan Rupee" },
    { label: "SDG", currency_name: "Sudanese Pound" },
    { label: "SRD", currency_name: "Surinam Dollar" },
    { label: "SZL", currency_name: "Swaziland Lilangeni" },
    { label: "SEK", currency_name: "Swedish Krona" },
    { label: "SYP", currency_name: "Syrian Pound" },
    { label: "TJS", currency_name: "Tajik Somoni" },
    { label: "TZS", currency_name: "Tanzanian Shilling" },
    { label: "THB", currency_name: "Thai Baht" },
    { label: "CDF", currency_name: "Franc Congolais" },
    { label: "TOP", currency_name: "Tongan Pa'anga" },
    { label: "TTD", currency_name: "Trinidad and Tobago Dollar" },
    { label: "TND", currency_name: "Tunisian Dollar" },
    { label: "TRY", currency_name: "Turkish Lira" },
    { label: "TMT", currency_name: "Manat" },
    { label: "UGX", currency_name: "Uganda Shilling" },
    { label: "UAH", currency_name: "Ukraine Hryvnia" },
    { label: "AED", currency_name: "Arab Emirates Dirham" },
    { label: "UYU", currency_name: "Uruguayan Peso" },
    { label: "UZS", currency_name: "Uzbekistan Sum" },
    { label: "VUV", currency_name: "Vanuatu Vatu" },
    { label: "VEF", currency_name: "Venezuelan Bolivar" },
    { label: "VND", currency_name: "Vietnamese Dong" },
    { label: "USD", currency_name: "Pound Sterling" },
    { label: "YER", currency_name: "Yemeni Rial" },
    { label: "ZMW", currency_name: "Zambian Kwacha" },
    { label: "ZWD", currency_name: "Zimbabwe Dollar" },
  ];
}

function TimeZoneData() {
  return [
    { label: "UTC ", offset: "+00:00" },
    { label: "UTC +01:00", offset: "+01:00" },
    { label: "UTC +02:00", offset: "+02:00" },
    { label: "UTC +03:00", offset: "+03:00" },
    { label: "UTC +03:30", offset: "+03:30" },
    { label: "UTC +04:00", offset: "+04:00" },
    { label: "UTC +04:30", offset: "+04:30" },
    { label: "UTC +05:00", offset: "+05:00" },
    { label: "UTC +05:30", offset: "+05:30" },
    { label: "UTC +05:45", offset: "+05:45" },
    { label: "UTC +06:00", offset: "+06:00" },
    { label: "UTC +06:30", offset: "+06:30" },
    { label: "UTC +07:00", offset: "+07:00" },
    { label: "UTC +08:00", offset: "+08:00" },
    { label: "UTC +08:45", offset: "+08:45" },
    { label: "UTC +09:00", offset: "+09:00" },
    { label: "UTC +09:30", offset: "+09:30" },
    { label: "UTC +10:00", offset: "+10:00" },
    { label: "UTC +10:30", offset: "+10:30" },
    { label: "UTC +11:00", offset: "+11:00" },
    { label: "UTC +12:00", offset: "+12:00" },
    { label: "UTC +12:45", offset: "+12:45" },
    { label: "UTC +13:00", offset: "+13:00" },
    { label: "UTC +14:00", offset: "+14:00" },
    { label: "UTC -01:00", offset: "-01:00" },
    { label: "UTC -02:00", offset: "-02:00" },
    { label: "UTC -03:00", offset: "-03:00" },
    { label: "UTC -03:30", offset: "-03:30" },
    { label: "UTC -04:00", offset: "-04:00" },
    { label: "UTC -04:30", offset: "-04:30" },
    { label: "UTC -05:00", offset: "-05:00" },
    { label: "UTC -06:00", offset: "-06:00" },
    { label: "UTC -07:00", offset: "-07:00" },
    { label: "UTC -08:00", offset: "-08:00" },
    { label: "UTC -09:00", offset: "-09:00" },
    { label: "UTC -09:30", offset: "-09:30" },
    { label: "UTC -10:00", offset: "-10:00" },
    { label: "UTC -11:00", offset: "-11:00" },
    { label: "UTC -12:00", offset: "-12:00" },
  ];
}
function renderCurrencyTitle(state, val) {
  return (
    state.currency_name.toLowerCase().indexOf(val.toLowerCase()) !== -1 ||
    state.currency_code.toLowerCase().indexOf(val.toLowerCase()) !== -1
  );
}
function renderTimeZoneTitle(state, val) {
  return (
    state.name.toLowerCase().indexOf(val.toString().toLowerCase()) !== -1 ||
    state.timezone.toLowerCase().indexOf(val.toString().toLowerCase()) !== -1
  );
}

export default Preferences;
