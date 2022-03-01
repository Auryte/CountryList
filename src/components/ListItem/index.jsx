import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const ListItem = ({data}) => {
  const {name, region, area} = data;
  return (
    <div className={styles.CountryCard}>
      <h3>Country: <b>{name}</b></h3>
      <h3>Region: <b>{region}</b></h3>
      <h3>Country area: <b>{area} km²</b></h3>
    </div>
  );
};

export default ListItem;
ListItem.defaultProps ={
  area: null,
  name:'',
  region: ''
};
ListItem.propTypes= {
  data: PropTypes.object.isRequired,
  name: PropTypes.string,
  region: PropTypes.string,
  area: PropTypes.number
};
