import { AppState } from '../models/appState';
import { ICountry } from '../models/business';

export type Payload = NodeJS.Timeout | ICountry[] | number | boolean;
export const initialState: AppState = {
  timeout: {} as NodeJS.Timeout,
  tick: 0,
  countries: [] as ICountry[],
  loading: false
};

export const reducer = (state: AppState, action: { type: string, payload?: Payload }) => {
  switch (action.type) {
    case 'timeout':
      return {
        ...state,
        timeout: action.payload
      } as AppState;
    case 'countries':
      return {
        ...state,
        countries: action.payload
      } as AppState;

    case 'loading':
      return {
        ...state,
        loading: action.payload
      } as AppState;
    default:
      return state ;
  }
}