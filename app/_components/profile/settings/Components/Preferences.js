import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
// import Autocomplete from "react-autocomplete";
import { update_user_info_api } from "@/app/services/service";

import "./test.css";
const Preferences = ({ prevResp, refresh, setRefresh }) => {
  const [currency, setCurrency] = useState();
  const [currencyError, setCurrencyError] = useState(false);

  const [timezone, setTimezone] = useState();
  const [timezoneError, setTimezoneError] = useState(false);

  const [editable, setEdit] = useState(false);
  useEffect(() => {
    if (currencyError) setCurrencyError(false);
  }, [currency]);
  useEffect(() => {
    if (timezoneError) setTimezoneError(false);
  }, [timezone]);
  function isValidCurrency(Name) {
    let Data = CurrencyData();
    if (
      Data.some(
        (item) => item.currency_code.toLowerCase() === Name.toLowerCase()
      )
    ) {
      // setCurrencyError(false);
      return true;
    } else {
      setCurrencyError(true);
      return false;
    }
  }

  function isValidTimeZone(Name) {
    let Data = TimeZoneData();
    if (Name === "" || Name === " " || Name == null) {
      setTimezoneError(true);

      return false;
    } else if (
      Data.some((item) => item.timezone.toLowerCase() === Name.toLowerCase())
    ) {
      // setCurrencyError(false);
      return true;
    } else {
      setTimezoneError(true);
      return false;
    }
  }
  const handleSave = async () => {
    let isAllValid = true;
    isAllValid = isValidCurrency(currency) && isAllValid;
    isAllValid = isValidTimeZone(timezone) && isAllValid;

    if (isAllValid) {
      try {
        const resp = await update_user_info_api({
          currency: currency,
          time_zone: timezone,
          first_name: prevResp.first_name == "" ? " " : prevResp.first_name,
          country: prevResp.country == "" ? " " : prevResp.country,
          language: prevResp.language == "" ? "-" : prevResp.language,
          addr_line_1: prevResp.addr_line_1 == "" ? "-" : prevResp.addr_line_1,
          city: prevResp.city == "" ? "-" : prevResp.city,
          last_name: prevResp.last_name == "" ? "-" : prevResp.last_name,
          phone: prevResp.phone == "" ? "-" : prevResp.phone,
        });
        console.log(resp);
        if (resp.code == 200) {
          alert("account information updated successfully");
          setEdit(false);
          setRefresh(!refresh);
        }

        // alert("User information updated successfully!");
      } catch (error) {
        alert(error);
      }
    }
  };
  const onCancel = () => {
    setCurrency(prevResp.currency);
    setTimezone(prevResp.time_zone);
    setCurrencyError(false);
    setTimezoneError(false);
    setEdit(false);
  };
  useEffect(() => {
    setCurrency(prevResp.currency);
    setTimezone(prevResp.time_zone);
  }, [prevResp]);
  return (
    <div className="info-box">
      <div className="info-box-content">
        <div className="info-box-title">Preferences</div>
        <div className="info-box-inner">
          <div className="info-box-details-space">
            <div className="info-table">
              <div className={`info-table-row ${styles.row}`}>
                <div className={`text-style-1 ${styles.text_head}`}>
                  Language
                </div>
                <div className="info-table-row-details">
                  <p className={`text-style-1 ${styles.table_detail}`}>
                    English
                  </p>
                </div>
              </div>
              <div className={`info-table-row ${styles.row}`}>
                <div className={`text-style-1 ${styles.text_head}`}>
                  Currency
                </div>
                <div className="info-table-row-details">
                  {editable ? (
                    <div className="autocomplete-wrapper">
                      {/* <Autocomplete
                        value={currency}
                        items={CurrencyData()}
                        getItemValue={(item) => item.currency_code}
                        shouldItemRender={renderCurrencyTitle}
                        renderMenu={(item) => (
                          <div className="dropdown">{item}</div>
                        )}
                        renderItem={(item, isHighlighted) => (
                          <div
                            className={`item ${
                              isHighlighted ? "selected-item" : ""
                            }`}
                          >
                            {item.currency_code} - {item.currency_name}
                          </div>
                        )}
                        onChange={(event, val) => setCurrency(val)}
                        onSelect={(val) => setCurrency(val)}
                      /> */}
                    </div>
                  ) : (
                    <p className={`text-style-1 ${styles.table_detail}`}>
                      {currency == "" ? "-" : currency}
                    </p>
                  )}
                  {currencyError && (
                    <p className="error-text" id="email-error">
                      The Currency selected is not valid. Please choose from the
                      provided list.
                    </p>
                  )}
                </div>
              </div>
              <div className={`info-table-row ${styles.row}`}>
                <div className={`text-style-1 ${styles.text_head}`}>
                  Timezone
                </div>
                <div className="info-table-row-details">
                  {editable ? (
                    <div className="autocomplete-wrapper">
                      {/* <Autocomplete
                        value={timezone}
                        items={TimeZoneData()}
                        getItemValue={(item) => item.timezone}
                        shouldItemRender={renderTimeZoneTitle}
                        renderMenu={(item) => (
                          <div className="dropdown">{item}</div>
                        )}
                        renderItem={(item, isHighlighted) => (
                          <div
                            className={`item ${
                              isHighlighted ? "selected-item" : ""
                            }`}
                          >
                            {item.timezone} - {item.name}
                          </div>
                        )}
                        onChange={(event, val) => setTimezone(val)}
                        onSelect={(val) => setTimezone(val)}
                      /> */}
                    </div>
                  ) : (
                    <p className={`text-style-1 ${styles.table_detail}`}>
                      {timezone === "" ? "-" : timezone}
                    </p>
                  )}
                  {timezoneError && (
                    <p className="error-text" id="email-error">
                      The Timezone selected is not valid. Please choose from the
                      provided list.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="info-box-button">
              <div className="button-container">
                <button
                  type="submit"
                  className="button-style"
                  onClick={() => {
                    editable ? handleSave() : setEdit(true);
                  }}
                >
                  <p className="button-text">{editable ? "Update" : "Edit"}</p>
                </button>
                {editable && (
                  <label
                    onClick={onCancel}
                    className={`text-style-1 ${styles.table_detail}`}
                    style={{ cursor: "pointer" }}
                  >
                    Cancel
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function CurrencyData() {
  return [
    { currency_code: "AFN", currency_name: "Afghanistan Afghani" },
    { currency_code: "ALL", currency_name: "Albanian Lek" },
    { currency_code: "DZD", currency_name: "Algerian Dinar" },
    { currency_code: "USD", currency_name: "US Dollar" },
    { currency_code: "EUR", currency_name: "Euro" },
    { currency_code: "AOA", currency_name: "Angolan Kwanza" },
    { currency_code: "XCD", currency_name: "East Caribbean Dollar" },
    { currency_code: "ARS", currency_name: "Argentine Peso" },
    { currency_code: "AMD", currency_name: "Armenian Dram" },
    { currency_code: "AWG", currency_name: "Aruban Guilder" },
    { currency_code: "AUD", currency_name: "Australian Dollar" },
    { currency_code: "AZN", currency_name: "Azerbaijan New Manat" },
    { currency_code: "BSD", currency_name: "Bahamian Dollar" },
    { currency_code: "BHD", currency_name: "Bahraini Dinar" },
    { currency_code: "BDT", currency_name: "Bangladeshi Taka" },
    { currency_code: "BBD", currency_name: "Barbados Dollar" },
    { currency_code: "BYR", currency_name: "Belarussian Ruble" },
    { currency_code: "BZD", currency_name: "Belize Dollar" },
    { currency_code: "XOF", currency_name: "CFA Franc BCEAO" },
    { currency_code: "BMD", currency_name: "Bermudian Dollar" },
    { currency_code: "BTN", currency_name: "Bhutan Ngultrum" },
    { currency_code: "BOB", currency_name: "Boliviano" },
    { currency_code: "BAM", currency_name: "Convertible Mark" },
    { currency_code: "BWP", currency_name: "Botswana Pula" },
    { currency_code: "NOK", currency_name: "Norwegian Krone" },
    { currency_code: "BRL", currency_name: "Brazilian Real" },
    { currency_code: "BND", currency_name: "Brunei Dollar" },
    { currency_code: "BGN", currency_name: "Bulgarian Lev" },
    { currency_code: "BIF", currency_name: "Burundi Franc" },
    { currency_code: "KHR", currency_name: "Kampuchean Riel" },
    { currency_code: "XAF", currency_name: "CFA Franc BEAC" },
    { currency_code: "CAD", currency_name: "Canadian Dollar" },
    { currency_code: "CVE", currency_name: "Cape Verde Escudo" },
    { currency_code: "KYD", currency_name: "Cayman Islands Dollar" },
    { currency_code: "XAF", currency_name: "Central African" },
    { currency_code: "CLP", currency_name: "Chilean Peso" },
    { currency_code: "CNY", currency_name: "Yuan Renminbi" },
    { currency_code: "AUD", currency_name: " Australian Dollar" },
    { currency_code: "COP", currency_name: "Colombian Peso" },
    { currency_code: "KMF", currency_name: "Comoros Franc" },
    { currency_code: "NZD", currency_name: "New Zealand Dollar" },
    { currency_code: "CRC", currency_name: "Costa Rican Colon" },
    { currency_code: "EUR", currency_name: "Croatian Kuna" },
    { currency_code: "CUP", currency_name: "Cuban Peso" },
    { currency_code: "CZK", currency_name: "Czech Koruna" },
    { currency_code: "DKK", currency_name: "Danish Krone" },
    { currency_code: "DJF", currency_name: "Djibouti Franc" },
    { currency_code: "DOP", currency_name: "Dominican Peso" },
    { currency_code: "ECS", currency_name: "Ecuador Sucre" },
    { currency_code: "EGP", currency_name: "Egyptian Pound" },
    { currency_code: "SVC", currency_name: "El Salvador Colon" },
    { currency_code: "GBP", currency_name: "Pound Sterlin" },
    { currency_code: "ERN", currency_name: "Eritrean Nakfa" },
    { currency_code: "ETB", currency_name: "Ethiopian Birr" },
    { currency_code: "FKP", currency_name: "Falkland Islands Pound" },
    { currency_code: "DKK", currency_name: " Danish Krone" },
    { currency_code: "FJD", currency_name: "Fijian Dollar" },
    { currency_code: "XPF", currency_name: "CFP Franc" },
    { currency_code: "GMD", currency_name: "Gambian Dalasi" },
    { currency_code: "GEL", currency_name: "Georgian Lari" },
    { currency_code: "GHS", currency_name: "Ghanaian Cedi" },
    { currency_code: "GIP", currency_name: "Gibraltar Pound" },
    { currency_code: "XCD", currency_name: "East Carribean Dollar" },
    { currency_code: "QTQ", currency_name: "Guatemalan Quetzal" },
    { currency_code: "GNF", currency_name: "Guinea Franc" },
    { currency_code: "CFA", currency_name: "West African CFA franc" },
    { currency_code: "GYD", currency_name: "Guyana Dollar" },
    { currency_code: "HTG", currency_name: "Haitian Gourde" },
    { currency_code: "HNL", currency_name: "Honduran Lempira" },
    { currency_code: "HKD", currency_name: "Hong Kong Dollar" },
    { currency_code: "HUF", currency_name: "Hungarian Forint" },
    { currency_code: "ISK", currency_name: "Iceland Krona" },
    { currency_code: "INR", currency_name: "Indian Rupee" },
    { currency_code: "IDR", currency_name: "Indonesian Rupiah" },
    { currency_code: "IRR", currency_name: "Iranian Rial" },
    { currency_code: "IQD", currency_name: "Iraqi Dinar" },
    { currency_code: "ILS", currency_name: "Israeli New Shekel" },
    { currency_code: "JMD", currency_name: "Jamaican Dollar" },
    { currency_code: "JPY", currency_name: "Japanese Yen" },
    { currency_code: "JOD", currency_name: "Jordanian Dinar" },
    { currency_code: "KZT", currency_name: "Tenge" },
    { currency_code: "KES", currency_name: "Kenyan Shilling" },
    { currency_code: "KWD", currency_name: "Kuwaiti Dinar" },
    { currency_code: "KGS", currency_name: "Som" },
    { currency_code: "LAK", currency_name: "Lao Kip" },
    { currency_code: "EUR", currency_name: "Latvian Lats" },
    { currency_code: "LBP", currency_name: "Lebanese Pound" },
    { currency_code: "LSL", currency_name: "Lesotho Loti" },
    { currency_code: "LRD", currency_name: "Liberian Dollar" },
    { currency_code: "LYD", currency_name: "Libyan Dinar" },
    { currency_code: "CHF", currency_name: "Swiss Franc" },
    { currency_code: "EUR", currency_name: "Lithuanian Litas" },
    { currency_code: "MOP", currency_name: "Macanese Pataca" },
    { currency_code: "MKD", currency_name: "Denar" },
    { currency_code: "MGF", currency_name: "Malagasy Franc" },
    { currency_code: "MWK", currency_name: "Malawi Kwacha" },
    { currency_code: "MYR", currency_name: "Malaysian Ringgit" },
    { currency_code: "MVR", currency_name: "Maldive Rufiyaa" },
    { currency_code: "MRO", currency_name: "Mauritanian Ouguiya" },
    { currency_code: "MUR", currency_name: "Mauritius Rupee" },
    { currency_code: "MXN", currency_name: "Mexican Nuevo Peso" },
    { currency_code: "MDL", currency_name: "Moldovan Leu" },
    { currency_code: "MNT", currency_name: "Mongolian Tugrik" },
    { currency_code: "MAD", currency_name: "Moroccan Dirham" },
    { currency_code: "MZN", currency_name: "Mozambique Metical" },
    { currency_code: "MMR", currency_name: "Myanmar Kyat" },
    { currency_code: "NAD", currency_name: "Namibian Dollar" },
    { currency_code: "NPR", currency_name: "Nepalese Rupee" },
    { currency_code: "ANG", currency_name: "Netherlands Antillean Guilder" },
    { currency_code: "NIO", currency_name: "Nicaraguan Cordoba Oro" },
    { currency_code: "NGN", currency_name: "Nigerian Naira" },
    { currency_code: "KPW", currency_name: "North Korean Won" },
    { currency_code: "GBP", currency_name: "Pound Sterling" },
    { currency_code: "OMR", currency_name: "Omani Rial" },
    { currency_code: "PKR", currency_name: "Pakistan Rupee" },
    { currency_code: "PAB", currency_name: "Panamanian Balboa" },
    { currency_code: "PGK", currency_name: "Papua New Guinea Kina" },
    { currency_code: "PYG", currency_name: "Paraguay Guarani" },
    { currency_code: "PEN", currency_name: "Peruvian Nuevo Sol" },
    { currency_code: "PHP", currency_name: "Philippine Peso" },
    { currency_code: "PLN", currency_name: "Polish Zloty" },
    { currency_code: "QAR", currency_name: "Qatari Rial" },
    { currency_code: "RON", currency_name: "Romanian New Leu" },
    { currency_code: "RUB", currency_name: "Russian Ruble" },
    { currency_code: "RWF", currency_name: "Rwanda Franc" },
    { currency_code: "SHP", currency_name: "St. Helena Pound" },
    { currency_code: "EUR", currency_name: " Euro" },
    { currency_code: "WST", currency_name: "Samoan Tala" },
    { currency_code: "STD", currency_name: " Dobra" },
    { currency_code: "SAR", currency_name: "Saudi Riyal" },
    { currency_code: "RSD", currency_name: "Serbian dinar" },
    { currency_code: "SCR", currency_name: "Seychelles Rupee" },
    { currency_code: "SLL", currency_name: "Sierra Leone Leone" },
    { currency_code: "SGD", currency_name: "Singapore Dollar" },
    { currency_code: "SBD", currency_name: "Solomon Islands Dollar" },
    { currency_code: "SOS", currency_name: "Somali Shilling" },
    { currency_code: "ZAR", currency_name: "South African Rand" },
    { currency_code: "KRW", currency_name: "Korean Won" },
    { currency_code: "SSP", currency_name: "South Sudan Pound" },
    { currency_code: "LKR", currency_name: "Sri Lankan Rupee" },
    { currency_code: "SDG", currency_name: "Sudanese Pound" },
    { currency_code: "SRD", currency_name: "Surinam Dollar" },
    { currency_code: "SZL", currency_name: "Swaziland Lilangeni" },
    { currency_code: "SEK", currency_name: "Swedish Krona" },
    { currency_code: "SYP", currency_name: "Syrian Pound" },
    { currency_code: "TJS", currency_name: "Tajik Somoni" },
    { currency_code: "TZS", currency_name: "Tanzanian Shilling" },
    { currency_code: "THB", currency_name: "Thai Baht" },
    { currency_code: "CDF", currency_name: "Franc Congolais" },
    { currency_code: "TOP", currency_name: "Tongan Pa'anga" },
    { currency_code: "TTD", currency_name: "Trinidad and Tobago Dollar" },
    { currency_code: "TND", currency_name: "Tunisian Dollar" },
    { currency_code: "TRY", currency_name: "Turkish Lira" },
    { currency_code: "TMT", currency_name: "Manat" },
    { currency_code: "UGX", currency_name: "Uganda Shilling" },
    { currency_code: "UAH", currency_name: "Ukraine Hryvnia" },
    { currency_code: "AED", currency_name: "Arab Emirates Dirham" },
    { currency_code: "UYU", currency_name: "Uruguayan Peso" },
    { currency_code: "UZS", currency_name: "Uzbekistan Sum" },
    { currency_code: "VUV", currency_name: "Vanuatu Vatu" },
    { currency_code: "VEF", currency_name: "Venezuelan Bolivar" },
    { currency_code: "VND", currency_name: "Vietnamese Dong" },
    { currency_code: "USD", currency_name: "Pound Sterling" },
    { currency_code: "YER", currency_name: "Yemeni Rial" },
    { currency_code: "ZMW", currency_name: "Zambian Kwacha" },
    { currency_code: "ZWD", currency_name: "Zimbabwe Dollar" },
  ];
}

function TimeZoneData() {
  return [
    { name: "Afghanistan", timezone: "+04:30" },
    { name: "Albania", timezone: "+02:00" },
    { name: "Algeria", timezone: "+02:00" },
    { name: "American Samoa", timezone: "-11:00" },
    { name: "Angola", timezone: "+01:00" },
    { name: "Anguilla", timezone: "-04:00" },
    { name: "Antartica", timezone: "+00:00" },
    { name: "Antigua and Barbuda", timezone: "-04:00" },
    { name: "Argentina", timezone: "-03:00" },
    { name: "Armenia", timezone: "+04:00" },
    { name: "Aruba", timezone: "-04:00" },
    { name: "Ashmore and Cartier Island", timezone: "+10:00" },
    { name: "Australia", timezone: "+10:00" },
    { name: "Austria", timezone: "+01:00" },
    { name: "Azerbaijan", timezone: "+04:00" },
    { name: "Bahamas", timezone: "-05:00" },
    { name: "Bahrain", timezone: "+03:00" },
    { name: "Bangladesh", timezone: "+06:00" },
    { name: "Barbados", timezone: "-04:00" },
    { name: "Belarus", timezone: "+03:00" },
    { name: "Belgium", timezone: "+01:00" },
    { name: "Belize", timezone: "-06:00" },
    { name: "Benin", timezone: "+01:00" },
    { name: "Bermuda", timezone: "-04:00" },
    { name: "Bhutan", timezone: "+06:00" },
    { name: "Bolivia", timezone: "-04:00" },
    { name: "Bosnia and Herzegovina", timezone: "+01:00" },
    { name: "Botswana", timezone: "+02:00" },
    { name: "Brazil", timezone: "-05:00" },
    { name: "British Virgin Islands", timezone: "-04:00" },
    { name: "Brunei", timezone: "+08:00" },
    { name: "Bulgaria", timezone: "+02:00" },
    { name: "Burkina Faso", timezone: "00:00" },
    { name: "Burma", timezone: "+06:30" },
    { name: "Burundi", timezone: "+02:00" },
    { name: "Cambodia", timezone: "+07:00" },
    { name: "Cameroon", timezone: "+01:00" },
    { name: "Canada", timezone: "-06:00" },
    { name: "Cape Verde", timezone: "-01:00" },
    { name: "Cayman Islands", timezone: "-05:00" },
    { name: "Central African Republic", timezone: "+01:00" },
    { name: "Chad", timezone: "+01:00" },
    { name: "Chile", timezone: "-03:00" },
    { name: "China", timezone: "+08:00" },
    { name: "Christmas Island", timezone: "+07:00" },
    { name: "Clipperton Island", timezone: "-08:00" },
    { name: "Cocos (Keeling) Islands", timezone: "+06:30" },
    { name: "Colombia", timezone: "-05:00" },
    { name: "Comoros", timezone: "+03:00" },
    { name: "Congo, Democratic Republic of the", timezone: "+01:00" },
    { name: "Cook Islands", timezone: "-10:00" },
    { name: "Costa Rica", timezone: "-06:00" },
    { name: "Cote d'Ivoire", timezone: "00:00" },
    { name: "Croatia", timezone: "+01:00" },
    { name: "Cyprus", timezone: "+02:00" },
    { name: "Czech Republic", timezone: "+01:00" },
    { name: "Denmark", timezone: "+01:00" },
    { name: "Djibouti", timezone: "+03:00" },
    { name: "Dominica", timezone: "-04:00" },
    { name: "Dominican Republic", timezone: "-04:00" },
    { name: "Ecuador", timezone: "-05:00" },
    { name: "Egypt", timezone: "+02:00" },
    { name: "El Salvador", timezone: "-06:00" },
    { name: "Equatorial Guinea", timezone: "+01:00" },
    { name: "Eritrea", timezone: "+03:00" },
    { name: "Estonia", timezone: "+02:00" },
    { name: "Ethiopia", timezone: "+03:00" },
    { name: "Europa Island", timezone: "+03:00" },
    { name: "Falkland Islands (Islas Malvinas)", timezone: "-03:00" },
    { name: "Faroe Islands", timezone: "00:00" },
    { name: "Fiji", timezone: "+12:00" },
    { name: "Finland", timezone: "+02:00" },
    { name: "France", timezone: "+01:00" },
    { name: "French Guiana", timezone: "-03:00" },
    { name: "French Polynesia", timezone: "-10:00" },
    { name: "French Southern and Antarctic Lands", timezone: "+03:00" },
    { name: "Gabon", timezone: "+01:00" },
    { name: "Gambia, The", timezone: "00:00" },
    { name: "Gaza Strip", timezone: "+03:00" },
    { name: "Georgia", timezone: "+04:00" },
    { name: "Germany", timezone: "+01:00" },
    { name: "Ghana", timezone: "00:00" },
    { name: "Gibraltar", timezone: "+01:00" },
    { name: "Glorioso Islands", timezone: "+04:00" },
    { name: "Greece", timezone: "+02:00" },
    { name: "Greenland", timezone: "-03:00" },
    { name: "Grenada", timezone: "-04:00" },
    { name: "Guadeloupe", timezone: "-04:00" },
    { name: "Guam", timezone: "+10:00" },
    { name: "Guatemala", timezone: "-06:00" },
    { name: "Guernsey", timezone: "00:00" },
    { name: "Guinea", timezone: "00:00" },
    { name: "Guinea-Bissau", timezone: "00:00" },
    { name: "Guyana", timezone: "-04:00" },
    { name: "Haiti", timezone: "-05:00" },
    { name: "Heard Island and McDonald Islands", timezone: "+05:00" },
    { name: "Holy See (Vatican City)", timezone: "+01:00" },
    { name: "Honduras", timezone: "-06:00" },
    { name: "Hong Kong", timezone: "+08:00" },
    { name: "Howland Island", timezone: "-12:00" },
    { name: "Hungary", timezone: "+01:00" },
    { name: "Iceland", timezone: "00:00" },
    { name: "India", timezone: "+05:30" },
    { name: "Indonesia", timezone: "+07:00" },
    { name: "Iran", timezone: "+03:30" },
    { name: "Iraq", timezone: "+03:00" },
    { name: "Ireland", timezone: "00:00" },
    { name: "Ireland, Northern", timezone: "00:00" },
    { name: "Israel", timezone: "+02:00" },
    { name: "Italy", timezone: "+01:00" },
    { name: "Jamaica", timezone: "-05:00" },
    { name: "Jan Mayen", timezone: "+01:00" },
    { name: "Japan", timezone: "+09:00" },
    { name: "Jarvis Island", timezone: "-11:00" },
    { name: "Jersey", timezone: "00:00" },
    { name: "Johnston Atoll", timezone: "-10:00" },
    { name: "Jordan", timezone: "+02:00" },
    { name: "Juan de Nova Island", timezone: "+03:00" },
    { name: "Kazakhstan", timezone: "+05:00" },
    { name: "Kenya", timezone: "+03:00" },
    { name: "Kiribati", timezone: "+12:00" },
    { name: "Korea, North", timezone: "+08:30" },
    { name: "Korea, South", timezone: "+09:00" },
    { name: "Kuwait", timezone: "+03:00" },
    { name: "Kyrgyzstan", timezone: "+06:00" },
    { name: "Laos", timezone: "+07:00" },
    { name: "Latvia", timezone: "+02:00" },
    { name: "Lebanon", timezone: "+02:00" },
    { name: "Lesotho", timezone: "+02:00" },
    { name: "Liberia", timezone: "00:00" },
    { name: "Libya", timezone: "+01:00" },
    { name: "Liechtenstein", timezone: "+01:00" },
    { name: "Lithuania", timezone: "+02:00" },
    { name: "Luxembourg", timezone: "+01:00" },
    { name: "Macau", timezone: "+08:00" },
    { name: "Macedonia, Former Yugoslav Republic of", timezone: "+01:00" },
    { name: "Madagascar", timezone: "+03:00" },
    { name: "Malawi", timezone: "+02:00" },
    { name: "Malaysia", timezone: "+08:00" },
    { name: "Maldives", timezone: "+05:00" },
    { name: "Mali", timezone: "00:00" },
    { name: "Malta", timezone: "00:00" },
    { name: "Man, Isle of", timezone: "00:00" },
    { name: "Marshall Islands", timezone: "+12:00" },
    { name: "Martinique", timezone: "-04:00" },
    { name: "Mauritania", timezone: "00:00" },
    { name: "Mauritius", timezone: "+04:00" },
    { name: "Mayotte", timezone: "+03:00" },
    { name: "Mexico", timezone: "-06:00" },
    { name: "Micronesia, Federated States of", timezone: "+10:00" },
    { name: "Midway Islands", timezone: "-11:00" },
    { name: "Moldova", timezone: "+02:00" },
    { name: "Monaco", timezone: "+01:00" },
    { name: "Mongolia", timezone: "+08:00" },
    { name: "Montserrat", timezone: "-04:00" },
    { name: "Morocco", timezone: "00:00" },
    { name: "Mozambique", timezone: "+02:00" },
    { name: "Namibia", timezone: "+01:00" },
    { name: "Nauru", timezone: "+12:00" },
    { name: "Nepal", timezone: "05:45 " },
    { name: "Netherlands", timezone: "+01:00" },
    { name: "Netherlands Antilles", timezone: "-04:00" },
    { name: "New Zealand", timezone: "+12:00" },
    { name: "Nicaragua", timezone: "-06:00" },
    { name: "Niger", timezone: "+01:00" },
    { name: "Nigeria", timezone: "+01:00" },
    { name: "Niue", timezone: "-11:00" },
    { name: "Norfolk Island", timezone: "+11:30" },
    { name: "Northern Mariana Islands", timezone: "+10:00" },
    { name: "Norway", timezone: "+01:00" },
    { name: "Oman", timezone: "+04:00" },
    { name: "Pakistan", timezone: "+05:00" },
    { name: "Palau", timezone: "+09:00" },
    { name: "Panama", timezone: "-05:00" },
    { name: "Papua New Guinea", timezone: "+10:00" },
    { name: "Paraguay", timezone: "-04:00" },
    { name: "Peru", timezone: "-05:00" },
    { name: "Philippines", timezone: "+08:00" },
    { name: "Pitcaim Islands", timezone: "-08:00" },
    { name: "Poland", timezone: "+01:00" },
    { name: "Portugal", timezone: "00:00" },
    { name: "Puerto Rico", timezone: "-04:00" },
    { name: "Qatar", timezone: "+03:00" },
    { name: "Reunion", timezone: "+04:00" },
    { name: "Romainia", timezone: "+02:00" },
    { name: "Russia", timezone: "00:00" },
    { name: "Rwanda", timezone: "+02:00" },
    { name: "Saint Helena", timezone: "00:00" },
    { name: "Saint Kitts and Nevis", timezone: "-04:00" },
    { name: "Saint Lucia", timezone: "-04:00" },
    { name: "Saint Pierre and Miquelon", timezone: "-03:00" },
    { name: "Saint Vincent and the Grenadines", timezone: "-04:00" },
    { name: "Samoa", timezone: "+13:00" },
    { name: "San Marino", timezone: "+01:00" },
    { name: "Sao Tome and Principe", timezone: "00:00" },
    { name: "Saudi Arabia", timezone: "+03:00" },
    { name: "Scotland", timezone: "00:00" },
    { name: "Senegal", timezone: "00:00" },
    { name: "Seychelles", timezone: "+04:00" },
    { name: "Sierra Leone", timezone: "00:00" },
    { name: "Singapore", timezone: "+08:00" },
    { name: "Slovakia", timezone: "+01:00" },
    { name: "Slovenia", timezone: "+01:00" },
    { name: "Solomon Islands", timezone: "+11:00" },
    { name: "Somalia", timezone: "+03:00" },
    { name: "South Africa", timezone: "+02:00" },
    { name: "South Georgia and South Sandwich Islands", timezone: "-2:00" },
    { name: "Spain", timezone: "+01:00" },
    { name: "Sri Lanka", timezone: "+05:30" },
    { name: "Sudan", timezone: "+03:00" },
    { name: "Suriname", timezone: "-03:00" },
    { name: "Svalbard", timezone: "+01:00" },
    { name: "Swaziland", timezone: "+02:00" },
    { name: "Sweden", timezone: "+01:00" },
    { name: "Switzerland", timezone: "+01:00" },
    { name: "Syria", timezone: "+02:00" },
    { name: "Taiwan", timezone: "+08:00" },
    { name: "Tajikistan", timezone: "+05:00" },
    { name: "Tanzania", timezone: "+03:00" },
    { name: "Thailand", timezone: "+07:00" },
    { name: "Tobago", timezone: "-04:00" },
    { name: "Togo", timezone: "00:00" },
    { name: "Tokelau", timezone: "+13:00" },
    { name: "Tonga", timezone: "+13:00" },
    { name: "Trinidad", timezone: "+13:00" },
    { name: "Tunisia", timezone: "+01:00" },
    { name: "Turkey", timezone: "+02:00" },
    { name: "Turkmenistan", timezone: "+05:00" },
    { name: "Tuvalu", timezone: "+12:00" },
    { name: "Uganda", timezone: "+03:00" },
    { name: "Ukraine", timezone: "+02:00" },
    { name: "United Arab Emirates", timezone: "+04:00" },
    { name: "United Kingdom", timezone: "00:00" },
    { name: "Uruguay", timezone: "-03:00" },
    { name: "USA", timezone: "00:00" },
    { name: "Uzbekistan", timezone: "+05:00" },
    { name: "Vanuatu", timezone: "+11:00" },
    { name: "Venezuela", timezone: "-04:30" },
    { name: "Vietnam", timezone: "+07:00" },
    { name: "Virgin Islands", timezone: "-04:00" },
    { name: "Wales", timezone: "+10:00" },
    { name: "Wallis and Futuna", timezone: "+12:00" },
    { name: "West Bank", timezone: "+03:00" },
    { name: "Western Sahara", timezone: "+01:00" },
    { name: "Yemen", timezone: "+03:00" },
    { name: "Zambia", timezone: "+01:00" },
    { name: "Zimbabwe", timezone: "+02:00" },
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
