import axios from "axios";

export default class AllCountries {
  constructor() {}

  async getCountries() {
    try {
      // we installed a module called "axios(installed as dependency) its what we use and it returns JSON data"
      const res = await axios(`https://restcountries.eu/rest/v2/all`);
      this.countries = res.data;
    } catch (err) {
      alert(err);
    }
  }
}
