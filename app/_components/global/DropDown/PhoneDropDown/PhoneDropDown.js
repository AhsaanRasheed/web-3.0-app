"use client";
import React, { useState, useEffect, useRef } from "react";
import "./style.css";
export default function PhoneDropDown({ prevPhoneNumber, onNumberUpdate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

  const divRef = useRef(null);
  const phoneRef = useRef(null);

  const [selectedItem, setSelectedItem] = useState({
    phoneCode: "960",
    countryName: "Maldives",
    imgPath: "maldives.svg",
  });

  const handleFouce = () => {
    setMenuOpen(false);
    // setMenuOpen(false);
  };

  const handleBlur = (e) => {
    const isSearchInput = e.currentTarget.contains(e.relatedTarget);

    if (!isSearchInput) {
      setMenuOpen(false);
    }
  };
  useEffect(() => {
    if (menuOpen) setFilter("");
  }, [menuOpen]);
  useEffect(() => {
    try {
      if (prevPhoneNumber.includes("-") && prevPhoneNumber.length > 3) {
        let splitArray = text.split("-");
        if (splitArray[0].length > 0) {
          let temp = CountriesData();
          for (let i = 0; i < temp.length; i++) {
            if (temp[i].phoneCode == splitArray[0]) {
              setSelectedItem(temp[i]);
              setPhoneNumber(splitArray[1]);
            }
          }
        }
      }
    } catch (e) {}
  }, [prevPhoneNumber]);
  useEffect(() => {
    onNumberUpdate(selectedItem.phoneCode + "-" + phoneNumber);
  }, [phoneNumber]);
  const onChange = (e) => {
    if (!isNaN(e.target.value)) {
      setPhoneNumber(e.target.value);
    }
  };
  return (
    <div
      className="MainPhoneDropDown"
      ref={divRef}
      tabIndex={0}
      onBlur={handleBlur}
    >
      <div className="PhoneDropDown">
        <div
          className="PhoneDropDownLeft"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img alt="country" src={`/countries/${selectedItem.imgPath}`} />
          <DownArrow menuOpen={menuOpen} />
          <label className="SelectedcountryCode txt_Body1">
            {selectedItem.phoneCode}
          </label>
        </div>
        <input
          type="text"
          placeholder="Phone"
          value={phoneNumber}
          onChange={onChange}
          ref={phoneRef}
          onFocus={handleFouce}
        />
      </div>
      <div
        className={`PhoneDropDown_option dropdown_menu-6 ${
          menuOpen ? "opening" : "closing"
        }`}
      >
        <div className="PhoneDropDown_option_row">
          <div className="tbl_container">
            <table>
              <tbody>
                <tr>
                  <td colSpan={"3"}>
                    <input
                      className="search_input"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      placeholder="Search Country.."
                    />
                  </td>
                </tr>
                {CountriesData().map((items, index) => {
                  if (
                    items.countryName
                      .toLowerCase()
                      .includes(filter.toLocaleLowerCase())
                  ) {
                    return (
                      <tr
                        onClick={() => {
                          setSelectedItem(items);
                          setMenuOpen(false);
                        }}
                        className="PhoneDropDown_option_row_tr"
                      >
                        <td style={{ width: "30px" }}>
                          <img
                            alt="country"
                            src={`/countries/${items.imgPath}`}
                          />
                        </td>
                        <td style={{ minWidth: "max-content", width: "80px" }}>
                          <label className="">{items.phoneCode}</label>
                        </td>
                        <td>
                          <label className="">
                            {items.countryName.length > 25
                              ? items.countryName.substring(0, 23) + ".."
                              : items.countryName}
                          </label>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const DownArrow = ({ menuOpen }) => {
  return (
    <svg
      width="29"
      height="24"
      viewBox="0 0 29 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.5 0V24H29.5V0H27.5Z"
        fill="white"
        mask="url(#path-1-inside-1_4011_18658)"
      />
      {menuOpen ? (
        <path
          d="M7.39953 15.0382L6.3457 13.9844L11.9995 8.33057L17.6534 13.9844L16.5995 15.0382L11.9995 10.4382L7.39953 15.0382Z"
          fill="white"
        />
      ) : (
        <path
          d="M11.9997 14.6617C11.8791 14.6617 11.767 14.6425 11.6631 14.604C11.5593 14.5656 11.4606 14.4996 11.367 14.406L6.87276 9.91175C6.73429 9.7733 6.66346 9.59927 6.66026 9.38965C6.65704 9.18003 6.72788 9.00279 6.87276 8.85792C7.01763 8.71306 7.19326 8.64062 7.39966 8.64062C7.60606 8.64062 7.78169 8.71306 7.92656 8.85792L11.9997 12.931L16.0728 8.85792C16.2112 8.71947 16.3852 8.64864 16.5949 8.64542C16.8045 8.64222 16.9817 8.71306 17.1266 8.85792C17.2714 9.00279 17.3439 9.17843 17.3439 9.38485C17.3439 9.59125 17.2714 9.76688 17.1266 9.91175L12.6323 14.406C12.5388 14.4996 12.44 14.5656 12.3362 14.604C12.2324 14.6425 12.1202 14.6617 11.9997 14.6617Z"
          fill="white"
        />
      )}
    </svg>
  );
};

const CountriesData = () => {
  return [
    {
      countryName: "Afghanistan",
      phoneCode: "+93",
      imgPath: "afghanistan.svg",
    },
    {
      countryName: "Albania",
      phoneCode: "+355",
      imgPath: "albania.svg",
    },
    {
      countryName: "Algeria",
      phoneCode: "+213",
      imgPath: "algeria.svg",
    },
    {
      countryName: "American Samoa",
      phoneCode: "+1-684",
      imgPath: "american samoa.svg",
    },
    {
      countryName: "Andorra",
      phoneCode: "+376",
      imgPath: "andorra.svg",
    },
    {
      countryName: "Angola",
      phoneCode: "+244",
      imgPath: "angola.svg",
    },
    {
      countryName: "Anguilla",
      phoneCode: "+1-264",
      imgPath: "anguilla.svg",
    },
    {
      countryName: "Antigua And Barbuda",
      phoneCode: "+1-268",
      imgPath: "antigua and barbuda.svg",
    },
    {
      countryName: "Argentina",
      phoneCode: "+54",
      imgPath: "argentina.svg",
    },
    {
      countryName: "Armenia",
      phoneCode: "+374",
      imgPath: "armenia.svg",
    },
    {
      countryName: "Aruba",
      phoneCode: "+297",
      imgPath: "aruba.svg",
    },
    {
      countryName: "Australia",
      phoneCode: "+61",
      imgPath: "australia.svg",
    },
    {
      countryName: "Austria",
      phoneCode: "+43",
      imgPath: "austria.svg",
    },
    {
      countryName: "Azerbaijan",
      phoneCode: "+994",
      imgPath: "azerbaijan.svg",
    },
    {
      countryName: "Bahamas",
      phoneCode: "+1-242",
      imgPath: "bahamas.svg",
    },
    {
      countryName: "Bahrain",
      phoneCode: "+973",
      imgPath: "bahrain.svg",
    },
    {
      countryName: "Bangladesh",
      phoneCode: "+880",
      imgPath: "bangladesh.svg",
    },
    {
      countryName: "Barbados",
      phoneCode: "+1-246",
      imgPath: "barbados.svg",
    },
    {
      countryName: "Belarus",
      phoneCode: "+375",
      imgPath: "belarus.svg",
    },
    {
      countryName: "Belgium",
      phoneCode: "+32",
      imgPath: "belgium.svg",
    },
    {
      countryName: "Belize",
      phoneCode: "+501",
      imgPath: "belize.svg",
    },
    {
      countryName: "Benin",
      phoneCode: "+229",
      imgPath: "benin.svg",
    },
    {
      countryName: "Bermuda",
      phoneCode: "+1-441",
      imgPath: "bermuda.svg",
    },
    {
      countryName: "Bhutan",
      phoneCode: "+975",
      imgPath: "bhutan.svg",
    },
    {
      countryName: "Bolivia",
      phoneCode: "+591",
      imgPath: "bolivia.svg",
    },
    {
      countryName: "Bosnia And Herzegovina",
      phoneCode: "+387",
      imgPath: "bosnia and herzegovina.svg",
    },
    {
      countryName: "Botswana",
      phoneCode: "+267",
      imgPath: "botswana.svg",
    },
    {
      countryName: "Brazil",
      phoneCode: "+55",
      imgPath: "brazil.svg",
    },
    {
      countryName: "Brunei",
      phoneCode: "+673",
      imgPath: "brunei.svg",
    },
    {
      countryName: "Bulgaria",
      phoneCode: "+359",
      imgPath: "bulgaria.svg",
    },
    {
      countryName: "Burkina Faso",
      phoneCode: "+226",
      imgPath: "burkina faso.svg",
    },
    {
      countryName: "Burundi",
      phoneCode: "+257",
      imgPath: "burundi.svg",
    },
    {
      countryName: "Cambodia",
      phoneCode: "+855",
      imgPath: "cambodia.svg",
    },
    {
      countryName: "Cameroon",
      phoneCode: "+237",
      imgPath: "cameroon.svg",
    },
    {
      countryName: "Canada",
      phoneCode: "+1",
      imgPath: "canada.svg",
    },
    {
      countryName: "Cape Verde",
      phoneCode: "+238",
      imgPath: "cape verde.svg",
    },
    {
      countryName: "Cayman Islands",
      phoneCode: "+1-345",
      imgPath: "cayman islands.svg",
    },
    {
      countryName: "Central African Republic",
      phoneCode: "+236",
      imgPath: "central african republic.svg",
    },
    {
      countryName: "Chad",
      phoneCode: "+235",
      imgPath: "chad.svg",
    },
    {
      countryName: "Chile",
      phoneCode: "+56",
      imgPath: "chile.svg",
    },
    {
      countryName: "China",
      phoneCode: "+86",
      imgPath: "china.svg",
    },
    {
      countryName: "Cocos Island",
      phoneCode: "+61",
      imgPath: "cocos island.svg",
    },
    {
      countryName: "Colombia",
      phoneCode: "+57",
      imgPath: "colombia.svg",
    },
    {
      countryName: "Comoros",
      phoneCode: "+269",
      imgPath: "comoros.svg",
    },
    {
      countryName: "Democratic Republic Of Congo",
      phoneCode: "+243",
      imgPath: "democratic republic of congo.svg",
    },
    {
      countryName: "Democratic Republic Of Congo",
      phoneCode: "+242",
      imgPath: "democratic republic of congo.svg",
    },
    {
      countryName: "Cook Islands",
      phoneCode: "+682",
      imgPath: "cook islands.svg",
    },
    {
      countryName: "Costa Rica",
      phoneCode: "+506",
      imgPath: "costa rica.svg",
    },
    {
      countryName: "Croatia",
      phoneCode: "+385",
      imgPath: "croatia.svg",
    },
    {
      countryName: "Cuba",
      phoneCode: "+53",
      imgPath: "cuba.svg",
    },
    {
      countryName: "Cyprus",
      phoneCode: "+357",
      imgPath: "cyprus.svg",
    },
    {
      countryName: "Czech Republic",
      phoneCode: "+420",
      imgPath: "czech republic.svg",
    },
    {
      countryName: "Denmark",
      phoneCode: "+45",
      imgPath: "denmark.svg",
    },
    {
      countryName: "Djibouti",
      phoneCode: "+253",
      imgPath: "djibouti.svg",
    },
    {
      countryName: "Dominica",
      phoneCode: "+1-767",
      imgPath: "dominica.svg",
    },
    {
      countryName: "Dominican Republic",
      phoneCode: "+1-809",
      imgPath: "dominican republic.svg",
    },
    {
      countryName: "Dominican Republic",
      phoneCode: "+1-829",
      imgPath: "dominican republic.svg",
    },
    {
      countryName: "East Timor",
      phoneCode: "+670",
      imgPath: "east timor.svg",
    },
    {
      countryName: "Ecuador",
      phoneCode: "+593 ",
      imgPath: "ecuador.svg",
    },
    {
      countryName: "Egypt",
      phoneCode: "+20",
      imgPath: "egypt.svg",
    },
    {
      countryName: "El Salvador",
      phoneCode: "+503",
      imgPath: "el salvador.svg",
    },
    {
      countryName: "Equatorial Guinea",
      phoneCode: "+240",
      imgPath: "equatorial guinea.svg",
    },
    {
      countryName: "Eritrea",
      phoneCode: "+291",
      imgPath: "eritrea.svg",
    },
    {
      countryName: "Estonia",
      phoneCode: "+372",
      imgPath: "estonia.svg",
    },
    {
      countryName: "Ethiopia",
      phoneCode: "+251",
      imgPath: "ethiopia.svg",
    },
    {
      countryName: "Falkland Islands",
      phoneCode: "+500",
      imgPath: "falkland islands.svg",
    },
    {
      countryName: "Faroe Islands",
      phoneCode: "+298",
      imgPath: "faroe islands.svg",
    },
    {
      countryName: "Fiji",
      phoneCode: "+679",
      imgPath: "fiji.svg",
    },
    {
      countryName: "Finland",
      phoneCode: "+358",
      imgPath: "finland.svg",
    },
    {
      countryName: "France",
      phoneCode: "+33",
      imgPath: "france.svg",
    },
    {
      countryName: "French Polynesia",
      phoneCode: "+689",
      imgPath: "french polynesia.svg",
    },
    {
      countryName: "Gabon",
      phoneCode: "+241",
      imgPath: "gabon.svg",
    },
    {
      countryName: "Gambia",
      phoneCode: "+220",
      imgPath: "gambia.svg",
    },
    {
      countryName: "Georgia",
      phoneCode: "+995",
      imgPath: "georgia.svg",
    },
    {
      countryName: "Germany",
      phoneCode: "+49",
      imgPath: "germany.svg",
    },
    {
      countryName: "Ghana",
      phoneCode: "+233",
      imgPath: "ghana.svg",
    },
    {
      countryName: "Gibraltar",
      phoneCode: "+350",
      imgPath: "gibraltar.svg",
    },
    {
      countryName: "Greece",
      phoneCode: "+30",
      imgPath: "greece.svg",
    },
    {
      countryName: "Greenland",
      phoneCode: "+299",
      imgPath: "greenland.svg",
    },
    {
      countryName: "Grenada",
      phoneCode: "+1-473",
      imgPath: "grenada.svg",
    },
    {
      countryName: "Guam",
      phoneCode: "+1-671",
      imgPath: "guam.svg",
    },
    {
      countryName: "Guatemala",
      phoneCode: "+502",
      imgPath: "guatemala.svg",
    },
    {
      countryName: "Guinea",
      phoneCode: "+224",
      imgPath: "guinea.svg",
    },
    {
      countryName: "Guinea Bissau",
      phoneCode: "+245",
      imgPath: "guinea bissau.svg",
    },
    {
      countryName: "Guyana",
      phoneCode: "+592",
      imgPath: "guyana.svg",
    },
    {
      countryName: "Haiti",
      phoneCode: "+509",
      imgPath: "haiti.svg",
    },
    {
      countryName: "Honduras",
      phoneCode: "+504",
      imgPath: "honduras.svg",
    },
    {
      countryName: "Hong Kong",
      phoneCode: "+852",
      imgPath: "hong kong.svg",
    },
    {
      countryName: "Hungary",
      phoneCode: "+36",
      imgPath: "hungary.svg",
    },
    {
      countryName: "Iceland",
      phoneCode: "+354",
      imgPath: "iceland.svg",
    },
    {
      countryName: "India",
      phoneCode: "+91",
      imgPath: "india.svg",
    },
    {
      countryName: "Indonesia",
      phoneCode: "+62",
      imgPath: "indonesia.svg",
    },
    {
      countryName: "Iran",
      phoneCode: "+98",
      imgPath: "iran.svg",
    },
    {
      countryName: "Iraq",
      phoneCode: "+964",
      imgPath: "iraq.svg",
    },
    {
      countryName: "Ireland",
      phoneCode: "+353",
      imgPath: "ireland.svg",
    },
    {
      countryName: "Israel",
      phoneCode: "+972",
      imgPath: "israel.svg",
    },
    {
      countryName: "Italy",
      phoneCode: "+39",
      imgPath: "italy.svg",
    },
    {
      countryName: "Jamaica",
      phoneCode: "+1-876",
      imgPath: "jamaica.svg",
    },
    {
      countryName: "Japan",
      phoneCode: "+81",
      imgPath: "japan.svg",
    },
    {
      countryName: "Jordan",
      phoneCode: "+962",
      imgPath: "jordan.svg",
    },
    {
      countryName: "Kazakhstan",
      phoneCode: "+7",
      imgPath: "kazakhstan.svg",
    },
    {
      countryName: "Kenya",
      phoneCode: "+254",
      imgPath: "kenya.svg",
    },
    {
      countryName: "Kiribati",
      phoneCode: "+686",
      imgPath: "kiribati.svg",
    },
    {
      countryName: "North Korea",
      phoneCode: "+850",
      imgPath: "north korea.svg",
    },
    {
      countryName: "South Korea",
      phoneCode: "+82",
      imgPath: "south korea.svg",
    },
    {
      countryName: "Kuwait",
      phoneCode: "+965",
      imgPath: "kuwait.svg",
    },
    {
      countryName: "Kyrgyzstan",
      phoneCode: "+996",
      imgPath: "kyrgyzstan.svg",
    },
    {
      countryName: "Laos",
      phoneCode: "+856",
      imgPath: "laos.svg",
    },
    {
      countryName: "Latvia",
      phoneCode: "+371",
      imgPath: "latvia.svg",
    },
    {
      countryName: "Lebanon",
      phoneCode: "+961",
      imgPath: "lebanon.svg",
    },
    {
      countryName: "Lesotho",
      phoneCode: "+266",
      imgPath: "lesotho.svg",
    },
    {
      countryName: "Liberia",
      phoneCode: "+231",
      imgPath: "liberia.svg",
    },
    {
      countryName: "Libya",
      phoneCode: "+218",
      imgPath: "libya.svg",
    },
    {
      countryName: "Liechtenstein",
      phoneCode: "+423",
      imgPath: "liechtenstein.svg",
    },
    {
      countryName: "Lithuania",
      phoneCode: "+370",
      imgPath: "lithuania.svg",
    },
    {
      countryName: "Luxembourg",
      phoneCode: "+352",
      imgPath: "luxembourg.svg",
    },
    {
      countryName: "Macao",
      phoneCode: "+853",
      imgPath: "macao.svg",
    },
    {
      countryName: "Madagascar",
      phoneCode: "+261",
      imgPath: "madagascar.svg",
    },
    {
      countryName: "Malawi",
      phoneCode: "+265",
      imgPath: "malawi.svg",
    },
    {
      countryName: "Malaysia",
      phoneCode: "+60",
      imgPath: "malaysia.svg",
    },
    {
      countryName: "Maldives",
      phoneCode: "+960",
      imgPath: "maldives.svg",
    },
    {
      countryName: "Mali",
      phoneCode: "+223",
      imgPath: "mali.svg",
    },
    {
      countryName: "Malta",
      phoneCode: "+356",
      imgPath: "malta.svg",
    },
    {
      countryName: "Marshall Island",
      phoneCode: "+692",
      imgPath: "marshall island.svg",
    },
    {
      countryName: "Martinique",
      phoneCode: "+596",
      imgPath: "martinique.svg",
    },
    {
      countryName: "Mauritania",
      phoneCode: "+222",
      imgPath: "mauritania.svg",
    },
    {
      countryName: "Mauritius",
      phoneCode: "+230",
      imgPath: "mauritius.svg",
    },
    {
      countryName: "Mexico",
      phoneCode: "+52",
      imgPath: "mexico.svg",
    },
    {
      countryName: "Micronesia",
      phoneCode: "+691",
      imgPath: "micronesia.svg",
    },
    {
      countryName: "Moldova",
      phoneCode: "+373",
      imgPath: "moldova.svg",
    },
    {
      countryName: "Monaco",
      phoneCode: "+377",
      imgPath: "monaco.svg",
    },
    {
      countryName: "Mongolia",
      phoneCode: "+976",
      imgPath: "mongolia.svg",
    },
    {
      countryName: "Montserrat",
      phoneCode: "+1-664",
      imgPath: "montserrat.svg",
    },
    {
      countryName: "Morocco",
      phoneCode: "+212",
      imgPath: "morocco.svg",
    },
    {
      countryName: "Mozambique",
      phoneCode: "+258",
      imgPath: "mozambique.svg",
    },
    {
      countryName: "Myanmar",
      phoneCode: "+95",
      imgPath: "myanmar.svg",
    },
    {
      countryName: "Namibia",
      phoneCode: "+264",
      imgPath: "namibia.svg",
    },
    {
      countryName: "Nauru",
      phoneCode: "+674",
      imgPath: "nauru.svg",
    },
    {
      countryName: "Nepal",
      phoneCode: "+977",
      imgPath: "nepal.svg",
    },
    {
      countryName: "Netherlands",
      phoneCode: "+31",
      imgPath: "netherlands.svg",
    },
    {
      countryName: "New Zealand",
      phoneCode: "+64",
      imgPath: "new zealand.svg",
    },
    {
      countryName: "Nicaragua",
      phoneCode: "+505",
      imgPath: "nicaragua.svg",
    },
    {
      countryName: "Niger",
      phoneCode: "+227",
      imgPath: "niger.svg",
    },
    {
      countryName: "Nigeria",
      phoneCode: "+234",
      imgPath: "nigeria.svg",
    },
    {
      countryName: "Niue",
      phoneCode: "+683",
      imgPath: "niue.svg",
    },
    {
      countryName: "Norfolk Island",
      phoneCode: "+672",
      imgPath: "norfolk island.svg",
    },
    {
      countryName: "Northern Marianas Islands",
      phoneCode: "+1-670",
      imgPath: "northern marianas islands.svg",
    },
    {
      countryName: "Norway",
      phoneCode: "+47",
      imgPath: "norway.svg",
    },
    {
      countryName: "Oman",
      phoneCode: "+968",
      imgPath: "oman.svg",
    },
    {
      countryName: "Pakistan",
      phoneCode: "+92",
      imgPath: "pakistan.svg",
    },
    {
      countryName: "Palau",
      phoneCode: "+680",
      imgPath: "palau.svg",
    },
    {
      countryName: "Palestine",
      phoneCode: "+970",
      imgPath: "palestine.svg",
    },
    {
      countryName: "Panama",
      phoneCode: "+507",
      imgPath: "panama.svg",
    },
    {
      countryName: "Papua New Guinea",
      phoneCode: "+675",
      imgPath: "papua new guinea.svg",
    },
    {
      countryName: "Paraguay",
      phoneCode: "+595",
      imgPath: "paraguay.svg",
    },
    {
      countryName: "Peru",
      phoneCode: "+51",
      imgPath: "peru.svg",
    },
    {
      countryName: "Philippines",
      phoneCode: "+63",
      imgPath: "philippines.svg",
    },
    {
      countryName: "Pitcairn Islands",
      phoneCode: "+649",
      imgPath: "pitcairn islands.svg",
    },
    {
      countryName: "Poland",
      phoneCode: "+48",
      imgPath: "poland.svg",
    },
    {
      countryName: "Portugal",
      phoneCode: "+351",
      imgPath: "portugal.svg",
    },
    {
      countryName: "Puerto Rico",
      phoneCode: "+1-787",
      imgPath: "puerto rico.svg",
    },
    {
      countryName: "Puerto Rico",
      phoneCode: "+1-939",
      imgPath: "puerto rico.svg",
    },
    {
      countryName: "Qatar",
      phoneCode: "+974 ",
      imgPath: "qatar.svg",
    },
    {
      countryName: "Romania",
      phoneCode: "+40",
      imgPath: "romania.svg",
    },
    {
      countryName: "Russia",
      phoneCode: "+7",
      imgPath: "russia.svg",
    },
    {
      countryName: "Rwanda",
      phoneCode: "+250",
      imgPath: "rwanda.svg",
    },
    {
      countryName: "Samoa",
      phoneCode: "+685",
      imgPath: "samoa.svg",
    },
    {
      countryName: "San Marino",
      phoneCode: "+378",
      imgPath: "san marino.svg",
    },
    {
      countryName: "Sao Tome And Prince",
      phoneCode: "+239",
      imgPath: "sao tome and prince.svg",
    },
    {
      countryName: "Saudi Arabia",
      phoneCode: "+966",
      imgPath: "saudi arabia.svg",
    },
    {
      countryName: "Serbia",
      phoneCode: "+381",
      imgPath: "serbia.svg",
    },
    {
      countryName: "Senegal",
      phoneCode: "+221",
      imgPath: "senegal.svg",
    },
    {
      countryName: "Seychelles",
      phoneCode: "+248",
      imgPath: "seychelles.svg",
    },
    {
      countryName: "Sierra Leone",
      phoneCode: "+232",
      imgPath: "sierra leone.svg",
    },
    {
      countryName: "Singapore",
      phoneCode: "+65",
      imgPath: "singapore.svg",
    },
    {
      countryName: "Slovakia",
      phoneCode: "+421",
      imgPath: "slovakia.svg",
    },
    {
      countryName: "Slovenia",
      phoneCode: "+386",
      imgPath: "slovenia.svg",
    },
    {
      countryName: "Solomon Islands",
      phoneCode: "+677",
      imgPath: "solomon islands.svg",
    },
    {
      countryName: "Somalia",
      phoneCode: "+252",
      imgPath: "somalia.svg",
    },
    {
      countryName: "South Africa",
      phoneCode: "+27",
      imgPath: "south africa.svg",
    },
    {
      countryName: "Spain",
      phoneCode: "+34",
      imgPath: "spain.svg",
    },
    {
      countryName: "Sri Lanka",
      phoneCode: "+94",
      imgPath: "sri lanka.svg",
    },
    {
      countryName: "Sudan",
      phoneCode: "+249",
      imgPath: "sudan.svg",
    },
    {
      countryName: "Suriname",
      phoneCode: "+597",
      imgPath: "suriname.svg",
    },
    {
      countryName: "Swaziland",
      phoneCode: "+268",
      imgPath: "swaziland.svg",
    },
    {
      countryName: "Sweden",
      phoneCode: "+46",
      imgPath: "sweden.svg",
    },
    {
      countryName: "Switzerland",
      phoneCode: "+41",
      imgPath: "switzerland.svg",
    },
    {
      countryName: "Syria",
      phoneCode: "+963",
      imgPath: "syria.svg",
    },
    {
      countryName: "Taiwan",
      phoneCode: "+886",
      imgPath: "taiwan.svg",
    },
    {
      countryName: "Tajikistan",
      phoneCode: "+992",
      imgPath: "tajikistan.svg",
    },
    {
      countryName: "Tanzania",
      phoneCode: "+255",
      imgPath: "tanzania.svg",
    },
    {
      countryName: "Thailand",
      phoneCode: "+66",
      imgPath: "thailand.svg",
    },
    {
      countryName: "Togo",
      phoneCode: "228",
      imgPath: "togo.svg",
    },
    {
      countryName: "Tokelau",
      phoneCode: "+690",
      imgPath: "tokelau.svg",
    },
    {
      countryName: "Tonga",
      phoneCode: "+676",
      imgPath: "tonga.svg",
    },
    {
      countryName: "Trinidad And Tobago",
      phoneCode: "+1-868",
      imgPath: "trinidad and tobago.svg",
    },
    {
      countryName: "Tunisia",
      phoneCode: "+216",
      imgPath: "tunisia.svg",
    },
    {
      countryName: "Turkey",
      phoneCode: "+90",
      imgPath: "turkey.svg",
    },
    {
      countryName: "Turkmenistan",
      phoneCode: "+993",
      imgPath: "turkmenistan.svg",
    },
    {
      countryName: "Turks And Caicos",
      phoneCode: "+1-649",
      imgPath: "turks and caicos.svg",
    },
    {
      countryName: "Tuvalu",
      phoneCode: "+688",
      imgPath: "tuvalu.svg",
    },
    {
      countryName: "Uganda",
      phoneCode: "+256",
      imgPath: "uganda.svg",
    },
    {
      countryName: "Ukraine",
      phoneCode: "+380",
      imgPath: "ukraine.svg",
    },
    {
      countryName: "United Arab Emirates",
      phoneCode: "+971",
      imgPath: "united arab emirates.svg",
    },
    {
      countryName: "United Kingdom",
      phoneCode: "+44",
      imgPath: "united kingdom.svg",
    },
    {
      countryName: "United States",
      phoneCode: "+1",
      imgPath: "united states.svg",
    },
    {
      countryName: "Uruguay",
      phoneCode: "+598",
      imgPath: "uruguay.svg",
    },
    {
      countryName: "Uzbekistan",
      phoneCode: "+998",
      imgPath: "uzbekistan.svg",
    },
    {
      countryName: "Vanuatu",
      phoneCode: "+678",
      imgPath: "vanuatu.svg",
    },
    {
      countryName: "Vatican City",
      phoneCode: "+379",
      imgPath: "vatican city.svg",
    },
    {
      countryName: "Venezuela",
      phoneCode: "+58",
      imgPath: "venezuela.svg",
    },
    {
      countryName: "Vietnam",
      phoneCode: "+84",
      imgPath: "vietnam.svg",
    },
    {
      countryName: "Virgin Islands",
      phoneCode: "+1-284",
      imgPath: "virgin islands.svg",
    },
    {
      countryName: "Yemen",
      phoneCode: "+967",
      imgPath: "yemen.svg",
    },
    {
      countryName: "Zambia",
      phoneCode: "+260",
      imgPath: "zambia.svg",
    },
    {
      countryName: "Zimbabwe",
      phoneCode: "+263",
      imgPath: "zimbabwe.svg",
    },
    {
      countryName: "Abkhazia",
      phoneCode: "+7-840",
      imgPath: "abkhazia.svg",
    },
    {
      countryName: "Aland Islands",
      phoneCode: "+358-18",
      imgPath: "aland islands.svg",
    },
    {
      countryName: "Azores Islands",
      phoneCode: "+351",
      imgPath: "azores islands.svg",
    },
    {
      countryName: "Balearic Islands",
      phoneCode: "+34",
      imgPath: "balearic islands.svg",
    },
    {
      countryName: "Basque Country",
      phoneCode: "+34",
      imgPath: "basque country.svg",
    },
    {
      countryName: "Bonaire",
      phoneCode: "+599-7",
      imgPath: "bonaire.svg",
    },
    {
      countryName: "British Columbia",
      phoneCode: "+1-604",
      imgPath: "british columbia.svg",
    },
    {
      countryName: "British Columbia",
      phoneCode: "+1-778",
      imgPath: "british columbia.svg",
    },
    {
      countryName: "British Columbia",
      phoneCode: "+1-236",
      imgPath: "british columbia.svg",
    },
    {
      countryName: "British Columbia",
      phoneCode: "+1-250",
      imgPath: "british columbia.svg",
    },
    {
      countryName: "British Indian Ocean Territory",
      phoneCode: "+246",
      imgPath: "british indian ocean territory.svg",
    },
    {
      countryName: "British Virgin Islands",
      phoneCode: "+1-284",
      imgPath: "british virgin islands.svg",
    },
    {
      countryName: "Canary Islands",
      phoneCode: "+34",
      imgPath: "canary islands.svg",
    },
    {
      countryName: "Ceuta",
      phoneCode: "+34",
      imgPath: "ceuta.svg",
    },
    {
      countryName: "Corsica",
      phoneCode: "+33",
      imgPath: "corsica.svg",
    },
    {
      countryName: "Curacao",
      phoneCode: "+599-9",
      imgPath: "curacao.svg",
    },
    {
      countryName: "England",
      phoneCode: "+44",
      imgPath: "england.svg",
    },
    {
      countryName: "European Union",
      phoneCode: "+388",
      imgPath: "european union.svg",
    },
    {
      countryName: "Galapagos Islands",
      phoneCode: "+593",
      imgPath: "galapagos islands.svg",
    },
    {
      countryName: "Guernsey",
      phoneCode: "+44-1481",
      imgPath: "guernsey.svg",
    },
    {
      countryName: "Hawaii",
      phoneCode: "+1-808",
      imgPath: "hawaii.svg",
    },
    {
      countryName: "Isle Of Man",
      phoneCode: "+44-1624",
      imgPath: "isle of man.svg",
    },
    {
      countryName: "Ivory Coast",
      phoneCode: "+225",
      imgPath: "ivory coast.svg",
    },
    {
      countryName: "Jersey",
      phoneCode: "+44-1534",
      imgPath: "jersey.svg",
    },
    {
      countryName: "Kosovo",
      phoneCode: "+383",
      imgPath: "kosovo.svg",
    },
    {
      countryName: "Madeira",
      phoneCode: "+351",
      imgPath: "madeira.svg",
    },
    {
      countryName: "Melilla",
      phoneCode: "+34",
      imgPath: "melilla.svg",
    },
    {
      countryName: "Montenegro",
      phoneCode: "+382",
      imgPath: "montenegro.svg",
    },
    {
      countryName: "Northern Cyprus",
      phoneCode: "+90-392",
      imgPath: "northern cyprus.svg",
    },
    {
      countryName: "Nato",
      phoneCode: "+32",
      imgPath: "nato.svg",
    },
    {
      countryName: "Orkney Islands",
      phoneCode: "+44-1856",
      imgPath: "orkney islands.svg",
    },
    {
      countryName: "Ossetia",
      phoneCode: "+7-840",
      imgPath: "ossetia.svg",
    },
    {
      countryName: "Rapa Nui",
      phoneCode: "+56",
      imgPath: "rapa nui.svg",
    },
    {
      countryName: "Republic Of Macedonia",
      phoneCode: "+389",
      imgPath: "republic of macedonia.svg",
    },
    {
      countryName: "Republic Of The Congo",
      phoneCode: "+242",
      imgPath: "republic of the congo.svg",
    },
    {
      countryName: "Saba Island",
      phoneCode: "+599-4",
      imgPath: "saba island.svg",
    },
    {
      countryName: "Sahrawi Arab Democratic Republic",
      phoneCode: "+212",
      imgPath: "sahrawi arab democratic republic.svg",
    },
    {
      countryName: "Sardinia",
      phoneCode: "+39",
      imgPath: "sardinia.svg",
    },
    {
      countryName: "Scotland",
      phoneCode: "+44",
      imgPath: "scotland.svg",
    },
    {
      countryName: "Sint Eustatius",
      phoneCode: "+599-3",
      imgPath: "sint eustatius.svg",
    },
    {
      countryName: "Sint Maarten",
      phoneCode: "+1-721",
      imgPath: "sint maarten.svg",
    },
    {
      countryName: "Somaliland",
      phoneCode: "+252",
      imgPath: "somaliland.svg",
    },
    {
      countryName: "South Sudan",
      phoneCode: "+211",
      imgPath: "south sudan.svg",
    },
    {
      countryName: "St Barts",
      phoneCode: "+590",
      imgPath: "st barts.svg",
    },
    {
      countryName: "St Lucia",
      phoneCode: "+1-758",
      imgPath: "st lucia.svg",
    },
    {
      countryName: "St Vincent And The Grenadines",
      phoneCode: "+1-784",
      imgPath: "st vincent and the grenadines.svg",
    },
    {
      countryName: "Tibet",
      phoneCode: "+86",
      imgPath: "tibet.svg",
    },
    {
      countryName: "Transnistria",
      phoneCode: "+373",
      imgPath: "transnistria.svg",
    },
    {
      countryName: "Wales",
      phoneCode: "+44",
      imgPath: "wales.svg",
    },
  ];
};
