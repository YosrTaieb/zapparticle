import React from 'react';
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDoubleRight,
} from 'react-icons/hi';
import { TiArrowSortedDown } from 'react-icons/ti';
import './Pagination.css';

const Pagination = ({ page, setPage, items }) => {
  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < items.total_pages) {
      setPage(page + 1);
    }
  };

  const handlePage = (pageNumber) => {
    setPage(pageNumber);
  };
  return (
    <div className="Pagination">
      <ul>
        {page !== 1 ? (
          <li onClick={() => handlePage(1)} className="first">
            1
          </li>
        ) : (
          ''
        )}
        {page - 10 > 1 ? (
          <li onClick={() => handlePage(page - 10)} className="infoBulle">
            <HiOutlineChevronDoubleLeft />
            <div>
              {page - 10}
              <TiArrowSortedDown />
            </div>
          </li>
        ) : (
          ''
        )}
        {page - 1 > 0 ? (
          <li onClick={handlePrevPage} className="infoBulle">
            <HiOutlineChevronLeft />
            <div>
              {page - 1}
              <TiArrowSortedDown />
            </div>
          </li>
        ) : (
          ''
        )}
        <li className="current">{items.page}</li>
        {page + 1 <= items.total_pages ? (
          <li onClick={handleNextPage} className="infoBulle">
            <HiOutlineChevronRight />
            <div>
              {page + 1}
              <TiArrowSortedDown />
            </div>
          </li>
        ) : (
          ''
        )}
        {page + 10 < items.total_pages ? (
          <li onClick={() => handlePage(page + 10)} className="infoBulle">
            <HiOutlineChevronDoubleRight />
            <div>
              {page + 10}
              <TiArrowSortedDown />
            </div>
          </li>
        ) : (
          ''
        )}
        {page !== items.total_pages ? (
          <li className="last" onClick={() => handlePage(items.total_pages)}>
            {items.total_pages}
          </li>
        ) : (
          ''
        )}
      </ul>
    </div>
  );
};

export default Pagination;
