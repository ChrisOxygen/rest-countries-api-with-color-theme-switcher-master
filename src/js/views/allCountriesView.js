import { elements } from "./base";

export const parsePopulation = new Intl.NumberFormat();

const renderCountry = (country) => {
  const markup = `
    <div class="country ${country.region.toLowerCase()}" id="${country.name}">
          <div class="country__flag">
            <img
              src="${country.flag}"
              alt="${country.name}"
              class="country__flag--img"
            />
          </div>
          <div class="country__detail">
            <h2 class="country__detail--name">${country.name}</h2>
            <p class="country__detail--population">
              <strong>Population: </strong>${parsePopulation.format(
                country.population
              )}
            </p>
            <p class="country__detail--region">
              <strong>Region: </strong>${country.region}
            </p>
            <p class="country__detail--capital">
              <strong>Capital: </strong>${country.capital}
            </p>
          </div>
    </div>
    `;
  elements.countriesContainer.insertAdjacentHTML("beforeend", markup);
};

export const renderCountries = (countryList) => {
  countryList.forEach((country) => {
    renderCountry(country);
  });
};

export const filterByRegion = (region) => {
  document.querySelectorAll(".country").forEach((country) => {
    if (region === "all") {
      country.style.display = "flex";
    } else {
      if (country.classList.contains(region.toLowerCase())) {
        country.style.display = "flex";
      } else {
        country.style.display = "none";
      }
    }
  });
};

export const controlHomeDisplay = (instruction) => {
  instruction === "off"
    ? (elements.homePage.style.display = "none")
    : (elements.homePage.style.display = "grid");
};
