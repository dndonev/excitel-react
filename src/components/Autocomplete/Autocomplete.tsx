import styles from './Autocomplete.module.scss';

import React, { FC, useEffect, useState } from 'react';

import { getCountriesByName, loadCountries } from '../../services/getCountries';

import { ICountry } from '../../models/business';

import CountryListItem from '../CountryItem/CountryItem';
import ErrorMessage from '../Error/Error';
import Spinner from '../Spinner/Spinner';

interface AutocompleteProps {}

const ENTER_KEY = 'Enter';

const Autocomplete: FC<AutocompleteProps> = () =>
{
  const [inputValue, setInputValue] = useState<string>('');
  const [suggested, setSuggested] = useState<ICountry[]>([]);
  const [current, setCurrent] = useState<ICountry>({} as ICountry);
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>({} as NodeJS.Timeout);
  const [error, setError] = useState<Error>({} as Error);

  const [showSuggested, setShowSuggested] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    setShowSuggested(true);
  }, [suggested])

  const onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    if (timer) {
      clearTimeout(timer);
    }

    const { value } = e.currentTarget as unknown as HTMLInputElement;

    setInputValue(value);

    if (value === '') {
      setShowSuggested(false);
    } else {
      setTimer(
        setTimeout(() => loadCountries(getCountriesByName(value), setSuggested, setLoading, setError), 1000)
      );
    }
  }

  const onKeyInput: (e: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>) => void = (e) => {

    const { value } = e.currentTarget as unknown as HTMLInputElement;

    if (value === '') {
      return;
    }

    if (e.key === ENTER_KEY && e.currentTarget.textContent) {
      setInputValue(e.currentTarget.textContent);
      setShowSuggested(false);
      setShowDetails(true);
    }
  };

  const onMouseInput: (e: React.MouseEvent<HTMLInputElement | HTMLDivElement>) => void = (e) => {
    if (!e.currentTarget) {
      return;
    }
    const { textContent } = e.currentTarget;

    if (textContent){ 
      setInputValue(textContent);
      const currentCountry = suggested.find(x => x.name === textContent);
    
      if (!currentCountry) {
        return;
      }
  
      setCurrent(currentCountry);
      setShowSuggested(false);
      setShowDetails(true);
    }
  }

  return (
    <section>
      <div className={styles.searchBoxContainer}>
        <input
          type={'search'}
          placeholder='Find a country'
          className={styles.searchBox}
          value={inputValue}
          onChange={(e) => onChange(e)}
          onKeyUp={(e) => onKeyInput(e)}
          autoComplete={'off'}
          autoFocus
        >
        </input>

        {
          loading ? <Spinner /> : 
          Object.getOwnPropertyNames(error).length ? <ErrorMessage errorMessage={error.message} /> : 
            showSuggested ?
            (
              <div className={styles.suggestions}>
                {
                  suggested?.map((s, i) => 
                    (<div
                        key={i}
                        tabIndex={0}
                        onKeyUp={(e) => onKeyInput(e)}
                        onMouseUp={(e) => onMouseInput(e)}
                        >
                          {s.name}
                      </div>)
                    )
                }
              </div>
            ) : <a></a>
        }
      </div>

      {
        showDetails ?
          <section className={styles.details}>
            <CountryListItem 
              name={current.name}
              capitalName={current.capitalName}
              region={current.region}
              subregion={current.subregion}
              code={current.code}
              flag={current.flag}
              population={current.population}
              />
          </section> : (<a></a>)
      } 
    </section>
  );
}

export default Autocomplete;
