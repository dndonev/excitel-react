import { ICountry } from "../models/business";

export type TGridCountry = Pick<ICountry, 'name' | 'capitalName' | 'code'>;
