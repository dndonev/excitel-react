import { ICountry } from '../models/business';

import { TGridCountry } from '../types/gridCountry';

type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>;

export const getCountries: () => Promise<ICountry[]> = async () => {
    const getCountriesUrl: string = 'https://excitel-countries.azurewebsites.net/countries';

    return (await (fetch(getCountriesUrl))).json();
}

export const getCountriesByName: (search? :string) => Promise<ICountry[]> = async (search? :string) => {
    if (!search || !search?.length) {
        throw new Error('Invalid argument');
    }

    const getCountriesByNameUrl: string = 
        `https://excitel-countries.azurewebsites.net/countries/${encodeURIComponent(search)}`;

    return (await fetch(getCountriesByNameUrl)).json();
}


export const loadCountries: (
    fetchCountries:  Promise<ICountry[]>,
    setCountries: Dispatch<TGridCountry[]> | Dispatch<ICountry[]>,
    setLoading: Dispatch<boolean>,
    setError: Dispatch<Error>,
    ) => Promise<void> = 
        async (fetchCountries, setCountries, setLoading, setError) => { 
            try {
                setLoading(true);
                setCountries(await fetchCountries);
                setLoading(false);
            } catch (e) {
                setError(new Error('There was an error loading your request'));
                setLoading(false);
            };
};

export const loadCountry: (
    name: string,
    fetchCounties:  Promise<ICountry[]>,
    setCountry: Dispatch<ICountry>,
    setLoading: Dispatch<boolean>,
    setError: Dispatch<Error>,
    ) => Promise<void> = 
        async (name, fetchCounties, setCountry, setLoading, setError) => {
            try {
                setLoading(true);
                const country = (await fetchCounties).find((x : ICountry)=> x.name === name);

                if (!country || !name) {
                    setLoading(false);
                    setError(new Error('Country details not found'));
                    return;
                };

                setCountry(country);
                setLoading(false);
            } catch (e) {
                setError(e as Error);
                setLoading(false);
            };
};