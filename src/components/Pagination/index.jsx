import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem';
import styles from './styles.module.css';
import { usePagination, DOTS } from '../../hooks/usePagination';
import PaginationButton from '../PaginationButton';

const Pagination = ({data, itemsPerPage, totalCount}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const siblingCount = 1;
  const totalPageCount = Math.ceil(totalCount / itemsPerPage);
  const [paginationRange ]= usePagination({
    currentPage,
    totalPageCount,
    siblingCount,
    itemsPerPage
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [totalCount]);

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };
  const getPaginatedData = () => {
    const startIndex = currentPage * itemsPerPage - itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };
 
  return (
    <div>
      <div className={styles.DataContainer}>
        {getPaginatedData().map((itemData) => (
          <ListItem key={itemData.name} data={itemData} />
        ))}
      </div>
     
      <div className={styles.Pagination}>
        <PaginationButton
          onClick={onPreviousPage}
          className={`${styles.Prev} ${currentPage === 1 ? styles.Disabled : ''}`}
          text='&#x3c;'
        />
        {paginationRange().map((pageNumber, index) => (
          (pageNumber === DOTS) ?
            <PaginationButton
              key={index}
              className={styles.PaginationDots}
              text='&#8230;'
            />
            :
            <PaginationButton
              key={index}
              onClick={changePage}
              className={`${styles.PaginationItem} ${currentPage === pageNumber && styles.Active}`}
              text={pageNumber}
            />
        ))}
        <PaginationButton
          onClick={onNextPage}
          className={`${styles.Next} ${currentPage === totalPageCount ? styles.Disabled : ''}`}
          text=' &#x3e;'
        />
      </div>
    </div>
  );
};

export default Pagination;
Pagination.defaultProps = {
};
Pagination.propTypes= {
  data: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired
};
