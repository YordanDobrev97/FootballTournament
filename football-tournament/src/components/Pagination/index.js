import React from 'react'
import classnames from 'classnames'
import { usePagination, DOTS } from '../../hooks/usePagination'
import './index.scss'

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className='pagination-container'
    >
      <li
        className='pagination-item'
        onClick={onPrevious}
      >
        <div className='arrow left' />
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className='pagination-item dots'>&#8230;</li>;
        }

        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className='pagination-item'
        onClick={onNext}
      >
        <div className='arrow right' />
      </li>
    </ul>
  );
};

export default Pagination;