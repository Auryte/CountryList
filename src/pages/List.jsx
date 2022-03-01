import React, {useState, useEffect} from 'react';
import API from '../API';
import { Loader } from '../components/Loader';
import styles from './styles.module.css';
import Select from '../components/Select';
import Pagination from '../components/Pagination';

const itemsPerPage = 10;

const List = () => {
  const [countries, setCountries] = useState([]);
  const [filterParam, setFilterParam] = useState('All Countries');
  const [sortParam, setSortParam] = useState('A-Z');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await API.fetchCountries();
        setCountries(data);
        setIsLoaded(true);
      } catch (error) {
        setError(error);
        setIsLoaded(true);
      }
    };
    getCountries();
  }, []);
  
  if (!isLoaded) return <Loader />;
  
  const search = (countries) => {
    return countries.filter(country => {
      if (filterParam === 'All Countries'){
        return country;
      }
      if (filterParam === 'Countries in Oceania'){
        return country.region === 'Oceania';
      }
      if (filterParam === 'Countries smaller than Lithuania'){
        return country.area < 65300;
      }
    });
  };

  return (
    <div className={styles.Main}>
      <h1 className={styles.Title}>Country List</h1>
      <div className={styles.SelectNavbar}>
        <Select
          onChange={(e)=>{setSortParam(e.target.value);}} 
          value1='A-Z'
          value2='Z-A'
        />
        <Select
          onChange={(e)=>{setFilterParam(e.target.value);}} 
          value1='All Countries'
          value2='Countries in Oceania'
          value3='Countries smaller than Lithuania'
        />
      </div>
      <Pagination
        data={(sortParam === 'A-Z') ? search(countries) : search(countries).reverse()}
        itemsPerPage={itemsPerPage} 
        totalCount={search(countries).length}
      />
      {error && <div>{error.message}</div>}
    </div>
  );
};

export default List;