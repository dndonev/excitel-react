import styles from './CountryList.module.scss';

import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TGridCountry } from '../../types/gridCountry';

import { ICountdown } from '../../models/address';

import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../Error/Error';

interface CountryListProps {
  error: Error;
  loading: boolean;
  currentCountries: TGridCountry[];
  setCurrentCountries: React.Dispatch<React.SetStateAction<TGridCountry[]>>
}

const CountryList: FC<CountryListProps> = 
    ({ error, loading, currentCountries, setCurrentCountries }) => {

  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<ICountdown>({} as ICountdown);
  const [listItemClass, setlistItemClass] = useState<string>(styles.listItem);
  const [targetElement, setTargetElement] = useState<HTMLDivElement>();
  
  useEffect(() => {
    if (!targetElement) {
      return;
    }
    
    targetElement.className = listItemClass;
  }, [listItemClass, targetElement]);

  const navigateToItem: (name: string) => void = (name) => navigate(`${name}`);
  
  const onItemKeyDown: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    countryName: string) => void = (event, countryName) => {
      if (!event.currentTarget) {
        return;
      }      
      if (countdown.timeout) {
        clearTimeout(countdown.timeout);
      }

      setTargetElement(event.currentTarget);
      setlistItemClass(`${listItemClass} ${styles.progressBar}`);

      const timeout = setTimeout(() => navigateToItem(countryName), 2000);
      setCountdown({ element: event.currentTarget, timeout });
  }

  const onItemKeyUp: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void = 
    (event) => {
      if (!event.currentTarget) {
        return;
      }

      if (countdown.timeout || countdown.element !== event.currentTarget) {
        clearTimeout(countdown.timeout);
      }

      setlistItemClass(styles.listItem);
    }

  const sortCountries: (by: 'name' | 'capitalName') => void = (by) => 
    setCurrentCountries([...currentCountries.sort((a, b) => a[by].localeCompare(b[by]))]);

  return loading ? <Spinner /> : 
    Object.getOwnPropertyNames(error).length ? 
      <ErrorMessage errorMessage={error.message} /> : 
      (
        <section className={styles.list}>
          <div className={styles.listHeader}>
            <span onClick={() => sortCountries('name')}>Name</span>
            <span onClick={() => sortCountries('capitalName')}>Capital</span>
          </div>
          {
            currentCountries?.map((l, i) => (
              <div 
                className={styles.listItem}
                title='Click and hold to navigate'
                tabIndex={i}
                onMouseDown={(e) => onItemKeyDown(e, l.name)}
                onMouseUp={(e) => onItemKeyUp(e)}
                key={i}>
                  <span>{ l.name }</span> <span>{ l.capitalName }</span>
              </div>)
            )
          }
        </section>
      )};

export default CountryList;
