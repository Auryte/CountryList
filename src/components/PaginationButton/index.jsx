import React from 'react';
import PropTypes from 'prop-types';

const PaginationButton = ({className, text, onClick}) => {
  return (
    <button
      onClick={onClick}
      className={className}
    >
      <span>{text}</span>
    </button>
  );
};

export default PaginationButton;
PaginationButton.defaultProps ={
  onClick: ()=>{}
};
PaginationButton.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([ PropTypes.string,PropTypes.number,]).isRequired,
  onClick: PropTypes.func
};