

import styles from './CountryLayout.module.scss';

import { ChangeEvent, FC, useEffect, useState } from 'react';

import { getCountries, getCountriesByName, loadCountries } from '../../services/getCountries';

import { ICountry } from '../../models/business';
import { TGridCountry } from '../../types/gridCountry';

import SearchBar from '../SearchBar/SearchBar';
import Pager from '../Pager/Pager';
import CountryList from '../CountryList/CountryList';

const Countries: FC = () => {
  const [countries, setCountries] = useState<TGridCountry[]>([]);
  const [currentCountries, setCurrentCountries] = useState<TGridCountry[]>([]);
  const [error, setError] = useState<Error>({} as Error);
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>({} as NodeJS.Timeout);
  
  const loadCountriesWithState = (request: Promise<ICountry[]>) => 
    loadCountries(request, setCountries, setLoading, setError)

  useEffect(() => {
    loadCountriesWithState(getCountries());
  }, []);

  const onInput: (event: ChangeEvent) => void = (event) => {
    if (timer) {
      clearTimeout(timer);
    }

    const { value } = event.target as unknown as { value: string };
    let triggerLoading = () => loadCountriesWithState(getCountriesByName(value));

    if (value === '') {
      triggerLoading = () => loadCountriesWithState(getCountries());
    }
    
    const timeout = setTimeout(() => triggerLoading(), 1000);
    setTimer(timeout);
  }

  return (
    <div className={styles.container} data-testid="CountryList">
      <SearchBar onInput={onInput} />
      
      <CountryList 
        error={error}
        loading={loading}
        setCurrentCountries={setCurrentCountries}
        currentCountries={currentCountries}
      />

      <Pager
        initialCountries={countries} 
        setCurrentCountries={setCurrentCountries}
      />
    </div>
)};

export default Countries;
