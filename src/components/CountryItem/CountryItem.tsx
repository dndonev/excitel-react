import styles from './CountryItem.module.scss';

import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCountriesByName, loadCountry } from '../../services/getCountries';

import { ICountry } from '../../models/business';

import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../Error/Error';

interface CountryListItemProps extends Partial<ICountry> { }

const CountryListItem: FC<CountryListItemProps> = (
  {
    name,
    capitalName,
    population,
    region,
    subregion,
    code,
    flag
  }
) => {
  const { name: countryName } = useParams();
  const [country, setCountry] = useState<ICountry>({} as ICountry);
  const [error, setError] = useState<Error>({} as Error);
  const [loading, setLoading] = useState<boolean>(false);

  const searchName = countryName ?? name ?? '';

  useEffect(() => {
    if (!name) {
      loadCountry(searchName, getCountriesByName(searchName), setCountry, setLoading, setError);
    }
  }, [])

  return loading ? <Spinner /> : 
    Object.getOwnPropertyNames(error).length ? 
      <ErrorMessage errorMessage={error.message} /> : (
        <article className={styles.article} data-testid="BusinessItem">
          <div className={styles.imageContainer}>
            <div className={styles.image}>
              <img src={country?.flag ?? flag} alt='Not found'></img>
            </div>
          </div>
          <div className={styles.container}>
            <div><strong>Name: </strong><span>{country?.name ?? searchName}</span></div>
            <div><strong>Capital: </strong><span>{country?.capitalName ?? capitalName}</span></div>
            <div><strong>Population: </strong><span>{country?.population ?? population}</span></div>
            <div><strong>Region: </strong><span>{country?.region ?? region}</span></div>
            <div><strong>Sub-region: </strong><span>{country?.subregion ?? subregion}</span></div>
            <div><strong>Code: </strong><span>{country?.code ?? code}</span></div>
          </div>
        </article>
      )};

export default CountryListItem;
