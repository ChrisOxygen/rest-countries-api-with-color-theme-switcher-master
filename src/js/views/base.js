export const elements = {
  homePage: document.querySelector(".home"),
  countryPage: document.querySelector(".country-page"),
  darkModeBtn: document.querySelector(".dark-mode"),
  countriesContainer: document.querySelector(".countries"),
  //country: document.querySelectorAll(".country"),
  dropDownWrapper: document.querySelector(".custom-select-wrapper"),
  optionList: document.querySelectorAll(".custom-option"),
};

export const toggleDarkMode = (e) => {
  document
    .querySelector(".dark-mode__icon")
    .classList.toggle("icon-dark-mode-style");
  document.querySelector("body").classList.toggle("body-dark-mode-style");
  document
    .querySelector(".custom-select-wrapper")
    .classList.toggle("drop-down-dark-mode-style");
  document.querySelector("header").classList.toggle("header-dark-mode-style");
  document
    .querySelector(".country-page")
    .classList.toggle("country-page-dark-mode-style");
  document.querySelector(".home").classList.toggle("home-dark-mode-style");
  document.querySelector(".search").classList.toggle("search-dark-mode-style");
  document.querySelectorAll(".country").forEach((i) => {
    i.classList.toggle("country-dark-mode-style");
  });
};

export const initDropDown = () => {
  elements.dropDownWrapper.addEventListener("click", () => {
    elements.dropDownWrapper
      .querySelector(".custom-select")
      .classList.toggle("open");
  });

  for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener("click", () => {
      if (!option.classList.contains("selected")) {
        option.parentNode
          .querySelector(".custom-option.selected")
          .classList.remove("selected");
        option.classList.add("selected");
        option
          .closest(".custom-select")
          .querySelector(".custom-select__trigger span").textContent =
          option.textContent;
      }
    });
  }

  window.addEventListener("click", (e) => {
    const select = document.querySelector(".custom-select");
    if (!select.contains(e.target)) {
      select.classList.remove("open");
    }
  });
};
