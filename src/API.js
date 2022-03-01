import {requestOptions} from './config/requestOptions';

const domain = 'https://restcountries.com/v2/all?fields=name,region,area';

const fetchCountries = async ()=>{
  try {
    const response = await fetch(domain, requestOptions );
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
 
};

const API = {
  fetchCountries
};

export default API;