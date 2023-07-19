// General functions
import axios from "axios";
import currenciesData from "./data/currenciesData";

const createCountryObj = async (countryName) => {
  const resp = await axios.get(
    `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
  );
  const country = resp.data[0];
  const currencyCode = Object.keys(country.currencies)[0];
  const currencyInfo = Object.values(country.currencies)[0];

  const countryObj = {
    name: countryName,
    position: country.capitalInfo.latlng,
    content: {
      currency: {
        code: currencyCode,
        name: currencyInfo.name,
        symbol: currencyInfo.symbol,
      },
      flag: {
        isoCountryCode: country.cca2,
        description: country.flags.alt,
      },
    },
  };

  return countryObj;
};

// Determine the official country of a currency in case of use in various countries
const getCurrencyCountry = (data, currencyIsoCode) => {
  if (data.length > 1) {
    for (const element of data) {
      if (
        element.name.common === currenciesData[currencyIsoCode].motherCountry
      ) {
        return element;
      }
    }
  }
  
  return data[0];
};

const searchCurrency = (key, currency, name) => {
  if (
    key.includes(name.toUpperCase()) ||
    currency.name.toLowerCase().includes(name.toLowerCase()) ||
    currency.countries.some((country) =>
      country.toLowerCase().includes(name.toLowerCase())
    )
  ) {
    return true;
  }

  return false;
};

const limitFloats = (num) => {
  if (isNaN(num)) return "Not supported";
  let newNum = Math.floor(num * 100) / 100;

  return newNum;
};

export {
  createCountryObj,
  getCurrencyCountry,
  searchCurrency,
  limitFloats,
};
