import { elements } from "./base";
import { parsePopulation } from "./allCountriesView";
import { state } from "../index";

export const displayCountryInfo = (countryID) => {
  console.log(countryID);
};

export const controlCountryDisplay = (instruction) => {
  instruction === "off"
    ? (elements.countryPage.style.display = "none")
    : (elements.countryPage.style.display = "grid");
};

const parseCurrencies = (currencies) => {
  if (currencies) {
    let currencyNamesList = [];
    let currencyNames;
    currencies.forEach((cur) => {
      currencyNamesList.push(cur.name);
    });
    if (currencyNamesList.length > 1) {
      currencyNames = currencyNamesList.join(", ");
    } else {
      currencyNames = currencyNamesList[0];
    }
    return currencyNames;
  } else {
    return "N/A";
  }
};

const parseLang = (languages) => {
  if (languages) {
    let languagesList = [];
    let langString;
    languages.forEach((curLang) => {
      languagesList.push(curLang.name);
    });
    if (languagesList.length > 1) {
      langString = languagesList.join(", ");
    } else {
      langString = languagesList[0];
    }
    return langString;
  } else {
    return "N/A";
  }
};

const createBorderCountries = (borders) => {
  if (borders) {
    let markUp = " ";
    for (let border of borders) {
      //1. find country from country code
      state.world.countries.forEach((country) => {
        if (country.alpha3Code === border) {
          if (country.name.length < 10) {
            markUp += `<a href="" class="btn border-countries__link">${country.name}</a> `;
          }
        }
      });
      if (borders.indexOf(border) === 3) {
        break;
      }
    }
    return markUp;
  } else {
    return "N/A";
  }
};

export const renderCountryInfo = (country) => {
  const markup = `
    <div class="country-page__content">
    <a href="#" class="btn back-btn">&#8592; Back</a>
    <div class="country-info">
      <div class="country-info__flag">
        <img
          src="${country.flag}"
          alt="${country.name}"
          class="country-info__flag--img"
        />
      </div>
      <div class="country-info__details">
        <h1 class="country-info__details--name">${country.name}</h1>
        <ul class="country-info__details--list">
          <li class="country-info__details--item">
            <p class="country-info__details--item-native-name">
              <strong>Native name: </strong>${country.nativeName}
            </p>
          </li>
          <li class="country-info__details--item">
            <p class="country-info__details--item-population">
              <strong>Population: </strong>${parsePopulation.format(
                country.population
              )}
            </p>
          </li>
          <li class="country-info__details--item">
            <p class="country-info__details--item-region">
              <strong>Region: </strong>${country.region}
            </p>
          </li>
          <li class="country-info__details--item">
            <p class="country-info__details--item-sub-region">
              <strong>Sub region: </strong>${country.subregion}
            </p>
          </li>
          <li class="country-info__details--item">
            <p class="country-info__details--item-Capital">
              <strong>Capital: </strong>${country.capital}
            </p>
          </li>
          <li class="country-info__details--item">
            <p class="country-info__details--item-top-level-domain">
              <strong>Top level domain: </strong>${country.topLevelDomain}
            </p>
          </li>
          <li class="country-info__details--item">
            <p class="country-info__details--item-currencies">
              <strong>Currencies: </strong>${parseCurrencies(
                country.currencies
              )}
            </p>
          </li>
          <li class="country-info__details--item">
            <p class="country-info__details--item-languages">
              <strong>languages: </strong>${parseLang(country.languages)}
            </p>
          </li>
        </ul>
        <p class="country-info__details--border-countries">
          <strong>Border-counties: </strong
          ><span class="border-countries">
          ${createBorderCountries(country.borders)}
          </span>
        </p>
      </div>
    </div>
  </div>
      `;
  elements.countryPage.insertAdjacentHTML("beforeend", markup);
};

export const clearCountryPage = () => {
  elements.countryPage.innerHTML = "";
};
