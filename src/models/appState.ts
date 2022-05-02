import { ICountry } from './business';

export interface AppState {
    timeout: NodeJS.Timeout;
    countries: ICountry[];
    tick: number;
    loading: boolean;
};
