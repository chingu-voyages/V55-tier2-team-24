import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange, currentPage }) => {
  return (
    <ReactPaginate
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={'flex justify-center items-center gap-2'}
      pageClassName={'px-3 py-2 mx-1 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer'}
      previousClassName={'px-3 py-2 mx-1 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer'}
      nextClassName={'px-3 py-2 mx-1 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer'}
      activeClassName={'text-[#41A3C9]'}
      disabledClassName={'opacity-50 cursor-not-allowed'}
      forcePage={currentPage}
    />
  );
};

export default Pagination;