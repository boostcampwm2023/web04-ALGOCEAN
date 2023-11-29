/* eslint-disable no-unused-vars */
import * as S from './Pagination.styles';
import { useEffect, useState } from 'react';

interface PaginationProps {
  wholePageCount: number;
  currentPage: number;
  handleCurrentPage: (nextPage: number) => void;
  splitNumber: number;
}

const getCurrentNum = (
  wholePageCount: number,
  currentPage: number,
  splitNumber: number,
) => {
  const idx =
    currentPage % splitNumber === 0
      ? currentPage / splitNumber - 1
      : Math.floor(currentPage / splitNumber);
  const result = Array.from({ length: wholePageCount }, (_, i) => i + 1).slice(
    idx * splitNumber,
    (idx + 1) * splitNumber,
  );

  return result;
};

export function Pagination({
  wholePageCount,
  currentPage,
  handleCurrentPage,
  splitNumber,
}: PaginationProps) {
  const [isFirstPage, setIsFirstPage] = useState<boolean>(currentPage === 1);
  const [isLastPage, setIsLastPage] = useState<boolean>(
    currentPage === wholePageCount,
  );
  const handleLeftButton = () => {
    if (isFirstPage) {
      return;
    }

    const nextPage = currentPage - 1;
    handleCurrentPage(nextPage);

    if (nextPage === 1) {
      setIsFirstPage(true);
    }
    if (isLastPage) {
      setIsLastPage(false);
    }
  };

  const handleRightButton = () => {
    if (isLastPage) {
      return;
    }

    const nextPage = currentPage + 1;
    handleCurrentPage(nextPage);

    if (nextPage === wholePageCount) {
      setIsLastPage(true);
    }
    if (isFirstPage) {
      setIsFirstPage(false);
    }
  };

  const handlePageItem = (i: number) => {
    setIsFirstPage(i === 1);
    setIsLastPage(i === wholePageCount);
    handleCurrentPage(i);
  };

  useEffect(() => {
    setIsFirstPage(currentPage === 1);
    setIsLastPage(currentPage === wholePageCount);
  }, [currentPage, wholePageCount]);

  return (
    <S.Pagination>
      <button
        style={{ visibility: isFirstPage ? 'hidden' : 'visible' }}
        onClick={handleLeftButton}
      >
        {'<'}
      </button>
      <ul className="page-list">
        {getCurrentNum(wholePageCount, currentPage, splitNumber).map((i) => (
          <span
            key={i}
            className={i === currentPage ? 'current' : ''}
            onClick={() => handlePageItem(i)}
          >
            {i}
          </span>
        ))}
      </ul>
      <button
        style={{ visibility: isLastPage ? 'hidden' : 'visible' }}
        onClick={handleRightButton}
      >
        {'>'}
      </button>
    </S.Pagination>
  );
}
