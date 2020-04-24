import AllCountries from "./models/AllCountries";
import { elements, toggleDarkMode, initDropDown } from "./views/base";
import * as allCountriesView from "./views/allCountriesView";
import * as CountryView from "./views/countryView";

export const state = {};

const controlAllCountries = async () => {
  state.world = new AllCountries();
  try {
    //1. get all countries
    await state.world.getCountries();
    //2. render countries on home page
    allCountriesView.renderCountries(state.world.countries);
  } catch (error) {
    alert("Countries data refused to load !!!");
  }
};

// on page load or reload
window.addEventListener("load", () => {
  //initialize dark mode view and drop down
  elements.darkModeBtn.addEventListener("click", (e) => {
    if (e.target.closest(".dark-mode")) {
      toggleDarkMode(e);
    }
  });
  initDropDown();
  // get and render countries on home page
  controlAllCountries();
});

// REGION  CONTROLLER
document.querySelectorAll(".custom-option").forEach((Option) => {
  Option.addEventListener("click", (e) => {
    console.log(e.target.textContent);
    allCountriesView.filterByRegion(e.target.textContent);
  });
});

//COUNTRY VIEW CONTROLLER

elements.countriesContainer.addEventListener("click", (e) => {
  //1. get selected country name
  const selectedCountryName = e.target.closest(".country").id;
  //2. disable home display
  allCountriesView.controlHomeDisplay("off");
  //3. enable country page
  CountryView.controlCountryDisplay("on");
  //4. display country info
  state.world.countries.forEach((country) => {
    if (country.name === selectedCountryName) {
      CountryView.renderCountryInfo(country);
    }
  });
});

//COUNTRY BUTTONS ON COUNTRY VIEW PAGE
const prevCountryNames = [];
elements.countryPage.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.matches("a.border-countries__link")) {
    // 1. store current country name in array

    prevCountryNames.push(
      document.querySelector(".country-info__details--name").textContent
    );
    console.log(prevCountryNames);
    //2.get selected country name
    const selectedCountryName = e.target.textContent;
    //3. clear country page
    CountryView.clearCountryPage();
    //4. display country info
    state.world.countries.forEach((country) => {
      if (country.name === selectedCountryName) {
        CountryView.renderCountryInfo(country);
      }
    });
  } else if (e.target.matches("a.back-btn")) {
    if (prevCountryNames.length > 0) {
      //1. get last country name
      const selectedCountryName = prevCountryNames.pop();
      //2. clear country page
      CountryView.clearCountryPage();
      //3. display country info
      state.world.countries.forEach((country) => {
        if (country.name === selectedCountryName) {
          CountryView.renderCountryInfo(country);
        }
      });
    } else {
      //1. clear country page
      CountryView.clearCountryPage();
      //2. disable country info display
      CountryView.controlCountryDisplay("off");
      //3.enable home display
      allCountriesView.controlHomeDisplay("on");
    }
  }
});

//SEARCH CONTROLLER
elements.homePage.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.matches(".search")) {
    //1.get search input
    const selectedCountryName = document.querySelector(".search__input").value;
    //2. clear search input
    document.querySelector(".search__input").value = "";
    //3. disable home display
    allCountriesView.controlHomeDisplay("off");
    //4. enable country page
    CountryView.controlCountryDisplay("on");
    //5.display country info
    state.world.countries.forEach((country) => {
      if (country.name.toLowerCase() === selectedCountryName.toLowerCase()) {
        CountryView.renderCountryInfo(country);
      }
    });
    console.log(elements.countryPage);
    // //1. Alert the error massage
    // alert("No country has this name, kindly enter a valid country name");
    // //2. clear country page
    // CountryView.clearCountryPage();
    // //3. disable country info display
    // CountryView.controlCountryDisplay("off");
    // //4.enable home display
    // allCountriesView.controlHomeDisplay("on");
  }
});
