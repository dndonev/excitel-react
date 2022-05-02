
import styles from './Pager.module.scss';

import { FC, useEffect, useState } from 'react';

import { TGridCountry } from '../../types/gridCountry';

interface PagerProps {
  initialCountries: TGridCountry[];
  setCurrentCountries: React.Dispatch<React.SetStateAction<TGridCountry[]>>
}

export const PAGE_SIZE: number = 9;

const Pager: FC<PagerProps> = ({ initialCountries, setCurrentCountries }) => { 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const isFirstPage = currentPage !== 1;
  const isLastPage = currentPage !== Math.ceil(initialCountries.length / PAGE_SIZE);
  
  useEffect(() => changePage(), [currentPage, initialCountries]);

  const changePage: () => void = () => {
    let startIndex, endIndex = 0;
    startIndex = (currentPage - 1) * PAGE_SIZE;
    endIndex = startIndex + PAGE_SIZE;
    setCurrentCountries([...initialCountries.slice(startIndex, endIndex)]);
  };

  return (
    <div className={styles.Pager} data-testid="Pager">
      <span onClick={() => setCurrentPage(currentPage - 1)}>
        { isFirstPage ? '<  Previous' : '' }
      </span>
      <span>{currentPage}</span>
      <span onClick={() => setCurrentPage(currentPage + 1)}>
        { isLastPage ? 'Next  >' : '' }
      </span>
    </div>
  )};

export default Pager;
